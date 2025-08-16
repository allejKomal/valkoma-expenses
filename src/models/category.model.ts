export interface Category {
  id: string;
  categoryName: string;
  color: string;
  icon: string;
  type: "expense" | "income";
  isDefault: boolean;
  createdAt: Date;
}
