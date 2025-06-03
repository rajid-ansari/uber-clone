import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem("token");
    
    useEffect(() => {
        if (!token) {
            localStorage.removeItem("user");
            navigate("/login");
        } else {

            axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                if(res.status === 200) {
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err.message);
                navigate("/login")
            })

        }
    }, [navigate]);

    if(isLoading) return <p>loading...</p>

    return <div>{children}</div>;
};

export default UserProtectedRoute;
