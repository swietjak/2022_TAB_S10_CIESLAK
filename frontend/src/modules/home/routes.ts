import { paths } from "config";
import { Loadable } from "shared/components";
import { ModuleRoute } from "shared/types";

const routes: ModuleRoute[] = [
  {
    path: paths.hello,
    element: Loadable({
      component: () => import("./pages/Hello"),
    }),
  },
];

export default routes;
