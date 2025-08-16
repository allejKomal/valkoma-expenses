import { Badge } from "@/components/ui/badge";
import type { Expense } from "@/models/expense.model";
import AddExpense from "./add-expense";
import DeleteExpense from "@/section/expense/delete-expense";
import { categories } from "@/dummy-data/categories-list";

export interface GroupedTimeline {
  [date: string]: {
    id: string;
    title: string;
    description: string;
    amount: number;
  }[];
}

interface TimelineProps {
  data: Expense[];
}

export default function TimelineExpenseList({ data }: TimelineProps) {
  const groupExpensesByDate = (expenses: Expense[]): GroupedTimeline => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return expenses.reduce((acc: GroupedTimeline, expense) => {
      const dateKey = formatter.format(expense.date);

      const expenseEntry = {
        id: expense.id,
        title: expense.expenseName,
        description: expense.note ? `${expense.note}` : "",
        amount: expense.amount,
      };

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(expenseEntry);

      return acc;
    }, {});
  };
  const groupedTimeline = groupExpensesByDate(data);

  return (
    <div className="relative px-10">
      <div className="absolute left-[2.2em] top-0 bottom-0 w-px bg-muted-foreground/20" />
      <div className="flex flex-col gap-4">
        {Object.entries(groupedTimeline).map(([date, events]) => {
          const totalAmount = events.reduce(
            (sum, event) => sum + Number(event.amount || 0),
            0
          );
          return (
            <div key={date} className="flex items-start gap-4 relative pl-6">
              <div className="absolute left-[-0.65em] top-2 w-3 h-3 rounded-full bg-primary z-10" />
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-lg font-medium">{date}</div>
                  <Badge>$ {totalAmount.toFixed(2)}</Badge>
                </div>

                {events.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 mb-2 last:mb-0"
                  >
                    <div className="flex flex-col gap-0 flex-1 w-[500px] items-start">
                      <div className="flex items-center">
                        <div className="text-sm font-semibold min-w-[1.5rem]">
                          {idx + 1}.
                        </div>

                        <div className="font-medium text-left text-sm truncate mr-2">
                          {event.title}
                        </div>
                        <Badge variant="secondary">
                          {
                            categories.find(
                              (c) =>
                                c.id ===
                                data.find((expense) => expense.id === event.id)
                                  ?.categoryId
                            )?.categoryName
                          }
                        </Badge>
                      </div>

                      {event.description && (
                        <div className="text-muted-foreground text-xs ml-6">
                          {event.description}
                        </div>
                      )}
                    </div>

                    <div className="min-w-[80px] text-right flex-shrink-0 flex items-center gap-2">
                      <Badge variant="outline">${event.amount}</Badge>
                      <AddExpense
                        expenseToEdit={data.find(
                          (expense) => expense.id === event.id
                        )}
                        showIcon
                      />
                      <DeleteExpense expenseId={event.id} showIcon />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
