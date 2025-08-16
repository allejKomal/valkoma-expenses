import { expensesList } from "@/dummy-data/expenses-list";
import { ButtonGroup } from "valkoma-package/design-system";
import { useState } from "react";
import { GridIcon, TimerIcon, Table2Icon, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import AddExpense from "../section/expense/add-expense";
import { ExpenseTable } from "../section/expense/expense-table";
import ExpenseCards from "../section/expense/expense-cards";
import TimelineExpenseList from "../section/expense/timeline-expense-list";
import Navbar from "@/components/design-system/nav-bar";
import AddCategory from "@/section/category/add-category";

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
    <div className="w-full flex flex-col gap-4  h-full">
      <Navbar title="Expense List" icon={<Coins className="w-4 h-4" />}>
        <div className="flex items-center gap-2">
          <AddExpense />
          <AddCategory />
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
      </Navbar>
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
