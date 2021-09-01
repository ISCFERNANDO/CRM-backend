export interface AccessDTO {
    id: number;
    name: string;
    route: string;
    description?: string;
    active: boolean;
    isSystem: boolean;
}
