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
        var ThemeList = (function (_super) {
            __extends(ThemeList, _super);
            function ThemeList() {
                var _this = _super.call(this) || this;
                var bg = tool.BitmapTool.getInstance().createBitmapByName("theme_bg_png");
                _this.addChild(bg);
                _this.setData();
                return _this;
            }
            ThemeList.prototype.setData = function () {
                var m_vectorThemeList = [define.Define.THEME_2,
                    define.Define.THEME_0,
                    define.Define.THEME_3,
                    define.Define.THEME_4,
                    define.Define.THEME_5,
                    define.Define.THEME_6,
                    define.Define.THEME_1];
                var _index = 0;
                this.m_vecTheme = new Array();
                for (var i = 0; i < 7; i++) {
                    var themeItem = new lobby.view.ThemeItem(m_vectorThemeList[i], this);
                    this.addChild(themeItem);
                    themeItem.x = 274 * _index;
                    this.m_vecTheme.push(themeItem);
                    _index++;
                }
                if (this.m_currentTheme) {
                    this.m_currentTheme.setSelect(true);
                }
                else {
                }
            };
            ThemeList.prototype.setCurrent = function ($themeItem) {
                if ($themeItem.themeStruct.IsTelBet) {
                    // manager.LobbyManager.getInstance().enterTelLobby();
                    return;
                }
                if ($themeItem.themeStruct.ThemeID == define.Define.THEME_2) {
                }
                else {
                    //manager.LobbyManager.getInstance().sendSubscribeTheme($themeItem.themeStruct.ThemeID, this.m_currentTheme.themeStruct.ThemeID);
                    if (this.m_currentTheme) {
                        this.m_currentTheme.setSelect(false);
                    }
                    $themeItem.setSelect(true);
                    this.m_currentTheme = $themeItem;
                }
            };
            ThemeList.prototype.enable = function ($value) {
                var _len = this.m_vecTheme.length;
                for (var i = 0; i < _len; i++) {
                    this.m_vecTheme[i].touchEnabled = $value;
                    this.m_vecTheme[i].touchChildren = $value;
                    mouse.setButtonMode(this.m_vecTheme[i], $value);
                }
            };
            return ThemeList;
        }(egret.DisplayObjectContainer));
        view.ThemeList = ThemeList;
        __reflect(ThemeList.prototype, "lobby.view.ThemeList");
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=ThemeList.js.map