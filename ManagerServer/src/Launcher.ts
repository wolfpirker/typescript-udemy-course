import { Server } from './Server'

class Launcher {
    // instance variables
    private name: string
    private server: Server

    constructor() {
        this.server = new Server();
    }

    public launchApp() {
        console.log('started app');
        this.server.createServer();
        (this.server as any).somePrivateLogic();
    }

}

new Launcher().launchApp();