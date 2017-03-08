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
        var Button_ZoomIn = (function (_super) {
            __extends(Button_ZoomIn, _super);
            function Button_ZoomIn() {
                var _this;
                var arr = ["zoom_in_default_png", "zoom_in_down_png"];
                _this = _super.call(this, arr) || this;
                return _this;
            }
            Button_ZoomIn.prototype.onclick = function () {
                console.log("频道选择 按钮点击了!");
            };
            return Button_ZoomIn;
        }(ui.button.Button_Tool));
        button.Button_ZoomIn = Button_ZoomIn;
        __reflect(Button_ZoomIn.prototype, "ui.button.Button_ZoomIn");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_ZoomIn.js.map