module lobby.view.theme {
	export class MobileAppUI extends lobby.view.panel.PanelWindow {

		// private m_btnIos				:SingleButtonMC;				
		// private m_btnAndriod			:SingleButtonMC;
		// private m_mcBtnIos_label		:MovieClip;
		// private m_mcBtnAndriod_label	:MovieClip;
		// private m_allSysBtn				:any[];
		// private m_mcDetail				:MovieClip;
		// private m_ctrlIos				:MobileCtrl;							//ios控制器
		// private m_ctrlAnd				:MobileCtrl;							//android控制器
		// private m_ctrlDetail			:MobileCtrl;							//详情页控制器
		// private m_allCtrls				:any[];									//所欲控制器列表
		// private m_curSysCtrl			:MobileCtrl;							//当前控制器
		private m_iCurSys				:number				 = -1;				//当前显示的系统
		private m_iCurLayout			:number				 = -1;				//当前布局类型
		private m_bIsShow				: boolean;								//是否显示
		public fOnClose					:Function;						//关闭回调

		public constructor(_mcAsset:egret.MovieClip ,$bShake: boolean = false) {
			super($bShake);
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
			
			// m_mcDetail = MobileAppManager.getInstance().createBitmapByName("Link_HORIZONTAL");
			// m_mcDetail.x = 621;
			// m_mcDetail.y = 155;
			// _mcAsset.addChild(m_mcDetail);
			
			// m_ctrlIos = new MobileCtrlIos(MobileDefine.IOS,_mcAsset.mc_Ios,enterDetail);
			// m_ctrlAnd = new MobileCtrlAnd(MobileDefine.ANDROID,_mcAsset.mc_Android,enterDetail);
			// m_ctrlDetail = new MobileCtrlDetail(MobileDefine.DETAIL,m_mcDetail,backSys);
			// m_allCtrls = [m_ctrlIos,m_ctrlAnd,m_ctrlDetail];
		}

		public destroy():void
		{
			// m_bIsShow = false;
			// fOnClose = null;
			// m_btnIos.destroy();
			// m_btnIos = null;
			// m_btnAndriod.destroy();
			// m_btnAndriod = null;
			// if(m_allSysBtn)
			// {
			// 	for (var i:number = 0; i < m_allSysBtn.length; i++) 
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
			super.destroy();
		}
		private onIosClick(event:MouseEvent):void
		{
			// setSys(MobileDefine.IOS);
			// setLayout(MobileDefine.GRID);
		}
		private onAndoidClick(event:MouseEvent):void
		{
			this.setSys(define.MobileDefine.ANDROID);
			this.setLayout(define.MobileDefine.GRID);
		}
		private setSys(sys:number):void
		{
			if(this.m_iCurSys != sys)
			{
				// btnSys:SingleButtonMC;
				// btnSys = m_allSysBtn[m_iCurSys];
				// if(btnSys)
				// {
				// 	btnSys.setSelectedStatus(false);
				// }
				// m_iCurSys = sys;
				// btnSys = m_allSysBtn[m_iCurSys];
				// if(btnSys)
				// {
				// 	btnSys.setSelectedStatus(true);
				// }
			}
		}
		private setLayout(layout:number):void
		{
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
		}
		private enterDetail(index:number):void
		{
			this.setLayout(define.MobileDefine.HORIZONTAL);
			// detailCtrl:MobileCtrlDetail = m_curSysCtrl as MobileCtrlDetail;
			// detailCtrl.setSys(m_iCurSys);
			// detailCtrl.setSelect(index);
		}
		private backSys():void
		{
			this.setLayout(define.MobileDefine.GRID);
		}
		get isShow(): boolean
		{
			return this.m_bIsShow;
		}
		public show():void {
			// m_bIsShow = true;
			// setSys(MobileDefine.IOS);
			// setLayout(MobileDefine.GRID);
			// //
			// onChangeLanguage();
		}
		public hide():void 
		{
			// m_bIsShow = false;
			// setSys(-1);
			// setLayout(MobileDefine.GRID);
		}
		public onChangeLanguage():void {
			// m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			// m_mcBtnIos_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			// m_mcBtnAndriod_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			// if(m_curSysCtrl)
			// {
			// 	m_curSysCtrl.onChangeLanguage();
			// }
		}
		private close(event:MouseEvent):void
		{
			// if(fOnClose)
			// {
			// 	fOnClose();
			// }
		}


	}
}