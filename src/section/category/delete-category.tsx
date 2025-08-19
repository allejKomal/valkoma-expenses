import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Category } from "@/models/category.model";
import { useCreateOrUpdateFileMutation } from "@/redux/curd-api";
import { TrashIcon } from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface DeleteCategoryProps {
  categoryId: string;
  showIcon?: boolean;
  variant?: "outline" | "destructive";
}

export default function DeleteCategory({
  categoryId,
  showIcon = false,
  variant = "outline",
}: DeleteCategoryProps) {
  const categories = useSelector((state: any) => state.categories.items)
  const [createOrUpdateFile] = useCreateOrUpdateFileMutation();
  const storedKey = localStorage.getItem("key");
  const catUrl = useMemo(() => {
    return storedKey ? `expenses/users/${storedKey}/categories.json` : "expenses/categories.json";
  }, [storedKey]);

  const handleDelete = async () => {
    console.log("Deleting expense", categoryId);
    const typedExpenses = categories as Category[];
    const filteredExpenses = typedExpenses.filter((exp) => exp.id !== categoryId)
    await createOrUpdateFile({ path: catUrl, content: filteredExpenses })
    toast.success("Expense deleted successfully");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={showIcon ? "icon" : "default"}>
          {showIcon ? <TrashIcon className="w-4 h-4" /> : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete the category.

            Note: You must reassign all expense categories related to this.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
