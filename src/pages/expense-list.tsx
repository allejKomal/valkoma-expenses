import { expensesList } from "@/dummy-data/expenses-list";
import { ButtonGroup } from "valkoma-package/design-system";
import { useState } from "react";
import { GridIcon, TimerIcon, Table2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import AddExpense from "../section/expense/add-expense";
import { ExpenseTable } from "./expense-list/expense-table";
import ExpenseCards from "./expense-list/expense-cards";
import TimelineExpenseList from "./expense-list/timeline-expense-list";

type view = "table" | "cards" | "timeline";

export default function ExpenseList() {
  const [activeView, setActiveView] = useState<view>("table");

  const viewOptions = [
    { id: "table", icon: <Table2Icon className="w-4 h-4" /> },
    { id: "cards", icon: <GridIcon className="w-4 h-4" /> },
    {
      id: "timeline",
      icon: <TimerIcon className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4  h-screen p-10 ">
      <div className="flex justify-between">
        <span className="text-2xl font-bold">Expense List</span>
        <div className="flex items-center gap-2">
          <AddExpense />
          <ButtonGroup
            size="sm"
            items={viewOptions.map((view) => ({
              id: view.id,
              icon: view.icon,
              active: activeView === view.id,
              onClick: () => setActiveView(view.id as view),
            }))}
            activeButtonClassName={cn(
              "bg-primary text-white dark:bg-white dark:!text-black",
              activeView === "table" && "!rounded-l-md",
              activeView === "timeline" && "!rounded-r-md"
            )}
          />
        </div>
      </div>
      <div className="p-4 h-full overflow-y-auto">
        {activeView === "table" && <ExpenseTable data={expensesList} />}
        {activeView === "cards" && <ExpenseCards data={expensesList} />}
        {activeView === "timeline" && (
          <TimelineExpenseList data={expensesList} />
        )}
      </div>
    </div>
  );
}
