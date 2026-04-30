
import { Pen, Trash2 } from 'lucide-react';
import React from 'react'
import { useMemo } from 'react';
import {Link} from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../axiosGlobals/axiosGlobals';
import { toast } from 'react-hot-toast';
import UpdatedDialog from '@/components/myUI/UpdatedDialog';

const TaskCard = ({ task }) => {

    let taskStatus = useMemo(() => ({
        'PENDING': 'p-1 px-2 rounded-full text-sm font-semibold text-yellow-500 bg-yellow-100',
        'IN_PROGRESS': 'p-1 px-2 rounded-full text-sm font-semibold text-blue-500 bg-blue-100',
        'COMPLETED': 'p-1 px-2 rounded-full text-sm font-semibold text-green-500 bg-green-100',
    }),[])

    // console.log(task)

    const queryClient = useQueryClient();
    const {mutate: deleteTask,isPending} = useMutation({
        mutationKey: ['deleteTask'],
        mutationFn: async (id) => await client.delete(`/tasks/delete/${id}`),
        onSuccess: () => {
            toast.success("Task deleted successfully!");
            queryClient.invalidateQueries('tasks');
        },
        onError: (error) => {
            // console.error("Error deleting task:", error);
            toast.error("Failed to delete task. Please try again.");
        }
    })
    

    return (
        <div className="card flex items-center justify-between bg-white rounded-lg p-6">
            <div className="text">
                <h1 className='my-4 flex items-center gap-2 font-semibold text-lg'>{task.title} <span className={taskStatus[task.status]}>
                    {task.status.split('_').join(' ').toLowerCase()}
                    </span>
                </h1>
                <p className="description my-4 text-gray-500">
                    {task.description}
                </p>
            </div>
            <div className="actions flex items-center gap-4 justify-center">
                <Link to={`/add-task`} state={{ data:task,edit:true }}>
                    <Pen size={20} className='text-blue-500 cursor-pointer'/>
                </Link>

                <UpdatedDialog message={'Are you sure to Delete This Task'} loading={isPending}
                fun={() => deleteTask(task._id)}>
                    <Trash2 size={20} className='text-red-500 cursor-pointer'/>
                </UpdatedDialog>

            </div>
        </div>
    );
};

export default TaskCard