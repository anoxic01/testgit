var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 从父对象中删除
     */
    BaseComponent.prototype.removeFromParent = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 销毁子对象
     */
    BaseComponent.prototype.disposeChilds = function () {
        var c;
        while (this.numChildren > 0) {
            c = this.removeChildAt(0);
            if (c) {
                c.dispose();
            }
        }
    };
    /**
     * 销毁
     */
    BaseComponent.prototype.dispose = function () {
        //ViewManager.instance.removeView(this);
        this.disposeChilds();
        this.removeFromParent();
    };
    /**
     * 切换多语言
     */
    BaseComponent.prototype.onLanguageChange = function () {
    };
    return BaseComponent;
}(eui.Component));
__reflect(BaseComponent.prototype, "BaseComponent");
//# sourceMappingURL=BaseComponent.js.map