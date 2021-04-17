import { LoginService } from "../services/LoginService";
import { BaseController } from "./BaseController";
import { LinkTextValue } from "./Decorators";

export class LoginController extends BaseController {

    private loginService = new LoginService();    

    //private container = this.createElement("div"); // -> No!
    private title = this.createElement("h2", 'Please Login');
    private userName = this.createElement("label", "Username:");        
    private userNameInput = this.createElement("input");
    private br = this.createElement("br");
    private password = this.createElement("label", "Password:");
    private passwordInput = this.createElement("input");
    private br2 = this.createElement("br");

    private loginButton = this.createElement("button", "login", async () => {
        if (this.userNameInput.value && this.passwordInput.value){
            //this.resetErrorLabel();
            this.errorLabelText = "";
            const result = await this.loginService.login(
                this.userNameInput.value,
                this.passwordInput.value
            )
            if (result) {
                this.router.switchToDashboardView(result)
            } else{
                //this.showErrorLabel('Wrong username or password!');
                this.errorLabelText = "Wrong username or password!";
            }
        } else {
            //this.showErrorLabel('Please fill both fields!');
            this.errorLabelText = "Please fill both fields!";
        }
    });

    private br3 = this.createElement("br");
    private errorLabel = this.createElement("label");
    
    @LinkTextValue('errorLabel')
    private errorLabelText: string = '';

    /*
    private resetErrorLabel() {
        this.errorLabel.style.color = 'red';
        this.errorLabel.style.visibility = 'hidden';
    }
    private showErrorLabel(errorMessage: string) {
        this.errorLabel.innerText = errorMessage;
        this.errorLabel.style.visibility = 'visible';
    }
    */

    public createView(): HTMLDivElement  {
        this.errorLabel.id = 'errorLabel';
        this.errorLabel.style.color = 'red';
        this.passwordInput.type = 'Password';
        
        return this.container;
    }

} 