module lobby.view.route.game.bac {
	export class BacRoadCanvas extends RoadCanvas{
		public askCell;
		public constructor() {
		super();
		}
		
		 public init():void {
			if (this.askCell){
				this.askCell.visible=true;
				this.askCell = null;
			}
			super.init();
		
		}
		
		 public destroy():void {
			super.destroy();
			
			if(this.askCell){
				if(this.askCell.parent){
					this.askCell.parent.removeChild(this.askCell);
				}
				this.askCell = null;
			}
		}		
		
		 public getRoadCell(type:string ,data:string ):egret.DisplayObject{
			var mc : any = this._roadBallPool.getBall( type );
			mc.gotoAndStop(1);
			mc.bead.gotoAndStop(data);
			return mc;
		}
		
		 public put(ball, symbol:string, x:number, y:number):void {
			super.put(ball,symbol,x,y);
		}
		
		public flash():void{
			if (this.askCell ){
				this.askCell.visible=!this.askCell.visible;
			}
		}
		
		
		 public drawBigRoadDataGrid( readerDataGrid:any[] , roadType:string , isAsk: boolean = false ):void {
			//this.init();
			//var ss:number = getTimer();
			//this.resetPool();
			this.drawBigGrid( readerDataGrid[0]  , roadType , isAsk ,readerDataGrid[3]);
			this.drawTieGrid( readerDataGrid[0], readerDataGrid[1] , roadType , isAsk);
			//console.log("-----耗时----->",getTimer()-ss);
		}
		 protected drawBigGrid(  readerDataGrid:any[], roadType:string , isAsk: boolean = false ,lastPoint=null ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			var ball;
			var offtenWidth:number;
			var offtenHeight:number;
			var offtenX:number;
			var offtenY:number;
			var ballW:number;
			var ballH:number;
			
			offtenWidth = this._beadInfo.bigRoad_OfftenWidth;
			offtenHeight = this._beadInfo.bigRoad_OfftenHeight;
			offtenX = this._beadInfo.bigRoad_OfftenX;
			offtenY = this._beadInfo.bigRoad_OfftenY;
			
//			var tf:TextFormat = new TextFormat();
//				tf.bold = false;
			//	readerDataGrid.unshift([]); //不能用此方法推格
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) 
			{
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) {
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol && symbol != "null")
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
							ball = this._roadBallPool.getBall( roadType );
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
						
						//ball = this._roadBallPool.getBall( roadType );
						(ball.tieNumTxt).text = "";
						ballW = this._beadInfo.beadW ;
						ballH = this._beadInfo.beadH;
						ball.bead.width = ballW;
						ball.bead.height = ballH;
						if (isAsk)
						{
							if ( x==lastPoint.x && y==lastPoint.y)
							{
								if (this.askCell) this.askCell.visible=true;
								this.askCell=ball;
							}
						}else
						{
							this.askCell=null;
						}
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
			if (isAsk==false && this.askCell)
			{ 
				this.askCell.visible=true;
				this.askCell=null
			}
		}
		 protected drawTieGrid(readerDataGrid:any[] ,  readerDataTieGrid:any[], roadType:string , isAsk: boolean = false ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			var ball;
			var offtenWidth:number;
			var offtenHeight:number;
			var offtenX:number;
			var offtenY:number;
			var ballW:number;
			var ballH:number;
			var pos = new egret.Point();
			offtenWidth = this._beadInfo.bigRoad_OfftenWidth;
			offtenHeight = this._beadInfo.bigRoad_OfftenHeight;
			offtenX = this._beadInfo.bigRoad_OfftenX;
			offtenY = this._beadInfo.bigRoad_OfftenY;
			var iCount:number= 0;
			let tempChildVector = new Array<egret.DisplayObject>();//childVector.concat();
			for(symbol in this.childDataDict) 
			{
				if(symbol.indexOf("_i")!=-1)
				{
					tempChildVector.push(this.childDataDict[symbol].view);
				}
			}
			for (var x:number= 0,  colIndex:number= 0, cols:number= readerDataTieGrid.length; x < cols; x++) 
			{
				if ( readerDataTieGrid[x] != undefined ) 
				{
					for (var y:number= 0, rows:number= readerDataTieGrid[x].length; y < rows; y++) 
					{
						if ( readerDataTieGrid[x][y] != undefined )
						{
							iCount = readerDataTieGrid[x][y].length;
							symbol = readerDataTieGrid[x][y][0];  //釋出一個i
							if (x >= startX && symbol)
							{
								ball = null;
								var childData = this.childDataDict[x+"_"+y+"_i"];//={};
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
									ball = this._roadBallPool.getBall( roadType );
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
									this.childDataDict[x+"_"+y+"_i"] = childData;
								}
								
								
								ballW = this._beadInfo.beadW;
								ballH = this._beadInfo.beadH;
								ball.bead.width = ballW;
								ball.bead.height = ballH;
								if ( iCount > 1 ) {
									(ball.tieNumTxt).text = (iCount).toString;
									if(ballH<16){
										ball.tieNumTxt.y=-3
									}
									
									symbol="i2";
								}else {
									(ball.tieNumTxt).text = "";
								}
								if(x==0 && y==0){
									//	ball.visible = false;
								}
								this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + offtenY));
								
							}	
						}
					}
				}
				if (x >= startX) {
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
			if (this.askCell){ 
				this.askCell.visible=true;
				this.askCell=null;
			}
			while (this.numChildren > 0) {
				this.removeChildAt(0);
			}
			this._roadBallPool.resetPool(RoadBallPool.BIG_ROAD);
			this._roadBallPool.resetPool(RoadBallPool.BIG_EYE_ROAD);
			this._roadBallPool.resetPool(RoadBallPool.SMALL_EYE_ROAD);
			this._roadBallPool.resetPool(RoadBallPool.COCKROACH_ROAD);
		}
		
		 public drawReaderDataGrid(readerDataGrid:any[], isAsk: boolean = false, roadType:string = "",lastPoint=null):void {
			//this.init();
			
			
			//this.resetPool();
			var symbol:string;
			var startX:number= readerDataGrid[0].length <= this._beadInfo.gridWidth ? 0 : readerDataGrid[0].length - this._beadInfo.gridWidth;
			
			var ball;
			var offtenWidth:number;
			var offtenHeight:number;
			var offtenX:number;
			var offtenY:number;
			var ballW:number;
			var ballH:number;
			
			switch (roadType) {
				case RoadBallPool.BIG_ROAD: 
					offtenWidth = this._beadInfo.bigRoad_OfftenWidth;
					offtenHeight = this._beadInfo.bigRoad_OfftenHeight;
					offtenX = this._beadInfo.bigRoad_OfftenX;
					offtenY = this._beadInfo.bigRoad_OfftenY;
					break;
				case RoadBallPool.BIG_EYE_ROAD: 
					offtenWidth = this._beadInfo.bigEyeRoad_OfftenWidth;
					offtenHeight = this._beadInfo.bigEyeRoad_OfftenHeight;
					offtenX = this._beadInfo.bigEyeRoad_OfftenX;
					offtenY = this._beadInfo.bigEyeRoad_OfftenY;
					break;
				case RoadBallPool.SMALL_EYE_ROAD: 
					offtenWidth = this._beadInfo.smallRoad_OfftenWidth;
					offtenHeight = this._beadInfo.smallRoad_OfftenHeight;
					offtenX = this._beadInfo.smallRoad_OfftenX;
					offtenY = this._beadInfo.smallRoad_OfftenY;
					break;
				case RoadBallPool.COCKROACH_ROAD: 
					offtenWidth = this._beadInfo.roachRoad_OfftenWidth;
					offtenHeight = this._beadInfo.roachRoad_OfftenHeight;
					offtenX = this._beadInfo.roachRoad_OfftenX;
					offtenY = this._beadInfo.roachRoad_OfftenY;
					break;
			}
			// var tf:TextFormat = new TextFormat();
			// 	tf.bold = false;
			//	console.log("最后位置："+readerDataGrid[2]);
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid[0].length; x < cols; x++) 
			{
				for (var y:number= 0, rows:number= readerDataGrid[0][x].length; y < rows; y++)
				{
					symbol = readerDataGrid[0][x][y];
					if (x >= startX && symbol && symbol != "null") 
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
							ball = this._roadBallPool.getBall( roadType );
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
						
						//ball = this._roadBallPool.getBall( roadType );
//						if(roadType == RoadBallPool.BIG_EYE_ROAD){
//							if(_beadInfo.bigEyeW != 0 ){
//								ball.width = _beadInfo.bigEyeW;
//							}
//							if(_beadInfo.bigEyeH != 0){
//								ball.height = _beadInfo.bigEyeH;
//							}
//						}
//						if(roadType == RoadBallPool.SMALL_EYE_ROAD){
//							if(_beadInfo.smallW != 0 ){
//								ball.width = _beadInfo.smallW;
//							}
//							if(_beadInfo.smallH != 0){
//								ball.height = _beadInfo.smallH;
//							}
//						}
						ballW = ball.width;
						ballH = ball.height;
						if (this._beadInfo.size != 0)
						{
							ball.width = ball.height = this._beadInfo.size;
							ballW=this._beadInfo.size;
							ballH = this._beadInfo.size;
						}
						lastPoint=readerDataGrid[2]
						if (isAsk)
						{
							if ( x==lastPoint.x && y==lastPoint.y)
							{
								if (this.askCell) this.askCell.visible=true;
								this.askCell=ball;
							}
						}else
						{
							this.askCell=null;
						}
						this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + offtenY));	
						
					}
				}
				
				if (x >= startX) {
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
			if (isAsk==false && this.askCell){ 
				this.askCell.visible=true;
				this.askCell=null
			}
		}
	}
}