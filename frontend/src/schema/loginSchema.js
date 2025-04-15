import z from "zod"

const loginSchema = z.object({
    email : z
        .string()
        .nonempty("Email is required")
        .trim()
        .email({message : "Invalid email"}),
    password : z
        .string()
        .nonempty("Password is required")
        .trim()
})

export default loginSchema;