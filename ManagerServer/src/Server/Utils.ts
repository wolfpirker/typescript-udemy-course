import {parse, UrlWithParsedQuery} from 'url';

export class Utils{
    public static getUrlBasePath(url: string | undefined): string{
        if (url){ // make sure everything works; common JS approach
                  // truth words: truthly or falsely
            const parsedUrl = parse(url);
            // pathname doc: https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname
            // (JS string method)
            return parsedUrl.pathname!.split('/')[1];
        }        
        else{
            return '';
        }    
    }

    public static getUrlParameters(url: string | undefined): UrlWithParsedQuery | undefined {
        if (url){
            return parse(url, true);
        }
        else{
            return undefined;
        }
        
    }

}