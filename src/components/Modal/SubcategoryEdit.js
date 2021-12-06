import './SubcategoryEdit.css';

import { useState } from 'react';
import { useModal } from '../../hooks/useModal';

export default function SubcategoryEdit() {
    const [newSubcategoryName, setNewSubcategoryName] = useState('');
    const [newSubcategoryDescription, setNewSubcategoryDescription] = useState('');
    const {editSubCategoryAction} = useModal();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(newSubcategoryName, newSubcategoryDescription);
    }

    return (
      <form className="category-edit" onSubmit={submitHandler}>
        <label>
          <div>
            <span>New subcategory name:</span>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setNewSubcategoryName(e.currentTarget.value)}
              value={newSubcategoryName}
              required
            />
          </div>
        </label>
        <label>
          <div>
            <span>New description:</span>
          </div>
          <div>
            <textarea
              required
              cols="30"
              rows="10"
              onChange={(e) =>
                setNewSubcategoryDescription(e.currentTarget.value)
              }
              value={newSubcategoryDescription}
            ></textarea>
          </div>
        </label>
        <div className="modal-change-button-wrapper">
          <button className="modal-edit-chang-btn">Change</button>
          <button
            className="modal-edit-cancel-btn"
            onClick={() => editSubCategoryAction(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
}
