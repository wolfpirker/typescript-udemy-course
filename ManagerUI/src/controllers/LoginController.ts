import { BaseController } from "./BaseController";

export class LoginController extends BaseController {

    //private container = this.createElement("div"); // -> No!
    private title = this.createElement("h2", 'Please Login');
    private userName = this.createElement("label", "Username:");        
    private userNameInput = this.createElement("input");
    private br = this.createElement("br");
    private password = this.createElement("label", "Password:");
    private passwordInput = this.createElement("input");
    private br2 = this.createElement("br");
    private errorLabel = this.createElement("label");

    private loginButton = this.createElement("button", "login", () => {
        if (this.userNameInput.value && this.passwordInput.value){
            this.resetErrorLabel();
        } else {
            this.showErrorLabel('Please fill both fields!');
        }
    });

    private resetErrorLabel() {
        this.errorLabel.style.color = 'red';
        this.errorLabel.style.visibility = 'hidden';
    }
    private showErrorLabel(errorMessage: string) {
        this.errorLabel.innerText = errorMessage;
        this.errorLabel.style.visibility = 'visible';
    }

    public createView(): HTMLDivElement  {
        this.passwordInput.type = 'Password';
        
        this.errorLabel.style.color = 'red';
        this.errorLabel.style.visibility = 'hidden';
        this.loginButton.innerText = 'Login';

        return this.container;
    }

} 