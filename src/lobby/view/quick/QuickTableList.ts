module lobby.view.quick {
	export class QuickTableList extends BSprite{
		public spMain				;
		public spLoading			;
		
		private m_spTableListMask	;							//维护遮罩
		private m_bg				;
		private m_mcClose			;
		private m_btnClose			:	ui.button.SingleButtonMC;
		private m_loading			;								//加载图标
		private m_themeMaintain		;						//厅馆维护
		private mmc;
		
		public constructor() {
		
			super();
			
			this.spMain = new egret.Sprite();
			this.addChild(this.spMain);
			
			this.spLoading = new egret.Sprite();
			this.addChild(this.spLoading);
			this.spLoading.graphics.beginFill(0x000000,0.5);
			this.spLoading.graphics.drawRoundRect(135,123,760,740,15,15);
			this.spLoading.graphics.endFill();
			
			this.m_mcClose = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Button_Close_Asset");
			this.addChild(this.m_mcClose);
			
			this.m_bg = new egret.Bitmap();
			this.m_bg.texture = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Window_Bg_Asset");
			this.m_bg.scale9Grid = new egret.Rectangle(12,24,this.m_bg.with-24,this.m_bg.height-54);
			this.addChildAt(this.m_bg,0);
			this.m_bg.setSize(772, 756);
			this.m_bg.x = 130;
			this.m_bg.y = 120;
			
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcClose, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				//取消订阅
				manager.LobbyManager.getInstance().sendSubscribeTheme(-1, manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.struct.ThemeID);
				manager.LobbyManager.getInstance().lobbyView.quickThemeList.iCurrentTheme = -1;
				manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
			});
			this.m_btnClose.mcAsset.x = 870;
			this.m_btnClose.mcAsset.y = 128;
			
			
			this.m_loading = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"LoadingLiveAsset");
			this.mmc = new egret.MovieClip(this.m_loading);
			this.spLoading.addChild(this.m_loading);
			this.m_loading.tf_label.text = "";
			this.m_loading.x = 435;
			this.m_loading.y = 440;
			this.hideLoding();
			
			this.m_spTableListMask = new egret.Sprite();
			this.addChild(this.m_spTableListMask);
			
			this.m_themeMaintain = new windows.GameMsgWnd(800);
			this.m_themeMaintain.x = 100;
			this.m_themeMaintain.y = 460;
		}
		
		 public destroy():void{
			
			if(this.m_loading){
				if(this.m_loading.parent){
					this.m_loading.parent.removeChild(this.m_loading);
				}
				this.m_loading = null;
			}
			
			if(this.spLoading){
				this.removeChild(this.spLoading);
				this.spLoading = null;
			}
			
			if(this.m_mcClose){
				this.removeChild(this.m_mcClose);
				this.m_mcClose = null;
			}
			
			if(this.m_btnClose){
				this.m_btnClose.destroy();
				this.m_btnClose = null;
			}
			
			if(this.m_bg){
				if(this.m_bg.parent){
					this.m_bg.parent.removeChild(this.m_bg);
				}
				this.m_bg.dispose();
				this.m_bg = null;
			}
			
			if(this.spMain){
				this.removeChild(this.spMain);
				this.spMain = null;
			}
		}
		
		public showLoading(_bLoading: boolean):void{
			if(_bLoading){
				if(this.spLoading){
					this.spLoading.visible = true;
				}
				if(this.m_loading){
					this.mmc.gotoAndPlay(1);
					this.m_loading.visible = true;
				}
			}
		}
		
		public hideLoding():void{
			if(this.spLoading){
				this.spLoading.visible = false;
			}
			if(this.m_loading){
//				this.m_loading.visible = false;
				this.m_loading.gotoAndStop(1);
				this.mmc.stop();
			}
			
		}
		
		 public onChangeLanguage():void{
			if(this.m_themeMaintain){
				this.m_themeMaintain.onChangeLanguage();
			}
			
		}
		//厅馆维护
		public showThemeMaintenance():void{
			if(this.m_themeMaintain){
//				if(this.spLoading){
//					this.spLoading.visible = true;
//				}
				
				this.m_spTableListMask.graphics.clear();
				this.m_spTableListMask.graphics.beginFill(0x00000,0.5);
				this.m_spTableListMask.graphics.drawRoundRect(135,150,760,715,15,15);
				this.m_spTableListMask.graphics.endFill();
				this.m_spTableListMask.addChild(this.m_themeMaintain);
				this.m_themeMaintain.container = this;
				this.m_themeMaintain.show(language.Language.sMaintain_Theme,true);
			}
		}
		public hideThemeMaintenance():void{
			if(this.spLoading){
				this.spLoading.visible = false;
			}
			if(this.m_themeMaintain){
				this.m_themeMaintain.hide();
				this.m_spTableListMask.graphics.clear();
			}
		}
		
	}
}