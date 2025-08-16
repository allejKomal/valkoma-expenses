import * as yup from "yup";

export const CategorySchema: yup.ObjectSchema<CategoryFormData> = yup.object({
  categoryName: yup.string().required("Category name is required"),
  color: yup
    .string()
    .matches(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex code")
    .required("Color is required"),
  icon: yup.string().required("Icon is required"),
  type: yup
    .string<"expense" | "income">()
    .oneOf(["expense", "income"], "Type must be either 'expense' or 'income'")
    .required("Type is required"),
  isDefault: yup.boolean().default(false),
});

export interface CategoryFormData {
  categoryName: string;
  color: string;
  icon: string;
  type: "expense" | "income";
  isDefault: boolean;
}

export const initialCategoryFormValues: CategoryFormData = {
  categoryName: "",
  color: "#000000", // default black
  icon: "", // can be replaced with a default if needed
  type: "expense", // default type
  isDefault: false,
};
