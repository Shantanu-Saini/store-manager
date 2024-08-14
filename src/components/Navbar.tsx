import Link from "next/link"

function Navbar() {
    return (
        <div className="flex items-center justify-between px-6 py-2 top-0 left-0 z-50 sticky w-full">
            <div className="flex flex-col">
                <h1 className="text-2xl">Store</h1>
                <span className="text-lg">Manager</span>
            </div>
            <div className="flex items-center justify-between space-x-3">
                <button>Theme</button>
                <Link href='/login'><button>Login/Signup</button></Link>
            </div>
        </div>
    )
}

export default Navbar