export interface Maintenance {
    id: number,
    device_id: number,
    event_date: Date,
    description: string,
    performed_by: number,
    scheduled: number
}

export type CreateMaintenanceInput = Omit<Maintenance, "id">;