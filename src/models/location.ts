export interface Location {
    id: number
    coordinates: string
    address: string
    floor: number
}

export type CreateLocationInput = Omit<Location, "id">;