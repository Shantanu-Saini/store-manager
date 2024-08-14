import { heroData } from "@/variables/pageData"

function Hero() {
    return (
        <div 
        className="h-screen w-full bg-fixed flex flex-col justify-center items-center bg-slate-800" >
            <h1 className="text-4xl font-bold mb-4">{heroData.main}</h1>
            <p className="text-white">{heroData.sub}</p>
            <button>{heroData.btn}</button>
        </div>
    )
}

export default Hero


 // bg-[url('https://images.pexels.com/photos/2679323/pexels-photo-2679323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]