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
        var Button_Recharge = (function (_super) {
            __extends(Button_Recharge, _super);
            function Button_Recharge() {
                var _this;
                var arr = ["recharge_default_png", "recharge_down_png"];
                _this = _super.call(this, arr) || this;
                return _this;
            }
            Button_Recharge.prototype.onclick = function () {
                console.log("频道选择 按钮点击了!");
            };
            return Button_Recharge;
        }(ui.button.Button_Tool));
        button.Button_Recharge = Button_Recharge;
        __reflect(Button_Recharge.prototype, "ui.button.Button_Recharge");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_Recharge.js.map