import { Route, Routes } from "react-router-dom";
import "./App.css";
import ExpenseList from "./pages/expense-list";
import CategoryList from "./pages/category-list";
import NotFound from "./pages/not-found";
import Header from "./components/design-system/header";

function App() {
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
