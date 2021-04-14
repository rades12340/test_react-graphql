import User from "../enteties/User";
import { EmailPasswordInput } from "../resolvers/EmailPasswordInput";


export const validateRegister = async (options: EmailPasswordInput) => {
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }

    const user = await User.findOne({ where: { email: options.email } })

    if (user) {
        return [
            {
                field: "email",
                message: "email exist",
            },
        ];
    }



    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "length must be greater than 2",
            },
        ];
    }

    return null;
};