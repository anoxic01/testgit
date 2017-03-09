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
            var GameMsgWnd = (function (_super) {
                __extends(GameMsgWnd, _super);
                function GameMsgWnd() {
                    var _this = _super.call(this) || this;
                    _this.scale = 1;
                    return _this;
                }
                GameMsgWnd.prototype.resize = function (_w, _h) {
                    if (_w === void 0) { _w = 0; }
                    if (_h === void 0) { _h = 0; }
                    _super.prototype.resize.call(this, _w, _h);
                    if (this.m_bg) {
                        this.m_bmp.x = (this.m_bg.width - (this.m_bmp.width + this.m_bmp2.width)) >> 1;
                        this.m_bmp.y = (this.m_bg.height - this.m_bmp.height) >> 1;
                        this.m_bmp2.x = this.m_bmp.x + this.m_bmp.width + 10;
                        this.m_bmp2.y = (this.m_bg.height - this.m_bmp2.height) >> 1;
                    }
                    else {
                        this.m_bmp.x = (this.iWidth - (this.m_bmp.width + this.m_bmp2.width)) >> 1;
                        this.m_bmp.y = (this.iHeight - this.m_bmp.height) >> 1;
                        this.m_bmp2.x = this.m_bmp.x + this.m_bmp.width + 10;
                        this.m_bmp2.y = (this.iHeight - this.m_bmp2.height) >> 1;
                    }
                };
                GameMsgWnd.prototype.showBmp = function (key, keep) {
                    if (keep === void 0) { keep = false; }
                    this.m_bmp.visible = true;
                    var bmd = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, language.Language.sBmdBetStart);
                    this.m_bmp.bitmapData = bmd;
                    this.m_bmp.smoothing = true;
                    this.resize();
                    _super.prototype.show.call(this, "", keep);
                };
                GameMsgWnd.prototype.show = function (str, keep, time) {
                    if (keep === void 0) { keep = false; }
                    if (time === void 0) { time = 1.5; }
                    if (this.msg == str && this.msg != language.Language.sBmdBetSuccess && this.alpha > 0.4) {
                        return;
                    }
                    this.msg = str;
                    this.m_bmp2.bitmapData = null;
                    this.m_bmp2.visible = false;
                    if (GameMsgWnd.m_bmdTipArr.indexOf(str) > -1) {
                        var bmd = BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, str);
                        this.m_bmp.scaleX = this.m_bmp.scaleY = scale;
                        this.m_bmp.bitmapData = bmd;
                        this.m_bmp.smoothing = true;
                        if (time == 1.5 && this.m_bmp.width > 350) {
                            time = 2;
                        }
                        this.resize();
                        this.m_bmp.visible = true;
                        _super.prototype.show.call(this, "", keep, time);
                    }
                    else {
                        if (time == 1.5 && str.length > 12) {
                            time = 2;
                        }
                        _super.prototype.show.call(this, str, keep, time);
                        this.m_bmp.visible = false;
                    }
                    this.msg = str;
                };
                //含位图数字
                GameMsgWnd.prototype.show2 = function (str, value, keep, time) {
                    if (keep === void 0) { keep = false; }
                    if (time === void 0) { time = 1.5; }
                    if (this.msg == str && this.alpha > 0.4) {
                        return;
                    }
                    this.msg = str;
                    if (str == language.Language.sWinGold || str == language.Language.sLose) {
                        var bmd = BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, str);
                        this.m_bmp.scaleX = this.m_bmp.scaleY = this.scale;
                        this.m_bmp.bitmapData = bmd;
                        this.m_bmp.smoothing = true;
                        this.m_bmp.visible = true;
                        // 将数字的大小设置成与文字的大小一致 (美术已更换一致)
                        //m_bmp2.scaleX=m_bmp2.scaleY=bmd.height/bmd2.height;//scale;
                        if (this.scale != 1) {
                            this.m_bmp2.scaleX = this.scale;
                            this.m_bmp2.scaleY = this.scale;
                        }
                        var bmd2 = BitmapManager.getInstance().numberGold.conversion((value));
                        this.m_bmp2.bitmapData = bmd2;
                        this.m_bmp2.smoothing = true;
                        this.m_bmp2.visible = true;
                        this.resize();
                        if (this.m_bmp.width + this.m_bmp2.width > 220) {
                            this.m_bmp.scaleX = this.m_bmp.scaleY = this.scale - 0.2;
                            this.m_bmp2.scaleX = this.m_bmp2.scaleY = this.scale - 0.2;
                        }
                        _super.prototype.show.call(this, "", keep, time);
                    }
                };
                GameMsgWnd.prototype.onChangeLanguage = function () {
                    var bmd = BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, this.msg);
                    this.m_bmp.scaleX = this.m_bmp.scaleY = this.scale;
                    this.m_bmp.bitmapData = bmd;
                    this.m_bmp.smoothing = true;
                    if (this.m_bmp2 && this.scale != 1) {
                        this.m_bmp2.scaleX = this.scale;
                        this.m_bmp2.scaleY = this.scale;
                    }
                };
                return GameMsgWnd;
            }(windows.MessageWindow));
            GameMsgWnd.m_bmdTipArr = [language.Language.sBmdBetWait,
                language.Language.sBmdBetStart,
                language.Language.sBmdBetStop,
                language.Language.sBmdBetSuccess,
                language.Language.sFailGame,
                language.Language.sFinalGame,
                language.Language.sNoWin,
                language.Language.sMaintain_Theme,
                language.Language.sBalanceNoEnough];
            windows.GameMsgWnd = GameMsgWnd;
            __reflect(GameMsgWnd.prototype, "lobby.view.windows.GameMsgWnd");
        })(windows = view.windows || (view.windows = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=GameMsgWnd.js.map