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
        var Button_Tool = (function (_super) {
            __extends(Button_Tool, _super);
            function Button_Tool($arr) {
                var _this = _super.call(this) || this;
                _this.bSelect = false;
                _this.arr = $arr;
                _this.touchEnabled = true;
                mouse.setButtonMode(_this, true);
                mouse.setMouseMoveEnabled(true);
                _this.btn_bg_default = tool.BitmapTool.getInstance().createBitmapByName(_this.arr[0]);
                _this.addChild(_this.btn_bg_default);
                _this.btn_bg_over = tool.BitmapTool.getInstance().createBitmapByName(_this.arr[1]);
                _this.addEventListener(mouse.MouseEvent.MOUSE_OVER, _this.onOver, _this);
                _this.addEventListener(mouse.MouseEvent.MOUSE_OUT, _this.onOut, _this);
                _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouch, _this);
                _this.onOut(null);
                return _this;
            }
            Button_Tool.prototype.onOver = function (evt) {
                if (this.bSelect) {
                    return;
                }
                // console.log("mouse over ...........................");
                this.over();
            };
            Button_Tool.prototype.over = function () {
                if (this.contains(this.btn_bg_over) == false) {
                    this.addChild(this.btn_bg_over);
                }
                if (this.contains(this.btn_bg_default)) {
                    this.removeChild(this.btn_bg_default);
                }
            };
            Button_Tool.prototype.onOut = function (evt) {
                if (this.bSelect) {
                    return;
                }
                this.out();
            };
            Button_Tool.prototype.out = function () {
                if (this.contains(this.btn_bg_default) == false) {
                    this.addChild(this.btn_bg_default);
                }
                if (this.contains(this.btn_bg_over)) {
                    this.removeChild(this.btn_bg_over);
                }
            };
            Button_Tool.prototype.onTouch = function (e) {
                this.onClick();
            };
            Button_Tool.prototype.onClick = function () {
                // this.setSelect(!this.bSelect);
            };
            Button_Tool.prototype.setSelect = function (value) {
                if (this.bSelect != value) {
                    this.bSelect = value;
                    if (this.bSelect == true) {
                        this.over();
                    }
                    else {
                        this.out();
                    }
                }
            };
            return Button_Tool;
        }(egret.DisplayObjectContainer));
        button.Button_Tool = Button_Tool;
        __reflect(Button_Tool.prototype, "ui.button.Button_Tool");
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_Tool.js.map