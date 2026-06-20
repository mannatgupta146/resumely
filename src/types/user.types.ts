interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date
}

interface RegisterBody {
    name: string,
    email: string,
    password: string
}

interface LoginBody {
    email: string,
    password: string
}

interface JWTPayload {
    userId: string,
    email?: string
}

export type { IUser, RegisterBody, LoginBody, JWTPayload }