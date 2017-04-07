module lobby.view.table {
	export class TableLogin extends BSprite {

		protected normal					:	number		=	29;
		protected showFrame					:	number		=	39;
		protected showEnd					:	number		=	40;
				
		protected m_mcAsset					;
		protected m_tableStruct				;
		protected m_point 					: 	egret.Point = new egret.Point();
		protected m_limitStruct 			;					//限红数据
		public playerTableOwnStatusStruct 	;
		protected m_bShow					:	boolean;
		protected m_aShow					:	any[];							//显示按钮

		public constructor() {
			super();
		}

		public destroy():void{
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			if(this.playerTableOwnStatusStruct){
				this.playerTableOwnStatusStruct = null;
			}
			if(this.m_tableStruct){
				this.m_tableStruct = null;
			}
			if(this.m_limitStruct){
				this.m_limitStruct =  null;
			}
			super.destroy();
		}
		
		public show():void{
			this.m_bShow = true;
			this.onChangeLanguage();
		}
		
		public hide():void{
			this.m_bShow = false;
		}

		public setStruct(_tableStruct):void{
			this.m_tableStruct = _tableStruct;
		}
		
		public getGlobalPoint():egret.Point{
			this.m_point.x =<number>(this.parent.x+300);
			this.m_point.y =<number>(this.parent.y+50);
			
//			console.log("********************************************************** 局部坐标：",m_point);
			return this.m_mcAsset.localToGlobal(this.m_point.x, this.m_point.y);
		}
		
		public updateStatus():void{
			
		}
		
		protected sortBtn():void{
			if(this.m_aShow){
				
				var len  = this.m_aShow.length;
				switch(len){
					case 1:
						this.m_aShow[0].mcAsset.x = 430;
						break;
					case 2:
						this.m_aShow[0].mcAsset.x = 350;
						this.m_aShow[1].mcAsset.x = 525;
						break;
					case 3:
						this.m_aShow[0].mcAsset.x = 288;
						this.m_aShow[1].mcAsset.x = 430;
						this.m_aShow[2].mcAsset.x = 572;
						break;
				}
			}
			
		}
		
		
		protected IsAllowToLogin(_bAlone: boolean=false): boolean{
			var bAllow :  boolean;
			var _str : string;
			
			if(this.m_limitStruct){
				bAllow = (model.Player.getInstance().nCoin >= (this.m_limitStruct.EnterTbLimit))?true:false;
				
				if(_bAlone){
					_str = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTableLogin_NoMoney) + "(" + String(this.m_limitStruct.EnterTbLimit) + ")" + manager.LobbyManager.getInstance().getLanguageString(language.Language.sCannotCharter);
				}else{
					_str = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTableLogin_NoMoney) + "(" + String(this.m_limitStruct.EnterTbLimit) + ")" + manager.LobbyManager.getInstance().getLanguageString(language.Language.sTableLogin_CAN_NOT_ENTER);
				}
				
				if(!bAllow){
					manager.LobbyManager.getInstance().showDialog(_str,null,null,true);
				}
			}else{
				bAllow = true;
			}
			
			return  bAllow;
		}
		
		public IsTableOwner(): boolean{
			return false;
		}
		
		public IsTableOwnerLeave(): boolean{
			return false;
		}
		
		set setBetLimitVisible(_bValue: boolean) {

		}	
	}
}