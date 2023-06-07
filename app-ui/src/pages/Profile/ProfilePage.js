import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import ProfileSection from "../../components/ProfileSection";
import SubscriptionSection from "../../components/SubscriptionSection";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Add your token verification logic here
    const token = getTokenFromCookie();
    if (!verifyToken(token)) {
      // If the token is not verified, redirect to the login page
      navigate("/login");
    }

    fetchUserProfile(token);
  }, [username, navigate]);

  const verifyToken = (token) => {
    if (token) {
      return true;
    } else {
      return false;
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
        setUsername(user.username);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="bg-profile-bg bg-repeat ">
      <Navbar />
      <div className=" bg-white min-h-screen mx-72">
        <Tabs id="custom-animation" value={activeTab} className="pt-10 pb-2">
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-slate-700 shadow-none rounded-none",
            }}
          >
            <Tab
              onClick={() => handleTabChange("profile")}
              key="profile"
              value="profile"
              className={`text-2xl z-10 ${
                activeTab === "profile" ? "font-black" : ""
              }`}
            >
              Edit Profile
            </Tab>
            <Tab
              onClick={() => handleTabChange("subscription")}
              key="subscription"
              value="subscription"
              className={`text-2xl ${
                activeTab === "subscription" ? "font-black" : ""
              }`}
            >
              Subscription
            </Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            <TabPanel key="profile" value="profile">
              <h1>
                <ProfileSection />
              </h1>
            </TabPanel>
            <TabPanel key="subscription" value="subscription">
              <h1>
                <SubscriptionSection username={username} />
              </h1>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
