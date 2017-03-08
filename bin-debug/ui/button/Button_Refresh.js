var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var button;
    (function (button) {
        var Button_Refresh = (function (_super) {
            __extends(Button_Refresh, _super);
            function Button_Refresh() {
                var _this;
                var arr = ["refresh_default_png", "refresh_down_png"];
                _this = _super.call(this, arr) || this;
                return _this;
            }
            Button_Refresh.prototype.onclick = function () {
                console.log("频道选择 按钮点击了!");
            };
            return Button_Refresh;
        }(ui.button.Button_Tool));
        button.Button_Refresh = Button_Refresh;
        __reflect(Button_Refresh.prototype, "ui.button.Button_Refresh");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_Refresh.js.map