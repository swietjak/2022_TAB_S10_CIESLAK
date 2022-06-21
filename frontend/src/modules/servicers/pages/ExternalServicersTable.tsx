import { Edit } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { paths } from "config";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router";
import { CustomTable } from "shared/components";
import { Column, Servicer } from "shared/types";
import { actions, selectors } from "../store";

interface ExternalServicersTableProps {}

const ExternalServicersTable = (props: ExternalServicersTableProps) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectors.getServicers);
  const navigate = useNavigate();

  const columns: Column<Servicer>[] = useMemo(
    () => [
      {
        label: "name",
        renderData: (data: Servicer) => data.name,
      },
      {
        label: "services",
        renderData: (data: Servicer) =>
          data.servicesSummary.map((service) => service.name).join(", "),
      },
      {
        label: "actions",
        renderData: (data: Servicer) => (
          <IconButton>
            <Edit
              onClick={() => {
                console.log(
                  generatePath(paths.servicersEdit, {
                    servicerId: data.id.toString(),
                  })
                );
                navigate(
                  generatePath(paths.servicersEdit, {
                    servicerId: data.id.toString(),
                  }),
                  { replace: true }
                );
              }}
            />
          </IconButton>
        ),
      },
    ],
    [navigate]
  );

  useEffect(() => {
    dispatch(actions.getServicers());
  }, []); //eslint-disable-line

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container justifyContent="space-around">
        <Grid item xs={10}>
          <Typography variant="h6">External servicers list</Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={() => navigate(paths.servicerForm)}
            variant="contained"
          >
            New servicer
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <CustomTable columns={columns} loading={loading} data={data} />
      </Grid>
    </Grid>
  );
};

export default ExternalServicersTable;
