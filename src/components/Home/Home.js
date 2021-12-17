import "./Home.css";

import OnlineUsers from "../OnlineUsers/OnlineUsers";
import CategoryList from "../Category/CategoryList";
import { useCollection } from "../../hooks/useCollection";
import { useTitle } from "../../hooks/useTitle";

export default function Home() {
  const {documents, error} = useCollection('categories');
  useTitle('Honda forum - Home page');
  
  return (
    <main className="home-wrapper">
        {error && <p>{error}</p>}
        {documents && <CategoryList categories={documents} />}
        {documents?.length === 0 && <p className="info-message">There is no categories</p>}
        <OnlineUsers />
    </main>
  );
}
