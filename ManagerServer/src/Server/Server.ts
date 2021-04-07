import { createServer, IncomingMessage, ServerResponse  } from 'http';
import { LoginHandler } from './LoginHandler';
import { Utils } from './Utils';

export class Server {
    
    public createServer(){
        createServer(
            async(req: IncomingMessage, res: ServerResponse) => {
                console.log('got request from: ' + req.url);
                const basePath = Utils.getUrlBasePath(req.url)

                switch (basePath){
                    case 'login':
                        await new LoginHandler(req, res).handleRequest();
                        break;
                    default:
                        break;
                }

                res.end();
            }
        ).listen(8080);
        console.log('server started')
    }
}