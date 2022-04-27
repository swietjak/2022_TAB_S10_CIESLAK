import { paths } from "config";
import Hello from "./pages/Hello";

const routes = [
  {
    path: paths.hello,
    element: () => <Hello />,
  },
];

export default routes;
