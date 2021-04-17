import { createServer, IncomingMessage, ServerResponse  } from 'http';
import { LoginHandler } from './LoginHandler';
import { Utils } from './Utils';
import {Authorizer} from '../Authorization/Authorizer'
import { UsersHandler } from './UsersHandler';
import { Monitor } from '../Shared/ObjectsCounter';

export class Server {
    
    private authorizer: Authorizer = new Authorizer();


    public createServer(){
        createServer(
            async(req: IncomingMessage, res: ServerResponse) => {
                console.log('got request from: ' + req.url);
                this.addCorsHeader(res);
                const basePath = Utils.getUrlBasePath(req.url)

                switch (basePath){
                    case 'login':
                        await new LoginHandler(req, res, this.authorizer).handleRequest();
                        break;
                    case 'users':
                        await new UsersHandler(req, res, this.authorizer).handleRequest();
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