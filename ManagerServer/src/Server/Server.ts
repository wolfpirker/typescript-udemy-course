import { createServer, IncomingMessage, ServerResponse  } from 'http';
import { LoginHandler } from './LoginHandler';
import { Utils } from './Utils';
import {Authorizer} from '../Authorization/Authorizer'
import { UsersHandler } from './UsersHandler';
import { Monitor } from '../Shared/ObjectsCounter';
import { UsersDBAccess } from '../User/UsersDBAccess';

export class Server {
    
    private authorizer: Authorizer = new Authorizer();
    private loginHandler: LoginHandler = new LoginHandler(this.authorizer);
    private usersHandler: UsersHandler = new UsersHandler(this.authorizer);

    public createServer(){
        createServer(
            async(req: IncomingMessage, res: ServerResponse) => {
                console.log('got request from: ' + req.url);
                this.addCorsHeader(res);
                const basePath = Utils.getUrlBasePath(req.url)

                switch (basePath){
                    case 'login':
                        this.loginHandler.setRequest(req);
                        this.loginHandler.setResponse(res);
                        await this.loginHandler.handleRequest();
                        break;
                    case 'users':
                        this.usersHandler.setRequest(req);
                        this.usersHandler.setResponse(res);
                        await this.usersHandler.handleRequest();
                        break
                    case 'systemInfo':
                            res.write(Monitor.printInstances());
                            break;
                    default:
                        break;
                }

                res.end();
            }
        ).listen(8080);
        console.log('server started')
    }

    private addCorsHeader(res: ServerResponse) {
        // lesson #48: solve http call of web intervace
        // 2nd: argument: server url, * for anything
        // Note: not a security issue with that, since web resources are 
        // anyway accessible from the internet - but not from a web browser!
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*')
    }
}