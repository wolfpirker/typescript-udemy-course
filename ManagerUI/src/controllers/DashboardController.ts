import { BaseController } from "./BaseController";
import { SessionToken, AccessRight } from "../models/AuthenticationModels";
import { DataService } from "../services/DataService";
import { User } from "../models/DataModels";

// own view, which will show after login was successful
export class DashboardController extends BaseController {

    private sessionToken: SessionToken | undefined;
    private searchArea: HTMLInputElement | undefined; 
    // -> undefined for example: when user has no rights to search
    private searchResultArea: HTMLDivElement | undefined;
    private dataService: DataService = new DataService();

    private selectedUser: User | undefined;
    private selectedLabel: HTMLLabelElement | undefined;

    public setSessionToken(sessionToken: SessionToken) {
        this.sessionToken = sessionToken;
    }


    public createView(): HTMLDivElement {
        this.createElement("h2", 'DashBoard controller');
        if (this.sessionToken) {
            this.createElement('label',
                `welcome ${this.sessionToken.username}`);
            this.insertBreak();
            this.generateButtons();
        } else {
            this.createElement('label',
                'please go to the public parts of this app!');
        }

        return this.container;
    }

    private generateButtons() {
        if (this.sessionToken) {
            for (const access of this.sessionToken.accessRights) {
                this.createElement('button', AccessRight[access], async () => {
                    await this.triggerAction(access);
                });
            }
            if (this.sessionToken.accessRights.includes(AccessRight.READ)) {
                this.insertBreak();
                this.createElement('label', 'search:')
                this.searchArea = this.createElement('input');
                this.searchResultArea = this.createElement('div');
            }
        }
    }

    private async triggerAction(access: AccessRight) {
        console.log(`button ${access} clicked`);
        switch (access) {
            case AccessRight.READ:
                const users = await this.dataService.getUsers(
                    this.sessionToken!.tokenId,
                    this.searchArea!.value
                )
                // now we got the users, let's put it in our search area result
                for (const user of users) {
                    const label = this.createElement('label', JSON.stringify(user));
                    label.onclick = () => {
                        label.classList.toggle('selectedLabel');
                        this.selectedUser = user;
                        this.selectedLabel = label;
                    }
                    this.searchResultArea!.append(label);
                    this.searchResultArea!.append(
                        document.createElement('br')
                    )                   
                }


                break;
            case AccessRight.DELETE:
                    if (this.selectedUser) {
                        // NOte: issue deleting users: undefined in URL
                        await this.dataService.deleteUser(
                            this.sessionToken!.tokenId,
                            this.selectedUser
                        )
                        this.selectedLabel!.innerHTML = ''
                    }
                    break
            default:
                break;
        }
    }

} 