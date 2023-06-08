import React from 'react';
import NavBar from './Nav/nav';
import UserHeader from './Header/userHeader';
import Footer from './Footer.js/footer';
import Forums from './Forum/Forum';
import Navuser from './Nav/navuser';


const User = () => {
  return (
    <>
    <UserHeader/>
    <div>
      <Navuser />
      
    </div>
    <Footer/>
    </>
  );
};

export default User;
