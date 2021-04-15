import { BaseController } from "./BaseController";
import { SessionToken } from "../models/AuthenticationModels";

// own view, which will show after login was successful
export class DashboardController extends BaseController {

    private sessionToken: SessionToken | undefined;

    public setSessionToken(sessionToken: SessionToken) {
        this.sessionToken = sessionToken;
    }


    public createView(): HTMLDivElement {
        this.createElement("h2", 'DashBoard controller');
        if (this.sessionToken) {
            this.createElement('label',
                `welcome ${this.sessionToken.username}`);
        } else {
            this.createElement('label',
                'please go to the public parts of this app!');
        }


        return this.container;
    }

} 