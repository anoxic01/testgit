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
        var Button_Setting = (function (_super) {
            __extends(Button_Setting, _super);
            function Button_Setting() {
                var _this;
                var arr = ["setting_default_png", "setting_down_png"];
                _this = _super.call(this, arr) || this;
                return _this;
            }
            Button_Setting.prototype.onclick = function () {
                console.log("频道选择 按钮点击了!");
            };
            return Button_Setting;
        }(ui.button.Button_Tool));
        button.Button_Setting = Button_Setting;
        __reflect(Button_Setting.prototype, "ui.button.Button_Setting");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_Setting.js.map