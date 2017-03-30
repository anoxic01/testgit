module lobby.view.multi {
	export class MultiTableModeItem implements ISprite{
		private m_mcAsset	:	MovieClip;
		private m_list		:	MultiTableModeList;
		
		private m_bSelect	:	 boolean;
		private m_uMode		:	number;
		
		public constructor(_mcAsset:MovieClip, _list:MultiTableModeList, _uMode:number) {
			m_mcAsset = _mcAsset;
			m_list = _list;
			m_uMode = _uMode;
			
			m_mcAsset.gotoAndStop("DEFAULT");
			m_mcAsset.buttonMode = true;
			m_mcAsset.mouseChildren = false;
			m_mcAsset.addEventListener(MouseEvent.MOUSE_OVER, over);
			m_mcAsset.addEventListener(MouseEvent.MOUSE_OUT, out);
			m_mcAsset.addEventListener(MouseEvent.CLICK, click);
			
			m_mcAsset.addFrameScript(13,function():void{
				m_mcAsset.gotoAndStop(14);
			});
			m_mcAsset.addFrameScript(23,changeMode);
			m_mcAsset.addFrameScript(37,unSelect);
			m_mcAsset.addFrameScript(52,function():void{
				m_mcAsset.gotoAndStop(53);
			});
		}
		
		public destroy():void
		{
			m_mcAsset.removeEventListener(MouseEvent.MOUSE_OVER, over);
			m_mcAsset.removeEventListener(MouseEvent.MOUSE_OUT, out);
			m_mcAsset.removeEventListener(MouseEvent.CLICK, click);
			m_mcAsset.stop();
			if(m_list){
				m_list = null;
			}
			
			if(m_mcAsset){
				m_mcAsset = null;
			}
		}
		
		public setSelect(_bValue: boolean):void{
			if(m_bSelect != _bValue){
				m_bSelect = _bValue;
				
				if(m_bSelect){
					m_mcAsset.gotoAndPlay("HDOWN");
//					LobbyManager.getInstance().lobbyView.showLoading();
					
				}else{
					m_mcAsset.gotoAndPlay("UNSELECT");
				}
			}
		}
		
		public changeMode():void{
			if(m_mcAsset){
				m_mcAsset.gotoAndStop(24);
				LobbyManager.getInstance().resetBet();
				LobbyManager.getInstance().resetHaveBet();
				//切换内容
				LobbyManager.getInstance().multiTableView.setMultiTableMode(m_uMode);
			}
		}
		
		public unSelect():void{
			if (m_mcAsset){
				m_mcAsset.gotoAndStop(38);
			}
		}
		
		set  enable(bValue: boolean){
			if(m_mcAsset){
				m_mcAsset.mouseEnabled = bValue;
				m_mcAsset.buttonMode = bValue;
			}
		}
		
		protected over(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			if(m_mcAsset){
				m_mcAsset.gotoAndPlay("HOVER");
			}
		}
		
		protected out(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			
			if(m_mcAsset){
				m_mcAsset.gotoAndPlay("HOUT");
			}
		}
		
		protected click(event:MouseEvent):void
		{
			if(m_list){
				SoundManager.getInstance().play(SoundPackage.sChangePage);
				if(m_bSelect){
					return;
				}
				m_list.currentModeItem = this;
			}
		}
		
	}
}