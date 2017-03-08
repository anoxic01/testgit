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
        var Panorama = (function (_super) {
            __extends(Panorama, _super);
            function Panorama() {
                var _this = _super.call(this) || this;
                _this.btn_refresh = new ui.button.Button_Refresh();
                _this.addChild(_this.btn_refresh);
                _this.btn_refresh.x = 350;
                _this.btn_refresh.y = 208;
                _this.btn_zoom_in = new ui.button.Button_ZoomIn();
                _this.addChild(_this.btn_zoom_in);
                _this.btn_zoom_in.x = 388;
                _this.btn_zoom_in.y = 213;
                return _this;
            }
            return Panorama;
        }(egret.DisplayObjectContainer));
        view.Panorama = Panorama;
        __reflect(Panorama.prototype, "lobby.view.Panorama");
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=Panorama.js.map