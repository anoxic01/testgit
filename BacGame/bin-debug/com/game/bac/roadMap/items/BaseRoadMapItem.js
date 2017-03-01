var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRoadMapItem = (function (_super) {
    __extends(BaseRoadMapItem, _super);
    function BaseRoadMapItem() {
        return _super.call(this) || this;
    }
    /**
     * 设置item的路纸数据
     */
    BaseRoadMapItem.prototype.setData = function (v) {
        if (this.data == v)
            return;
        this.data = v;
        if (this.bitmap == null) {
            this.bitmap = new egret.Bitmap();
            this.addChild(this.bitmap);
        }
        this.applyData(this.data, LanguageManager.instance.currentLang);
    };
    /**
     * 获取当前的item数据
     */
    BaseRoadMapItem.prototype.getData = function () {
        return this.data;
    };
    /**
     * 应用数据
     */
    BaseRoadMapItem.prototype.applyData = function (v, currentLang) {
    };
    BaseRoadMapItem.prototype.onLanguageChange = function () {
        this.applyData(this.data, LanguageManager.instance.currentLang);
    };
    BaseRoadMapItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.bitmap = null;
        this.data = null;
    };
    return BaseRoadMapItem;
}(BaseView));
__reflect(BaseRoadMapItem.prototype, "BaseRoadMapItem", ["IRoadMapItem"]);
//# sourceMappingURL=BaseRoadMapItem.js.map