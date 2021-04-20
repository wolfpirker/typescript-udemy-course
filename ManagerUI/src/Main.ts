import { Router } from "./Router";

export class Main {

    private router:Router = new Router();

    public constructor (){
        // important point to understand! -> called on page refresh
        console.log('Constructed new Instance of the program')
    }

    public launchApp() : void {
        this.router.handleRequest();        
    }
}

new Main().launchApp();