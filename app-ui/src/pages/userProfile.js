
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Add your token verification logic here
//     const token = getTokenFromCookie();
//     fetchUserProfile(token);
//   }, []);

//   const fetchUserProfile = async (token) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/user/profile", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const user = await response.json();
//         // Handle the user data
//         // console.log("User profile:", user.name);
//         setUser(user);
//       } else {
//         throw new Error("Failed to fetch user profile");
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   const getTokenFromCookie = () => {
//     const cookies = document.cookie.split(";");

//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();

//       if (cookie.startsWith("token=")) {
//         return cookie.substring("token=".length, cookie.length);
//       }
//     }

//     return null;
//   };



import { useState, useEffect } from 'react';

export const useUserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getTokenFromCookie();
    fetchUserProfile(token);
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith("token=")) {
        return cookie.substring("token=".length, cookie.length);
      }
    }
    
    return null;
  };

  return { user, fetchUserProfile, getTokenFromCookie};
};
