module NyxianSkies {
    export class Map {
        name: string;
        direction: string;
        width: number;
        height: number;
        bgColor: string;
        bgLayer1: string;
        bgLayer2: string;
        gameObjects: Array<GameObject> = [];
        startX: number;
        startY: number;

        constructor(json: string = "") {
            if (json === "") return;
            var deMap = null;
            eval("deMap = " + json + ";");

            this.name = deMap.Name;
            this.direction = deMap.Direction;
            this.width = deMap.Width;
            this.height = deMap.Height;
            this.bgColor = deMap.BGColor;
            this.bgLayer1 = deMap.BGLayer1;
            this.bgLayer2 = deMap.BGLayer2;

            for (var i = 0; i < deMap.GameObjects.length; i++) {
                var deGameObject = deMap.GameObjects[i];
                var gameObject = GameObjects.findObjectById(deGameObject.Type).clone(deGameObject);
                this.gameObjects[this.gameObjects.length] = gameObject;
            }
        }


    }
}   