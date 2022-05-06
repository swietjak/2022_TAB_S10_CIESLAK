import { Navigate, Route, Routes } from "react-router-dom";
import { helloRoutes } from "./home";
import { reservationsRoutes } from "./reservations";
import { vehiclesRoutes } from "./vehicles";

const routes = [...reservationsRoutes, ...helloRoutes, ...vehiclesRoutes];

const ModalRoutes = () => {
  return (
    <Routes>
      {routes.map((r, i) => (
        <Route key={`route-${i}`} path={r.path} element={<r.element />} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ModalRoutes;
