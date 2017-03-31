module lobby.view.multi {
	export class MultiTableItem extends BSprite{
		protected m_mcAsset			:	MovieClip;
		
		public bTableClearing		:	 boolean;					//清桌标记
		public goodRoadStruct		:	GoodRoadStruct;				//好路数据
		public gameApp				:	Game;
		public uPage				:	number;
		public index				:   number;
		public constructor(_iMode:number, multitableList:MultiTableList, _uPage:number) {
			
			super();
			uPage = _uPage;
			
			var _gameClass:Class = getDefinitionByName(GameDefine.BAC_MULTI_NAME) as Class;
			gameApp = new _gameClass(_iMode, this, multitableList);
			this.addChild(gameApp);
			onChangeLanguage();
			
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, bgOver);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, bgOut);
		}
		
		 public destroy():void{
			
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, bgOver);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, bgOut);
			
			if(gameApp){
				if(gameApp.parent){
					gameApp.parent.removeChild(gameApp);
				}
				gameApp.destroy();
				gameApp = null;
			}
			
		}
		
		public setDataOnAddGoodRoad(_goodRoadStruct:GoodRoadStruct):void{
			goodRoadStruct = _goodRoadStruct;
			
			if(goodRoadStruct==null){
				bTableClearing = true;
				
				//游戏结算动画播放完后执行
//				gameApp.reset();			
//				return;
			}
			
			gameApp.receiveGoodRoadStruct(goodRoadStruct);
		}
		
		public setData(_goodRoadStruct:GoodRoadStruct):void{
			goodRoadStruct = _goodRoadStruct;
		
			gameApp.receiveGoodRoadStruct(goodRoadStruct);
			
		}
		
		
		
		/** 是否空桌 **/
		public isEmptyTable(): boolean{
			if(goodRoadStruct || bTableClearing){
				return false;
			}
			
			return true;
		}
		
		/**清空数据、标识  */
		public clear():void{
			goodRoadStruct = null;
			bTableClearing = false;
		}
		
		/**清空移除  */
		public clearTable():void{
			clear();
		    gameApp.clearGoodRoad();
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
			gameApp.onChangeLanguage();
		}
		
		//临时处理
		protected bgOver(event:MouseEvent):void{}
		protected bgOut(event:MouseEvent):void{}
		
	}
}