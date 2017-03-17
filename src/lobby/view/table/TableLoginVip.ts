module lobby.view.table {
	export class TableLoginVip {
//		private var m_btnSideBet						:	ButtonMcLanguage;					//旁观下注
//		private var m_btnLogin							:	ButtonMcLanguage;					//进座下注
//		private var m_btnVip							:	ButtonMcLanguage;					//包桌
		
		private var m_btnSideBet	:	MMovieClip;					//旁观下注
		private var m_btnLogin		:	MMovieClip;					//进座下注
		private var m_btnVip		:	MMovieClip;					//包桌
//		private var m_bAnimation	:	Boolean;					//播放状态
		private var m_bSideVisible	:	Boolean;
		private var m_bLoginVisible	:	Boolean;
		private var m_bVipVisible	:	Boolean;
		
		
		public constructor( _tableStruct:TableStruct ) {
		
			super();
			
			m_tableStruct = _tableStruct;
			
			m_limitStruct = LobbyData.getInstance().getBetLimitByGL(m_tableStruct.GameID, m_tableStruct.BetLimitID);
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Login_Vip_Asset") ;
			this.addChild(m_mcAsset);
			
			m_btnSideBet = new MMovieClip(m_mcAsset.mc_0);
			m_btnSideBet.mcAsset.buttonMode = true;
			m_btnSideBet.mcAsset.mouseChildren = false;
			m_btnSideBet.mcAsset.visible = false;
			m_btnSideBet.gotoAndStop(normal);
			m_btnSideBet.mcAsset.addEventListener(MouseEvent.ROLL_OVER,btnSideBetover);
			m_btnSideBet.mcAsset.addEventListener(MouseEvent.ROLL_OUT,btnSideBetout);
			m_btnSideBet.mcAsset.addEventListener(MouseEvent.CLICK,btnSideBetonClick);
			m_btnSideBet.addFrameScript(19,function():void{
				if(m_btnSideBet){
					m_btnSideBet.currentFrame = 2;
				}
			});
			m_btnSideBet.addFrameScript(28,function():void{
				if(m_btnSideBet){
					m_btnSideBet.gotoAndStop(29);
				}
			});
			m_btnSideBet.addFrameScript(39,function():void{
				if(m_btnSideBet){
					m_btnSideBet.gotoAndStop(40);
				}
			});
//			m_btnSideBet.addFrameScript(showFrame,checkStatus);
			
			
			m_btnLogin = new MMovieClip(m_mcAsset.mc_1);
			m_btnLogin.mcAsset.buttonMode = true;
			m_btnLogin.mcAsset.mouseChildren = false;
			m_btnLogin.mcAsset.visible = false;
			m_btnLogin.gotoAndStop(normal);
			m_btnLogin.mcAsset.addEventListener(MouseEvent.ROLL_OVER,Loginover);
			m_btnLogin.mcAsset.addEventListener(MouseEvent.ROLL_OUT,Loginout);
			m_btnLogin.mcAsset.addEventListener(MouseEvent.CLICK,LoginonClick);
			m_btnLogin.addFrameScript(19,function():void{
				m_btnLogin.currentFrame = 2;
			});
			m_btnLogin.addFrameScript(28,function():void{
				if(m_btnLogin){
					m_btnLogin.gotoAndStop(29);
				}
			});
			m_btnLogin.addFrameScript(39,function():void{
				if(m_btnLogin){
					m_btnLogin.gotoAndStop(40);
				}
			});
			
			m_btnVip = new MMovieClip(m_mcAsset.mc_2);
			m_btnVip.mcAsset.buttonMode = true;
			m_btnVip.mcAsset.mouseChildren = false;
			m_btnVip.mcAsset.visible = false;
			m_btnVip.gotoAndStop(normal);
			m_btnVip.mcAsset.addEventListener(MouseEvent.ROLL_OVER,Vipover);
			m_btnVip.mcAsset.addEventListener(MouseEvent.ROLL_OUT,Vipout);
			m_btnVip.mcAsset.addEventListener(MouseEvent.CLICK,ViponClick);
			m_btnVip.addFrameScript(19,function():void{
				if(m_btnVip){
					m_btnVip.currentFrame = 2;
				}
			});
			m_btnVip.addFrameScript(28,function():void{
				if(m_btnVip){
					m_btnVip.gotoAndStop(29);
				}
			});
			m_btnVip.addFrameScript(39,function():void{
				if(m_btnVip){
					m_btnVip.gotoAndStop(40);
				}
			});
			
			updateStatus();
			onChangeLanguage();
		}
		
		protected function btnSideBetover(event:MouseEvent):void
		{
//			if(m_bAnimation){
//				return;
//			}
			if(m_btnSideBet){
				m_btnSideBet.gotoAndPlay("HOVER");
			}
		}
		
		protected function btnSideBetout(event:MouseEvent):void
		{
//			if(m_bAnimation){
//				return;
//			}
			if(m_btnSideBet){
				m_btnSideBet.gotoAndStop("DEFAULT");
			}
		}
		
		protected function btnSideBetonClick(event:MouseEvent):void
		{
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			if(playerTableOwnStatusStruct){
				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
					m_tableStruct.joinTableType = JoinTableType.CHARTER_OTHER;
					needPwd(m_tableStruct);
				});
			}else{
				m_tableStruct.joinTableType = JoinTableType.CHARTER_OTHER;
				needPwd(m_tableStruct);
			}
			
			SoundManager.getInstance().play(SoundPackage.sEnterGame);
		}
		
		protected function Loginover(event:MouseEvent):void
		{
//			if(m_bAnimation){
//				return;
//			}
			if(m_btnLogin){
				m_btnLogin.gotoAndPlay("HOVER");
			}
		}
		
		protected function Loginout(event:MouseEvent):void
		{
//			if(m_bAnimation){
//				return;
//			}
			if(m_btnLogin){
				m_btnLogin.gotoAndStop("DEFAULT");
			}
		}
		
		protected function LoginonClick(event:MouseEvent):void
		{
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			if(playerTableOwnStatusStruct){
				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
					m_tableStruct.joinTableType = JoinTableType.CHARTER_TABLER;
					needPwd(m_tableStruct);
				});
			}else{
				if(IsAllowToLogin()){
					m_tableStruct.joinTableType = JoinTableType.CHARTER_TABLER;
					needPwd(m_tableStruct);
				}
			}
			
			SoundManager.getInstance().play(SoundPackage.sEnterGame);
		}
		
		protected function Vipover(event:MouseEvent):void
		{
//			if(m_bAnimation){
//				return;
//			}
			if(m_btnVip){
				m_btnVip.gotoAndPlay("HOVER");
			}
		}
		
		protected function Vipout(event:MouseEvent):void
		{
//			if(m_bAnimation){
//				return;
//			}
			if(m_btnVip){
				m_btnVip.gotoAndStop("DEFAULT");
			}
		}
		
		protected function ViponClick(event:MouseEvent):void
		{
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			
			if(playerTableOwnStatusStruct && playerTableOwnStatusStruct.IsTableOwner && playerTableOwnStatusStruct.PlayerID==Player.getInstance().iPlayerID){
				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
					LobbyManager.getInstance().gamePoint = getGlobalPoint();
					//桌主保留进桌 ，CType需填3
					m_tableStruct.joinTableType = JoinTableType.CHARTER_TABLE_OWNER;
					m_tableStruct.CharterSettingInfo.CType = 3;
					LobbyManager.getInstance().enterGame(m_tableStruct);
				});
			}else{
				if(IsAllowToLogin(true)){
					LobbyManager.getInstance().showTableSetting(m_tableStruct);
				}
			}
			SoundManager.getInstance().play(SoundPackage.sEnterGame);
		}
		
		override public function destroy():void{
			
			if(m_btnSideBet){
				m_btnSideBet.mcAsset.removeEventListener(MouseEvent.ROLL_OVER,btnSideBetover);
				m_btnSideBet.mcAsset.removeEventListener(MouseEvent.ROLL_OUT,btnSideBetout);
				m_btnSideBet.mcAsset.removeEventListener(MouseEvent.CLICK,btnSideBetonClick);
				m_btnSideBet.dispose();
				m_btnSideBet = null;
			}
			if(m_btnLogin){
				m_btnLogin.mcAsset.removeEventListener(MouseEvent.ROLL_OVER,Loginover);
				m_btnLogin.mcAsset.removeEventListener(MouseEvent.ROLL_OUT,Loginout);
				m_btnLogin.mcAsset.removeEventListener(MouseEvent.CLICK,LoginonClick);
				m_btnLogin.dispose();
				m_btnLogin = null;
			}
			
			if(m_btnVip){
				m_btnVip.mcAsset.removeEventListener(MouseEvent.ROLL_OVER,Vipover);
				m_btnVip.mcAsset.removeEventListener(MouseEvent.ROLL_OUT,Vipout);
				m_btnVip.mcAsset.removeEventListener(MouseEvent.CLICK,ViponClick);
				m_btnVip.dispose();
				m_btnVip = null;
			}
			
			super.destroy();
		}
		
		override public function show():void{
			super.show();
//			m_bAnimation = true;
			
			m_btnSideBet.mcAsset.visible = m_bSideVisible;
			m_btnLogin.mcAsset.visible = m_bLoginVisible;
			m_btnVip.mcAsset.visible = m_bVipVisible;
			
			if(m_btnSideBet && m_bSideVisible){
				m_btnSideBet.gotoAndPlay("SHOW");
			}
			if(m_btnLogin && m_bLoginVisible){
				m_btnLogin.gotoAndPlay("SHOW");
			}
			if(m_btnVip && m_bVipVisible){
				m_btnVip.gotoAndPlay("SHOW");
			}
		}
		override public function hide():void{
			super.hide();
			
			if(m_btnSideBet && m_bSideVisible){
				m_btnSideBet.gotoAndPlay("HIDE");
			}
			if(m_btnLogin && m_bLoginVisible){
				m_btnLogin.gotoAndPlay("HIDE");
			}
			if(m_btnVip && m_bVipVisible){
				m_btnVip.gotoAndPlay("HIDE");
			}
		}
		
//		override public function init():void{
//			if(m_bInit){
//				return;
//			}else{
//				m_bInit = true;
//			}
//			
//			if(m_btnSideBet){
//				m_btnSideBet.gotoAndStop(normal);
//			}
//			if(m_btnLogin){
//				m_btnLogin.gotoAndStop(normal);
//			}
//			if(m_btnVip){
//				m_btnVip.gotoAndStop(normal);
//			}
//		}
		
		override public function onChangeLanguage():void{
			m_btnSideBet.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_btnLogin.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_btnVip.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		
		private function needPwd(_struct:TableStruct):void{
			if(_struct.IsNeedPwd){
				LobbyManager.getInstance().showTableEnterPwd(_struct);
			}else{
				LobbyManager.getInstance().gamePoint = getGlobalPoint();
				LobbyManager.getInstance().enterGame(_struct);
			}
		}
		
		override public function updateStatus():void{
			
			if(m_tableStruct.TableID==17){
				m_aShow = [];
			}
			m_aShow = [];
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			
			if(playerTableOwnStatusStruct){
				if(playerTableOwnStatusStruct.IsTableOwner && playerTableOwnStatusStruct.PlayerID==Player.getInstance().iPlayerID){
					vipEnable(true);
					loginEnable(false);
					sideEnable(false);
					m_aShow.push(m_btnVip);
				}else{
					vipEnable(false);
					sideEnable(playerTableOwnStatusStruct.IsOtherBeter);
					loginEnable(!playerTableOwnStatusStruct.IsOtherBeter);
					if(playerTableOwnStatusStruct.IsOtherBeter){
						m_aShow.push(m_btnSideBet);
					}else{
						m_aShow.push(m_btnLogin);
					}
				}
				
				sortBtn();
				return;
			}
			
			var arr : Array = m_tableStruct.JoinTbStatus.split("");
			
			if(arr[2] == 0){	//旁注
				sideEnable(false);
			}else{
				sideEnable(true);
				m_aShow.push(m_btnSideBet);
			}
			
			if(arr[1] == 0){	//进桌
				loginEnable(false);
			}else{
				loginEnable(true);
				m_aShow.push(m_btnLogin);
			}
			
			
			if(arr[0] == 0){	//包桌
				vipEnable(false);
			}else{
				vipEnable(true);
				m_aShow.push(m_btnVip);
			}
			
			
			sortBtn();
			
			if(arr[3] == 0){	//独享
				
			}else{
				
			}
			
			if(arr[4] == 0){	//进桌密码
				
			}else{
				
			}
			
			if(arr[5] == 0){	//满人
				
			}else{
				
			}
			
			if(arr[6] == 0){	//维护中
				
			}else{
				
			}
			
			if(arr[7] == 0){	//桌主是否离线（包桌）
				
			}else{
				
			}
			
		}
		
		override public function IsTableOwnerLeave():Boolean{
			if(m_tableStruct.JoinTbStatus.slice(3,4)=="1"){//独享
				if(m_tableStruct.JoinTbStatus.slice(8)=="1"){
					return true;
				}
			}else{
				if(m_aShow.length==0 && m_tableStruct.JoinTbStatus.slice(7,8)=="1"){
					return true;		
				}
			}
			return false;
		}
		
		override public function IsTableOwner():Boolean{
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			
			if(playerTableOwnStatusStruct && playerTableOwnStatusStruct.IsTableOwner && playerTableOwnStatusStruct.PlayerID==Player.getInstance().iPlayerID){
				return true;
			}
			
			return false;
		}
		private function sideEnable(_bEnable:Boolean):void{
			m_bSideVisible = _bEnable;
			if(m_bShow){
				m_btnSideBet.mcAsset.visible = _bEnable;
				m_btnSideBet.mcAsset.gotoAndStop(showEnd);
			}
			
			m_btnSideBet.mcAsset.mouseEnabled = _bEnable;
			m_btnSideBet.mcAsset.enabled = _bEnable;
			m_btnSideBet.mcAsset.buttonMode = _bEnable;
		}
		private function loginEnable(_bEnable:Boolean):void{
			m_bLoginVisible = _bEnable;
			if(m_bShow){
				m_btnLogin.mcAsset.gotoAndStop(showEnd);
				m_btnLogin.mcAsset.visible = _bEnable;
			}
			
			m_btnLogin.mcAsset.mouseEnabled = _bEnable;
			m_btnLogin.mcAsset.enabled = _bEnable;
			m_btnLogin.mcAsset.buttonMode = _bEnable;
		}
		private function vipEnable(_bEnable:Boolean):void{
			m_bVipVisible = _bEnable;
			if(m_bShow){
				m_btnVip.mcAsset.gotoAndStop(showEnd);
				m_btnVip.mcAsset.visible = _bEnable;
			}
			
			m_btnVip.mcAsset.mouseEnabled = _bEnable;
			m_btnVip.mcAsset.enabled = _bEnable;
			m_btnVip.mcAsset.buttonMode = _bEnable;
		}
		
		private function checkStatus():void{
			m_btnSideBet.gotoAndStop(showEnd);
//			m_bAnimation = false;
			
			if(playerTableOwnStatusStruct && playerTableOwnStatusStruct.IsTableOwner && playerTableOwnStatusStruct.PlayerID==Player.getInstance().iPlayerID){
				m_btnLogin.gotoAndStop("DISABLE");
				m_btnSideBet.gotoAndStop("DISABLE");
				return;
			}
			
			var arr : Array = m_tableStruct.JoinTbStatus.split("");
			
			if(arr[0] == 0){	//包桌
				m_btnVip.gotoAndStop("DISABLE");
			}
			
			if(arr[1] == 0){	//进桌
				m_btnLogin.gotoAndStop("DISABLE");
			}else{
				if(playerTableOwnStatusStruct){
					if(playerTableOwnStatusStruct.IsOtherBeter){
						m_btnLogin.gotoAndStop("DISABLE");
					}
				}
			}
			
			if(arr[2] == 0){	//旁注
				m_btnSideBet.gotoAndStop("DISABLE");
			}else{
				if(playerTableOwnStatusStruct){
					if(!playerTableOwnStatusStruct.IsOtherBeter){
						m_btnSideBet.gotoAndStop("DISABLE");
					}
				}
			}
		}
	}
	
}