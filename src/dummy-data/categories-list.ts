import type { Category } from "@/models/category.model";

export const categories: Category[] = [
  {
    id: "1",
    categoryName: "Food",
    color: "#FF6384",
    icon: "UtensilsCrossed", // ✅ Exists in Lucide
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    categoryName: "Transport",
    color: "#36A2EB",
    icon: "Car", // ✅ Correct casing
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    categoryName: "Shopping",
    color: "#FFCE56",
    icon: "ShoppingBag", // ✅
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: "4",
    categoryName: "Entertainment",
    color: "#4BC0C0",
    icon: "Film", // ✅
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: "5",
    categoryName: "Health",
    color: "#9966FF",
    icon: "HeartPulse", // ✅ closest to heartbeat
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: "6",
    categoryName: "Utilities",
    color: "#FF9F40",
    icon: "Bolt", // ✅
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: "7",
    categoryName: "Salary",
    color: "#00C49F",
    icon: "Wallet", // ✅ replacing money-bill-wave
    type: "income",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: "8",
    categoryName: "Freelance",
    color: "#0088FE",
    icon: "Laptop", // ✅ closest to laptop-code
    type: "income",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: "9",
    categoryName: "Gifts",
    color: "#FFBB28",
    icon: "Gift", // ✅
    type: "income",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: "10",
    categoryName: "Other",
    color: "#C0C0C0",
    icon: "MoreHorizontal", // ✅ replacing ellipsis-h
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
];
