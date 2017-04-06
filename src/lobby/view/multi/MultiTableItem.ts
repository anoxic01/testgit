module lobby.view.multi {
	export class MultiTableItem extends BSprite{
		protected m_mcAsset			;
		
		public bTableClearing		:	boolean;					//清桌标记
		public goodRoadStruct		;				//好路数据
		public gameApp				;
		public uPage				:	number;
		public index				:   number;
		public constructor(_iMode:number, multitableList:MultiTableList, _uPage:number) {
			
			super();
			this.uPage = _uPage;
			
			var _gameClass = getDefinitionByName(define.GameDefine.BAC_MULTI_NAME);
			this.gameApp = new _gameClass(_iMode, this, multitableList);
			this.addChild(this.gameApp);
			this.onChangeLanguage();
			
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.bgOver, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.bgOut, this);
		}
		
		 public destroy():void{
			
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.bgOver, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.bgOut, this);
			
			if(this.gameApp){
				if(this.gameApp.parent){
					this.gameApp.parent.removeChild(this.gameApp);
				}
				this.gameApp.destroy();
				this.gameApp = null;
			}
			
		}
		
		public setDataOnAddGoodRoad(_goodRoadStruct):void{
			this.goodRoadStruct = _goodRoadStruct;
			
			if(this.goodRoadStruct==null){
				this.bTableClearing = true;
				
				//游戏结算动画播放完后执行
//				gameApp.reset();			
//				return;
			}
			
			this.gameApp.receiveGoodRoadStruct(this.goodRoadStruct);
		}
		
		public setData(_goodRoadStruct):void{
			this.goodRoadStruct = _goodRoadStruct;
		
			this.gameApp.receiveGoodRoadStruct(this.goodRoadStruct);
			
		}
		
		
		
		/** 是否空桌 **/
		public isEmptyTable(): boolean{
			if(this.goodRoadStruct || this.bTableClearing){
				return false;
			}
			
			return true;
		}
		
		/**清空数据、标识  */
		public clear():void{
			this.goodRoadStruct = null;
			this.bTableClearing = false;
		}
		
		/**清空移除  */
		public clearTable():void{
			this.clear();
		   this. gameApp.clearGoodRoad();
		}
		
		//等待好路
		public waitGoodRoad():void{
			//暂定放到游戏中控制
		}
		
		public setVisible():void{
			//关闭视讯
			//屏蔽动画
		}
		
		 public onChangeLanguage():void{
			this.gameApp.onChangeLanguage();
		}
		
		//临时处理
		protected bgOver(event:MouseEvent):void{}
		protected bgOut(event:MouseEvent):void{}
		
	}
}