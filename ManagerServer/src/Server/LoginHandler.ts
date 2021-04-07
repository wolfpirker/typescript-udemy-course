import { IncomingMessage, ServerResponse } from "node:http";

export class LoginHandler {
    private req: IncomingMessage;
    private res: ServerResponse;

    public constructor(req: IncomingMessage, res: ServerResponse){
        this.req = req;
        this.res = res;
    }

    public async handleRequest(): Promise<void>{
        console.log('before getting body');
        const body = await this.getRequestBody();        
        console.log('request username: ' + body.username);
        console.log('request password: ' + body.password);
    }

    private async getRequestBody(): Promise<any>{
        return new Promise((resolve, reject) => {
            let body = '';            
            // how request body works, based on events
            // on data event
            this.req.on('data', (data: string) => {
                body += data;
            });
            this.req.on('end', () => {
                try {
                    resolve(JSON.parse(body))
                } catch (error) {
                    // e.g. body not valid json!
                    reject(error)
                }
            });
            this.req.on('error', (error:any)=> {
                reject(error);
            })
        });

    }
}