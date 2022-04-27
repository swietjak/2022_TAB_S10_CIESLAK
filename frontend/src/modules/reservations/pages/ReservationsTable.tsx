import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingStatus } from "shared/types";
import { ReservationsTableRow } from "../components";
import { actions, selectors } from "../store";

const ReservationsTable = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectors.getUserReservations);

  useEffect(() => {
    dispatch(actions.getUserReservations());
  }, [dispatch]);

  if (loading === LoadingStatus.Pending) return <div>XDDDD</div>;

  return (
    <Grid container>
      heheh
      {data &&
        data.map((reservation) => <ReservationsTableRow {...reservation} />)}
    </Grid>
  );
};

export default ReservationsTable;
