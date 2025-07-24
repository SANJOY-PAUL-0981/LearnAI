import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import axios from "axios"

export const Signup = ({ setAuthType }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handelSignup = async () => {
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username: username.trim(),
                email: email.trim(),
                password: password.trim()
            })

            const data = response.data;

            // If signup is successful
            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                setMessage("Signup successful!");
                alert("Signup done");
            } else {
                setError("Signup failed. Please try again.");
            }

            setError('')

        } catch (error) {
            setError(error.response?.data.error[0].message || "Something went wrong");
            setLoading(false)
        }
    }

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
                        name="username"
                        type="text"
                        placeholder="jhondoe123"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 border rounded-lg border-white/20" />
                </div>

                <div className="flex flex-col">
                    <p>
                        Email
                    </p>
                    <input
                        name="email"
                        type="text"
                        placeholder="jhondoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    onClick={handelSignup}
                    disabled={loading}
                    className="bg-white text-black font-semibold p-2 cursor-pointer rounded-lg">
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>

                <div className="text-sm flex gap-2 justify-center items-center">
                    <p className="text-white/50">Already have an account?</p>
                    <p className="text-white cursor-pointer font-medium hover:underline"
                        onClick={() => setAuthType("login")}>
                        Log in
                    </p>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
        </div>
    )
}