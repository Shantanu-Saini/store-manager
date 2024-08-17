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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow rounded-lg p-3 mb-6 text-center">
                {children}
            </div>
            <Link href='/dashboard' className="inline-flex items-center space-x-2 text-blue-500 hover:underline">
                <IoArrowBackSharp />
                <span>Go to Dashborad</span>
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
