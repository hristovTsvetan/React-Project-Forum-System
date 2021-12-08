import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { useFirestore } from "../../hooks/useFirestore";

export default function CategoryCreate() {
    const [newCategoryName, setNewCategoryName] = useState('');
    const {createCategoryAction} = useModal();
    const {addDocument, response} = useFirestore('categories');

    const submitHandler = (e) => {
      e.preventDefault();
      
      addDocument({ title: newCategoryName, subcategories: [] });
      createCategoryAction(false);
    };

    return (
        <form className="category-edit" onSubmit={submitHandler}>
        <label>
          <div>
            <span>Category name:</span>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setNewCategoryName(e.currentTarget.value)}
              value={newCategoryName}
              required
            />
          </div>
        </label>
        <div className="modal-change-button-wrapper">
          <button className="modal-edit-chang-btn">Create</button>
          <button className="modal-edit-cancel-btn" onClick={() => createCategoryAction(false)}>Cancel</button>
        </div>
      </form>
    );
}
