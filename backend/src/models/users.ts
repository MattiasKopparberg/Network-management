export interface Users {
    id:number,
    fname: string,
    lname: string,
    username: string
    user_group: string,
    email: string
    password_hash: string,
}

export type CreateUserInput = Omit<Users, "id">;