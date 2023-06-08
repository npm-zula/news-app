import React, { useState } from 'react';
import Dashboard from '../Dashboard/dashboard';
import Forums from '../Forum/Forum';
import MyForums from '../Forum/Myforums';

const Navuser = () => {
  const [activeMenu, setActiveMenu] = useState('Forums');
  const [myForums, setMyForums] = useState([]);
  const [allForums, setAllForums] = useState([]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleDeleteForum = (forumId) => {
    setAllForums((prevForums) => prevForums.filter((forum) => forum.id !== forumId));
    setMyForums((prevForums) => prevForums.filter((forum) => forum.id !== forumId));
  };

  const renderMenu = () => {
    if (activeMenu === 'Forums') {
      return <Forums allForums={allForums} onDeleteForum={handleDeleteForum} />;
    } else if (activeMenu === 'MyForums') {
      return <MyForums myForums={myForums} onDeleteForum={handleDeleteForum} />;
    }
  };

  return (
    <div className="side-menu">
      <div className="menu">
        <div
          className={`menu-item ${activeMenu === 'Forums' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Forums')}
        >
          All Forums
        </div>
        <div
          className={`menu-item ${activeMenu === 'MyForums' ? 'active' : ''}`}
          onClick={() => handleMenuClick('MyForums')}
        >
          My Forums
        </div>
      </div>
      <div className="content">{renderMenu()}</div>

      <style jsx>{`
        .side-menu {
          display: flex;
          background-color: #fff;
          color: #333;
          border: 2px solid black;
        }

        .menu {
          width: 200px;
          padding: 10px;
          
        }

        .menu-item {
          cursor: pointer;
          margin-bottom: 10px;
          padding: 5px;
          background-color: silver;
          border-radius: 10px;
          
        }

        .menu-item.active {
          font-weight: bold;
          
        }

        .content {
          flex-grow: 1;
          padding: 20px;
          background-color: #FFF;
          color: #333;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-weight: bold;
          
        }
      `}</style>
    </div>
  );
};

export default Navuser;
