import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-screen w-full font-sans overflow-hidden">
            <div
				id="hero"
                className="h-3/4 w-full bg-[url('./assets/uber_home.png')] bg-center bg-cover"
            >
                {/* uber logo */}
				<h1 className="pl-4 pt-5 text-2xl font-semibold">Uber</h1>
			</div>
            <div className="h-1/4 w-full bg-white">
                <div className="py-7 ">
                    <h2 className="text-xl py-1 text-center">Continue with Uber travel.</h2>
                    <Link to={"/login"} className="flex lg:inline lg:px-5 items-center justify-between font-semibold py-3 leading-none pl-28 pr-3 mx-10 text-white bg-black rounded">
                        Continue
						<span className="font-bold text-xl leading-none">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
