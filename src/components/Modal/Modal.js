import "./Modal.css";

import CategoryDelete from "./CategoryDelete";
import CategoryEdit from "./CategoryEdit";
import { useModal } from "../../hooks/useModal";


export default function Modal() {
  const {deleteCategory, editCategory, deleteSubcategory} = useModal();


    return (
      <div className="modal-wrapper">
        <div className="modal-content">
          {deleteCategory && <CategoryDelete />}
          {editCategory && <CategoryEdit />}
          {deleteSubcategory && <CategoryDelete />}
        </div>
      </div>
    );
}
