export interface Vlan {
    id: number,
    creation_date: Date,
    name: string
}

export type CreateVlanInput = Omit<Vlan, "id">;