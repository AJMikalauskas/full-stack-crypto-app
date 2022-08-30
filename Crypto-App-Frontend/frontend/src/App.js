import React, { Suspense } from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";
//import Layout from "./components/Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
// Not necessary to lazy load requireAuth for login routes and persistent login --> Wrap PersistLogin around the RequireAuth routes
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import "./App.css";

// Lazy load the pages
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const LoggedOutHomePage = React.lazy(() => import("./pages/LoggedOutHomePage"));
const LoggedInHomeAppBarPage = React.lazy(() =>
  import("./pages/LoggedInHomeAppBarPage")
);
const LoggedInHomePage = React.lazy(() => import("./pages/LoggedInHomePage"));
const SpecificCryptoPage = React.lazy(() =>
  import("./pages/SpecificCryptoPage")
);
const TestColumnsPage = React.lazy(() => import("./pages/TestColumnsPage"));
const Missing404Page = React.lazy(() => import("./pages/MissingPage.js"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
      {/* No Real reason to use outlet tags as they really would only help with global styles on each page, No 
        common UI beside maybe a navbar for loggedin pages? */}
      <Routes>
        {/* Login/SignUp Page */}
        <Route path="signUp" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />

        {/* This redirects to loggedout home page if any route that is given is not part of Routes ->
            Will Probably use ternary operator of (?:)  based on if used is logged in or out leading to loggedInHomePage or loggedOutHomePage*/}
        <Route path="/" element={<Navigate replace to="loggedOutHome" />} />
        {/* When not logged in home page, once logged in, redirect to logged in home page below */}
        <Route path="loggedOutHome" element={<LoggedOutHomePage />} />
        <Route path="Crypto" element={<p>Test Crypto Click</p>} />

{/* Persistent Login goes over the requiredAuth, similar in the fact it's used only for logged in routes -->
  Now, need logout feature, or else a user will stay logged in until resfreshToken expires */}
        <Route element={<PersistLogin/>}>
      {/* The RequireAuth component puts the authentication needed for logged in or not logged in user.
      Use email instead of user as thats what we send in when we login.*/}
        <Route element={<RequireAuth/>} >
          {/* Routes of actually being logged in -> protect these below routes */}
          <Route path="loggedInHome" element={<LoggedInHomePage />}>
            {/* Specific Crypto Page, Not Overview/Home Page */}
            <Route path="portfolio" element={<LoggedInHomePage />} />
            <Route path=":coinName" element={<SpecificCryptoPage />} />
            {/* <Route path="test" element={<TestColumnsPage/>}/> */}
          </Route>
        </Route>
        </Route>
        <Route path="*" element={<Missing404Page />} />
        {/* Got to essentially a 404 page if route not matching any of above routes*/}

        {/* Such example below would be for what I did with app bar, going to test out anyway
          The nav bar could be at the top , one nested route could be the home page, non dynamic URL
          The other nested route could be dynamic crypto and it would jsut replace the middle content.
          Testing Nested Routes with combined JSX - Success, need to use outlet keywrod in order for the parent
          route to show the child routes JSX
              <Routes>
      <Route path="loggedInAppBar" element={<LoggedInAppBar />}>, use redirect to the below home page route if appbar just searched up
        <Route path="loggedInHomePage" element={<LoggedInHomePage />} />
        <Route path="crypto/:cryptoName" element={<SpecificCryptoPage />} />
      </Route>
    </Routes>
        */}
      </Routes>
    </Suspense>
  );
}

export default App;
