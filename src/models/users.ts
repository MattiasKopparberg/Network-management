export interface Users {
    id:number,
    fname: string,
    lname: string,
    user_group: string,
    password: string,
    salt: string
}

export type CreateUserInput = Omit<Location, "id">;