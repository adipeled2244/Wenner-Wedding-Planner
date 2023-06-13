import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import GuestsPage from "./Pages/GuestsPage";
import TablesPage from "./Pages/TablesPage";
import { loader as getUserLoader } from "./Pages/RootLayout";
import UserProvider from "./Store/userProvider";
import {SignUpForm} from "./Components/SignUpForm/SignUpForm"
import {LoginForm} from "./Components/LoginForm/LoginForm"
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: getUserLoader,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/guests", element: <GuestsPage /> },
      { path: "/tables", element: <TablesPage /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/login", element: <LoginForm /> },

    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
