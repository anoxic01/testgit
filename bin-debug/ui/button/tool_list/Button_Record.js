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
        var Button_Record = (function (_super) {
            __extends(Button_Record, _super);
            function Button_Record() {
                var _this;
                var arr = ["record_default_png", "record_down_png"];
                _this = _super.call(this, arr) || this;
                return _this;
            }
            Button_Record.prototype.onclick = function () {
                console.log("频道选择 按钮点击了!");
            };
            return Button_Record;
        }(ui.button.Button_Tool));
        button.Button_Record = Button_Record;
        __reflect(Button_Record.prototype, "ui.button.Button_Record");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_Record.js.map