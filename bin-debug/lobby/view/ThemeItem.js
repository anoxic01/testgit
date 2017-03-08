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
        var ThemeItem = (function (_super) {
            __extends(ThemeItem, _super);
            function ThemeItem($themeID, $themeList) {
                var _this = _super.call(this) || this;
                _this.m_bSelect = false; //选中状态
                _this.m_buttonMode = false; //鼠标手型
                _this.m_themeList = $themeList;
                _this.themeStruct = new lobby.struct.Struct_Theme();
                _this.themeStruct.ThemeID = $themeID;
                switch ($themeID) {
                    case define.Define.THEME_0:
                        _this.m_mcAsset = new ui.button.theme.Button_Theme_0();
                        break;
                    case define.Define.THEME_1:
                        _this.m_mcAsset = new ui.button.theme.Button_Theme_1();
                        //临时处理
                        _this.themeStruct.IsTelBet = true;
                        break;
                    case define.Define.THEME_2:
                        _this.m_mcAsset = new ui.button.theme.Button_Theme_2();
                        break;
                    case define.Define.THEME_3:
                        _this.m_mcAsset = new ui.button.theme.Button_Theme_3();
                        break;
                    case define.Define.THEME_4:
                        _this.m_mcAsset = new ui.button.theme.Button_Theme_4();
                        break;
                    case define.Define.THEME_5:
                        _this.m_mcAsset = new ui.button.theme.Button_Theme_5();
                        break;
                    case define.Define.THEME_6:
                        _this.m_mcAsset = new ui.button.theme.Button_Theme_6();
                        break;
                }
                if (_this.m_mcAsset == null) {
                    console.log("厅馆按钮初始异常。。。", $themeID);
                    return _this;
                }
                else {
                    _this.m_mcAsset.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onClick, _this);
                }
                _this.addChild(_this.m_mcAsset);
                return _this;
            }
            ThemeItem.prototype.setSelect = function ($value) {
                this.m_mcAsset.setSelect($value);
            };
            ThemeItem.prototype.onClick = function (evt) {
                if (this.themeStruct == null) {
                    //manager.LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
                    return;
                }
                if (this.m_mcAsset.bSelect) {
                    return;
                }
                if (this.m_themeList) {
                    this.m_themeList.setCurrent(this);
                }
                //屏蔽厅馆按钮
                // if( this.themeStruct.ThemeID != config.TemConfig.getInstance().PhoneBetID ){   //臨時處理
                // 	manager.LobbyManager.getInstance().lobbyView.themeList.enable(false);
                // }
            };
            return ThemeItem;
        }(egret.DisplayObjectContainer));
        view.ThemeItem = ThemeItem;
        __reflect(ThemeItem.prototype, "lobby.view.ThemeItem");
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=ThemeItem.js.map