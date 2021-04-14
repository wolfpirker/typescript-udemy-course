import { BaseController } from "./BaseController";

export class LoginController extends BaseController {

    public createView(): HTMLDivElement  {
        const container = this.createElement("div");
        const title = this.createElement("h2", 'Please Login');
        const userName = this.createElement("label", "Username:");        
        const userNameInput = this.createElement("input");

        const breakElem = this.createElement("br");
        const breakElem2 = this.createElement("br");

        const password = this.createElement("label", "Password:");

        const passwordInput = document.createElement("input");
        passwordInput.type = 'Password';

        const loginButton = this.createElement("button");
        loginButton.innerText = 'Login';
        this.container.append(
            title,
            userName,
            userNameInput,
            breakElem2,
            password,
            passwordInput,
            breakElem,
            loginButton
        )

        return this.container;
    }

} 