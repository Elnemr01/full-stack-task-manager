    import { useFormik } from "formik";
    import * as Yup from "yup";
    import { useMutation } from "@tanstack/react-query";
    import toast from "react-hot-toast";
    import { useNavigate, Link } from "react-router-dom";
    import client from "../../axiosGlobals/axiosGlobals";
    import { useAuth } from "../../contextAPI/UserProvider";
    import { Zap, Loader2, AlertCircle, User } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

    const registerSchema = Yup.object({
    firstName: Yup.string().min(3, "First name must be at least 3 characters").required("First name is required"),
    lastName: Yup.string().min(3, "Last name must be at least 3 characters").required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
        .required("Password is required"),
    birthDate: Yup.date().typeError("Please enter a valid date").required("Birth date is required"),
    gender: Yup.string().oneOf(["MALE", "FEMALE"], "Please select a valid gender").required("Gender is required"),
    });

    const Field = ({ label, error, touched, children, required }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
        </label>
        {children}
        {touched && error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
        </p>
        )}
    </div>
    );

    const inputClass = (touched, error) =>
    `w-full h-10 px-3 text-sm rounded-lg border bg-gray-50 text-gray-900 outline-none transition
    focus:bg-white focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20
    ${touched && error
        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
        : "border-gray-200"
    }`;

    const Register = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const userAvatar= useRef();

    const { mutate: register, isPending } = useMutation({
        mutationKey: ["register"],
        mutationFn: async (data) => await client.post("/users/register", data,{
            headers:{
                "Content-Type": "multer/form-data"
            }
        }),
        onSuccess: (data) => {
            toast.success("Registration successful!");
            localStorage.setItem("userToken", data.data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.data.user));
            setUser(data.data.data.user);
            navigate("/");
        },
        onError: (error) => {
            // console.log(error)
            // console.log('second')
            toast.error("Registration failed. Please try again.");
        },
    });

    const formik = useFormik({
        initialValues: { firstName: "", lastName: "", email: "", password: "", birthDate: "", gender: "",avatar:null },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            console.log(values)
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }
            register(formData);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-md">

            {/* Logo */}
            <div className="flex justify-center mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
            </div>
            </div>

            {/* Header */}
            <h2 className="text-xl font-semibold text-center text-gray-900 mb-1">Create your account</h2>
            <p className="text-sm text-center text-gray-500 mb-7">Fill in the details below to get started</p>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

                {/* Avatar */}
                <div className="avatar mb-4">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => formik.setFieldValue("avatar", e.target.files[0])}
                        ref={userAvatar}
                    />
                    <div className="upload flex items-center gap-2 justify-center flex-col
                    border border-blue-500 border-dashed rounded-lg p-4 cursor-pointer">
                        <User size={30} className="text-gray-300"/>
                        <p>Upload your avatar.</p>
                        <Button type='button' variant="outline"
                        className={`${formik.values.avatar ? "bg-green-600 text-white" : "text-gray-400 hover:text-gray-600"}`}
                        onClick={() => userAvatar.current.click()}>
                            {formik.values.avatar ? "Change" : "Upload avatar"}
                        </Button>
                    </div>
                </div>

                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-3">
                <Field label="First Name" error={formik.errors.firstName} touched={formik.touched.firstName} required>
                    <input
                    type="text"
                    name="firstName"
                    placeholder="your name"
                    className={inputClass(formik.touched.firstName, formik.errors.firstName)}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                </Field>
                <Field label="Last Name" error={formik.errors.lastName} touched={formik.touched.lastName} required>
                    <input
                    type="text"
                    name="lastName"
                    placeholder="your last name"
                    className={inputClass(formik.touched.lastName, formik.errors.lastName)}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                </Field>
                </div>

                {/* Email */}
                <Field label="Email address" error={formik.errors.email} touched={formik.touched.email} required>
                <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className={inputClass(formik.touched.email, formik.errors.email)}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                </Field>

                {/* Password */}
                <Field label="Password" error={formik.errors.password} touched={formik.touched.password} required>
                <input
                    type="password"
                    name="password"
                    placeholder="your password"
                    className={inputClass(formik.touched.password, formik.errors.password)}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {!formik.errors.password && (
                    <p className="text-gray-400 text-xs mt-1">Min 6 chars, uppercase, number & special character</p>
                )}
                </Field>

                {/* Birth Date */}
                <Field label="Birth Date" error={formik.errors.birthDate} touched={formik.touched.birthDate} required>
                <input
                    type="date"
                    name="birthDate"
                    className={inputClass(formik.touched.birthDate, formik.errors.birthDate)}
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                </Field>

                {/* Gender */}
                <Field label="Gender" error={formik.errors.gender} touched={formik.touched.gender} required>
                <div className="grid grid-cols-2 gap-3 mt-1">
                    {["MALE", "FEMALE"].map((g) => (
                    <button
                        key={g}
                        type="button"
                        onClick={() => formik.setFieldValue("gender", g)}
                        onBlur={() => formik.setFieldTouched("gender", true)}
                        className={`h-10 rounded-lg border text-sm font-medium transition
                        ${formik.values.gender === g
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }
                        ${formik.touched.gender && formik.errors.gender && formik.values.gender !== g
                            ? "border-red-300"
                            : ""
                        }`}
                    >
                        {g === "MALE" ? "👨 Male" : "👩 Female"}
                    </button>
                    ))}
                </div>
                </Field>

                {/* Submit */}
                <button
                type="submit"
                disabled={isPending}
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-medium rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                    </span>
                ) : (
                    "Create account"
                )}
                </button>

            </form>
            </div>

            {/* Login link */}
            <p className="text-center mt-5 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</Link>
            </p>

        </div>
        </div>
    );
    };

    export default Register;