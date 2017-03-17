module lobby.view.multi {
	export class MultiTableItem extends BSprite{
		protected var m_mcAsset			:	MovieClip;
		
		public var bTableClearing		:	Boolean;					//清桌标记
		public var goodRoadStruct		:	GoodRoadStruct;				//好路数据
		public var gameApp				:	Game;
		public var uPage				:	uint;
		public var index				:   int;
		public constructor(_iMode:int, multitableList:MultiTableList, _uPage:uint) {
			
			super();
			uPage = _uPage;
			
			var _gameClass:Class = getDefinitionByName(GameDefine.BAC_MULTI_NAME) as Class;
			gameApp = new _gameClass(_iMode, this, multitableList);
			this.addChild(gameApp);
			onChangeLanguage();
			
			this.addEventListener(MouseEvent.MOUSE_OVER, bgOver);
			this.addEventListener(MouseEvent.MOUSE_OUT, bgOut);
		}
		
		override public function destroy():void{
			
			this.removeEventListener(MouseEvent.MOUSE_OVER, bgOver);
			this.removeEventListener(MouseEvent.MOUSE_OUT, bgOut);
			
			if(gameApp){
				if(gameApp.parent){
					gameApp.parent.removeChild(gameApp);
				}
				gameApp.destroy();
				gameApp = null;
			}
			
		}
		
		public function setDataOnAddGoodRoad(_goodRoadStruct:GoodRoadStruct):void{
			goodRoadStruct = _goodRoadStruct;
			
			if(goodRoadStruct==null){
				bTableClearing = true;
				
				//游戏结算动画播放完后执行
//				gameApp.reset();			
//				return;
			}
			
			gameApp.receiveGoodRoadStruct(goodRoadStruct);
		}
		
		public function setData(_goodRoadStruct:GoodRoadStruct):void{
			goodRoadStruct = _goodRoadStruct;
		
			gameApp.receiveGoodRoadStruct(goodRoadStruct);
			
		}
		
		
		
		/** 是否空桌 **/
		public function isEmptyTable():Boolean{
			if(goodRoadStruct || bTableClearing){
				return false;
			}
			
			return true;
		}
		
		/**清空数据、标识  */
		public function clear():void{
			goodRoadStruct = null;
			bTableClearing = false;
		}
		
		/**清空移除  */
		public function clearTable():void{
			clear();
		    gameApp.clearGoodRoad();
		}
		
		//等待好路
		public function waitGoodRoad():void{
			//暂定放到游戏中控制
		}
		
		public function setVisible():void{
			//关闭视讯
			//屏蔽动画
		}
		
		override public function onChangeLanguage():void{
			gameApp.onChangeLanguage();
		}
		
		//临时处理
		protected function bgOver(event:MouseEvent):void{}
		protected function bgOut(event:MouseEvent):void{}
		
	}
}