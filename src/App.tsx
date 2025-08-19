import "./App.css";
import { Route, Routes } from "react-router-dom";
import ExpenseList from "./pages/expense-list";
import CategoryList from "./pages/category-list";
import NotFound from "./pages/not-found";
import { useDispatch } from "react-redux"
import Header from "./components/design-system/header";
import { useGetJSONFileQuery } from "./redux/curd-api";
import { useEffect, useMemo } from "react";
import { addExpense } from "./redux/expense-slice";
import { addCategories } from "./redux/category-slice";

function App() {
  const dispatch = useDispatch()
  const storedKey = localStorage.getItem("key");
  const catUrl = useMemo(() => {
    return storedKey ? `expenses/users/${storedKey}/categories.json` : "expenses/categories.json";
  }, [storedKey]);
  const expUrl = useMemo(() => {
    return storedKey ? `expenses/users/${storedKey}/expenses.json` : "expenses/expenses.json";
  }, [storedKey]);
  const { data: categoriesData, isLoading: isCategoryLoading } = useGetJSONFileQuery(catUrl)
  const { data: expensesData, isLoading: isExpensesLoading } = useGetJSONFileQuery(expUrl)
  useEffect(() => {
    if (categoriesData?.data) {
      dispatch(addCategories(categoriesData.data));
    }
  }, [categoriesData])

  useEffect(() => {
    if (expensesData?.data) {
      dispatch(addExpense(expensesData?.data))
    }
  }, [expensesData])

  if (isCategoryLoading || isExpensesLoading) {
    return (
      <div>Loading... Please Wait</div>
    )
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100vh-95px)] p-4 px-12 overflow-y-auto">
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
