export interface Vlan {
    id:number,
    creaton_date: Date,
    name: string
}

export type CreateVlanInput = Omit<Location, "id">;