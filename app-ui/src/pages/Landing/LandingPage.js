import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-bg h-screen">
      <header className="absolute inset-x-0 top-0 z-50 ">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1 text-2xl font-bold">
            <h3>Lahore-Link</h3>
          </div>

          <div className="flex gap-x-12"></div>
          <div className="md:flex flex-1 justify-end">
            <a
              href="/login"
              className="text-xl font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <div class="relative isolate px-6 pt-14 lg:px-8">
        <div
          class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-bg to-accent_primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your trust is our priority
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              The most authentic and reliable news network in Pakistan. We are a
              team of professional journalists who are dedicated to bring you
              the latest news from all over the country. We are committed to
              provide you with the most accurate and unbiased news.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/login"
                class="rounded-md px-6 bg-accent_primary py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent_secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent_secondary"
              >
                Login
              </a>
              <a
                href="/register"
                class="text-sm font-semibold leading-6 text-gray-900"
              >
                Sign Up{" "}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
