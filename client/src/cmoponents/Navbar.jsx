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
        <div className="flex flex-row justify-between items-center px-6 sm:px-20 lg:py-5 py-3 gap-4 sm:gap-0">
            <Link to="/">
                <div className="flex gap-2 items-center cursor-pointer">
                    <ShinyText text="LearnAI" disabled={false} speed={5} className='custom-class text-[28px] font-xanh font-semibold' />
                </div>
            </Link>

            <div className="flex lg:gap-5 gap-2 items-center">
                {token ? (
                    <StarBorder
                        onClick={handelLogOut}
                        as="button"
                        className="cursor-pointer bg-red-800/30 sm:inline-block"
                        color="red"
                        speed="5s"
                    >
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
