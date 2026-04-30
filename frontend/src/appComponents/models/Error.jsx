import React from "react";
import { ServerCrash, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const Error = ({ message = "Something went wrong while fetching your data." }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 flex flex-col items-center gap-4 max-w-sm w-full text-center">
            
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
            <ServerCrash size={30} className="text-red-500" />
            </div>

            <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-gray-800">Oops! Something went wrong</h2>
            <p className="text-sm text-gray-400">{message}</p>
            </div>

            <button
            onClick={handleLogout}
            className="mt-2 flex items-center justify-center gap-2 w-full py-2.5
                bg-red-50 hover:bg-red-100 text-red-600 border border-red-200
                font-semibold text-sm rounded-xl transition"
            >
            <LogOut size={15} />
                Logout
            </button>

        </div>
        </div>
    );
};

export default Error;