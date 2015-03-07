module NyxianSkies {
    export class GameObject {
        objectType: number;
        x: number;
        y: number;

        constructor(objectType: number) {
            this.objectType = objectType;
        }

        clone(deGameObject) : GameObject {
            var ret = new GameObject(this.objectType);

            ret.x = deGameObject.X;
            ret.y = deGameObject.Y;

            return ret;
        }
    }
}   