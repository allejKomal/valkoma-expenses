import * as yup from 'yup';

export const AddExpenseSchema: yup.ObjectSchema<AddExpenseFormData> = yup.object({
  expenseName: yup.string().required('Expense name is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  date: yup.string().required('Date is required'),
  note: yup.string().nullable().optional(), // Explicitly optional and nullable
  attachments: yup.mixed<FileList>().nullable().optional(),
  categoryId: yup.string().required('Category is required'),
  isRecurring: yup.boolean().default(false),
  recurring: yup
    .object({
      frequency: yup
        .string<'daily' | 'weekly' | 'monthly' | 'yearly'>()
        .oneOf(['daily', 'weekly', 'monthly', 'yearly'], 'Invalid frequency')
        .nullable()
        .when('isRecurring', {
          is: true,
          then: (schema) => schema.required('Frequency is required when recurring'),
          otherwise: (schema) => schema.notRequired(),
        }),

      startDate: yup
        .string()
        .nullable()
        .when('isRecurring', {
          is: true,
          then: (schema) => schema.required('Start date is required when recurring'),
          otherwise: (schema) => schema.notRequired(),
        }),

      endDate: yup
        .string()
        .nullable()
        .optional()
        .test('is-after-start', 'End date cannot be before start date', function (value) {
          const { startDate } = this.parent;
          if (!value || !startDate) return true; // Skip if either is missing
          const start = new Date(startDate);
          const end = new Date(value);
          return end >= start;
        })
        .when('isRecurring', {
          is: true,
          then: (schema) => schema.required('End date is required when recurring'),
          otherwise: (schema) => schema.notRequired(),
        }),
    })
    .nullable() // The entire `recurring` object can be null or optional
    .when('isRecurring', {
      is: true,
      then: (schema) => schema.required('Recurring details are required'),
      otherwise: (schema) => schema.nullable().optional(),
    }),
});

export interface AddExpenseFormData {
  expenseName: string;
  amount: number;
  date: string;
  note?: string | null;
  attachments?: FileList | null;
  isRecurring: boolean;
  categoryId: string;
  recurring: {
    frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;
    startDate?: string | null;
    endDate?: string | null;
  } | null;
}

// Initial form values
export const initialFormValues: AddExpenseFormData = {
  expenseName: '',
  amount: 0,
  date: new Date().toISOString().split('T')[0],
  note: null, // Align with nullable optional note
  attachments: null,
  isRecurring: false,
  categoryId: '',
  recurring: null, // Start with null to match optional recurring
};
