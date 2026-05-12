export interface Maintenance {
    event_id:number,
    device_id: number,
    event_date: Date,
    description: string,
    performed_by: number,
    scheduled: number
}

export type CreateMaintenanceInput = Omit<Location, "id">;