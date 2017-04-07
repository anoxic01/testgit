module lobby.view.route {
	export class RoadCanvas extends BSprite {
		protected _beadInfo:BeadInfo;
		protected _roadBallPool:RoadBallPool;
		/**
		 *用于存放所有的元素 
		 */		
		protected childDataDict = {};	
		protected childVector;
		
		//private m_bg:Sprite;
		
		public constructor() {
			super();
			this._roadBallPool = new RoadBallPool();
//			m_bg=new egret.Sprite();
//			addChild(m_bg);
		}
		
		 public destroy():void {
			this.graphics.clear();
			
			while( this.numChildren > 0 ) {
				this.removeChildAt(0);
			}
			
			if(this._beadInfo){
				this._beadInfo = null;
			}
			
			if(this._roadBallPool){
				this._roadBallPool.destroy();
				this._roadBallPool = null;
			}
			
			if(this.childVector){
				var c;
				while(this.childVector.length>0)
				{
					c = this.childVector.shift();
					if(c&&c.parent)c.parent.removeChild(c);
				}
				if(c){
					c = null;
				}
				this.childVector = null;
			}
			
			
			if(this.childDataDict){
				for (var key in this.childDataDict) 
				{
					delete this.childDataDict[key];
				}
				this.childDataDict = null;
			}
			super.destroy();
		}
		
		public init():void {
			
			if (this.childVector){
				while(this.childVector.length>0)
				{
					var c = this.childVector.shift();
					if(c&&c.parent)c.parent.removeChild(c);
				}
			}
			
			if(this.childDataDict){
				for (var key in this.childDataDict) 
				{
					delete this.childDataDict[key];
				}
			}
			this.resetPool();
			/*while (this.numChildren > 0) {
				this.removeChildAt(0);
			}*/
			
		}
		
		public put(ball, symbol:string, x:number, y:number):void {
			if (ball instanceof egret.MovieClip){
				
				ball.gotoAndStop(1);
				
				//if( MovieClip(ball.bead).currentFrameLabel != symbol )
				ball.bead.gotoAndStop(symbol);
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
		public drawBg(colNum:number,rowNum:number,size:number,lineBordSize:number=1):void{
			var w:number=colNum*size;
			var h:number = rowNum * size;
			
			var g = this.graphics;
			g.clear();
			
			g.beginFill(0xf3f3f3);
			
			g.drawRect(0, 0, w-0.2, h);
			g.endFill();
			g.lineStyle(lineBordSize, 0xBBBBBB, 0.75,false,"normal",egret.CapsStyle.NONE);
			
			for (var i:number= 1; i <= colNum; i++) 
			{
				if(i==0 || i==colNum){
					g.lineStyle(1.5, 0, 0.75,false,"normal",egret.CapsStyle.NONE);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",egret.CapsStyle.NONE);
				}
				g.moveTo(i*size,0);
				g.lineTo(i*size,h);
			}
			for (var j:number= 1; j <= rowNum; j++) 
			{
				if(j==rowNum){
					g.lineStyle(1.5, 0, 0.75,false,"normal",egret.CapsStyle.SQUARE);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",egret.CapsStyle.NONE);
				}
				g.moveTo(0.4,j*size);
				g.lineTo(w-0.4,j*size);
			}
			g.endFill();
			
		}
		
		public getRoadCell(type:string ,data:string):egret.DisplayObject{
			return null;
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
			
			// var tf:TextFormat = new TextFormat();
			// 	tf.bold = true;
				
			var iCount:number= 0;
			let tempChildVector:any = new Array<egret.DisplayObject>();//this.childVector.concat();
			for(var symbol in this.childDataDict) 
			{
				if(symbol.indexOf("_i")!=-1)
				{
					tempChildVector.push(this.childDataDict[symbol].view);
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
								var tindex:number= tempChildVector.indexof(ball);
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
								
								ballW = ball.width;
								ballH = ball.height;
								
								if ( iCount > 1 ) {
									// (ball.tieNumTxt).defaultTextFormat = tf;
									(ball.tieNumTxt).text = (iCount).toString;
								//	TextField(ball.tieNumTxt).autoSize = TextFieldAutoSize.LEFT;			
								}else {
									(ball.tieNumTxt).text = "";
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
		
		protected drawBigGrid(  readerDataGrid:any[], roadType:string , isAsk: boolean = false ,lastPoint=null ):void {
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
			
			offtenWidth = this._beadInfo.bigRoad_OfftenWidth;
			offtenHeight = this._beadInfo.bigRoad_OfftenHeight;
			offtenX = this._beadInfo.bigRoad_OfftenX;
			offtenY = this._beadInfo.bigRoad_OfftenY;
			
			// var tf:TextFormat = new TextFormat();
			// tf.bold = false;
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++)
			{
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) 
				{
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
						var tindex:number= tempChildVector.indexof(ball);
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
						
						(ball.tieNumTxt).text = "";
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
		public drawBigRoadDataGrid( readerDataGrid:any[] , roadType:string , isAsk: boolean = false ):void {
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
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid[0].length; x < cols; x++) {
				for (var y:number= 0, rows:number= readerDataGrid[0][x].length; y < rows; y++) {
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
						var tindex:number= tempChildVector.indexof(ball);
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