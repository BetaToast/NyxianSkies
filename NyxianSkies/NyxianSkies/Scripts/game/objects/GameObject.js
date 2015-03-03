var NyxianSkies;
(function (NyxianSkies) {
    var GameObject = (function () {
        function GameObject(objectType) {
            this.objectType = objectType;
        }
        GameObject.prototype.clone = function (deGameObject) {
            var ret = new GameObject(this.objectType);
            ret.x = deGameObject.X;
            ret.y = deGameObject.Y;
            return ret;
        };
        return GameObject;
    })();
    NyxianSkies.GameObject = GameObject;
})(NyxianSkies || (NyxianSkies = {}));
//# sourceMappingURL=GameObject.js.map