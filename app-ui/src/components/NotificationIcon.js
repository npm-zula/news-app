import { useEffect, useState } from "react";
import React from "react";
import { FiBell } from "react-icons/fi";

const NotificationIcon = () => {
  const [Notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = getTokenFromCookie();
    fetchUserProfile(token);
  }, []);

  useEffect(() => {
    if (user) {
      fetchNotification();
    }
  });

  const fetchNotification = async () => {
    try {
      const id = user._id; // Replace with the actual recipient ID
      const response = await fetch(
        `http://localhost:5000/api/notification/notification/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        throw new Error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

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
        // Handle the user data
        // console.log("hi User profile:", user.username);
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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button
        className="flex items-center h-10 font-bold transition-colors duration-150 text-accent_primary rounded-lg focus:shadow-outline"
        onClick={openModal}
      >
        <span className="mr-2">
          <FiBell className="h-7 w-7 text-gray-600" />
        </span>
        {Notifications.length > 0 && (
          <span className="inline-flex -ml-3 -mt-2 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {Notifications.length}
          </span>
        )}
      </button>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={closeModal}
            ></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-gray-100 px-4 py-3 border-b">
                <h2 className="text-lg font-semibold">
                  My Notifications ({Notifications.length})
                </h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {Notifications.map((notification) => (
                    <li key={notification._id} className="border-b py-2">
                      <h3 className=" font-black text-xl">
                        {notification.title}!
                      </h3>
                      <p className="text-gray-600 ">{notification.message}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 px-4 py-3 border-t flex justify-end">
                <button className="text-sm text-gray-500" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
