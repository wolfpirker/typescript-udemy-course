export class MainController {

    public createView(): HTMLDivElement {

        const container = document.createElement("div");

        const title = document.createElement('h2');
        title.innerText = 'Welcome to our Main page!'

        const article = document.createElement("div");
        article.innerText = 'Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken.';

        const button = document.createElement('button');
        button.innerText = 'login';


        container.append(title, article, button);
        return container;
    }

}