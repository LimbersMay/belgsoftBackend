import {v4 as uuidv4} from 'uuid';
import {UserSchema} from "../models";
import {UserResponse} from "../mappers";
import {compareHash, encrypt, generateToken} from "../utils";
import {AuthError, UserError} from "../errors";
import {RoleSchema, UserTypeSchema, UserStateSchema} from "../models";
import {AuthRegisterDTO} from "../controllers/auth/validators/auth.register";
import {Err, Ok, Result} from "ts-results-es";

interface LoginUserResponse {
    token: string;
    user: UserResponse;
}

type LoginUserErrors = AuthError.AUTH_ERROR_INCORRECT_PASSWORD | UserError.USER_NOT_FOUND;

export const registerUser = async (authRegisterDTO: AuthRegisterDTO, adminId: string | undefined) => {

    const encryptedPassword = await encrypt(authRegisterDTO.password);
    const user = await UserSchema.create({
        ...authRegisterDTO,
        createdByUserId: adminId,
        password: encryptedPassword,
        userId: uuidv4(),
    });

    await user.reload({
        include: [
            { model: RoleSchema, as: 'role' },
            { model: UserTypeSchema, as: 'userType' },
            { model: UserStateSchema, as: 'userState' }
        ]
    });

    return UserResponse.fromUser(user);
}

export const loginUser = async ({ email, password }: { email: string, password: string }): Promise<Result<LoginUserResponse, LoginUserErrors>> => {

    const user = await UserSchema.findOne({
        where: { email },
        include: [
            { model: RoleSchema, as: 'role' },
            { model: UserTypeSchema, as: 'userType' },
            { model: UserStateSchema, as: 'userState' }
        ]
    });

    if (!user) return Err(UserError.USER_NOT_FOUND);

    const isPasswordValid = await compareHash(password, user.password);
    if (!isPasswordValid) return Err(AuthError.AUTH_ERROR_INCORRECT_PASSWORD);

    const userResponse = UserResponse.fromUser(user);

    const token = generateToken(userResponse);

    return Ok({
        token,
        user: userResponse
    });
}
