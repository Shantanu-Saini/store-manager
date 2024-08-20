import { heroData } from "@/variables/pageData";
import Link from "next/link";

function Hero() {
    return (
        <div
            className="min-h-screen w-full bg-animated-gradient flex flex-col justify-center items-center"
        >
            <h1 className="text-4xl font-bold text-white mb-4">{heroData.main}</h1>
            <p className="text-white text-lg">{heroData.sub}</p>
            <Link href='/login'>
                <button className="mt-6 px-6 py-2 bg-white text-indigo-600 rounded-md shadow-lg hover:bg-gray-200 transition duration-300">
                    {heroData.btn}
                </button>
            </Link>
        </div>
    );
}

export default Hero;



// bg-[url('https://images.pexels.com/photos/2679323/pexels-photo-2679323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]