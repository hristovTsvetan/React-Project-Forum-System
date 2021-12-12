import './Path.css';

export default function Path({categoryName, subCategoryName, postName}) {
    return (
      <div className="post-header-wrapper">
        <span className="category-title">{categoryName}</span>
        <span className="category-subcategory-delimiter">/</span>
        <span className="category-title">{subCategoryName}</span>
        {postName && (
          <>
            <span className="category-subcategory-delimiter">/</span>
            <span className="category-title">{postName}</span>
          </>
        )}
      </div>
    );
}
