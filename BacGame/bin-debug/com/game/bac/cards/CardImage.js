var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CardImage = (function (_super) {
    __extends(CardImage, _super);
    function CardImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardImage.prototype.setCardRes = function (value) {
        this.cardRes = value;
        if (value)
            this.texture = RES.getRes(this.cardRes);
        else
            this.texture = null;
    };
    CardImage.prototype.getCardRes = function () {
        return this.cardRes;
    };
    CardImage.prototype.dispose = function () {
        this.cardRes = null;
        this.texture = null;
    };
    return CardImage;
}(egret.Bitmap));
__reflect(CardImage.prototype, "CardImage");
//# sourceMappingURL=CardImage.js.map