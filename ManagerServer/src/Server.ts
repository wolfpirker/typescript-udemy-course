export default null // Force module mode

export class Server {

    private somePrivateLogic(){
        console.log('doing private logic');
    }

    public createServer(){
        console.log('created server');        
    }
}