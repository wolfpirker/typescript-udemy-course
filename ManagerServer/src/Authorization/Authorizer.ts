import { TokenGenerator, Account, SessionToken } from "../Server/Model";
import { UserCredentialsDBAccess } from "./UserCredentialsDBAccess";


export class Authorizer implements TokenGenerator {

                                                // Note: never forget the parenthesis!
    private userCredDBAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        const resultAccount = await this.userCredDBAccess.getUserCredential(
            account.username, account.password
        )
        if (resultAccount) {
            return {
                tokenId: 'some token id'
            }
        } else {
            return undefined;
        }
    }

}