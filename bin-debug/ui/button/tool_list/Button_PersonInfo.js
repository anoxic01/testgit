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
        var Button_PersonInfo = (function (_super) {
            __extends(Button_PersonInfo, _super);
            function Button_PersonInfo() {
                var _this;
                var arr = ["person_info_default_png", "person_info_down_png"];
                _this = _super.call(this, arr) || this;
                return _this;
            }
            Button_PersonInfo.prototype.onclick = function () {
                console.log("频道选择 按钮点击了!");
            };
            return Button_PersonInfo;
        }(ui.button.Button_Tool));
        button.Button_PersonInfo = Button_PersonInfo;
        __reflect(Button_PersonInfo.prototype, "ui.button.Button_PersonInfo");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_PersonInfo.js.map