import { paths } from "config";
import { ExternalServicersTable, ServicerFormPage } from "./pages";
import { ServicerForm } from "./components";

const routes = [
  {
    path: paths.servicersTable,
    element: () => <ExternalServicersTable />,
  },
  {
    path: paths.servicersEdit,
    element: () => <ServicerFormPage />,
  },
  {
    path: paths.servicerForm,
    element: () => <ServicerForm />,
  },
];

export default routes;
