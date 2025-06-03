import React, { useContext } from "react";
import { CaptainContext } from "../contexts/CaptainContext";

const CptDashboard = () => {
    const { captain } = useContext(CaptainContext);


    return <div>{captain.fullname.first}</div>;
};

export default CptDashboard;
