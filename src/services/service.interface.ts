export interface UserService{
    get(id: string): Promise<any>;
    getAll(): Promise<any>;
    create(data: any): Promise<any>;
    getByEmail(email: string): Promise<boolean>;
    resetPassword(token: string, data: any): Promise<any>;
}