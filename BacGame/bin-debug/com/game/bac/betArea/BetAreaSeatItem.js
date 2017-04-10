var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BetAreaSeatItem = (function (_super) {
    __extends(BetAreaSeatItem, _super);
    /**
     *
     *
     *
     * ///// 原色
     * [1,0,0,0,0,
        0,1,0,0,0,
        0,0,1,0,0,
        0,0,0,1,0]

        ///// 黄色
        [1,0,0,0,255,// red
        0,1,0,0,255,// green
        0,0,1,0,0,// blue
        0,0,0,1,0]// alpha
     */
    function BetAreaSeatItem(id, resId, titleResId, isFlip) {
        if (isFlip === void 0) { isFlip = false; }
        var _this = _super.call(this) || this;
        _this.isFlip = false;
        _this.seatId = id;
        _this.resId = resId;
        _this.titleResId = titleResId;
        _this.isFlip = isFlip;
        _this.initView();
        return _this;
    }
    BetAreaSeatItem.prototype.initView = function () {
        this.bitmap = this.addChild(new egret.Bitmap());
        this.titleBitmap = this.addChild(new egret.Bitmap());
        this.bitmap.texture = RES.getRes(this.resId + "_png");
        this.bitmap.smoothing = true;
        this.itemWidth = this.bitmap.width;
        this.itemHeight = this.bitmap.height;
        if (this.isFlip)
            this.bitmap.scaleX = -1;
        this.setItemCenter();
        this.setTitle();
    };
    BetAreaSeatItem.prototype.setTitle = function () {
        this.titleBitmap.texture = RES.getRes(this.titleResId + "_png");
        this.titleBitmap.smoothing = true;
        if (this.seatId >= 6 && this.isFlip) {
            if (this.seatId == 7)
                this.titleBitmap.x = this.itemWidth - this.titleBitmap.width - 60;
            else if (this.seatId == 8)
                this.titleBitmap.x = this.itemWidth - this.titleBitmap.width - 20;
            else
                this.titleBitmap.x = this.itemWidth - this.titleBitmap.width - 40;
        }
        else
            this.titleBitmap.x = this.itemWidth - this.titleBitmap.width - 25;
        this.titleBitmap.y = 15;
    };
    /**
     * 设置座位信息
     */
    BetAreaSeatItem.prototype.setSeatData = function (v) {
        if (v != null) {
            this.titleBitmap.filters = [BetAreaSeatItem.COLORFILTER];
        }
        else {
            this.titleBitmap.filters = [];
        }
    };
    BetAreaSeatItem.prototype.setItemCenter = function () {
        if (this.isFlip)
            this.bitmap.x = this.bitmap.width + (this.itemWidth - this.bitmap.width) * 0.5;
        else
            this.bitmap.x = (this.itemWidth - this.bitmap.width) * 0.5;
        this.bitmap.y = (this.itemHeight - this.bitmap.height) * 0.5;
    };
    return BetAreaSeatItem;
}(BaseView));
BetAreaSeatItem.COLORFILTER = new egret.ColorMatrixFilter([1, 0, 0, 0, 255, 0, 1, 0, 0, 255, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
__reflect(BetAreaSeatItem.prototype, "BetAreaSeatItem");
//# sourceMappingURL=BetAreaSeatItem.js.map