import { heroData } from "@/variables/pageData";
import Link from "next/link";

function Hero() {
    return (
        <section className="min-w-full min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-gray-100">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full shadow-lg hover:scale-105 transition-all duration-150">
                    <img
                        alt="Hero Image"
                        src="https://images.pexels.com/photos/2679323/pexels-photo-2679323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>

                <div className="lg:py-24 flex flex-col justify-center sm:items-start items-center">
                    <h2 className="text-3xl font-bold sm:text-4xl text-black mb-4">
                        {heroData.main}
                    </h2>
                    <p className="mt-4 text-black text-lg sm:text-start text-center">
                        {heroData.sub}
                    </p>
                    <Link href='/login' className="shadow-lg">
                        <p className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
                            {heroData.btn}
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
