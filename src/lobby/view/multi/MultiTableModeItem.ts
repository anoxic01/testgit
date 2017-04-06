module lobby.view.multi {
	export class MultiTableModeItem implements iface.ISprite{
		private m_mcAsset	;
		private m_list		:	MultiTableModeList;
		
		private m_bSelect	:	boolean;
		private m_uMode		:	number;
		
		public constructor(_mcAsset, _list:MultiTableModeList, _uMode:number) {
			this.m_mcAsset = _mcAsset;
			this.m_list = _list;
			this.m_uMode = _uMode;
			
			this.m_mcAsset.gotoAndStop("DEFAULT");
			this.m_mcAsset.buttonMode = true;
			this.m_mcAsset.mouseChildren = false;
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.over);
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.out);
			this.m_mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			
			this.m_mcAsset.addFrameScript(13,function():void{
				this.m_mcAsset.gotoAndStop(14);
			});
			this.m_mcAsset.addFrameScript(23,this.changeMode);
			this.m_mcAsset.addFrameScript(37,this.unSelect);
			this.m_mcAsset.addFrameScript(52,function():void{
				this.m_mcAsset.gotoAndStop(53);
			});
		}
		
		public destroy():void
		{
			this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.over);
			this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.out);
			this.m_mcAsset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			this.m_mcAsset.stop();
			if(this.m_list){
				this.m_list = null;
			}
			
			if(this.m_mcAsset){
				this.m_mcAsset = null;
			}
		}
		
		public setSelect(_bValue: boolean):void{
			if(this.m_bSelect != _bValue){
				this.m_bSelect = _bValue;
				
				if(this.m_bSelect){
					this.m_mcAsset.gotoAndPlay("HDOWN");
//					manager.LobbyManager.getInstance().lobbyView.showLoading();
					
				}else{
					this.m_mcAsset.gotoAndPlay("UNSELECT");
				}
			}
		}
		
		public changeMode():void{
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndStop(24);
				manager.LobbyManager.getInstance().resetBet();
				manager.LobbyManager.getInstance().resetHaveBet();
				//切换内容
				manager.LobbyManager.getInstance().multiTableView.setMultiTableMode(this.m_uMode);
			}
		}
		
		public unSelect():void{
			if (this.m_mcAsset){
				this.m_mcAsset.gotoAndStop(38);
			}
		}
		
		set  enable(bValue: boolean){
			if(this.m_mcAsset){
				this.m_mcAsset.mouseEnabled = bValue;
				this.m_mcAsset.buttonMode = bValue;
			}
		}
		
		protected over(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndPlay("HOVER");
			}
		}
		
		protected out(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndPlay("HOUT");
			}
		}
		
		protected click(event:MouseEvent):void
		{
			if(this.m_list){
				manager.SoundManager.getInstance().play(sound.SoundPackage.sChangePage);
				if(this.m_bSelect){
					return;
				}
				this.m_list.currentModeItem = this;
			}
		}
		
	}
}