export interface Expense {
  id: string;
  expenseName: string;
  amount: number;
  date: Date;
  note?: string;
  attachments?: string[];
  recurring?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    startDate: Date;
    endDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
