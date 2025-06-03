import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainContext } from "../contexts/CaptainContext";
import axios from "axios";

const CaptainProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { setCaptain } = useContext(CaptainContext);

    const cptoken = localStorage.getItem("cptoken");
    useEffect(() => {
        if (!cptoken) {
            navigate("/captain-login");
            localStorage.removeItem("captain");
        } else {
            axios
                .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
                    headers: {
                        Authorization: `Bearer ${cptoken}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                    navigate("/captain-login");
                });
        }
    }, [navigate]);

    if (isLoading) return <p>loading...</p>;

    return <div>{children}</div>;
};

export default CaptainProtectedRoute;
