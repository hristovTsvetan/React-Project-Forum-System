import Category from "./Category";

export default function CategoryList({categories}) {
    return (
      <>
        {categories.map(cat => <Category key={cat.id} category={cat}/>)}
      </>
    );
}
