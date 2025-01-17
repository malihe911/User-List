import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Common/Layout/Layout";
import LandingPage from "../screens/Home";
import UserPage from "../screens/UserListPage";

const router = createBrowserRouter([
  {
    path: "/", // مسیر والد
    element: <Layout />, // لایه اصلی
    children: [
      {
        path: "/", // صفحه اصلی داشبورد
        element: <LandingPage />,
      },
      {
        path: "/user", // صفحه اصلی داشبورد
        element: <UserPage />,
      },
    ],
  },
]);

export default router;
