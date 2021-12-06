import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import './CategoryEdit.css';

export default function CategoryEdit() {

    const [newCategoryName, setNewCategoryName] = useState('');
    const {editCategoryAction} = useModal();


    const submitHandler = (e) => {
        e.preventDefault();
        
    };

    return (
      <form className="category-edit" onSubmit={submitHandler}>
        <label>
          <div>
            <span>Current category name:</span>
          </div>
          <div>
            <p>Hello there</p>
          </div>
        </label>
        <label>
          <div>
            <span>New category name:</span>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setNewCategoryName(e.currentTarget.value)}
              value={newCategoryName}
            />
          </div>
        </label>
        <div className="modal-change-button-wrapper">
          <button className="modal-edit-chang-btn">Change</button>
          <button className="modal-edit-cancel-btn" onClick={() => editCategoryAction(false)}>Cancel</button>
        </div>
      </form>
    );
}
