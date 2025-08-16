import { Badge } from "@/components/ui/badge";
import type { Expense } from "@/models/expense.model";
import { formatter } from "@/utils/date";
import AddExpense from "./add-expense";
import DeleteExpense from "@/section/expense/delete-expense";
import { categories } from "@/dummy-data/categories-list";

interface ExpenseCardsProps {
  data: Expense[];
}

export default function ExpenseCards({ data }: ExpenseCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((expense) => (
        <div key={expense.id} className="border rounded-md w-full p-4">
          {/* Image with overlay (no padding inside image box) */}
          <div className="relative h-40 rounded-md overflow-hidden">
            <img
              src="https://ui.shadcn.com/placeholder.svg"
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute top-3 z-50  right-3 transition flex gap-2">
              <DeleteExpense expenseId={expense.id} showIcon />
              <AddExpense expenseToEdit={expense} showIcon />
            </div>

            {/* Gradient overlay only over the image */}
            <div className="absolute inset-0 flex items-end p-4">
              <span className="font-semibold">{expense.expenseName}</span>
            </div>
          </div>

          {/* Content below the image (like date) */}
          <div className="pt-2 px-2 flex gap-2 justify-end flex-wrap">
            <Badge variant="outline">{formatter.format(expense.date)}</Badge>
            {expense.note && <Badge variant="outline">{expense.note}</Badge>}
            <Badge variant="secondary">
              {
                categories.find((c) => c.id === expense.categoryId)
                  ?.categoryName
              }
            </Badge>
            <Badge>$ {expense.amount.toFixed(2)}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
