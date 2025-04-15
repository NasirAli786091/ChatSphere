import bcrypt, { genSalt } from "bcryptjs"

export const securePassword = async (password) => {
    const salt = await genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass
}

export const matchPassword = async (curPassword, hashedPass) => {
    return await bcrypt.compare(curPassword, hashedPass);
}