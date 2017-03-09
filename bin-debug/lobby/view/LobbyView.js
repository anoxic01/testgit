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
        var LobbyView = (function (_super) {
            __extends(LobbyView, _super);
            function LobbyView() {
                var _this = _super.call(this) || this;
                //		private m_iComplete				:	number;							//缓动完成次数
                //		private m_bmpSnapshot			:	Bitmap;							//截屏
                _this.m_iSnapshotX = -16;
                _this.m_iSnapshotY = 400;
                //		private _transition				:	ThemeTransition;
                _this.m_iSpace = 100; //滚动间距
                _this.m_iWheelY = 286; //当前坐标
                var lobbyAuth;
                lobbyAuth = new lobby.data.LobbyAuth();
                manager.LobbyManager.getInstance().initialize(lobbyAuth, _this);
                _this.information = new view.LobbyInformation();
                _this.addChild(_this.information);
                _this.toolView = new lobby.view.LobbyToolList();
                _this.addChild(_this.toolView);
                // console.log(this.toolList.width);
                _this.toolView.x = manager.LobbyManager.getInstance().stageW - 605;
                _this.toolView.y = 15;
                _this.advertisement = new view.advertisements.Advertisement();
                _this.addChild(_this.advertisement);
                _this.advertisement.x = 0;
                _this.advertisement.y = 56;
                _this.liveVideo = new view.lives.LiveVideo();
                _this.addChild(_this.liveVideo);
                _this.liveVideo.x = 1496;
                _this.liveVideo.y = 56;
                _this.themeList = new view.theme.ThemeList();
                _this.addChild(_this.themeList);
                _this.themeList.x = 0;
                _this.themeList.y = 296;
                return _this;
            }
            LobbyView.prototype.initTableList = function (_spContent, _scroll, _vec, _iIndex, _bInit) {
                // console.log("初始化桌子：>> ",System.totalMemory);
                // var time : number = getTimer();
                if (_bInit === void 0) { _bInit = true; }
                // _scroll.resize( 1920, m_uScrollHeight );
                //大厅列表
                var _themeVec = lobby.data.LobbyData.getInstance().lobbyInfo.themeVec;
                var _tableVec = _themeVec[_iIndex].TableList;
                this.uCurrentThemeID = _themeVec[_iIndex].ThemeID;
                /** 试玩过滤 **/
                var bShow;
                var _tableVecLen = _tableVec.length;
                var _table;
                var _tableStruct;
                for (var i = 0; i < _tableVecLen; i++) {
                    _tableStruct = _tableVec[i];
                    switch (_tableStruct.GameID) {
                        case define.GameDefine.BAC:
                            _table = new view.table.TableBaccarat();
                            break;
                        case define.GameDefine.SIC:
                            _table = new view.table.TableSic();
                            break;
                        case define.GameDefine.ROU:
                            _table = new view.table.TableRoulette();
                            break;
                        case define.GameDefine.DTF:
                            _table = new view.table.TableDTF();
                            break;
                    }
                    _table.visible = true;
                    _table.setData(_tableStruct);
                    //				_table.cacheAsBitmap = true;
                    _table.x = ((i % 2) * 950);
                    _table.y = ((i / 2) * 281);
                    _scroll.add(_table);
                    _vec.push(_table);
                }
                this.m_bResizeForUp = false;
                this.m_bResizeForDown = true;
                _spContent.addChild(_scroll);
                if (this.themeList.currentTheme) {
                    if (this.themeList.currentTheme.themeStruct.IsMaintaining) {
                        this.m_spTableListMask.graphics.clear();
                        this.m_spTableListMask.graphics.beginFill(0x00000, 0.5);
                        this.m_spTableListMask.graphics.drawRoundRect(0, 0, 1900, 1080, 10, 10);
                        this.m_spTableListMask.graphics.endFill();
                        this.m_spTableListMask.addChild(this.m_themeMaintain);
                        this.showThemeMaintenance();
                    }
                    else {
                        this.m_spTableListMask.graphics.clear();
                        this.hideThemeMaintenance();
                    }
                }
                if (_spContent.numChildren > 1) {
                    console.log("子容器大于1&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                }
                if (this.m_transition_4) {
                    this.m_transition_4.visible = false;
                }
                //			if(_transition)
                //			{
                //				_transition.removeFromParent();
                //			}
                //恢复厅馆按钮
                this.themeList.enable(true);
                var _ve = lobby.data.LobbyData.getInstance().lobbyInfo.themeVec;
                // console.log("初始桌子需要时间：",getTimer()-time, "********************************************************************************");
                if (_bInit) {
                    this.vecTablesCurrent = this.vecTablesFront;
                }
            };
            //厅馆维护
            LobbyView.prototype.showThemeMaintenance = function () {
                if (this.m_themeMaintain) {
                    this.m_spTableListMask.graphics.clear();
                    this.m_spTableListMask.graphics.beginFill(0x000000, 0.5);
                    this.m_spTableListMask.graphics.drawRoundRect(0, 0, 2000, this.m_uScrollHeight, 10, 10);
                    this.m_spTableListMask.graphics.endFill();
                    this.m_spTableListMask.addChild(this.m_themeMaintain);
                    this.m_themeMaintain.container = this.spTableListFront;
                    this.m_themeMaintain.show(language.Language.sMaintain_Theme, true);
                }
            };
            LobbyView.prototype.hideThemeMaintenance = function () {
                if (this.m_themeMaintain) {
                    this.m_themeMaintain.hide();
                    this.m_spTableListMask.graphics.clear();
                }
            };
            return LobbyView;
        }(egret.DisplayObjectContainer));
        view.LobbyView = LobbyView;
        __reflect(LobbyView.prototype, "lobby.view.LobbyView");
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=LobbyView.js.map