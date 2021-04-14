export class LoginController {

    public createView(): HTMLDivElement {
        const container = document.createElement("div");

        const title = document.createElement('h2');
        title.innerText = 'Please Login';

        const userName = document.createElement("label");
        userName.innerText = "Username:";

        const userNameInput = document.createElement("input");

        const breakElem = document.createElement("br");
        const breakElem2 = document.createElement("br");

        const password = document.createElement("label");
        password.innerText = "Password:";

        const passwordInput = document.createElement("input");
        passwordInput.type = 'Password';

        const loginButton = document.createElement("button");
        loginButton.innerText = 'Login';
        container.append(
            title,
            userName,
            userNameInput,
            breakElem2,
            password,
            passwordInput,
            breakElem,
            loginButton
        )

        return container;
    }

} 