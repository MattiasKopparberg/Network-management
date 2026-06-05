export interface Users {
    id:number,
    fname: string,
    lname: string,
    user_group: string,
    email: string
    password: string,
    salt: string
}

export type CreateUserInput = Omit<Users, "id">;