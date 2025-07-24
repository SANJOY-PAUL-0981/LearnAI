import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";
import {ClipLoader} from "react-spinners"

export const Login = ({ setAuthType }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState('')

    const handelLogin = async () => {
        setLoading(true);
        setError("");
        try {
            const isEmail = /^\S+@\S+\.\S+$/.test(identifier.trim());

            const payload = {
                password: password.trim(),
            };

            if (isEmail) {
                payload.email = identifier.trim();
            } else {
                payload.username = identifier.trim();
            }

            const response = await axios.post("http://localhost:3000/api/v1/user/login", payload);

            const data = response.data;

            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                setMessage("Login successful!");
                alert("Login done");
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (error) {
            setError(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col gap-10">
            <p className="font-bold font-poppins text-3xl text-center">
                Log in to your account
            </p>

            <div className="flex flex-col gap-5 w-[25vw]">
                <div className="flex flex-col">
                    <p>
                        Username or Email
                    </p>
                    <input
                        name="username or email"
                        type="text"
                        placeholder="Enter email or password"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="p-2 border rounded-lg border-white/20" />
                </div>

                <div className="flex flex-col relative">
                    <p>Password</p>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                <button
                    onClick={handelLogin}
                    disabled={loading}
                    className="bg-white text-black font-semibold p-2 cursor-pointer rounded-lg">
                    {loading ? <ClipLoader size={18} /> : "Log In"}
                </button>

                <div className="text-sm flex gap-2 justify-center items-center">
                    <p className="text-white/50">Don't have an account?</p>
                    <p className="text-white cursor-pointer font-medium hover:underline"
                        onClick={() => setAuthType("signup")}>
                        Sign Up
                    </p>
                </div>
            </div>
            {/*error*/}
            {error && <p className="text-red-500 border-red-500/25 border text-center p-3 rounded-lg text-sm bg-white/5 backdrop-blur-md shadow-md">⚠️   Error: {error}</p>}

            {/*success*/}
            {message && <p className="text-green-500 border-green-500/20 border text-center p-3 rounded-lg font-semibold  bg-white/5 backdrop-blur-md shadow-md">✨   {message}</p>}
        </div>
    )
}