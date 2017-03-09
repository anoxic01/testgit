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
        var theme;
        (function (theme) {
            var MobileAppUI = (function (_super) {
                __extends(MobileAppUI, _super);
                function MobileAppUI(_mcAsset, $bShake) {
                    if ($bShake === void 0) { $bShake = false; }
                    var _this = _super.call(this, $bShake) || this;
                    // private m_btnIos				:SingleButtonMC;				
                    // private m_btnAndriod			:SingleButtonMC;
                    // private m_mcBtnIos_label		:MovieClip;
                    // private m_mcBtnAndriod_label	:MovieClip;
                    // private m_allSysBtn				:Array;
                    // private m_mcDetail				:MovieClip;
                    // private m_ctrlIos				:MobileCtrl;							//ios控制器
                    // private m_ctrlAnd				:MobileCtrl;							//android控制器
                    // private m_ctrlDetail			:MobileCtrl;							//详情页控制器
                    // private m_allCtrls				:Array;									//所欲控制器列表
                    // private m_curSysCtrl			:MobileCtrl;							//当前控制器
                    _this.m_iCurSys = -1; //当前显示的系统
                    _this.m_iCurLayout = -1; //当前布局类型
                    return _this;
                    // m_mcAsset = _mcAsset;
                    // m_mcAsset.x = -m_mcAsset.width*0.5;
                    // m_mcAsset.y = -m_mcAsset.height*0.5;
                    // this.addChild(m_mcAsset);
                    // nAssetWidth = 1236;
                    // nAssetHeight = 899;
                    // m_mcHot = _mcAsset.mc_hot;
                    // m_btnClose = new SingleButtonMC(_mcAsset.mc_close,close);
                    // m_btnIos = new SingleButtonMC(_mcAsset.btnIos,onIosClick);
                    // m_btnAndriod = new SingleButtonMC(_mcAsset.btnAndriod,onAndoidClick);
                    // m_mcBtnIos_label = _mcAsset.btnIos.btnIos_label;
                    // m_mcBtnAndriod_label = _mcAsset.btnAndriod.btnAndriod_label;
                    // m_allSysBtn = [m_btnIos,m_btnAndriod];
                    // m_mcDetail = MobileAppManager.getInstance().getInstanceByNameFromDomain("Link_HORIZONTAL");
                    // m_mcDetail.x = 621;
                    // m_mcDetail.y = 155;
                    // _mcAsset.addChild(m_mcDetail);
                    // m_ctrlIos = new MobileCtrlIos(MobileDefine.IOS,_mcAsset.mc_Ios,enterDetail);
                    // m_ctrlAnd = new MobileCtrlAnd(MobileDefine.ANDROID,_mcAsset.mc_Android,enterDetail);
                    // m_ctrlDetail = new MobileCtrlDetail(MobileDefine.DETAIL,m_mcDetail,backSys);
                    // m_allCtrls = [m_ctrlIos,m_ctrlAnd,m_ctrlDetail];
                }
                MobileAppUI.prototype.destroy = function () {
                    // m_bIsShow = false;
                    // fOnClose = null;
                    // m_btnIos.destroy();
                    // m_btnIos = null;
                    // m_btnAndriod.destroy();
                    // m_btnAndriod = null;
                    // if(m_allSysBtn)
                    // {
                    // 	for (var i:int = 0; i < m_allSysBtn.length; i++) 
                    // 	{
                    // 		m_allSysBtn[i] = null;
                    // 	}
                    // 	m_allSysBtn = null;
                    // }
                    // m_mcBtnIos_label=null;
                    // m_mcBtnAndriod_label=null;
                    // m_mcDetail = null;
                    // m_ctrlIos.destroy();
                    // m_ctrlIos=null;
                    // m_ctrlAnd.destroy();
                    // m_ctrlAnd=null;
                    // m_ctrlDetail.destroy();
                    // m_ctrlDetail=null;
                    // m_curSysCtrl=null;
                    // m_allCtrls = null;
                    // this.removeChild(m_mcAsset);
                    // m_mcAsset=null;
                    _super.prototype.destroy.call(this);
                };
                MobileAppUI.prototype.onIosClick = function (event) {
                    // setSys(MobileDefine.IOS);
                    // setLayout(MobileDefine.GRID);
                };
                MobileAppUI.prototype.onAndoidClick = function (event) {
                    this.setSys(define.MobileDefine.ANDROID);
                    this.setLayout(define.MobileDefine.GRID);
                };
                MobileAppUI.prototype.setSys = function (sys) {
                    if (this.m_iCurSys != sys) {
                    }
                };
                MobileAppUI.prototype.setLayout = function (layout) {
                    // if(m_curSysCtrl)
                    // {
                    // 	m_curSysCtrl.hide();
                    // }
                    // m_iCurLayout = layout;
                    // if(m_iCurLayout == MobileDefine.HORIZONTAL)
                    // {
                    // 	m_curSysCtrl = m_ctrlDetail;
                    // }
                    // else
                    // {
                    // 	if(m_iCurSys==MobileDefine.IOS)
                    // 	{
                    // 		m_curSysCtrl = m_ctrlIos;
                    // 	}
                    // 	else
                    // 	{
                    // 		m_curSysCtrl = m_ctrlAnd;
                    // 	}
                    // }
                    // if(m_curSysCtrl)
                    // {
                    // 	m_curSysCtrl.show();
                    // }
                };
                MobileAppUI.prototype.enterDetail = function (index) {
                    this.setLayout(define.MobileDefine.HORIZONTAL);
                    // var detailCtrl:MobileCtrlDetail = m_curSysCtrl as MobileCtrlDetail;
                    // detailCtrl.setSys(m_iCurSys);
                    // detailCtrl.setSelect(index);
                };
                MobileAppUI.prototype.backSys = function () {
                    this.setLayout(define.MobileDefine.GRID);
                };
                Object.defineProperty(MobileAppUI.prototype, "isShow", {
                    get: function () {
                        return this.m_bIsShow;
                    },
                    enumerable: true,
                    configurable: true
                });
                MobileAppUI.prototype.show = function () {
                    // m_bIsShow = true;
                    // setSys(MobileDefine.IOS);
                    // setLayout(MobileDefine.GRID);
                    // //
                    // onChangeLanguage();
                };
                MobileAppUI.prototype.hide = function () {
                    // m_bIsShow = false;
                    // setSys(-1);
                    // setLayout(MobileDefine.GRID);
                };
                MobileAppUI.prototype.onChangeLanguage = function () {
                    // m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
                    // m_mcBtnIos_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
                    // m_mcBtnAndriod_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
                    // if(m_curSysCtrl)
                    // {
                    // 	m_curSysCtrl.onChangeLanguage();
                    // }
                };
                MobileAppUI.prototype.close = function (event) {
                    // if(fOnClose)
                    // {
                    // 	fOnClose();
                    // }
                };
                return MobileAppUI;
            }(lobby.view.panel.PanelWindow));
            theme.MobileAppUI = MobileAppUI;
            __reflect(MobileAppUI.prototype, "lobby.view.theme.MobileAppUI");
        })(theme = view.theme || (view.theme = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=MobileAppUI.js.map