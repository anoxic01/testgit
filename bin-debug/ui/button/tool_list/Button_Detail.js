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
        var Button_Detail = (function (_super) {
            __extends(Button_Detail, _super);
            function Button_Detail() {
                var _this;
                var arr = ["detail_default_png", "detail_down_png"];
                _this = _super.call(this, arr) || this;
                return _this;
            }
            Button_Detail.prototype.onclick = function () {
                console.log("频道选择 按钮点击了!");
            };
            return Button_Detail;
        }(ui.button.Button_Tool));
        button.Button_Detail = Button_Detail;
        __reflect(Button_Detail.prototype, "ui.button.Button_Detail");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_Detail.js.map