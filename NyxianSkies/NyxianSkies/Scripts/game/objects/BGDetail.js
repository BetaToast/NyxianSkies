var NyxianSkies;
(function (NyxianSkies) {
    var BGDetail = (function () {
        function BGDetail() {
        }
        BGDetail.prototype.clone = function (deDetail) {
            var ret = new BGDetail();
            ret.x = deDetail.X;
            ret.y = deDetail.Y;
            ret.asset = deDetail.Asset;
            return ret;
        };
        return BGDetail;
    })();
    NyxianSkies.BGDetail = BGDetail;
})(NyxianSkies || (NyxianSkies = {}));
//# sourceMappingURL=BGDetail.js.map