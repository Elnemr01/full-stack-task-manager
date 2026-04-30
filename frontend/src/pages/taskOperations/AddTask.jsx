import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClipboardList, ChevronLeft, CheckCircle2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contextAPI/UserProvider";
import { useMutation } from "@tanstack/react-query";
import client from "../../axiosGlobals/axiosGlobals";
import { toast } from "react-hot-toast";
import { useMemo } from "react";

/* ─── Yup Schema ─── */
const taskValidationSchema = Yup.object({
    title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be at most 100 characters"),

    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be at most 500 characters"),

    status: Yup.string()
        .required("Status is required")
        .oneOf(["PENDING", "IN_PROGRESS", "COMPLETED"], "Invalid status"),
    });

    /* ─── Status options ─── */
    const STATUS_OPTIONS = [
    {
        value: "PENDING",
        label: "Pending",
        color: "border-amber-400 bg-amber-50 text-amber-700",
        active: "ring-2 ring-amber-400 border-amber-400 bg-amber-50",
        dot: "bg-amber-400",
    },
    {
        value: "IN_PROGRESS",
        label: "In Progress",
        color: "border-blue-400 bg-blue-50 text-blue-700",
        active: "ring-2 ring-blue-400 border-blue-400 bg-blue-50",
        dot: "bg-blue-500",
    },
    {
        value: "COMPLETED",
        label: "Completed",
        color: "border-emerald-400 bg-emerald-50 text-emerald-700",
        active: "ring-2 ring-emerald-400 border-emerald-400 bg-emerald-50",
        dot: "bg-emerald-500",
    },
    ];

    /* ─── AddTask Page ─── */
    const AddTask = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("all");
    const location=useLocation();

    const edit=location.state?.edit || false;
    const data=location.state?.data || null;

    let {mutate: addNewTask,isPending: addPending} = useMutation({
        mutationKey: ['addTask'],
        mutationFn: async (taskData) => await client.post('/tasks/create', taskData),
        onSuccess: () => {
            toast.success("Task added successfully!");
            formik.resetForm();
            navigate("/")
        },
        onError: (error) => {
            // console.error("Error adding task:", error);
            toast.error("Failed to add task. Please try again.");
        }
    })

    let {mutate: editTask,isPending: editPending} = useMutation({
        mutationKey: ['editTask'],
        mutationFn: async (taskData) => await client.put(`/tasks/update/${data._id}`, taskData),
        onSuccess: () => {
            toast.success("Task updated successfully!");
            formik.resetForm();
            navigate("/")
        },
        onError: (error) => {
            // console.error("Error adding task:", error);
            toast.error("Failed to update task. Please try again.");
        }
    })

    const formik = useFormik({
        initialValues: edit ? {
        title: data.title || "",
        description: data.description || "",
        status: data.status || "PENDING",
        } : {
        title: "",
        description: "",
        status: "PENDING",
        },
        validationSchema: taskValidationSchema,
        onSubmit: (values) => {
            console.log("Form values:", values);
            if(edit) {
                editTask(values);
            }
            else {
                addNewTask(values)
            }
        },
    });


    const getFieldClass = (field) => {
        const base =
        "w-full rounded-xl border px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2";
        if (formik.touched[field] && formik.errors[field]) {
        return `${base} border-red-300 focus:ring-red-300 text-red-700 placeholder-red-300`;
        }
        if (formik.touched[field] && !formik.errors[field]) {
        return `${base} border-emerald-300 focus:ring-emerald-300 text-gray-800`;
        }
        return `${base} border-gray-300 focus:ring-indigo-300 text-gray-800`;
    };

    return (
        <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
            <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
            >
                <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
                <ClipboardList size={16} className="text-white" />
                </div>
                <h1 className="font-bold text-gray-900 text-base">
                    {edit ? "Edit Task" : "Add New Task"}
                </h1>
            </div>
            </div>
        </header>

        {/* Form */}
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
            <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 flex flex-col gap-6"
            >
            {/* Title */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                Title <span className="text-red-400">*</span>
                </label>
                <input
                type="text"
                name="title"
                placeholder="Enter task title..."
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getFieldClass("title")}
                />
                {formik.touched.title && formik.errors.title && (
                <p className="text-xs text-red-500 mt-0.5">{formik.errors.title}</p>
                )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                Description <span className="text-red-400">*</span>
                </label>
                <textarea
                name="description"
                placeholder="Describe the task in detail..."
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${getFieldClass("description")} resize-none`}
                />
                <div className="flex items-center justify-between">
                {formik.touched.description && formik.errors.description ? (
                    <p className="text-xs text-red-500">{formik.errors.description}</p>
                ) : (
                    <span />
                )}
                <span className="text-xs text-gray-400 ml-auto">
                    {formik.values.description.length}/500
                </span>
                </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                Status <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                {STATUS_OPTIONS.map((opt) => {
                    const isActive = formik.values.status === opt.value;
                    return (
                    <button
                        type="button"
                        key={opt.value}
                        onClick={() => formik.setFieldValue("status", opt.value)}
                        className={`
                        flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-semibold
                        transition-all duration-150
                        ${isActive ? opt.active : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"}
                        `}
                    >
                        <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
                        <span className="truncate">{opt.label}</span>
                    </button>
                    );
                })}
                </div>
                {formik.touched.status && formik.errors.status && (
                <p className="text-xs text-red-500">{formik.errors.status}</p>
                )}
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
                <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm
                    font-semibold text-gray-600 hover:bg-gray-50 transition"
                >
                Cancel
                </button>
                <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm
                    font-semibold hover:bg-indigo-700 transition shadow-sm
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {
                    edit ? (editPending ? "Updating..." : "Update Task") : (addPending ? "Adding..." : "Add Task")
                }
                </button>
            </div>
            </form>
        </main>
        </div>
    );
};

export default AddTask;