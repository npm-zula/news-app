import React, { useState } from 'react';
// import ArticlePost from '../AllArticles/Allarticles';
// import ViewArticle from '../myArticle/myArticle';
// import Profile from '../Profile/profile';
import Dashboard from '../Dashboard/dashboard';
import Forums from '../Forum/Forum';
import UserManagement from '../Usermanagement/usermanagement'

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState('articlePost');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const renderMenu = () => {
    if (activeMenu === 'Dashboard') {
      return <Dashboard />;
    } else if (activeMenu === 'Forums') {
     return <Forums />;
   }
    else if (activeMenu === 'UserManagement') {
      return <UserManagement />;
    }

    
  };

  return (
    <div className="side-menu">
      <div className="menu">
      <div
          className={`menu-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Dashboard')}
        >
         Analytics Dashboard
        </div>
        <div
          className={`menu-item ${activeMenu === 'UserManagement' ? 'active' : ''}`}
          onClick={() => handleMenuClick('UserManagement')}
        >
         User Management
        </div>
        {/* <div
          className={`menu-item ${activeMenu === 'Forums' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Forums')}
        >
         Forums
        </div> */}
        {/* <div
          className={`menu-item ${activeMenu === 'articlePost' ? 'active' : ''}`}
          onClick={() => handleMenuClick('articlePost')}
        >
          All Articles
        </div>
        <div
          className={`menu-item ${activeMenu === 'articles' ? 'active' : ''}`}
          onClick={() => handleMenuClick('articles')}
        >
         My Articles
        </div>
        <div
          className={`menu-item ${activeMenu === 'Profile' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Profile')}
        >
         Profile
        </div> */}

        
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

export default Navbar;
