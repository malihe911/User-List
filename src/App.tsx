import { RouterProvider } from "react-router-dom"; // اضافه کردن RouterProvider
import router from "./router/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
