import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { actions, selectors } from "../store";
import { ServicerForm } from "../components";
import { LoadingStatus } from "shared/types";

const ServicerFormPage = () => {
  const { servicerId } = useParams();
  const { data, loading } = useSelector(selectors.getServicer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!servicerId) dispatch(actions.getServicer(parseInt(servicerId, 10)));
  }, [servicerId]); //eslint-disable-line

  if (loading === LoadingStatus.Pending) return <CircularProgress />;

  return <ServicerForm servicer={data} />;
};

export default ServicerFormPage;
