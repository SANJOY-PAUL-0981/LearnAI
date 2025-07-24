import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";

export const Signup = ({ setAuthType }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex flex-col gap-10">
            <p className="font-bold font-poppins text-3xl text-center">
                Create an account
            </p>

            <div className="flex flex-col gap-5 w-[25vw]">
                <div className="flex flex-col">
                    <p>
                        Username
                    </p>
                    <input
                        type="text"
                        placeholder="jhondoe123"
                        className="p-2 border rounded-lg border-white/20" />
                </div>

                <div className="flex flex-col">
                    <p>
                        Email
                    </p>
                    <input
                        type="text"
                        placeholder="jhondoe@gmail.com"
                        className="p-2 border rounded-lg border-white/20" />
                </div>

                <div className="flex flex-col relative">
                    <p>Password</p>

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="p-2 border rounded-lg border-white/20 pr-10"
                    />

                    {/* Eye Icon inside input */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-white text-lg cursor-pointer"
                    >
                        {showPassword ? <LuEye /> : <LuEyeClosed />}
                    </button>
                </div>

                <button className="bg-white text-black font-semibold p-2 cursor-pointer rounded-lg">
                    Sign Up
                </button>

                <div className="text-sm flex gap-2 justify-center items-center">
                    <p className="text-white/50">Already have an account?</p>
                    <p className="text-white cursor-pointer font-medium hover:underline"
                        onClick={() => setAuthType("login")}>
                        Log in
                    </p>
                </div>
            </div>
        </div>
    )
}