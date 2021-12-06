import "./Home.css";

import Category from "../Category/Category";

export default function Home({modalAction}) {

  return (
    <main className="home-wrapper">
        <Category name="Technical category"/>
        <Category name="Market place"/>
    </main>
  );
}
