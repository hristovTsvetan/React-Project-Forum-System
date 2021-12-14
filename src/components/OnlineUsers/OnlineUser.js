import './OnlineUser.css';

export default function OnlineUser({user}) {
    return (
      <li>
        <span className="dot"></span>
        {user.displayName}
      </li>
    );
}
