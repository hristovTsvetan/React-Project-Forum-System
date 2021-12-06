import { useState } from "react";
import { useModal } from "../../hooks/useModal";

export default function SubcategoryCreate() {
    const [newSubcategoryName, setNewSubcategoryName] = useState('');
    const [newSubcategoryDescription, setNewSubcategoryDescription] = useState('');
    const {createSubcategoryAction} = useModal();

    const submitHandler = () => {

    };

    return (
      <form className="category-edit" onSubmit={submitHandler}>
        <label>
          <div>
            <span>Subcategory name:</span>
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
            <span>Select category:</span>
          </div>
          <div>
           <select>
               <option value="One">One</option>
               <option value="Two">Two</option>
           </select>
          </div>
        </label>
        <label>
          <div>
            <span>Description:</span>
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
          <button className="modal-edit-chang-btn">Create</button>
          <button
            className="modal-edit-cancel-btn"
            onClick={() => createSubcategoryAction(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
}
