import { paths } from "config";
import { Hello, Login } from "./pages";

const routes = [
  {
    path: paths.login,
    element: () => <Login />,
  },
  {
    path: paths.hello,
    element: () => <Hello />,
  },
  {
    path: paths.goodbye,
    element: () => <div>Goodbye</div>,
  },
];

export default routes;
