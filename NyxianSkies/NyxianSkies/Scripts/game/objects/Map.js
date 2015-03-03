var NyxianSkies;
(function (NyxianSkies) {
    var Map = (function () {
        function Map(json) {
            if (json === void 0) { json = ""; }
            this.gameObjects = [];
            if (json === "")
                return;
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
                var gameObject = NyxianSkies.GameObjects.findObjectById(deGameObject.Type).clone(deGameObject);
                this.gameObjects[this.gameObjects.length] = gameObject;
            }
        }
        return Map;
    })();
    NyxianSkies.Map = Map;
})(NyxianSkies || (NyxianSkies = {}));
//# sourceMappingURL=Map.js.map