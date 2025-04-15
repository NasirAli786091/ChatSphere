import { z } from "zod"

export const registerValidator = z.object({
    username : z.string({required_error : "username is required"})
        .trim()
        .max(10, {message : "username cannot exceed 10 characters"}),
    password : z.string({required_error : "password is required"})
        .trim()
        .min(6, {message : "password must be atleast 6 characters"})
        .max(10, {message : "password cannot exceed 10 characters"}),
    email : z.string({required_error : "email is required"})
        .trim()
        .email("Invalid email format"),
});

export const loginValidator = z.object({
    email : z.string({required_error : "email is required"})
        .trim()
        .email("invalid email format"),
    password : z.string({required_error : "password is required"})
        .trim()
});