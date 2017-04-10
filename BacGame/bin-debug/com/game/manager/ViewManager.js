var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewManager = (function () {
    function ViewManager() {
    }
    Object.defineProperty(ViewManager, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new ViewManager;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewManager.prototype.addView = function (v) {
    };
    ViewManager.prototype.removeView = function (v) {
    };
    ViewManager.prototype.onLanguageChange = function () {
    };
    return ViewManager;
}());
__reflect(ViewManager.prototype, "ViewManager");
//# sourceMappingURL=ViewManager.js.map