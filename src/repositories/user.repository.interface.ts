export interface UserRepository {
    create(data: any): Promise<any>;
    get(id: string): Promise<any | null>;
    getAll(): Promise<any>;
    delete(): Promise<any>;
    updatePassword(email: string, hash: string): Promise<any>;
    getUserByEmail(email: string): Promise<any | null>;
    resetPassword(email: string, token: string): Promise<any>;
    getUserByToken(token: string, hash: string): Promise<any>
}