import "./Home.css";

import CategoryList from "../Category/CategoryList";
import { useCollection } from "../../hooks/useCollection";

export default function Home() {
  const {documents, error} = useCollection('categories');
  
  return (
    <main className="home-wrapper">
        {error && <p>{error}</p>}
        {documents && <CategoryList categories={documents} />}
        {documents?.length === 0 && <p className="info-message">There is no categories</p>}
    </main>
  );
}
