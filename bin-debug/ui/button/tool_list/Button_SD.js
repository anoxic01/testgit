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
        var Button_SD = (function (_super) {
            __extends(Button_SD, _super);
            function Button_SD() {
                var _this;
                var arr = ["sd_default_png", "sd_down_png"];
                _this = _super.call(this, arr) || this;
                return _this;
            }
            Button_SD.prototype.onclick = function () {
                console.log("频道选择 按钮点击了!");
            };
            return Button_SD;
        }(ui.button.Button_Tool));
        button.Button_SD = Button_SD;
        __reflect(Button_SD.prototype, "ui.button.Button_SD");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_SD.js.map