module NyxianSkies {
    export class GameObject {
        objectType: number;
        x: number;
        y: number;

        constructor(objectType: number) {
            this.objectType = objectType;
        }
    }
}   