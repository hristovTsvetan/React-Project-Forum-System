import './OnlineUsers.css';

import { useEffect, useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import OnlineUser from './OnlineUser';

export default function OnlineUsers() {
    const {documents} = useCollection('users');
    const [onlineUsers, setOnlineUsers] = useState(0);

    useEffect(() => {
        documents && setOnlineUsers(Object.values(documents).filter(u => u.online === true).length);
        
    }, [documents])


    return (
      <section className="online-users-wrapper">
        {documents && onlineUsers === 0 && (
          <p className="info-message">All users are offline.</p>
        )}
        <ul className="ul-online-users-wrapper">
          {documents &&
            documents
              .filter((u) => u.online === true)
              .map((user) => {
                return <OnlineUser key={user.id} user={user} />;
              })}
        </ul>
      </section>
    );
}
