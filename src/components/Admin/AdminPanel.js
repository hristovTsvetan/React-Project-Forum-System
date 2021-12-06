import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

import './AdminPanel.css';

export default function AdminPanel() {
  const {createCategoryAction, createSubcategoryAction} = useModal();

  return (
    <section className="admin-header">
      <span className="admin-header-title">Admin Panel</span>
      <ul>
        <li>
          <Link to="/" onClick={() => createCategoryAction(true)}>Create caregory</Link>
        </li>
        <li>
          <Link to="/" onClick={() => createSubcategoryAction(true)}>Create subcaregory</Link>
        </li>
        <li>
          <Link to="/users">Administrate users</Link>
        </li>
      </ul>
    </section>
  );
}
