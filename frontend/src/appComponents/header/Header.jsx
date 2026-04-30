import React from "react";
import { LogOut, ClipboardList } from "lucide-react";
import { useAuth } from "../../contextAPI/UserProvider";
import AddBtn from "../addBtn/AddBtn";
import UpdatedDialog from "@/components/myUI/UpdatedDialog";

const Header = () => {
    const { user } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            {/* Logo + title */}
            <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
                <ClipboardList size={18} className="text-white" />
            </div>
            <div>
                <h1 className="font-bold text-gray-900 text-base leading-none">
                Task Manager
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">
                Welcome,{" "}
                <span className="text-indigo-500 font-semibold">
                    {user?.firstName || "Guest"}
                </span>
                </p>
            </div>
            </div>

            {/* Logout */}
            <div className="btns flex items-center gap-2">
                <UpdatedDialog message={'Are you sure to logout'} fun={handleLogout}>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-xl
                                bg-red-50 text-red-600 border border-red-200
                                hover:bg-red-100 hover:border-red-300
                                font-semibold text-sm transition-colors duration-150"
                        >
                        <LogOut size={15} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </UpdatedDialog>
                <AddBtn/>
            </div>
        </div>
        </header>
    );
};

export default Header;
