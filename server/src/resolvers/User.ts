import argon2 from "argon2";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { v4 } from "uuid";
import User from "../enteties/User";
import { MyContext } from "../types";
import { FORGET_PASSWORD_PREFIX } from "../utils/constants";
import { sendEmail } from "../utils/sendEmail";
import { validateRegister } from "../utils/validateRegister";
import { ChangePasswordInput } from "./ChangePasswordInput";
import { EmailPasswordInput } from "./EmailPasswordInput";


@ObjectType()
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@ObjectType()
export class MeResponse {
    @Field()
    id: number;

    @Field()
    email: string;
}



@Resolver(User)
export class UserResolver {
    @Query(() => MeResponse, { nullable: true })
    async me(
        @Ctx() { req }: MyContext
    ) {
        const userId = req.session!.userId;

        if (!userId) { return null };

        return await User.findOne({ where: { id: userId } })
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: EmailPasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const errors = await validateRegister(options);

        if (errors) {
            return { errors };
        }

        try {
            const hashedPassword = await argon2.hash(options.password);

            const user = User.build({ email: options.email, password: hashedPassword })

            await user.save()

            req!.session!.userId = user.id

            return {
                user
            }
        } catch (err) {
            throw (err)
        }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne(
            {
                where: {
                    email
                }
            }
        );
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "user doesn't exist",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "incorrect password",
                    },
                ],
            };
        }

        req.session!.userId = user.id;

        return {
            user
        };
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string,
        @Ctx() { req }: MyContext
    ) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // the email is not in the db
            return true;
        }

        const token = v4();

        req.session![FORGET_PASSWORD_PREFIX + token] = user.id;

        await sendEmail(
            email,
            `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
        );

        return true;
    }



    @Mutation(() => UserResponse)
    async changePassword(
        @Arg("changePassInput") changePassInput: ChangePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        if (changePassInput.newPassword.length <= 2) {
            return {
                errors: [
                    {
                        field: "newPassword",
                        message: "length must be greater than 2",
                    },
                ],
            };
        }

        if (changePassInput.newPassword !== changePassInput.confirmPassword) {
            return {
                errors: [
                    {
                        field: "confirmPassword",
                        message: "Passwords must match",
                    },
                ],
            };
        }

        const key = FORGET_PASSWORD_PREFIX + changePassInput.token;
        const userId = req.session![key]
        if (!userId) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "token expired",
                    },
                ],
            };
        }
        console.log(userId)
        const userIdNum = parseInt(userId);
        const user = await User.findOne({ where: { id: userIdNum } });

        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "user no longer exists",
                    },
                ],
            };
        }

        user.password = await argon2.hash(changePassInput.newPassword)

        await user.save()

        // log in user after change password
        req.session!.userId = user.id;

        return { user };
    }


    @Mutation(() => Boolean)
    logout(@Ctx() { req }: MyContext) {
        req.session!.userId = null;
        return true
    }
}