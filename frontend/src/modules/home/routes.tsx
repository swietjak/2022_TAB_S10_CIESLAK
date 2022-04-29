import { paths } from "config";
import Hello from "./pages/Hello";

const routes = [
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
