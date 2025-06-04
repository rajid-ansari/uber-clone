import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                first: firstName,
                last: lastName,
            },
            email,
            password,
        };

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/user/register`,
            newUser,
            {withCredentials: true}
        );

        if (response.status === 201) {
            setUser(response.data.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.data));
            navigate("/user/dashboard");

            // empty the fields
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className=" px-5 py-6 h-screen w-full flex flex-col justify-between">
            <h1 className="text-2xl font-semibold fixed">Uber</h1>

            <div className="form mt-18">
                <form onSubmit={handleSubmit} className="font-serif">
                    <h2 className="font-medium">What's you Name ?</h2>

                    {/* fullname */}
                    <div className=" flex gap-1">
                        {/* first name */}
                        <Input
                            type={"text"}
                            placeholder={"First Name"}
                            value={firstName}
                            setValue={setFirstName}
                            name={"firstName"}
                            required
                            className={"mb-3 max-w-1/2"}
                        />

                        {/* last name */}
                        <Input
                            type={"text"}
                            placeholder={"Last Name"}
                            value={lastName}
                            setValue={setLastName}
                            name={"lastName"}
                            className={"mb-3 max-w-1/2"}
                        />
                    </div>

                    {/* email */}
                    <div>
                        <p>What's Your Email and Password ?</p>
                        <Input
                            type={"email"}
                            placeholder={"example@gmail.com"}
                            value={email}
                            setValue={setEmail}
                            name={"email"}
                            required
                            className={"mb-3"}
                        />
                        <Input
                            type={"password"}
                            placeholder={"Enter Password"}
                            value={password}
                            setValue={setPassword}
                            name={"password"}
                            required
                            className={"mb-3"}
                        />
                    </div>

                    <button className="w-full font-sans py-3 px-4 bg-black text-gray-100 mt-10 rounded-md">
                        SignUp
                    </button>
                </form>
                <p className="leading-none">
                    Already registered?{" "}
                    <Link
                        to={"/user/login"}
                        className="text-blue-500 underline mt-5 inline-block"
                    >
                        Login Account
                    </Link>{" "}
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
