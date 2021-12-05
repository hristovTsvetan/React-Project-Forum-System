import "./Category.css";
import Subcategory from "./Subcategory";

export default function Category({name}) {

    return (
      <section className="category">
        <div className="category-title-wrapper">
          <span className="category-title">{name}</span>
        </div>
        <article className="subcategory-wrapper">
          <Subcategory />
          <Subcategory />
          <Subcategory />
        </article>
      </section>
    );
}