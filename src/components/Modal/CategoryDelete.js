import { useModal } from "../../hooks/useModal"

export default function CategoryDelete() {
    const {
        deleteCategoryAction,
        deleteSubCategoryAction,
        deleteCategory,
    } = useModal();

    return (
        <>
            <p>
                Are you sure that you want to delete {deleteCategory ? 'category' : 'subcategory'}?
            </p>
            <div className="modal-buttons-delete">
                <button className="delete-agree-btn">Yes</button>
                <button className="delete-disagree-btn" onClick={() => {
                    deleteCategoryAction(false);
                    deleteSubCategoryAction(false);
                }}>No</button>
            </div>
        </>
    )
}
