import { TokenGenerator, Account, SessionToken, TokenValidator, TokenState, TokenRights } from "../Server/Model";
import { SessionTokenDBAccess } from "./SessionTokenDBAccess";
import { UserCredentialsDBAccess } from "./UserCredentialsDBAccess";


export class Authorizer implements TokenGenerator, TokenValidator {

    // Note: never forget the parenthesis!
    private userCredDBAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    private sessionTokenDBAcess: SessionTokenDBAccess = new SessionTokenDBAccess();

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        const resultAccount = await this.userCredDBAccess.getUserCredential(
            account.username, account.password
        )
        if (resultAccount) {
            const token = {
                accessRights: resultAccount.accessRights,
                expirationTime: this.generateExpirationTime(),
                username: resultAccount.username,
                valid: true,
                tokenId: this.generateRandomTokenId()
            }
            await this.sessionTokenDBAcess.storeSessionToken(token);
            return token;
        } else {
            return undefined;
        }
    }

    public async validateToken(tokenId: string): Promise<TokenRights> {
        const token = await this.sessionTokenDBAcess.getToken(tokenId);
        if (!token || !token.valid){
            return {
                accessRights: [],
                state: TokenState.INVALID
            };
            } else if (token.expirationTime < new Date()){
                return {
                    accessRights: [],
                    state: TokenState.EXPIRED
            };
        } return {
            accessRights: token.accessRights,
            state: TokenState.VALID
        }
    }

    private generateExpirationTime() {
        return new Date(Date.now() + 60 * 60 * 1000);
    }

    private generateRandomTokenId(){
        return Math.random().toString(36).slice(2);
    }

}