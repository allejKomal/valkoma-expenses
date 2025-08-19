import AddCategory from "@/section/category/add-category";
import Navbar from "@/components/design-system/nav-bar";
import { Layers } from "lucide-react";
import { CategoryTable } from "@/section/category/category-table";
import { useSelector } from "react-redux";

function CategoryList() {
  const categories = useSelector((state: any) => state.categories.items)
  return (
    <div>
      <Navbar title="Category List" icon={<Layers className="w-4 h-4" />}>
        <AddCategory />
      </Navbar>
      <div className="p-6 h-full overflow-y-auto">
        <CategoryTable data={categories} />
      </div>
    </div>
  );
}

export default CategoryList;
