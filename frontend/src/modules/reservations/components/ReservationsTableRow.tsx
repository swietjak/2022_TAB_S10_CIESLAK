import { Button, Grid } from "@mui/material";
import { paths } from "config";
import { useCallback } from "react";
import { useMemo } from "react";
import { generatePath, useNavigate } from "react-router-dom";

interface ReservationsTableRowProps {
  reservationId: number;
  carName: string;
  description?: string;
}

const ReservationsTableRow = ({
  reservationId,
  carName,
  description = "-",
}: ReservationsTableRowProps) => {
  const redirectPath = useMemo(
    () =>
      generatePath(paths.reservationSummary, {
        reservationId: reservationId.toString(),
        myNumber: (2137).toString(),
      }),
    [reservationId]
  );
  const navigate = useNavigate();
  const handleButtonClick = useCallback(
    () => navigate(redirectPath),
    [navigate, redirectPath]
  );

  return (
    <Grid item container>
      <Grid item xs={3}>
        {carName}
      </Grid>
      <Grid item xs={4}>
        {description}
      </Grid>
      <Grid item xs={5}>
        <Button onClick={handleButtonClick}>Go to reservation!</Button>
      </Grid>
    </Grid>
  );
};

export default ReservationsTableRow;
