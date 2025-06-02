import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const CaptainSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [captainData, setCaptainData] = useState({});
    

    const handleSubmit = (e) => {
        e.preventDefault();

        setCaptainData({
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
                color: vehicleColor
            }
        });

        // empty the fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setVehicleType("")
        setVehicleNumber("")
        setVehicleCapacity(null);
        setVehicleColor("")
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
                            // value={}
                            // setValue={}
                            name={"firstName"}
                            required
                            className={"mb-3 max-w-1/2"}
                        />

                        {/* last name */}
                        <Input
                            type={"text"}
                            placeholder={"Last Name"}
                            // value={password}
                            // setValue={setPassword}
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
                            // value={}
                            // setValue={}
                            name={"email"}
                            required
                            className={"mb-3"}
                        />
                        <Input
                            type={"password"}
                            placeholder={"Enter Password"}
                            // value={}
                            // setValue={}
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
                                id=""
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
                            // value={}
                            // setValue={}
                            name={"vehicleNumber"}
                            required
                            className={"mb-3"}
                        />

                        {/* vehicle capacity and color */}
                        <div className="flex gap-1">
                            <Input
                                type={"Number"}
                                placeholder={"Vehicle capacity"}
                                // value={}
                                // setValue={}
                                name={"vehicleCapacity"}
                                required
                                className={"mb-3 max-w-1/2"}
                            />
                            <Input
                                type={"text"}
                                placeholder={"Vehicle Color"}
                                // value={}
                                // setValue={}
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

            {/* <div className="mt-6">
                <Link
                    to={"/captain-signup"}
                    className="py-3 px-5 flex items-center justify-center bg-[#FA9934]  rounded-md w-full mt-12"
                >
                    Join as Captain
                </Link>
            </div> */}
        </div>
    );
};

export default CaptainSignup;
