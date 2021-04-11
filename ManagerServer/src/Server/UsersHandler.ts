import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model";
import { UsersDBAccess } from "../User/UsersDBAccess";
import { Handler } from "./Model";
import { Utils } from "./Utils";

export class UsersHandler implements Handler {
    private req: IncomingMessage;
    private res: ServerResponse;

    // like this we initialize the database on each server call -> not a good practice
    // more on this in future lections (>29)
    private usersDBAccess: UsersDBAccess = new UsersDBAccess();

    public constructor(req: IncomingMessage, res: ServerResponse){
        this.req = req;
        this.res = res;
    }

    async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.GET:
                await this.handleGet();
                break;
            default:
                this.handleNotFound();
                break;
        }
    }
    
    private async handleGet() {
        const parsedUrl = Utils.getUrlParameters(this.req.url)

        const a = '5';
    }

    private async handleNotFound() {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('not found');
    }
}