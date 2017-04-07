module lobby.view.route.game.sic {
	export class SicRouteCanvas extends RoadCanvas{
		public constructor() {
			super();
			this._roadBallPool = new RoadBallPool();
		}
		
		 public destroy():void{
			
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
		
		 public onChangeLanguage():void{
			var bead:BeadItem
			for (var i:number= 0; i < this.numChildren; i++) 
			{
				bead = this.getChildAt(i) as BeadItem;
				if (bead){
					bead.onChangeLanguage();
				}
				
			}
			
		}
		 public setBeadSize(beadInfo:BeadInfo):void
		{
			this._beadInfo = beadInfo;
			
		}
		 public init():void 
		{
			while (this.numChildren > 0) {
				this.removeChildAt(0);
			}
		}
		 public put(ball, symbol:string, x:number, y:number):void
		{
			if (ball instanceof egret.MovieClip ){
				(ball).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			ball.x = (x);
			ball.y = (y);
			if(ball.parent!=this)
			{
				this.addChild(ball);
			}
		}
		/**
		 * 畫和值路
		 */
		public drawTieRoad(readerDataGrid:any[]  , isAsk: boolean = false ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			
			var ball;
			var offtenWidth:number;
			var offtenHeight:number;
			var offtenX:number;
			var offtenY:number;
			var ballW:number;
			var ballH:number;
			
			offtenWidth = this._beadInfo.tieMc_OfftenWidth;
			offtenHeight = this._beadInfo.tieMc_OfftenHeight;
			offtenX = this._beadInfo.tieMc_OfftenX;
			offtenY = this._beadInfo.tieMc_OfftenY;
			
			// var tf:TextFormat = new TextFormat();
			// tf.bold = false;
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++)
			{
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol) 
					{
						ball = null;
						var childData = this.childDataDict[x+"_"+y];//={};
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
							ball = this._roadBallPool.getSicSumBead(symbol);
							if(childData)childData.view = ball;
						}
						var tindex:number= tempChildVector.indexOf(ball);
						if(tindex>=0)
						{
							tempChildVector.splice(tindex,1);
						}else
						{
							this.childVector.push(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							this.childDataDict[x+"_"+y] = childData;
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
				var child = tempChildVector.shift();
				var cindex:number= this.childVector.indexOf(child);
				if(cindex>=0)
				{
					this.childVector.splice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
		}
		
		/**
		 * 畫珠仔路
		 */
		public drawBeadRoad(readerDataGrid:any[]  , isAsk: boolean = false ):void
		{
			var symbol:string;
			var startX:number= readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			//console.log("startX::" + startX );
			var ball;
			var offtenWidth:number;
			var offtenHeight:number;
			var offtenX:number;
			var offtenY:number;
			var ballW:number;
			var ballH:number;
			offtenWidth = this._beadInfo.beadMc_OfftenWidth;
			offtenHeight = this._beadInfo.beadMc_OfftenHeight;
			offtenX = this._beadInfo.beadMc_OfftenX;
			offtenY = this._beadInfo.beadMc_OfftenY;
			// var tf:TextFormat = new TextFormat();
			// tf.bold = false;
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) 
			{
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol) 
					{
						ball = null;
						var childData = this.childDataDict[x+"_"+y];//={};
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
							ball = this._roadBallPool.getSicBead(symbol);
							if(childData)childData.view = ball;
						}
						var tindex:number= tempChildVector.indexOf(ball);
						if(tindex>=0)
						{
							tempChildVector.splice(tindex,1);
						}else
						{
							this.childVector.push(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							this.childDataDict[x+"_"+y] = childData;
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
				var child = tempChildVector.shift();
				var cindex:number= this.childVector.indexOf(child);
				if(cindex>=0)
				{
					this.childVector.splice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
		}	
		public drawBigSmallRoad(  readerDataGrid:any[], isAsk: boolean = false  ):void
		{
			var symbol:string;
			var startX:number= readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
//			console.log("data::" + readerDataGrid );
//			console.log("startX::" + startX );
			var ball:BeadItem;
			var offtenWidth:number;
			var offtenHeight:number;
			var offtenX:number;
			var offtenY:number;
			var ballW:number;
			var ballH:number;
			offtenWidth = this._beadInfo.bigMc_OfftenWidth;
			offtenHeight = this._beadInfo.bigMc_OfftenHeight;
			offtenX = this._beadInfo.bigMc_OfftenX;
			offtenY = this._beadInfo.bigMc_OfftenY;
			// var tf:TextFormat = new TextFormat();
			// tf.bold = false;
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) 
			{
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol && symbol != "null" )
					{
						ball = null;
						var childData = this.childDataDict[x+"_"+y];//={};
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
						var tindex:number= tempChildVector.indexOf(ball);
						if(tindex>=0)
						{
							tempChildVector.splice(tindex,1);
						}else
						{
							this.childVector.push(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							this.childDataDict[x+"_"+y] = childData;
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
				var child = tempChildVector.shift();
				var cindex:number= this.childVector.indexOf(child);
				if(cindex>=0)
				{
					this.childVector.splice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
		}
		 public resetPool():void {
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
		public drawOddEvenRoad(readerDataGrid:any[], isAsk: boolean = false):void 
		{
			var symbol:string;
			var startX:number= readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			//console.log("startX::" + startX );
			var ball:BeadItem;
			var offtenWidth:number;
			var offtenHeight:number;
			var offtenX:number;
			var offtenY:number;
			var ballW:number;
			var ballH:number;
			offtenWidth = this._beadInfo.oddMc_OfftenWidth;
			offtenHeight = this._beadInfo.oddMc_OfftenHeight;
			offtenX = this._beadInfo.oddMc_OfftenX;
			offtenY = this._beadInfo.oddMc_OfftenY;
			var _nOffY:number = 0;
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++)
			{
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol && symbol != "null" ) 
					{
						_nOffY = offtenY;
						ball = null;
						var childData = this.childDataDict[x+"_"+y];//={};
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
						var tindex:number= tempChildVector.indexOf(ball);
						if(tindex>=0)
						{
							tempChildVector.splice(tindex,1);
						}else
						{
							this.childVector.push(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							this.childDataDict[x+"_"+y] = childData;
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
				var child = tempChildVector.shift();
				var cindex:number= this.childVector.indexOf(child);
				if(cindex>=0)
				{
					this.childVector.splice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
		}
	}
}