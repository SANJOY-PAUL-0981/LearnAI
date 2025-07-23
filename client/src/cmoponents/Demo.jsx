export const Demo = () => {
    return (
        <div className="flex justify-center p-10">
            <div className="relative w-auto h-[85vh]">

                <div className="absolute -top-4 -right-4 z-10">
                    <p className="bg-green-400 px-4 py-1 font-poppins text-center font-semibold text-sm rounded-full">
                        Live Demo
                    </p>
                </div>

                <video
                    className="h-full rounded-2xl shadow-[0_0_60px_rgba(192,192,192,0.6)]"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="./demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}
