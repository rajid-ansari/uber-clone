import React from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const UserSignup = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // empty the fields
  }

    return (
        <div className=" px-5 py-6 h-screen w-full flex flex-col justify-between">
            <h1 className="text-2xl font-semibold fixed">Uber</h1>

            <div className="form mt-18">
                <form onSubmit={handleSubmit}
                className="font-serif">
                    <h2 className="font-medium">What's you Name ?</h2>

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
                    <p>What's Your Email and Password ?</p>
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

                    <button className="w-full font-sans py-3 px-4 bg-black text-gray-100 mt-10 rounded-md">
                        SignUp
                    </button>
                </form>
                <p className="leading-none">
                    Already registered?{" "}
                    <Link
                        to={"/login"}
                        className="text-blue-500 underline mt-5 inline-block"
                    >
                        Login Account
                    </Link>{" "}
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

export default UserSignup;
