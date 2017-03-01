var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 百家路纸显示的蟑螂路item
 */
var RoadMapRoachRoadItem = (function (_super) {
    __extends(RoadMapRoachRoadItem, _super);
    function RoadMapRoachRoadItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoadMapRoachRoadItem.prototype.applyData = function (v, currentLang) {
        if (v != null) {
            this.bitmap.texture = RES.getRes("roadMap_roach_road_" + v + "_png");
        }
        else {
            this.bitmap.texture = null;
        }
    };
    return RoadMapRoachRoadItem;
}(BaseRoadMapItem));
__reflect(RoadMapRoachRoadItem.prototype, "RoadMapRoachRoadItem");
//# sourceMappingURL=RoadMapRoachRoadItem.js.map