export interface Repository{
    create(data: any): Promise<any>;
    get(id: string): Promise<any | null>;
    getAll(): Promise<any>;
    delete(): Promise<any>;
    update(): Promise<any>;
    getUserByEmail(email: string): Promise<any | null>;
}