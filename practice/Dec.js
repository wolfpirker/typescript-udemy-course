var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var someObject = {
    someProperty: 'initial'
};
var Manager = /** @class */ (function () {
    function Manager() {
    }
    __decorate([
        linkValue(someObject)
    ], Manager.prototype, "someProperty", void 0);
    return Manager;
}());
// alternative to above decorator:
//watchChange(Manager.prototype, 'someProperty');
var manager = new Manager();
manager.someProperty = '123';
console.log("someObject.someProperty: " + someObject.someProperty);
manager.someProperty = '456';
console.log("someObject.someProperty: " + someObject.someProperty);
function linkValue(otherObject) {
    return function (target, key) {
        var property = target[key];
        var getter = function () {
            return property;
        };
        var setter = function (newVal) {
            property = newVal;
            otherObject[key] = newVal;
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: true
        });
    };
}
function watchChange(target, key) {
    var property = target[key];
    var getter = function () {
        return property;
    };
    var setter = function (newVal) {
        console.log(key + " changed from " + property + " to " + newVal);
        property = newVal;
        // changes in setter, getter require the 
        // Object.defineProperty below
    };
    // to implement these properties inside getter, and setter
    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        configurable: true,
        enumerable: true
    });
}
