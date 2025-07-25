import { LuBrain } from "react-icons/lu";
import ShinyText from "./ui/ShinyText";
import StarBorder from "./ui/StarBorder";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handelLogOut = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <div className="flex justify-between px-20 py-5">
            <Link to="/">
                <div className="flex gap-2 items-center cursor-pointer">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-600 p-1 rounded-lg">
                        <LuBrain className="size-7" />
                    </div>
                    <ShinyText text="LearnAI" disabled={false} speed={5} className='custom-class text-3xl font-xanh font-semibold' />
                </div>
            </Link>

            <div className="flex gap-5 items-center">
                {token ? (
                    <StarBorder
                        onClick={handelLogOut}
                        as="button"
                        className="custom-class cursor-pointer"
                        color="red"
                        speed="5s">
                        Log Out
                    </StarBorder>
                ) : (
                    <>
                        <Link to="/auth?type=signup">
                            <StarBorder
                                as="button"
                                className="custom-class cursor-pointer"
                                color="blue"
                                speed="5s">
                                SignUp
                            </StarBorder>
                        </Link>

                        <StarBorder
                            as="button"
                            className="custom-class cursor-pointer"
                            color="blue"
                            speed="5s"
                            onClick={() => navigate("/auth?type=login")}>
                            LogIn
                        </StarBorder>
                    </>
                )}
            </div>
        </div>
    );
};
