var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var windows;
        (function (windows) {
            var MessageWindow = (function (_super) {
                __extends(MessageWindow, _super);
                function MessageWindow(w, h, size) {
                    if (w === void 0) { w = 700; }
                    if (h === void 0) { h = 200; }
                    if (size === void 0) { size = 38; }
                    var _this = _super.call(this) || this;
                    //		protected 	m_mcAsset			:	MovieClip;
                    _this.m_subAlpha = 0.25;
                    _this.m_moveDis = 1;
                    _this.m_subX = 20;
                    _this.duration = 0.35;
                    _this.keepTime = 2;
                    _this.m_delayHide = 1000;
                    _this.iTxtSize = 38;
                    _this.uTxtColor = 0xFFFF99;
                    _this.sAutoSize = "left";
                    _this.iWidth = 0;
                    _this.iHeight = 0;
                    _this.bAutoSize = true;
                    _this.iWidth = w;
                    _this.iHeight = h;
                    _this.m_point = new egret.Point();
                    _this.iTxtSize = size;
                    _this.initText();
                    _this.lockWindow = false;
                    _this.touchEnabled = false;
                    _this.touchChildren = false;
                    _this.visible = false;
                    return _this;
                }
                MessageWindow.prototype.setFontSize = function (value) {
                    this.iTxtSize = value;
                    this.m_textField.size = value;
                    this.resize();
                };
                MessageWindow.prototype.destroy = function () {
                    if (this.m_bg) {
                        if (this.m_bg.parent) {
                            this.m_bg.parent.removeChild(this.m_bg);
                        }
                        this.m_bg = null;
                    }
                    if (this.m_textField) {
                        if (this.m_textField.parent) {
                            this.m_textField.parent.removeChild(this.m_textField);
                        }
                        this.m_textField = null;
                    }
                    if (this.m_point) {
                        this.m_point = null;
                    }
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                    this.container = null;
                };
                MessageWindow.prototype.initText = function () {
                    this.m_textField = new egret.TextField();
                    this.m_textField.textAlign = this.sAutoSize;
                    this.m_textField.bold = true;
                    this.m_textField.size = this.iTxtSize;
                    this.m_textField.textColor = this.uTxtColor;
                    //			m_textField.x					= (m_bg.width - m_textField.width) >> 1;
                    //			m_textField.y					= (m_bg.height - m_textField.height) >> 1;
                    this.m_textField.multiline = false;
                    this.addChild(this.m_textField);
                };
                MessageWindow.prototype.clearMsg = function () {
                    this.m_textField.text = "";
                };
                MessageWindow.prototype.show = function (str, keep, time) {
                    if (keep === void 0) { keep = false; }
                    if (time === void 0) { time = 1.5; }
                    if (this.m_textField == null)
                        return;
                    this.m_textField.text = str;
                    this.bKeep = keep;
                    this.keepTime = time;
                    this.resize();
                    if (this.parent == null && this.container) {
                        this.container.addChild(this);
                    }
                    this.visible = true;
                    if (!keep) {
                        this.alpha = 0;
                    }
                    var tw = egret.Tween.get(this);
                    tw.to({ alpha: 1 }, this.duration).call(this.onComplete).wait(this.keepTime)
                        .to({ alpha: 0 }, this.duration).call(this.tweenOnComplete);
                };
                MessageWindow.prototype.onComplete = function () {
                };
                MessageWindow.prototype.resize = function (_w, _h) {
                    if (_w === void 0) { _w = 0; }
                    if (_h === void 0) { _h = 0; }
                    if (this.m_bg) {
                        if (this.m_textField.width > this.m_bg.width) {
                            manager.TextManager.getInstance().adjust(this.m_textField, this.m_bg.width - 20);
                        }
                        this.m_textField.x = (this.m_bg.width - this.m_textField.width) >> 1;
                        this.m_textField.y = (this.m_bg.height - this.m_textField.height) >> 1;
                    }
                    else {
                        if (this.m_textField.width >= this.iWidth) {
                            manager.TextManager.getInstance().adjust(this.m_textField, this.iWidth - 20);
                        }
                        this.m_textField.x = (this.iWidth - this.m_textField.width) >> 1;
                        this.m_textField.y = (this.iHeight - this.m_textField.height) >> 1;
                    }
                };
                MessageWindow.prototype.onFadeIn = function () {
                    var tw = egret.Tween.get(this);
                    tw.to({ alpha: 1 }, this.duration);
                };
                MessageWindow.prototype.hideMessage = function () {
                    this.hide();
                };
                MessageWindow.prototype.hide = function () {
                    this.bKeep = false;
                    var tw = egret.Tween.get(this);
                    tw.to({ alpha: 0 }, this.duration).call(this.tweenOnComplete);
                    //容错处理  remove后 自动destroy 可能为null;
                };
                MessageWindow.prototype.tweenOnComplete = function () {
                    this.visible = false;
                    this.keepTime = 1.5;
                    if (parent) {
                        this.parent.removeChild(this);
                    }
                };
                return MessageWindow;
            }(egret.DisplayObjectContainer));
            windows.MessageWindow = MessageWindow;
            __reflect(MessageWindow.prototype, "lobby.view.windows.MessageWindow");
        })(windows = view.windows || (view.windows = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=MessageWindow.js.map