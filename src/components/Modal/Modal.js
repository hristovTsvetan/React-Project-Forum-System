import "./Modal.css";

import CategoryDelete from "./CategoryDelete";
import CategoryEdit from "./CategoryEdit";
import SubcategoryEdit from "./SubcategoryEdit";
import { useModal } from "../../hooks/useModal";
import CategoryCreate from "./CategoryCreate";
import SubcategoryCreate from "./SubcategoryCreate";


export default function Modal() {
  const {
    deleteCategory,
    editCategory,
    deleteSubcategory,
    editSubcategory,
    createSubcategory,
    createCategory,
  } = useModal();


    return (
      <div className="modal-wrapper">
        <div className="modal-content">
          {deleteCategory && <CategoryDelete />}
          {editCategory && <CategoryEdit />}
          {deleteSubcategory && <CategoryDelete />}
          {editSubcategory && <SubcategoryEdit />}
          {createCategory && <CategoryCreate />}
          {createSubcategory && <SubcategoryCreate />}
        </div>
      </div>
    );
}
