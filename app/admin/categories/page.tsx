import CategoryCard from "@/components/CategoryCard";
import { fetchCategories } from "@/utils/fetchCategories";
import ButtonWithoutIcons from "@/components/ButtonWithoutIcons";

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Categories</h1>
        <ButtonWithoutIcons text="Add Category" url="/admin/categories/add" />
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {categories.map((category: { categoryid: string; categoryimage: string; categoryname: string; productcount: number }) => (
          <CategoryCard
            key={category.categoryid}
            imageUrl={category.categoryimage}
            name={category.categoryname}
            productCount={category.productcount}
          />
        ))}
      </div>
    </div>
  );
}
