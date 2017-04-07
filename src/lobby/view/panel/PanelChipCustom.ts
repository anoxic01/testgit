module lobby.view.panel {
	export class PanelChipCustom extends PanelWindow{
//		private m_bg			:	BitmapScale9Grid;
		private m_mcText		;								//文本
		private m_btnOk			:	ui.button.SingleButtonMC;							//确认按钮
		private m_btnCancel		:	ui.button.SingleButtonMC;							//取消按钮
		
		private m_aChipValues	;									//筹码面值
		private m_vectorChip	;				//筹码数组
		private m_aCustom		;									//选中筹码
		private m_uSelect		:	number;									//已选数量
		
		public constructor() {
		
			super();
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"ChipPanelCustomAsset");
			this.addChild(this.m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			this.m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(524, 530);
//			m_bg.x = -262;
//			m_bg.y = -280;
			
			this.nAssetWidth = 524;
			this.nAssetHeight = 561;
			
			this.m_mcHot = this.m_mcAsset.mc_hot;
			
			this.m_mcText = this.m_mcAsset.mc_0;
			
			this.m_btnOk = new ui.button.SingleButtonMC(this.m_mcAsset.mc_ok, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().sendCustomChipData(this.getCustomChip());
			});
			
			this.m_btnCancel = new ui.button.SingleButtonMC(this.m_mcAsset.mc_no, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hidePanelChipCustom();
			});
			
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcAsset.mc_close,function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hidePanelChipCustom();
			});
			
			this.m_aCustom = [];
			this.m_aChipValues = [10,50,100,300,500,1000,3000,5000,10000,30000,50000,100000,300000,500000];
			this.m_vectorChip = new Array<chip.ChipItemCustom>();
			
			this.onChangeLanguage();
		}
		
		 public destroy():void{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			if(this.m_vectorChip){
				var _chip ;
				while (this.m_vectorChip.length>0) 
				{
					_chip = this.m_vectorChip.pop();
					if(_chip.parent){
						_chip.parent.removeChild(_chip);
					}
					_chip.destroy();
				}
				if(_chip){
					_chip = null;
				}
				this.m_vectorChip = null;
			}
			
			if(this.m_btnOk){
				this.m_btnOk.destroy();
				this.m_btnOk = null;
			}
			if(this.m_btnCancel){
				this.m_btnCancel.destroy();
				this.m_btnCancel = null;
			}
			if(this.m_btnClose){
				this.m_btnClose.destroy();
				this.m_btnClose = null;
			}
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			if(this.m_aCustom){
				this.m_aCustom = null;
			}
		}
		
		public init():void{
			var _aCustom : any[] = model.Player.getInstance().gameSetting.aCustChips;
			var _len  = this.m_aChipValues.length;
			var _chip ;
			for (var i:number= 0; i < _len; i++) 
			{
				_chip = new chip.ChipItemCustom(this.m_aChipValues[i],this);
				this.m_mcAsset.addChild(_chip);
				_chip.x = -225 + (i%4) * (_chip.width+30);
				_chip.y = -200 + Math.floor(i/4) * (_chip.height+20);
				this.m_vectorChip.push(_chip);
				
				if(_aCustom){
					for (var j:number= 0; j < _aCustom.length; j++) 
					{
						if(this.m_aChipValues[i] == _aCustom[j]){
							_chip.select  = true;
							break;
						}
					}
				}
				
				
			}
			if(_chip){
				_chip = null;
			}
			
		}
		public setSelect():void{
			
		}
		
		public addSelect(_uValue:number): boolean{
			if(this.m_aCustom.length<5){
				this.m_uSelect++;
				this.m_aCustom.push(_uValue);
				this.m_aCustom.sort();
				this.m_mcAsset.tf_0.text = String(5-this.m_aCustom.length);//manager.LobbyManager.getInstance().getLanguageString(Language.sChipPanelCustom) + ":" + String(5-this.m_aCustom.length);
				return true;
			}
			return false;
		}
		public removeSelect(_uValue:number): boolean{
			if(this.m_aCustom.length>0){
				for (var i:number= 0; i < this.m_aCustom.length; i++) 
				{
					if(this.m_aCustom[i] == _uValue){
						this.m_uSelect--;
						this.m_aCustom.splice(i,1);
						this.m_aCustom.sort();
						this.m_mcAsset.tf_0.text = String(5-this.m_aCustom.length);//manager.LobbyManager.getInstance().getLanguageString(Language.sChipPanelCustom) + ":" + String(5-this.m_aCustom.length);
						return true;
					}
				}
			}
			return false;
		}
		
		 public onChangeLanguage():void{
			this.m_mcText.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.tf_0.text = String(5-this.m_aCustom.length);//manager.LobbyManager.getInstance().getLanguageString(Language.sChipPanelCustom) + ":" + String(5-this.m_aCustom.length);
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);// manager.LobbyManager.getInstance().getLanguageString(Language.sChipPanelCustom_Label);
			this.m_mcAsset.mc_ok.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_no.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		
		private getCustomChip():string{
			if(this.m_aCustom){
				while(this.m_aCustom.length<5){
					this.m_aCustom.push(0);
				}
				return this.m_aCustom.join(",");
			}
			return "0,0,0,0,0";
		}
	}
}