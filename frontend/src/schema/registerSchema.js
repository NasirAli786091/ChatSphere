import z from "zod"

const registerSchema = z.object({
    username: z.string()
                .nonempty("username is required")
                .trim()
                .min(6, {message : "Username must be atleast 6 character"})
                .max(15, {message: "Username can not exceed 15 character"}),

    email: z.string({required_error: "Email is required"})
                .trim()
                .email("Invalid email"),

    password : z.string()
                .nonempty("Password is required")
                .trim()
                .min(6, {message : "Password must be atleast 6 characters"})
                .max(10, {message : "Password cannot exceed 10 characters"}),

    confirmPassword : z.string()
                .nonempty("Confirm Password is required")
                .trim()
                .min(6, {message : "Password must be atleast 6 characters"})
                .max(10, {message : "Password cannot exceed 10 characters"})
}).refine((data) => data.password === data.confirmPassword, {
        message : "Password do not match",
        path : ["confirmPassword"]
});

export default registerSchema;