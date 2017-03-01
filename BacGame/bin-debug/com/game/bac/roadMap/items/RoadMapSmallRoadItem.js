var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 百家路纸显示的小眼路item
 */
var RoadMapSmallRoadItem = (function (_super) {
    __extends(RoadMapSmallRoadItem, _super);
    function RoadMapSmallRoadItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoadMapSmallRoadItem.prototype.applyData = function (v, currentLang) {
        if (v != null) {
            this.bitmap.texture = RES.getRes("roadMap_small_road_" + v + "_png");
        }
        else {
            this.bitmap.texture = null;
        }
    };
    return RoadMapSmallRoadItem;
}(BaseRoadMapItem));
__reflect(RoadMapSmallRoadItem.prototype, "RoadMapSmallRoadItem");
//# sourceMappingURL=RoadMapSmallRoadItem.js.map