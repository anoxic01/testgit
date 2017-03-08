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
        var Button_Exit = (function (_super) {
            __extends(Button_Exit, _super);
            function Button_Exit() {
                var _this;
                var arr = ["exit_default_png", "exit_down_png"];
                _this = _super.call(this, arr) || this;
                return _this;
            }
            Button_Exit.prototype.onclick = function () {
                console.log("频道选择 按钮点击了!");
            };
            return Button_Exit;
        }(ui.button.Button_Tool));
        button.Button_Exit = Button_Exit;
        __reflect(Button_Exit.prototype, "ui.button.Button_Exit");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_Exit.js.map