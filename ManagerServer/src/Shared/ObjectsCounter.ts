export class Monitor {

    public static printInstances(): string {
        let response = '';
        Counter.objectsCount.forEach((value: number, key: string) => {
            response = response + `${key}: ${value} \n`
        });
        return response;
    }

}

class Counter {

    static objectsCount: Map<string, number> = new Map();

    static increment(className: string) {
        if (!this.objectsCount.get(className)) {
            this.objectsCount.set(className, 1);
        } else {
            const currentValue = this.objectsCount.get(className);
            this.objectsCount.set(className, currentValue! + 1);
        }
    }
}

/* NO: not counting it correctly - just showing 1
export function countInstances(constructor: Function){
    Counter.increment(constructor.name);
}
*/

// in difference to before: this is called every time, we get a new object
export function countInstances<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        abc = Counter.increment(constructor.name);
    }
} 