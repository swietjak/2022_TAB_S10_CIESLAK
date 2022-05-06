import { Button } from "@mui/material";
import { paths } from "config";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Vehicles from "shared/services/Vehicles";
import { actions } from "../store";

type VehiclesListProps = {};

const vehicles = new Vehicles();

const VehiclesList = (props: VehiclesListProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getVehicles({}));
    console.log("XDDD");
  }, []); //eslint-disable-line

  return (
    <>
      <Button onClick={() => navigate(paths.vehiclesForm)}>New vehicle</Button>
      <Button onClick={() => dispatch(actions.getVehicles({ brand: "" }))}>
        New vehicle
      </Button>
    </>
  );
};

export default VehiclesList;
