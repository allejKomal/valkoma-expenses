import "./App.css";
import AddExpense from "./pages/add-expense";

function App() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <AddExpense />
    </div>
  );
}

export default App;
