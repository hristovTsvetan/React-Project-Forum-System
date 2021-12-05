import "./Subcategory.css";

import { Link } from "react-router-dom";

export default function Subcategory() {
    return (
      <>
        <Link to="/category/id/subcategory">
          <div className="subcategory-name">
            <p className="subcategory-title">Honda Civic</p>
            <p className="subcategory-description">
              Everything about honda civic
            </p>
          </div>
        </Link>
        <div className="subcategory-pub-number">
          <p>1010 publications</p>
        </div>
      </>
    );
}
