import { BaseController } from "./BaseController";

export class MainController extends BaseController {
    public createView(): HTMLDivElement  {

        const title = this.createElement('h2', 'Welcome to our home page!');
        const article = this.createElement('div')
        article.innerText = 'Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken.'

        const button = this.createElement('button', 'Login', () => {
            this.router.switchToLoginView();
        });

        return this.container;
    }

}