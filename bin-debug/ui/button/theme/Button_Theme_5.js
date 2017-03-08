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
        var theme;
        (function (theme) {
            var Button_Theme_5 = (function (_super) {
                __extends(Button_Theme_5, _super);
                function Button_Theme_5() {
                    var _this;
                    var arr = [
                        "theme_bg_default_png",
                        "theme_bg_down_5_png",
                        "theme_icon_5_default_png",
                        "theme_icon_5_down_png",
                        "theme_label_5_cn_default_png",
                        "theme_label_5_cn_over_png",
                        "theme_label_5_tw_default_png",
                        "theme_label_5_tw_over_png"
                    ];
                    _this = _super.call(this, arr, false) || this;
                    return _this;
                }
                Button_Theme_5.prototype.onClick = function () {
                    console.log("theme_5 按钮点击了!");
                };
                return Button_Theme_5;
            }(theme.Button_Theme));
            theme.Button_Theme_5 = Button_Theme_5;
            __reflect(Button_Theme_5.prototype, "ui.button.theme.Button_Theme_5");
        })(theme = button.theme || (button.theme = {}));
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_Theme_5.js.map