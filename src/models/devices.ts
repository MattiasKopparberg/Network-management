export interface Device {
    id:number
    IPv4_address:string
    IPv6_address:string
    MAC_address:string
    subnet_mask:string
    OS:string
    OS_version:string
    installation_date:Date
    manufacturer:string
    location_id:number
    floor:number
}