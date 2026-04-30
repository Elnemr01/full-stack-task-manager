import React from "react";
import client from "../axiosGlobals/axiosGlobals";
import { useQuery } from "@tanstack/react-query";
import Header from "../appComponents/header/Header";
import Empty from "../appComponents/models/Empty";
import Loading from "../appComponents/models/Loading";
import TaskCard from "../appComponents/taskCard/TaskCard";
import { useState } from "react";
import { useMemo } from "react";
import Error from "../appComponents/models/Error";
import { useAuth } from "@/contextAPI/UserProvider";

const Home = () => {
    const [status, setStatus] = useState("ALL");
    const {user}=useAuth();
    // console.log(user)

    let {
        data: allTasks,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tasks",status],
        queryFn: async () => await client.get(`/tasks?status=${status=== 'ALL' ? '' : status}`),
    });
    // console.log(allTasks?.data?.data.tasks)

    let filters=useMemo(()=> [
            {label: "All", value: "ALL"},
            {label: "Pending", value: "PENDING"},
            {label: "In Progress", value: "IN_PROGRESS"},
            {label: "Completed", value: "COMPLETED"},
        ],[])

    if (isLoading) {
        return <Loading/>;
    }

    if (isError) {
        return <Error/>;
    }

    return (
        <div className="bg-gray-100 min-h-screen pb-6">
        <Header />
        <div className="tasks-container max-w-6xl mx-auto px-4 sm:px-6 my-4">
            <h1 className="font-semibold text-xl text-center">What do you have Today ?</h1>
            <p className="text-center text-gray-500 text-sm mt-4">
                Stay organized and productive — manage your tasks, track their progress,
                and get things done.
            </p>
            <div className="filters flex items-center flex-wrap justify-center gap-4 my-4">
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => {
                            setStatus(filter.value);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            status === filter.value
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
            {allTasks?.data?.data?.tasks?.length > 0 ? (
            <div className="tasks grid gap-4 grid-cols-1 items-center max-w-6xl mx-auto px-4 sm:px-6 my-4">
                {
                    allTasks?.data?.data?.tasks?.map((task)=> <TaskCard key={task._id} task={task}/>)
                }
            </div>
            ) : (
            <Empty />
            )}
        </div>
        </div>
    );
};

export default Home;
