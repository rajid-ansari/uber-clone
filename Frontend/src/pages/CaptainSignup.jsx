import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";
import { CaptainContext } from "../contexts/CaptainContext";

const CaptainSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");

    const navigate = useNavigate();

    const { setCaptain } = useContext(CaptainContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCaptain = {
            fullname: {
                first: firstName,
                last: lastName,
            },
            email,
            password,
            vehicle: {
                vehicleType,
                vehicleNumber,
                vehicleCapacity,
                color: vehicleColor,
            },
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captain/register`,
                newCaptain,
                { withCredentials: true }
            );

            if (response.status === 201) {
                setCaptain(response.data.data);

                localStorage.setItem("captain", JSON.stringify(response.data.data));
                localStorage.setItem("cptoken", response.data.token);

                navigate("/cpt-dashboard");
            }

            // empty the fields
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setVehicleType("");
            setVehicleNumber("");
            setVehicleCapacity("");
            setVehicleColor("");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className=" px-5 py-6 min-h-screen w-full flex flex-col justify-between">
            <h1 className="text-2xl font-semibold fixed leading-none">
                Uber <br />
                <span>→</span>
            </h1>

            <div className="form mt-18">
                <form onSubmit={handleSubmit} className="font-serif">
                    <h2 className="font-semibold">What's you Name ?</h2>

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
                        <p className="font-semibold">
                            What's Your Email and Password ?
                        </p>
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

                    {/* vehicle details */}
                    <p className="font-semibold">Your vehicle details ?</p>
                    <div className="text-black/80">
                        {/* vehicle type */}
                        <div className="flex gap-3">
                            <p className="">Choose Vehicle type -</p>
                            <select
                                name="vehicleType"
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                className="border-[1px] border-gray-300 w-1/3 rounded px-6"
                            >
                                <option value="Car">Car</option>
                                <option value="Bike">Bike</option>
                                <option value="Auto">Auto</option>
                            </select>
                        </div>

                        {/* vehicle number */}
                        <Input
                            type={"text"}
                            placeholder={"Enter Vehicle Number"}
                            value={vehicleNumber}
                            setValue={setVehicleNumber}
                            name={"vehicleNumber"}
                            required
                            className={"mb-3"}
                        />

                        {/* vehicle capacity and color */}
                        <div className="flex gap-1">
                            <Input
                                type={"number"}
                                placeholder={"Vehicle capacity"}
                                value={vehicleCapacity}
                                setValue={setVehicleCapacity}
                                name={"vehicleCapacity"}
                                required
                                className={"mb-3 max-w-1/2"}
                            />
                            <Input
                                type={"text"}
                                placeholder={"Vehicle Color"}
                                value={vehicleColor}
                                setValue={setVehicleColor}
                                name={"vehicleColor"}
                                required
                                className={"mb-3 max-w-1/2"}
                            />
                        </div>
                    </div>

                    <button className="w-full font-sans py-3 px-4 bg-black text-gray-100 mt-3 rounded-md">
                        join
                    </button>
                </form>
                <p className="leading-none">
                    Already registered captain?{" "}
                    <Link
                        to={"/captain-login"}
                        className="text-blue-500 underline mt-5 inline-block"
                    >
                        Login Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CaptainSignup;
