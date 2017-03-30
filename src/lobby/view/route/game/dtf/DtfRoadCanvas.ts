module lobby.view.route.game.dtf {
	export class DtfRoadCanvas extends RoadCanvas{
		
		public var askCell:DisplayObject;
		public constructor() {
		super();
		}
		
		 public function init():void {
			if (askCell){
				askCell.visible=true;
				askCell = null;
			}
			while (this.numChildren > 0) {
				this.removeChildAt(0);
			}
			
		}
		
		 public function destroy():void {
			super.destroy();
			
			if(_roadBallPool){
				_roadBallPool = null;
			}
			if(askCell){
				askCell = null;
			}
		}		
		
		 public function getRoadCell(type:string ,data:string):DisplayObject{
			var mc:MovieClip= this._roadBallPool.getBall( type );
			mc.gotoAndStop(1);
			mc.bead.gotoAndStop(data);
			return mc;
		}
		
		 public function put(ball:DisplayObject, symbol:string, x:Number, y:Number):void {
			super.put(ball,symbol,x,y);
			
			
		}
		
		public function flash():void{
			if (askCell ){
				askCell.visible=!askCell.visible;
			}
		}
		
		 protected function drawTieGrid(readerDataGrid:any[] ,  readerDataTieGrid:any[], roadType:string , isAsk: boolean = false ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			
			
			var ball:MovieClip;
			var offtenWidth:Number;
			var offtenHeight:Number;
			var offtenX:Number;
			var offtenY:Number;
			var ballW:Number;
			var ballH:Number;
			var pos:Point = new Point();
			
			offtenWidth = this._beadInfo.bigRoad_OfftenWidth;
			offtenHeight = this._beadInfo.bigRoad_OfftenHeight;
			offtenX = this._beadInfo.bigRoad_OfftenX;
			offtenY = this._beadInfo.bigRoad_OfftenY;
			
//			var tf:TextFormat = new TextFormat();
//			tf.bold = true;
			
			var iCount:number= 0;
			var tempChildVector:<DisplayObject> = new <DisplayObject>();//childconcat();
			for(symbol in childDataDict) 
			{
				if(symbol.indexOf("_i")!=-1)
				{
					tempChildpush(childDataDict[symbol].view);
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
								var childData:Object = childDataDict[x+"_"+y+"_i"];//={};
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
								var tindex:number= tempChildindexOf(ball);
								if(tindex>=0)
								{
									tempChildsplice(tindex,1);
								}else
								{
									childpush(ball);
								}
								if(!childData)
								{
									childData = {};
									childData.view = ball;
									childData.symbol = symbol;
									childDataDict[x+"_"+y+"_i"] = childData;
								}
								
								ballW = this._beadInfo.beadW;
								ballH = this._beadInfo.beadH;
//								ballW = ball.width;
//								ballH = ball.height;
								ball.bead.width = ballW;
								ball.bead.height = ballH;
								if ( iCount > 1 ) {
									TextField(ball.tieNumTxt).text = string(iCount);
									if(ballH<16){
										ball.tieNumTxt.y=-3
									}
									
									symbol="i2";
								}else {
									TextField(ball.tieNumTxt).text = "";
								}
								
								//TextField(ball.tieNumTxt).visible = false;
								
								/*if ( iCount >= 10 && iCount < 100 ) {
								TextField(ball.tieNumTxt).x = TextField(ball.tieNumTxt).x - 4;
								}
								else if ( iCount >= 100 && iCount < 1000 ) {
								TextField(ball.tieNumTxt).x = TextField(ball.tieNumTxt).x - 8;
								}*/
								
								
							

								if(x==0 && y==0){
								//	ball.visible = false;
								}
								this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX-0.5), ((ballH + offtenHeight) * y + offtenY-0.5));
							}	
						}
					}
				}
				
				if (x >= startX) {
					colIndex++;
				}
			}
			while(tempChildlength>0)
			{
				var child:DisplayObject = tempChildshift();
				var cindex:number= childindexOf(child);
				if(cindex>=0)
				{
					childsplice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
		}
		
		 protected function drawBigGrid(  readerDataGrid:any[], roadType:string , isAsk: boolean = false ,lastPoint:Point=null ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= this._beadInfo.gridWidth ? 0 : readerDataGrid.length - this._beadInfo.gridWidth;
			
			//console.log("startX::" + startX );
			
			var ball:MovieClip;
			var offtenWidth:Number;
			var offtenHeight:Number;
			var offtenX:Number;
			var offtenY:Number;
			var ballW:Number;
			var ballH:Number;
			
			offtenWidth = this._beadInfo.bigRoad_OfftenWidth;
			offtenHeight = this._beadInfo.bigRoad_OfftenHeight;
			offtenX = this._beadInfo.bigRoad_OfftenX;
			offtenY = this._beadInfo.bigRoad_OfftenY;
			
			var tf:TextFormat = new TextFormat();
			tf.bold = false;
			var tempChildVector:<DisplayObject> = childconcat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++)
			{
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) 
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol && symbol != "null") 
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
							ball = this._roadBallPool.getBall( roadType );
							if(childData)childData.view = ball;
						}
						var tindex:number= tempChildindexOf(ball);
						if(tindex>=0)
						{
							tempChildsplice(tindex,1);
						}else
						{
							childpush(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							childDataDict[x+"_"+y] = childData;
						}
						
						TextField(ball.tieNumTxt).text = "";
						ballW = this._beadInfo.beadW ;
						ballH = this._beadInfo.beadH;
						ball.bead.width = ballW;
						ball.bead.height = ballH;
						if (isAsk)
						{
							if ( x==lastPoint.x && y==lastPoint.y)
							{
								if (askCell) askCell.visible=true;
								askCell=ball;
							}
						}else{
							askCell=null;
						}
						this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + offtenY));
						
					}
				}
				
				if (x >= startX) {
					colIndex++;
				}
			}
			while(tempChildlength>0)
			{
				var child:DisplayObject = tempChildshift();
				var cindex:number= childindexOf(child);
				if(cindex>=0)
				{
					childsplice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
			if (isAsk==false && askCell){ 
				askCell.visible=true;
				askCell=null
			}
			
		}
		
		 public function drawBigRoadDataGrid( readerDataGrid:any[] , roadType:string , isAsk: boolean = false ):void {
			//this.init();
			//this.resetPool();
			this.drawBigGrid( readerDataGrid[0]  , roadType , isAsk ,readerDataGrid[3]);
			this.drawTieGrid( readerDataGrid[0], readerDataGrid[1] , roadType , isAsk   );
		}
		
		 public function resetPool():void {
			if (askCell){ 
				askCell.visible=true;
				askCell=null;
			}
			while (this.numChildren > 0) {
				this.removeChildAt(0);
			}
			this._roadBallPool.resetPool(RoadBallPool.BIG_ROAD);
			this._roadBallPool.resetPool(RoadBallPool.BIG_EYE_ROAD);
			this._roadBallPool.resetPool(RoadBallPool.SMALL_EYE_ROAD);
			this._roadBallPool.resetPool(RoadBallPool.COCKROACH_ROAD);
		}
		
		 public function drawReaderDataGrid(readerDataGrid:any[], isAsk: boolean = false, roadType:string = "",lastPoint:Point=null):void {
			//this.init();
			//this.resetPool();
			var symbol:string;
			var startX:number= readerDataGrid[0].length <= this._beadInfo.gridWidth ? 0 : readerDataGrid[0].length - this._beadInfo.gridWidth;
			
			var ball:MovieClip;
			var offtenWidth:Number;
			var offtenHeight:Number;
			var offtenX:Number;
			var offtenY:Number;
			var ballW:Number;
			var ballH:Number;
			
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
			var tf:TextFormat = new TextFormat();
			tf.bold = false;
		//	console.log("最后位置："+readerDataGrid[2]);
			var tempChildVector:<DisplayObject> = childconcat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid[0].length; x < cols; x++) 
			{
				for (var y:number= 0, rows:number= readerDataGrid[0][x].length; y < rows; y++)
				{
					symbol = readerDataGrid[0][x][y];
					
					if (x >= startX && symbol && symbol != "null") 
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
							ball = this._roadBallPool.getBall( roadType );
							if(childData)childData.view = ball;
						}
						var tindex:number= tempChildindexOf(ball);
						if(tindex>=0)
						{
							tempChildsplice(tindex,1);
						}else
						{
							childpush(ball);
						}
						if(!childData)
						{
							childData = {};
							childData.view = ball;
							childData.symbol = symbol;
							childDataDict[x+"_"+y] = childData;
						}
						
						ballW = ball.width;
						ballH = ball.height;
						
						if (this._beadInfo.size != 0) {
							ball.width = ball.height = this._beadInfo.size;
							ballW=this._beadInfo.size;
							ballH = this._beadInfo.size;
						}
						
						lastPoint=readerDataGrid[2]
						
						if (isAsk){
							if ( x==lastPoint.x && y==lastPoint.y){
								if (askCell) askCell.visible=true;
								askCell=ball;
							}
						}else{
							askCell=null;
						}
						
						this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + offtenY));	
					}
				}
				
				if (x >= startX) {
					colIndex++;
				}
			}
			while(tempChildlength>0)
			{
				var child:DisplayObject = tempChildshift();
				var cindex:number= childindexOf(child);
				if(cindex>=0)
				{
					childsplice(cindex,1);
				}
				if(child.parent)child.parent.removeChild(child);
			}
			if (isAsk==false && askCell){ 
				askCell.visible=true;
				askCell=null
			}
		}
	}
}