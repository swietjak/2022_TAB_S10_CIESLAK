import { paths } from "config";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useUserData } from "shared/hooks";
import { helloRoutes } from "./home";
import { reservationsRoutes } from "./reservations";
import { vehiclesRoutes } from "./vehicles";

const routes = [...reservationsRoutes, ...helloRoutes, ...vehiclesRoutes];

const ModalRoutes = () => {
  const { initialPath, userId } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("chuj");
    if (!userId) navigate(paths.login);
  }, [userId]); //eslint-disable-line

  return (
    <Routes>
      {routes.map((r, i) => (
        <Route key={`route-${i}`} path={r.path} element={<r.element />} />
      ))}
      <Route path="*" element={<Navigate to={initialPath} />} />
    </Routes>
  );
};

export default ModalRoutes;
