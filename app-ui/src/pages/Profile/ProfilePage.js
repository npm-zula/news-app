import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import ProfileSection from "../../components/ProfileSection";
import SubscriptionSection from "../../components/SubscriptionSection";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  //   const handleTabChange = () => {
  //     setActiveTab(activeTab === "profile" ? "subscription" : "profile");
  //   };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-profile-bg bg-repeat ">
      <Navbar />
      <div className=" bg-white min-h-screen mx-72">
        <Tabs id="custom-animation" value={activeTab} className="pt-10 pb-2">
          <TabsHeader className="border-b">
            <Tab
              onClick={() => handleTabChange("profile")}
              key="profile"
              value="profile"
              className={`text-2xl ${
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
                <SubscriptionSection />
              </h1>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
