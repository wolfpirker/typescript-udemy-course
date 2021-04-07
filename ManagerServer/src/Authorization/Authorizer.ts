import { Account, SessionToken, TokenGenerator } from "../Server/Model";

export class Authorizer implements TokenGenerator{

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        if (account.username === 'abcd' && 
        (account.password === '1230')){
            return {
                tokenId: "some token id"
            }
        } else {
            return undefined;
        }
    }

}