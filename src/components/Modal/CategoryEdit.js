import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { useFirestore } from '../../hooks/useFirestore';
import './CategoryEdit.css';

export default function CategoryEdit() {

    const [newCategoryName, setNewCategoryName] = useState('');
    const {editCategoryAction, itemId} = useModal();
    const {updateDocument} = useFirestore('categories');
    


    const submitHandler = (e) => {
        e.preventDefault();

        updateDocument(itemId, {title: newCategoryName});

        editCategoryAction(false, null);
    };

    return (
      <form className="category-edit" onSubmit={submitHandler}>
        <label>
          <div>
            <span>New category name:</span>
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
          <button className="modal-edit-chang-btn">Change</button>
          <button className="modal-edit-cancel-btn" onClick={() => editCategoryAction(false, null)}>Cancel</button>
        </div>
      </form>
    );
}
