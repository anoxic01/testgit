var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var Advertisement = (function (_super) {
            __extends(Advertisement, _super);
            function Advertisement() {
                var _this = _super.call(this) || this;
                var ad = tool.BitmapTool.getInstance().createBitmapByName("ad_0_jpg");
                _this.addChild(ad);
                return _this;
            }
            return Advertisement;
        }(egret.DisplayObjectContainer));
        view.Advertisement = Advertisement;
        __reflect(Advertisement.prototype, "lobby.view.Advertisement");
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=Advertisement.js.map