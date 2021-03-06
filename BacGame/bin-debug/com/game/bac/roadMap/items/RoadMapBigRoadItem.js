var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 百家路纸显示的大路item
 */
var RoadMapBigRoadItem = (function (_super) {
    __extends(RoadMapBigRoadItem, _super);
    function RoadMapBigRoadItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoadMapBigRoadItem.prototype.applyData = function (v, currentLang) {
        if (v != null) {
            var arr = v.split(",");
            if (arr[0]) {
                this.bitmap.texture = RES.getRes("roadMap_big_road_" + arr[0] + "_png");
            }
            if (arr[1] > 0) {
                if (this.tieBitmap == null) {
                    this.tieBitmap = new egret.Bitmap();
                    this.addChild(this.tieBitmap);
                }
                this.tieBitmap.texture = RES.getRes("roadMap_big_road_i_png");
                if (arr[1] > 1) {
                    if (this.tf == null) {
                        this.tf = new egret.TextField();
                        this.tf.size = 15;
                        this.tf.bold = true;
                        this.tf.textColor = 0x00ff00;
                        this.addChild(this.tf);
                    }
                    this.tf.text = arr[1];
                    this.tf.x = (this.bitmap.width - this.tf.width) * 0.5;
                    this.tf.y = (this.bitmap.height - this.tf.height) * 0.5;
                }
                else {
                    if (this.tf)
                        this.tf.text = "";
                }
            }
            else {
                if (this.tieBitmap)
                    this.tieBitmap.texture = null;
                if (this.tf)
                    this.tf.text = "";
            }
        }
        else {
            if (this.bitmap)
                this.bitmap.texture = null;
            if (this.tieBitmap)
                this.tieBitmap.texture = null;
            if (this.tf)
                this.tf.text = "";
        }
    };
    return RoadMapBigRoadItem;
}(BaseRoadMapItem));
__reflect(RoadMapBigRoadItem.prototype, "RoadMapBigRoadItem");
//# sourceMappingURL=RoadMapBigRoadItem.js.map