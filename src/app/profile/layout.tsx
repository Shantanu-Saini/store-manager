import { ReactNode } from "react";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";

export default function ProfileLayout({
    children,
    user,
    history,
    insights,
}: {
    children: ReactNode;
    user: ReactNode;
    insights: ReactNode;
    history: ReactNode;
}) {
    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div>
                {children}
            </div>
            <Link href='/dashboard' className="inline-flex items-center space-x-2 text-gray-500 mb-2">
                <IoArrowBackSharp />
                <span className="hover:ml-2 transition-all duration-300">Go to Dashborad</span>
            </Link>
            <div className="w-full space-y-6">
                {/* User and Insights sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        {user}
                    </div>
                    <div>
                        {insights}
                    </div>
                </div>
                {/* History section */}
                <div>
                    {history}
                </div>
            </div>
        </div>
    );
}
