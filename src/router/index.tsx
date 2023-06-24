import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthRoute from "../components/AuthRoute";
import PrivateRoute from "../components/PrivateRoute";
import AuthBaseLayout from "../layouts/AuthBaseLayout";
import BaseLayout from "../layouts/BaseLayout";
import SettingsBaseLayout from "../layouts/SettingsBaseLayout";
import AuthenticationSettingsPage from "../pages/authentication-settings";
import ConfirmPage from "../pages/confirm";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import TwoFactorSetupPage from "../pages/two-factor-setup";

const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <BaseLayout />,
            children: [
              {
                path: "/",
                element: <HomePage />,
              },
              {
                path: "settings",
                children: [
                  {
                    path: "",
                    element: <SettingsBaseLayout />,
                    children: [
                      {
                        path: "authentication",
                        element: <AuthenticationSettingsPage />,
                      },
                    ],
                  },
                  {
                    path: "two-factor/setup",
                    element: <TwoFactorSetupPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        element: <AuthRoute />,
        children: [
          {
            path: "auth",
            element: <AuthBaseLayout />,
            children: [
              {
                path: "login",
                element: <LoginPage />,
              },
              {
                path: "register",
                element: <RegisterPage />,
              },
              {
                path: "confirm",
                element: <ConfirmPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router };
