import { SessionToken } from "../models/AuthenticationModels";

export class LoginService {


    public async login(userName: string, password: string): Promise<SessionToken | undefined> {
        if (userName == 'wolfgang' && password == '1230') {
            return {
                username: 'wolfgang :)'
            } as any
        } else {
            return undefined;
        }
    }
} 