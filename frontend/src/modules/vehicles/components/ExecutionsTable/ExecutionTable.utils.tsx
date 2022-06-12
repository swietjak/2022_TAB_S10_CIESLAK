import { Done } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Column, ServiceExecution } from "shared/types";
import { actions } from "../../store";

const DATE_FORMAT = "dd/MM/yyyy";

export const useColumns = (): Column<ServiceExecution>[] => {
  const dispatch = useDispatch();

  return useMemo(
    () => [
      {
        label: "start date",
        renderData: (data: ServiceExecution) =>
          format(parseISO(data.startDate), DATE_FORMAT),
      },
      {
        label: "end date",
        renderData: (data: ServiceExecution) =>
          format(parseISO(data.endDate), DATE_FORMAT),
      },
      {
        label: "servicer name",
        renderData: (data: ServiceExecution) => data.externalServicerName,
      },
      {
        label: "service name",
        renderData: (data: ServiceExecution) => data.serviceName,
      },
      {
        label: "price",
        renderData: (data: ServiceExecution) => data.price.toString(),
      },
      {
        label: "actions",
        renderData: (data: ServiceExecution) =>
          data.isFinished ? (
            ""
          ) : (
            <IconButton
              onClick={() => dispatch(actions.finishServiceExecution(data.id))}
            >
              <Done />
            </IconButton>
          ),
      },
    ],
    [dispatch]
  );
};
