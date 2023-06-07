import React from "react";
import picture from "../imgs/profile.png";

const ProfileCard = (props) => {
  // const [name, setName] = useState("Erling Aashir");

  // useEffect(() => {
  //   setName(props.name);
  // }, [name]);

  return (
    <div>
      <div class="max-w-sm mx-auto bg-white rounded-lg overflow-hidden">
        <div class="border-b px-4 pb-6">
          <div class="text-center my-4">
            <img
              class="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
              src={picture}
              alt=""
            />
            <div class="py-2">
              <h3 class="font-bold text-2xl mb-1">{props.name}</h3>
              <div class="inline-flex text-gray-700 items-center">
                <svg
                  class="h-5 w-5 text-gray-400 mr-1"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    class=""
                    d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                  />
                </svg>
                Islamabad, ICT
              </div>
            </div>
          </div>
          <div class="flex gap-2 px-2">
            <button class="flex-1 rounded-full bg-accent_primary text-white antialiased font-bold hover:bg-accent_secondary px-4 py-2">
              <a href="/profile">Profile</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
