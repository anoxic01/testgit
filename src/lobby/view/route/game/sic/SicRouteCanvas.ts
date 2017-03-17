module lobby.view.route.game.sic {
	export class SicRouteCanvas extends RoadCanvas{
		public constructor() {
			this._roadBallPool = new RoadBallPool();
		}
		
		override public function destroy():void{
			
			var bead:BeadItem
			while( this.numChildren > 0 ) {
				bead = this.getChildAt(0) as BeadItem;
				if (bead){
					bead.destroy();
				}
				this.removeChildAt(0);
			}
			
			super.destroy();
		}
		
		override public function onChangeLanguage():void{
			var bead:BeadItem
			for (var i:int = 0; i < this.numChildren; i++) 
			{
				bead = this.getChildAt(i) as BeadItem;
				if (bead){
					bead.onChangeLanguage();
				}
				
			}
			
		}
		override public function setBeadSize(beadInfo:BeadInfo):void
		{
			this._beadInfo = beadInfo;
			
		}
		override public function init():void 
		{
			while (this.numChildren > 0) {
				this.removeChildAt(0);
			}
		}
		override public function put(ball:DisplayObject, symbol:String, x:Number, y:Number):void
		{
			if (ball is MovieClip ){
				MovieClip(ball).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			ball.x = int(x);
			ball.y = int(y);
			if(ball.parent!=this)
			{
				this.addChild(ball);
			}
		}
		/**
		 * 畫和值路
		 */
		public function drawTieRoad(readerDataGrid:Array  , isAsk:Boolean = false ):void {
			var symbol:String;
			var startX:int = readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			
			var ball:Bitmap;
			var offtenWidth:Number;
			var offtenHeight:Number;
			var offtenX:Number;
			var offtenY:Number;
			var ballW:Number;
			var ballH:Number;
			
			offtenWidth = this._beadInfo.tieMc_OfftenWidth;
			offtenHeight = this._beadInfo.tieMc_OfftenHeight;
			offtenX = this._beadInfo.tieMc_OfftenX;
			offtenY = this._beadInfo.tieMc_OfftenY;
			
			var tf:TextFormat = new TextFormat();
			tf.bold = false;
			var tempChildVector:Vector.<DisplayObject> = childVector.concat();
			for (var x:int = startX,  colIndex:int = 0, cols:int = readerDataGrid.length; x < cols; x++)
			{
				for (var y:int = 0, rows:int = readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol) 
					{
						ball = null;
						var childData:Object = childDataDict[x+"_"+y];//={};
						if(childData)
						{
							if(childData.symbol==symbol)// 相同
							{
								ball = childData.view;
							}else
							{
								if(childData.view&&childData.view.parent)
								{
									childData.view.parent.removeChild(childData.view);
								}
							}
						}
						if(!ball)
						{
							ball = _roadBallPool.getSicSumBead(symbol);
							if(childData)childData.view = ball;
						}
						var tindex:int = tempChildVector.indexOf(ball);
						if(tindex>=0)
						{
							tempChildVector.splice(tindex,1);
						}else
						{
							childVector.push(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							childDataDict[x+"_"+y] = childData;
						}
						
						
						ballW = this._beadInfo.beadW ;
						ballH = this._beadInfo.beadH;
						ball.width = ballW;
						ball.height = ballW;
						this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + offtenY));
					}
				}
				
				if (x >= startX) 
				{
					colIndex++;
				}
			}	
			while(tempChildVector.length>0)
			{
				var child:DisplayObject = tempChildVector.shift();
				var cindex:int = childVector.indexOf(child);
				if(cindex>=0)
				{
					childVector.splice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
		}
		
		/**
		 * 畫珠仔路
		 */
		public function drawBeadRoad(readerDataGrid:Array  , isAsk:Boolean = false ):void
		{
			var symbol:String;
			var startX:int = readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			//trace("startX::" + startX );
			var ball:Bitmap;
			var offtenWidth:Number;
			var offtenHeight:Number;
			var offtenX:Number;
			var offtenY:Number;
			var ballW:Number;
			var ballH:Number;
			offtenWidth = this._beadInfo.beadMc_OfftenWidth;
			offtenHeight = this._beadInfo.beadMc_OfftenHeight;
			offtenX = this._beadInfo.beadMc_OfftenX;
			offtenY = this._beadInfo.beadMc_OfftenY;
			var tf:TextFormat = new TextFormat();
			tf.bold = false;
			var tempChildVector:Vector.<DisplayObject> = childVector.concat();
			for (var x:int = startX,  colIndex:int = 0, cols:int = readerDataGrid.length; x < cols; x++) 
			{
				for (var y:int = 0, rows:int = readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol) 
					{
						ball = null;
						var childData:Object = childDataDict[x+"_"+y];//={};
						if(childData)
						{
							if(childData.symbol==symbol)// 相同
							{
								ball = childData.view;
							}else
							{
								if(childData.view&&childData.view.parent)
								{
									childData.view.parent.removeChild(childData.view);
								}
							}
						}
						if(!ball)
						{
							ball = _roadBallPool.getSicBead(symbol);
							if(childData)childData.view = ball;
						}
						var tindex:int = tempChildVector.indexOf(ball);
						if(tindex>=0)
						{
							tempChildVector.splice(tindex,1);
						}else
						{
							childVector.push(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							childDataDict[x+"_"+y] = childData;
						}
						
						ballW = this._beadInfo.beadW ;
						ballH = this._beadInfo.beadH;
						ball.width = ballW;
						ball.height = ballW;
						this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + offtenY));
					}
				}
				if (x >= startX)
				{
					colIndex++;
				}
			}
			while(tempChildVector.length>0)
			{
				var child:DisplayObject = tempChildVector.shift();
				var cindex:int = childVector.indexOf(child);
				if(cindex>=0)
				{
					childVector.splice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
		}	
		public function drawBigSmallRoad(  readerDataGrid:Array, isAsk:Boolean = false  ):void
		{
			var symbol:String;
			var startX:int = readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
//			trace("data::" + readerDataGrid );
//			trace("startX::" + startX );
			var ball:BeadItem;
			var offtenWidth:Number;
			var offtenHeight:Number;
			var offtenX:Number;
			var offtenY:Number;
			var ballW:Number;
			var ballH:Number;
			offtenWidth = this._beadInfo.bigMc_OfftenWidth;
			offtenHeight = this._beadInfo.bigMc_OfftenHeight;
			offtenX = this._beadInfo.bigMc_OfftenX;
			offtenY = this._beadInfo.bigMc_OfftenY;
			var tf:TextFormat = new TextFormat();
			tf.bold = false;
			var tempChildVector:Vector.<DisplayObject> = childVector.concat();
			for (var x:int = startX,  colIndex:int = 0, cols:int = readerDataGrid.length; x < cols; x++) 
			{
				for (var y:int = 0, rows:int = readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol && symbol != "null" )
					{
						ball = null;
						var childData:Object = childDataDict[x+"_"+y];//={};
						if(childData)
						{
							if(childData.symbol==symbol)// 相同
							{
								ball = childData.view;
							}else
							{
								if(childData.view&&childData.view.parent)
								{
									childData.view.parent.removeChild(childData.view);
								}
							}
						}
						if(!ball)
						{
							/*if ( symbol == SicData.BIG )
							{
								ball = _roadBallPool.getBall( RoadBallPool.BIG_MC_ROAD );
							}else if ( symbol == SicData.SMALL )
							{
								ball = _roadBallPool.getBall( RoadBallPool.SMALL_MC_ROAD );
							}else if ( symbol == SicData.SURROUND_DICE )
							{
								ball = _roadBallPool.getBall( RoadBallPool.SURROUND_MC_ROAD );
							}*/
							ball = new BeadItemSic();
							ball.setLabel(symbol);
							if(childData)childData.view = ball;
						}
						var tindex:int = tempChildVector.indexOf(ball);
						if(tindex>=0)
						{
							tempChildVector.splice(tindex,1);
						}else
						{
							childVector.push(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							childDataDict[x+"_"+y] = childData;
						}
						
						ballW = this._beadInfo.beadW;
						ballH = this._beadInfo.beadH;
						//ball.width = ballW;
						//ball.height = ballW;
						this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + offtenY));
					}
				}
				if (x >= startX) 
				{
					colIndex++;
				}
			}
			while(tempChildVector.length>0)
			{
				var child:DisplayObject = tempChildVector.shift();
				var cindex:int = childVector.indexOf(child);
				if(cindex>=0)
				{
					childVector.splice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
		}
		override public function resetPool():void {
			//while (this.numChildren > 0) {
			//this.removeChildAt(0);
			//}
			//this._roadBallPool.resetPool(RoadBallPool.BIG_ROAD);
			//this._roadBallPool.resetPool(RoadBallPool.BIG_EYE_ROAD);
			//this._roadBallPool.resetPool(RoadBallPool.SMALL_EYE_ROAD);
			//this._roadBallPool.resetPool(RoadBallPool.COCKROACH_ROAD);
		}
		/**
		 * 畫出 單雙路
		 * @param	readerDataGrid
		 * @param	isAsk
		 * @param	
		 */
		public function drawOddEvenRoad(readerDataGrid:Array, isAsk:Boolean = false):void 
		{
			var symbol:String;
			var startX:int = readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			//trace("startX::" + startX );
			var ball:BeadItem;
			var offtenWidth:Number;
			var offtenHeight:Number;
			var offtenX:Number;
			var offtenY:Number;
			var ballW:Number;
			var ballH:Number;
			offtenWidth = this._beadInfo.oddMc_OfftenWidth;
			offtenHeight = this._beadInfo.oddMc_OfftenHeight;
			offtenX = this._beadInfo.oddMc_OfftenX;
			offtenY = this._beadInfo.oddMc_OfftenY;
			var _nOffY:Number = 0;
			var tempChildVector:Vector.<DisplayObject> = childVector.concat();
			for (var x:int = startX,  colIndex:int = 0, cols:int = readerDataGrid.length; x < cols; x++)
			{
				for (var y:int = 0, rows:int = readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol && symbol != "null" ) 
					{
						_nOffY = offtenY;
						ball = null;
						var childData:Object = childDataDict[x+"_"+y];//={};
						if(childData)
						{
							if(childData.symbol==symbol)// 相同
							{
								ball = childData.view;
							}else
							{
								if(childData.view&&childData.view.parent)
								{
									childData.view.parent.removeChild(childData.view);
								}
							}
						}
						if(!ball)
						{
							
							ball = new BeadItemSic();
							ball.setLabel(symbol);
							if(childData)childData.view = ball;
						}
						var tindex:int = tempChildVector.indexOf(ball);
						if(tindex>=0)
						{
							tempChildVector.splice(tindex,1);
						}else
						{
							childVector.push(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							childDataDict[x+"_"+y] = childData;
						}
						
						ballW = this._beadInfo.beadW ;
						ballH = this._beadInfo.beadH;
						//ball.width = ballW;
						//ball.height = ballH;
						this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + _nOffY));
					}
				}
				if (x >= startX)
				{
					colIndex++;
				}
			}
			while(tempChildVector.length>0)
			{
				var child:DisplayObject = tempChildVector.shift();
				var cindex:int = childVector.indexOf(child);
				if(cindex>=0)
				{
					childVector.splice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
		}
	}
}