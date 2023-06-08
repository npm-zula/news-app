import React, { useState } from 'react';
import ArticlePost from '../AllArticles/Allarticles';
import ViewArticle from '../myArticle/myArticle';
import Profile from '../Profile/profile';
import Dashboard from '../Dashboard/dashboard';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState('Analytics');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const renderMenu = () => {
    if (activeMenu === 'articlePost') {
      return <ArticlePost />;
    } else if (activeMenu === 'articles') {
      return <ViewArticle />;
    }
      else if (activeMenu === 'Profile') {
        return <Profile />;
    }

    else if (activeMenu === 'Analytics') {
        return <Dashboard />;
    }
  };

  return (
    <div className="side-menu">
      <div className="menu">
      <div
          className={`menu-item ${activeMenu === 'Analytics' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Analytics')}
        >
         Analytics
        </div>
        <div
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
        </div>

        
      </div>
      <div className="content">{renderMenu()}</div>

      <style jsx>{`
        .side-menu {
            display: flex;
            background-color: #333;
            color: #fff;
          }
          
          .menu {
            width: 200px;
            padding: 10px;
          }
          
          .menu-item {
            cursor: pointer;
            margin-bottom: 10px;
            padding: 5px;
          }
          
          .menu-item.active {
            font-weight: bold;
          }
          
          .content {
            flex-grow: 1;
            padding: 20px;
            background-color: #f8f8f8;
            color: #333;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
      `}</style>
    </div>
  );
};

export default Navbar;
