module NyxianSkies {
    export class Map {
        name: string;
        direction: string;
        width: number;
        height: number;
        bgColor: string;
        bgLayer1: string;
        bgLayer2: string;
        GameObjects: Array<GameObject> = [];

        constructor() {
            
        }
    }
}   