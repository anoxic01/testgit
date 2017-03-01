var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoadStringObject = (function () {
    function RoadStringObject() {
        /**
         * 大路
         */
        this.bigRoad = "";
        /**
         * 大眼路
         */
        this.bigEyeRoad = "";
        /**
         * 小路
         */
        this.smallRoad = "";
        /**
         * 蟑螂路
         */
        this.roachRoad = "";
    }
    return RoadStringObject;
}());
__reflect(RoadStringObject.prototype, "RoadStringObject");
//# sourceMappingURL=RoadStringObject.js.map