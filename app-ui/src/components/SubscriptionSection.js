import React, { useState } from "react";

const SubscriptionSection = (props) => {
  const [subscription, setSubscription] = useState("");

  const handlesubApply = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/subscription/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: props.username,
            plan: subscription,
          }),
        }
      );
      if (response.ok) {
        console.log("subscription", subscription);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="items-center justify-center flex mt-16">
        <h1 className="font-black text-4xl">Apply for Subscription</h1>
      </div>
      <div>
        <div className="bg-white py-12 sm:py-12">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none items-center justify-center">
              <div className="-mt-2 p-2 lg:mt-0  lg:w-max lg:max-w-md lg:flex-shrink-0 ml-1">
                <div className="rounded-2xl bg-gray-50 py-10 max-w-xl  text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-12 max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">
                      Advanced
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        $34.
                        <span className="text-2xl font-bold">99</span>
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                        USD
                      </span>
                    </p>

                    <p className="mt-6 text-xs leading-5 text-gray-600">
                      No ADS. No Limits. <br />
                      Just the news you want. Even more features.
                    </p>
                  </div>
                </div>
              </div>
              <div className="-mt-2 p-2 lg:mt-0  lg:w-max lg:max-w-md lg:flex-shrink-0 ml-10">
                <div className="rounded-2xl bg-gray-50 py-10 max-w-xl  text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-12 max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">
                      Premium
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        $99.
                        <span className="text-2xl font-bold">99</span>
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                        USD
                      </span>
                    </p>

                    <p className="mt-6 text-xs leading-5 text-gray-600">
                      No ADS. No Limits. <br />
                      Just the news you want. Even more features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="items-center justify-center flex mt-16">
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-12">
                <h1 className="font-black text-4xl -ml-36 mt-10">
                  Choose a Subscription
                </h1>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <div className="mt-6 ">
                    <label className="inline-flex items-center text-lg mx-8">
                      <input
                        type="radio"
                        className="form-radio h-6 w-6 text-indigo-600"
                        name="subscriptionPlan"
                        value="basic"
                        disabled={true}
                      />
                      <span className="ml-3">Basic</span>
                    </label>
                    <label className="inline-flex items-center ml-6 text-lg mx-8">
                      <input
                        type="radio"
                        className="form-radio h-6 w-6 text-indigo-600"
                        name="subscriptionPlan"
                        value="advanced"
                        onChange={(e) => setSubscription(e.target.value)}
                      />
                      <span className="ml-3">Advanced</span>
                    </label>
                    <label className="inline-flex items-center ml-6 text-lg mx-8">
                      <input
                        type="radio"
                        className="form-radio h-6 w-6 text-indigo-600"
                        name="subscriptionPlan"
                        value="premium"
                        onChange={(e) => setSubscription(e.target.value)}
                      />
                      <span className="ml-3">Premium</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-center mb-12">
                  <button
                    type="submit"
                    class="bg-accent_primary hover:bg-accent_secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-12"
                    onClick={handlesubApply}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionSection;
