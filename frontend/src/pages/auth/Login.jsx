    import { useFormik } from "formik";
    import * as Yup from "yup";
    import { useMutation } from "@tanstack/react-query";
    import toast from "react-hot-toast";
    import { Link, useNavigate } from "react-router-dom";
    import client from "../../axiosGlobals/axiosGlobals";
    import { useAuth } from "../../contextAPI/UserProvider";
    import { Zap, Loader2 } from "lucide-react";

    const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
    });

    const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const { mutate: login, isPending: loginPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data) => await client.post("/users/login", { password: data.password, email: data.email }),
        onSuccess: (data) => {
        toast.success("Login successful");
        navigate("/");
        localStorage.setItem("userToken", data.data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.data.user));
        setUser(data.data.data.user);
        },
        onError: (error) => {
            // console.log(error)
            toast.error("Login failed");
        },
    });

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        enableReinitialize: true,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log('first')
        login({ password: values.password, email: values.email });
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm">

            {/* Logo */}
            <div className="flex justify-center mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
            </div>
            </div>

            {/* Header */}
            <h2 className="text-xl font-semibold text-center text-gray-900 mb-1">Welcome back</h2>
            <p className="text-sm text-center text-gray-500 mb-7">Sign in to continue to your account</p>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

                {/* Email */}
                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Email address</label>
                <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className={`w-full h-10 px-3 text-sm rounded-lg border bg-gray-50 text-gray-900 outline-none transition
                    focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    ${formik.touched.email && formik.errors.email
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-gray-200"
                    }`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                )}
                </div>

                {/* Password */}
                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className={`w-full h-10 px-3 text-sm rounded-lg border bg-gray-50 text-gray-900 outline-none transition
                    focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    ${formik.touched.password && formik.errors.password
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-gray-200"
                    }`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                )}
                </div>

                {/* Submit */}
                <button
                type="submit"
                disabled={loginPending}
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-medium rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                {loginPending ? (
                    <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Please wait...
                    </span>
                ) : (
                    "Sign in"
                )}
                </button>

            </form>
            </div>

            {/* Register link */}
            <p className="text-center mt-5 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">Register</Link>
            </p>

        </div>
        </div>
    );
    };

    export default Login;