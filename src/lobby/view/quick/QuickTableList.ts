module lobby.view.quick {
	export class QuickTableList extends BSprite{
		public var spMain				:	Sprite;
		public var spLoading			:	Sprite;
		
		private var m_spTableListMask	:	Sprite;							//维护遮罩
		private var m_bg				:	BitmapScale9Grid;
		private var m_mcClose			:	*;
		private var m_btnClose			:	SingleButtonMC;
		private var m_loading			:	*;								//加载图标
		private var m_themeMaintain		:	GameMsgWnd;						//厅馆维护
		private var mmc:MMovieClip;
		
		public constructor() {
		
			super();
			
			spMain = new Sprite();
			this.addChild(spMain);
			
			spLoading = new Sprite();
			this.addChild(spLoading);
			spLoading.graphics.beginFill(0x000000,0.5);
			spLoading.graphics.drawRoundRect(135,123,760,740,15,15);
			spLoading.graphics.endFill();
			
			m_mcClose = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Button_Close_Asset");
			this.addChild(m_mcClose);
			
			m_bg = new BitmapScale9Grid(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Window_Bg_Asset") as BitmapData, 1, 12, 24, 12, 30);
			this.addChildAt(m_bg,0);
			m_bg.setSize(772, 756);
			m_bg.x = 130;
			m_bg.y = 120;
			
			m_btnClose = new SingleButtonMC(m_mcClose, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				//取消订阅
				LobbyManager.getInstance().sendSubscribeTheme(-1, LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.struct.ThemeID);
				LobbyManager.getInstance().lobbyView.quickThemeList.iCurrentTheme = -1;
				LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
			});
			m_btnClose.mcAsset.x = 870;
			m_btnClose.mcAsset.y = 128;
			
			
			m_loading = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"LoadingLiveAsset");
			mmc = new MMovieClip(m_loading,60);
			spLoading.addChild(m_loading);
			m_loading.tf_label.text = "";
			m_loading.x = 435;
			m_loading.y = 440;
			hideLoding();
			
			m_spTableListMask = new Sprite();
			this.addChild(m_spTableListMask);
			
			m_themeMaintain = new GameMsgWnd(800);
			m_themeMaintain.x = 100;
			m_themeMaintain.y = 460;
		}
		
		override public function destroy():void{
			
			if(m_loading){
				if(m_loading.parent){
					m_loading.parent.removeChild(m_loading);
				}
				m_loading = null;
			}
			
			if(spLoading){
				this.removeChild(spLoading);
				spLoading = null;
			}
			
			if(m_mcClose){
				this.removeChild(m_mcClose);
				m_mcClose = null;
			}
			
			if(m_btnClose){
				m_btnClose.destroy();
				m_btnClose = null;
			}
			
			if(m_bg){
				if(m_bg.parent){
					m_bg.parent.removeChild(m_bg);
				}
				m_bg.dispose();
				m_bg = null;
			}
			
			if(spMain){
				this.removeChild(spMain);
				spMain = null;
			}
		}
		
		public function showLoading(_bLoading:Boolean):void{
			if(_bLoading){
				if(spLoading){
					spLoading.visible = true;
				}
				if(m_loading){
					mmc.gotoAndPlay(1);
					m_loading.visible = true;
				}
			}
		}
		
		public function hideLoding():void{
			if(spLoading){
				spLoading.visible = false;
			}
			if(m_loading){
//				m_loading.visible = false;
				m_loading.gotoAndStop(1);
				mmc.stop();
			}
			
		}
		
		override public function onChangeLanguage():void{
			if(m_themeMaintain){
				m_themeMaintain.onChangeLanguage();
			}
			
		}
		//厅馆维护
		public function showThemeMaintenance():void{
			if(m_themeMaintain){
//				if(spLoading){
//					spLoading.visible = true;
//				}
				
				m_spTableListMask.graphics.clear();
				m_spTableListMask.graphics.beginFill(0x00000,0.5);
				m_spTableListMask.graphics.drawRoundRect(135,150,760,715,15,15);
				m_spTableListMask.graphics.endFill();
				m_spTableListMask.addChild(m_themeMaintain);
				m_themeMaintain.container = this;
				m_themeMaintain.show(Language.sMaintain_Theme,true);
			}
		}
		public function hideThemeMaintenance():void{
			if(spLoading){
				spLoading.visible = false;
			}
			if(m_themeMaintain){
				m_themeMaintain.hide();
				m_spTableListMask.graphics.clear();
			}
		}
		
	}
}