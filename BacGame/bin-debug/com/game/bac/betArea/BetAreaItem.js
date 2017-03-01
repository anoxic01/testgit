var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BetAreaItem = (function (_super) {
    __extends(BetAreaItem, _super);
    /**
     * 素材无需加_png后辍
     */
    function BetAreaItem(id, resId, titleResId, isFlip) {
        if (isFlip === void 0) { isFlip = false; }
        var _this = _super.call(this) || this;
        _this.betAreaId = 0;
        /**
         * 是否翻转
         */
        _this.isFlip = false;
        _this.betAreaId = id;
        _this.resId = resId;
        _this.titleResId = titleResId;
        _this.isFlip = isFlip;
        _this.initView();
        return _this;
    }
    BetAreaItem.prototype.initView = function () {
        this.bitmap = this.addChild(new egret.Bitmap());
        this.titleBitmap = this.addChild(new egret.Bitmap());
        this.bitmap.texture = RES.getRes(this.resId + "_1_png");
        this.bitmap.smoothing = true;
        this.itemWidth = this.bitmap.width;
        this.itemHeight = this.bitmap.height;
        if (this.isFlip)
            this.bitmap.scaleX = -1;
        this.setItemCenter();
        this.setTitle();
        // this.graphics.beginFill(0,1);
        // this.graphics.drawRect(0,0,this.itemWidth,this.itemHeight);
        // this.graphics.endFill();
    };
    BetAreaItem.prototype.setCanBet = function (v) {
        if (v) {
            this.touchEnabled = true;
            this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseRollOver, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseRollOut, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseRollOver, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseRollOut, this);
        }
        else {
            this.touchEnabled = false;
            this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseRollOver, this);
            this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseRollOut, this);
        }
    };
    BetAreaItem.prototype.setTitle = function () {
        this.titleBitmap.texture = RES.getRes(this.titleResId + "_png");
        this.titleBitmap.smoothing = true;
        this.titleBitmap.x = (this.itemWidth - this.titleBitmap.width) * 0.5;
        this.titleBitmap.y = (this.itemHeight - this.titleBitmap.height) * 0.5;
    };
    BetAreaItem.prototype.setItemCenter = function () {
        if (this.isFlip)
            this.bitmap.x = this.bitmap.width + (this.itemWidth - this.bitmap.width) * 0.5;
        else
            this.bitmap.x = (this.itemWidth - this.bitmap.width) * 0.5;
        this.bitmap.y = (this.itemHeight - this.bitmap.height) * 0.5;
    };
    BetAreaItem.prototype.onMouseRollOver = function (evt) {
        this.bitmap.texture = RES.getRes(this.resId + "_2_png");
        this.bitmap.smoothing = true;
        this.setItemCenter();
    };
    BetAreaItem.prototype.onMouseRollOut = function (evt) {
        this.bitmap.texture = RES.getRes(this.resId + "_1_png");
        this.bitmap.smoothing = true;
        this.setItemCenter();
    };
    return BetAreaItem;
}(BaseView));
__reflect(BetAreaItem.prototype, "BetAreaItem");
//# sourceMappingURL=BetAreaItem.js.map