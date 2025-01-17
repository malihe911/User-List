import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Common/Layout/Layout";
import LandingPage from "../screens/Home";
import UserPage from "../screens/UserListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
    ],
  },
]);

export default router;
