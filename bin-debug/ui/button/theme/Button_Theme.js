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
            var Button_Theme = (function (_super) {
                __extends(Button_Theme, _super);
                /*
                    $bClick, 是否添加点击侦听
                */
                function Button_Theme($arr, $bClick) {
                    var _this = _super.call(this) || this;
                    _this.bSelect = false;
                    _this.arr = $arr;
                    /*this.btn = new eui.Button();
                    this.btn.skinName = "resource/eui_skins/button/theme/ButtonSkin_Theme_0.exml";
                    this.addChild(this.btn);
                    this.touchEnabled = true;
                    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
                    console.log("初始化 theme_0 按钮!");*/
                    _this.touchEnabled = true;
                    mouse.setButtonMode(_this, true);
                    mouse.setMouseMoveEnabled(true);
                    _this.btn_bg_default = tool.BitmapTool.getInstance().createBitmapByName(_this.arr[0]);
                    _this.addChild(_this.btn_bg_default);
                    _this.btn_bg_over = tool.BitmapTool.getInstance().createBitmapByName(_this.arr[1]);
                    _this.icon_default = tool.BitmapTool.getInstance().createBitmapByName(_this.arr[2]);
                    _this.addChild(_this.icon_default);
                    _this.icon_over = tool.BitmapTool.getInstance().createBitmapByName(_this.arr[3]);
                    _this.icon_default.x = 53;
                    _this.icon_default.y = 23;
                    _this.icon_over.x = 53;
                    _this.icon_over.y = 23;
                    _this.addEventListener(mouse.MouseEvent.MOUSE_OVER, _this.onOver, _this);
                    _this.addEventListener(mouse.MouseEvent.MOUSE_OUT, _this.onOut, _this);
                    if ($bClick) {
                        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouch, _this);
                    }
                    _this.onChangeLanguage();
                    _this.onOut(null);
                    return _this;
                }
                Button_Theme.prototype.onOver = function (evt) {
                    if (this.bSelect) {
                        return;
                    }
                    // console.log("mouse over ...........................");
                    this.over();
                };
                Button_Theme.prototype.over = function () {
                    if (this.contains(this.btn_bg_over) == false) {
                        this.addChild(this.btn_bg_over);
                    }
                    if (this.contains(this.btn_bg_default)) {
                        this.removeChild(this.btn_bg_default);
                    }
                    if (this.contains(this.icon_over) == false) {
                        this.addChild(this.icon_over);
                    }
                    if (this.contains(this.icon_default)) {
                        this.removeChild(this.icon_default);
                    }
                    if (this.contains(this.label_over) == false) {
                        this.addChild(this.label_over);
                    }
                    if (this.contains(this.label_default)) {
                        this.removeChild(this.label_default);
                    }
                };
                Button_Theme.prototype.onOut = function (evt) {
                    if (this.bSelect) {
                        return;
                    }
                    this.out();
                };
                Button_Theme.prototype.out = function () {
                    if (this.contains(this.btn_bg_default) == false) {
                        this.addChild(this.btn_bg_default);
                    }
                    if (this.contains(this.btn_bg_over)) {
                        this.removeChild(this.btn_bg_over);
                    }
                    if (this.contains(this.icon_default) == false) {
                        this.addChild(this.icon_default);
                    }
                    if (this.contains(this.icon_over)) {
                        this.removeChild(this.icon_over);
                    }
                    if (this.contains(this.label_default) == false) {
                        this.addChild(this.label_default);
                    }
                    if (this.contains(this.label_over)) {
                        this.removeChild(this.label_over);
                    }
                };
                Button_Theme.prototype.onTouch = function (e) {
                    this.onClick();
                };
                Button_Theme.prototype.onClick = function () {
                };
                Button_Theme.prototype.disabled = function () {
                    this.touchEnabled = false;
                    // this.btn.currentState = "disabled";
                };
                Button_Theme.prototype.setSelect = function (value) {
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
                Button_Theme.prototype.onChangeLanguage = function () {
                    if (this.label_default) {
                        if (this.contains(this.label_default)) {
                            this.removeChild(this.label_default);
                        }
                        this.label_default = null;
                    }
                    if (this.label_over) {
                        if (this.contains(this.label_over)) {
                            this.removeChild(this.label_over);
                        }
                        this.label_over = null;
                    }
                    switch (manager.LobbyManager.getInstance().lobbyAuth.iLang) {
                        case 0:
                            this.label_default = tool.BitmapTool.getInstance().createBitmapByName(this.arr[4]);
                            this.addChild(this.label_default);
                            this.label_over = tool.BitmapTool.getInstance().createBitmapByName(this.arr[5]);
                            // this.addChild(this.label_over);
                            break;
                        case 1:
                        case 2:
                            this.label_default = tool.BitmapTool.getInstance().createBitmapByName(this.arr[6]);
                            this.addChild(this.label_default);
                            this.label_over = tool.BitmapTool.getInstance().createBitmapByName(this.arr[7]);
                            // this.addChild(this.label_over);
                            break;
                    }
                    if (this.label_default) {
                        this.label_default.x = 122;
                        this.label_default.y = 39;
                    }
                    if (this.label_over) {
                        this.label_over.x = 122;
                        this.label_over.y = 39;
                    }
                };
                return Button_Theme;
            }(egret.DisplayObjectContainer));
            theme.Button_Theme = Button_Theme;
            __reflect(Button_Theme.prototype, "ui.button.theme.Button_Theme");
        })(theme = button.theme || (button.theme = {}));
    })(button = ui.button || (ui.button = {}));
})(ui || (ui = {}));
//# sourceMappingURL=Button_Theme.js.map