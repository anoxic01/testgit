var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        if (_this.stage == null) {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddThisToStage, _this);
        }
        else {
            _this.onAddToStage();
        }
        ViewManager.instance.addView(_this);
        return _this;
    }
    BaseView.prototype.onAddThisToStage = function (evt) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddThisToStage, this);
        this.onAddToStage();
    };
    /**
     * 添加到舞台显示
     */
    BaseView.prototype.onAddToStage = function () {
    };
    /**
     * 销毁
     */
    BaseView.prototype.dispose = function () {
        ViewManager.instance.removeView(this);
        this.disposeChilds();
        this.removeFromParent();
    };
    /**
     * 从父对象中删除
     */
    BaseView.prototype.removeFromParent = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 销毁子对象
     */
    BaseView.prototype.disposeChilds = function () {
        var c;
        while (this.numChildren > 0) {
            c = this.removeChildAt(0);
            if (c) {
                c.dispose();
            }
        }
    };
    /**
     * 切换多语言
     */
    BaseView.prototype.onLanguageChange = function () {
    };
    return BaseView;
}(egret.Sprite));
__reflect(BaseView.prototype, "BaseView");
//# sourceMappingURL=BaseView.js.map