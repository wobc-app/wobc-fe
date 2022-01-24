import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBikes } from "../../Contexts/bikesContext";
import Stats from "./Bikes/Stats";

const Dashboard = () => {
  const navigate = useNavigate();
  const { getBikes, bikes } = useBikes();

  useEffect(() => {
    getBikes();
  }, []);

  return <div>{bikes.value && <Stats bikes={bikes.value} />}</div>;
};

export default Dashboard;
