module lobby.view.route {
	export class RoadCanvas extends BSprite {
		protected _beadInfo:BeadInfo;
		protected _roadBallPool:RoadBallPool;
		/**
		 *用于存放所有的元素 
		 */		
		protected childDataDict:Dictionary = new Dictionary();	
		protected childVector:<DisplayObject> = new <DisplayObject>();
		
		//private m_bg:Sprite;
		
		public constructor() {
		this._roadBallPool = new RoadBallPool();
//			m_bg=new Sprite();
//			addChild(m_bg);
		}
		
		 public destroy():void {
			this.graphics.clear();
			
			while( this.numChildren > 0 ) {
				this.removeChildAt(0);
			}
			
			if(_beadInfo){
				_beadInfo = null;
			}
			
			if(_roadBallPool){
				_roadBallPool.destroy();
				_roadBallPool = null;
			}
			
			if(childVector){
				var c:DisplayObject;
				while(childlength>0)
				{
					c = childshift();
					if(c&&c.parent)c.parent.removeChild(c);
				}
				if(c){
					c = null;
				}
				childVector = null;
			}
			
			
			if(childDataDict){
				for (var key:String in childDataDict) 
				{
					delete childDataDict[key];
				}
				childDataDict = null;
			}
			super.destroy();
		}
		
		public init():void {
			
			if (childVector){
				while(childlength>0)
				{
					var c:DisplayObject = childshift();
					if(c&&c.parent)c.parent.removeChild(c);
				}
			}
			
			if(childDataDict){
				for (var key:String in childDataDict) 
				{
					delete childDataDict[key];
				}
			}
			resetPool();
			/*while (this.numChildren > 0) {
				this.removeChildAt(0);
			}*/
			
		}
		
		public put(ball:DisplayObject, symbol:String, x:Number, y:Number):void {
			if (ball is MovieClip){
				
				MovieClip(ball).gotoAndStop(1);
				
				//if( MovieClip(ball.bead).currentFrameLabel != symbol )
				MovieClip(ball).bead.gotoAndStop(symbol);
			}
			
			
			ball.x = x;
			ball.y = y;
			
			
			if( !this.contains(ball ) )
				this.addChild(ball);
		}
		
		public setBeadSize(beadInfo:BeadInfo):void {
			this._beadInfo = beadInfo;
		}
		/**
		 *绘制表格 
		 * @param colNum
		 * @param rowNum
		 * @param size
		 * 
		 */
		public drawBg(colNum:Number,rowNum:Number,size:Number,lineBordSize:number=1):void{
			var w:Number=colNum*size;
			var h:Number = rowNum * size;
			
			var g:Graphics = this.graphics;
			g.clear();
			
			g.beginFill(0xf3f3f3);
			
			g.drawRect(0, 0, w-0.2, h);
			g.endFill();
			g.lineStyle(lineBordSize, 0xBBBBBB, 0.75,false,"normal",CapsStyle.NONE);
			
			for (var i:number= 1; i <= colNum; i++) 
			{
				if(i==0 || i==colNum){
					g.lineStyle(1.5, 0, 0.75,false,"normal",CapsStyle.NONE);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",CapsStyle.NONE);
				}
				g.moveTo(i*size,0);
				g.lineTo(i*size,h);
			}
			for (var j:number= 1; j <= rowNum; j++) 
			{
				if(j==rowNum){
					g.lineStyle(1.5, 0, 0.75,false,"normal",CapsStyle.SQUARE);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",CapsStyle.NONE);
				}
				g.moveTo(0.4,j*size);
				g.lineTo(w-0.4,j*size);
			}
			g.endFill();
			
		}
		
		public getRoadCell(type:String ,data:String):DisplayObject{
			return null;
		}
		
		protected drawTieGrid(readerDataGrid:any[] ,  readerDataTieGrid:any[], roadType:String , isAsk: boolean = false ):void {
			var symbol:String;
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
			
			var tf:TextFormat = new TextFormat();
				tf.bold = true;
				
			var iCount:number= 0;
			var tempChildVector:<DisplayObject> = new <DisplayObject>();//childconcat();
			for(symbol in childDataDict) 
			{
				if(symbol.indexOf("_i")!=-1)
				{
					tempChildpush(childDataDict[symbol].view);
				}
			}
			for (var x:number= 0,  colIndex:number= 0, cols:number= readerDataTieGrid.length; x < cols; x++) {
				if ( readerDataTieGrid[x] != undefined ) {
	
					for (var y:number= 0, rows:number= readerDataTieGrid[x].length; y < rows; y++) {
						
						if ( readerDataTieGrid[x][y] != undefined ) {
								
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
								
								ballW = ball.width;
								ballH = ball.height;
								
								if ( iCount > 1 ) {
									TextField(ball.tieNumTxt).defaultTextFormat = tf;
									TextField(ball.tieNumTxt).text = String(iCount);
								//	TextField(ball.tieNumTxt).autoSize = TextFieldAutoSize.LEFT;			
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
								
								
								ballW = this._beadInfo.beadW;
								ballH = this._beadInfo.beadH;

								
								this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + offtenY));
							
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
		
		protected drawBigGrid(  readerDataGrid:any[], roadType:String , isAsk: boolean = false ,lastPoint:Point=null ):void {
			var symbol:String;
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
						this.put(ball, symbol, ((ballW + offtenWidth) * colIndex + offtenX), ((ballH + offtenHeight) * y + offtenY));
					}
				}
				if (x >= startX) 
				{
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
		public drawBigRoadDataGrid( readerDataGrid:any[] , roadType:String , isAsk: boolean = false ):void {
			//this.init();
			//this.resetPool();
			this.drawBigGrid( readerDataGrid[0]  , roadType , isAsk );
			this.drawTieGrid( readerDataGrid[0], readerDataGrid[1] , roadType , isAsk   );
		}
		
		public resetPool():void {
			while (this.numChildren > 0) {
				this.removeChildAt(0);
			}
			this._roadBallPool.resetPool(RoadBallPool.BIG_ROAD);
			this._roadBallPool.resetPool(RoadBallPool.BIG_EYE_ROAD);
			this._roadBallPool.resetPool(RoadBallPool.SMALL_EYE_ROAD);
			this._roadBallPool.resetPool(RoadBallPool.COCKROACH_ROAD);
		}
		
		public drawReaderDataGrid(readerDataGrid:any[], isAsk: boolean = false, roadType:String = "",lastPoint:Point=null):void {
			//this.init();
			//this.resetPool();
			var symbol:String;
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
			var tempChildVector:<DisplayObject> = childconcat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid[0].length; x < cols; x++) {
				for (var y:number= 0, rows:number= readerDataGrid[0][x].length; y < rows; y++) {
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
		}
	}
}