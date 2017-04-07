module lobby.view.route.game.rou {
	export class RouRoadCanvas extends RoadCanvas{
		public headW				:	number	=	0;
		private tfArr				:	any[];
		
		public gridWidth			 	= 	0;			//格子数量
		private m_mcRouAsset		;
		
		public constructor() {
			super();
		}
		 public destroy():void{
			if(this.m_mcRouAsset){
				this.removeChild(this.m_mcRouAsset);
				this.m_mcRouAsset = null;
			}
			
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
		
		 public init():void {
			while( this.numChildren > 0 ) {
				this.removeChildAt(0);
			}
			
			if (this.m_mcRouAsset){
				this.addChild(this.m_mcRouAsset);
			}
		}
		
		public setTxtName(arr:any[]):void{
//			for (var i:number= 0; i < tfArr.length; i++) 
//			{
//				tfArr[i].text=arr[i]	
//			}
		}
		
		 public onChangeLanguage():void{
			var mc;
			var bead:BeadItem
			for (var i:number= 0; i < this.numChildren; i++) 
			{
				bead = this.getChildAt(i) as BeadItem;
				if (bead){
					bead.onChangeLanguage();
				}
				
			}
			if(this.m_mcRouAsset){
				for (var j:number= 0; j < this.m_mcRouAsset.numChildren; j++) 
				{
					mc = this.m_mcRouAsset.getChildByName("mc_dalie_" + (j).toString);
					mc.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				}
			}
		}
		
		
		public drawHeadBg(colNum:number,rowNum:number,size:number):void{
			this.drawBg(colNum,rowNum,size);
			this.tfArr=[];
//			var format:TextFormat = new TextFormat(null,15);
//			format.align = TextFormatAlign.CENTER;
//			for (var i:number= 0; i < rowNum; i++) 
//			{
//				var txtLabel:TextField = new egret.TextField();
//				txtLabel.selectable = false;
//				txtLabel.touchEnabled = false;
//				this.addChild(txtLabel);
//				
//				txtLabel.defaultTextFormat= format;
//				
//				txtLabel.width = headW-4;
//				txtLabel.height = size-2;
//				txtLabel.x = 2;
//				txtLabel.y = 1+size*i;
//				txtLabel.text="第一列"
//				this.tfArr.push(txtLabel);
//			}
//			
			if(this.m_mcRouAsset==null){
				this.m_mcRouAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Rou_Dalie_Assset");
				this.m_mcRouAsset.x = (this.headW-this.m_mcRouAsset.width)/2;
				this.m_mcRouAsset.y = 2;
				this.m_mcRouAsset.touchEnabled =this. m_mcRouAsset.touchEnabled = false;
				this.addChild(this.m_mcRouAsset);
			}
			
			var lang:number=1;
			if(manager.LobbyManager.getInstance().lobbyAuth){
				lang = manager.LobbyManager.getInstance().lobbyAuth.Lang+1;
			}
			var mc;
			for (var i:number= 0; i < rowNum; i++) 
			{
				mc = this.m_mcRouAsset.getChildByName("mc_dalie_" + (i).toString);
			//	mc.touchEnabled = false;
//				
//				mc.x = (headW-mc.width)/2;
//				mc.y = 2+size*i;
				
				mc.gotoAndStop(lang);
				//this.addChild(mc);
			}
			
			
		//	console.log("frst"+numChildren)
			
		}
		
		 public drawBg(colNum:number,rowNum:number,size:number,lineBordSize:number=1):void{
			var w:number=this.headW+colNum*size;
			var h:number = rowNum * size;
			
			var g = this.graphics;
			g.clear();
			
			g.beginFill(0xf3f3f3);
			
			g.drawRect(0, 0, w, h);
			g.endFill();
			g.lineStyle(1, 0xBBBBBB, 0.75);
			for (var k:number= 0; k <= 1; k++) 
			{
				g.lineStyle(2, 0, 0.75);
				g.moveTo(this.headW,0);
				g.lineTo(this.headW,h);
			}
			
			
			for (var i:number= 0; i <= colNum; i++) 
			{
				if(i==0 || i==colNum){
					g.lineStyle(2, 0, 0.75);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75);
				}
				g.moveTo(this.headW+i*size,0);
				g.lineTo(this.headW+i*size,h);
			}
			for (var j:number= 0; j <= rowNum; j++) 
			{
				if(j==rowNum){
					g.lineStyle(2, 0, 0.75);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75);
				}
				g.moveTo(0,j*size);
				g.lineTo(w,j*size);
			}
			g.endFill();
		}
		
		
		 public put(ball, symbol:string, x:number, y:number):void {
			if (ball instanceof egret.MovieClip ){
				(ball).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			}
			ball.x = x;
			ball.y = y;
			
			//if( !this.contains(ball ) )
			this.addChild(ball);
		}
		
		 public setBeadSize(beadInfo:BeadInfo):void {
			this._beadInfo = beadInfo;
			this.gridWidth = beadInfo.gridWidth;
		}
		
		
		public drawBeadRoad(readerDataGrid:any[]  , isAsk: boolean = false ):void {
			
			var symbol:string;
			var startX:number= readerDataGrid.length <= this.gridWidth ? 0 : readerDataGrid.length - this.gridWidth;
			
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
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) {
				
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) {
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
							ball = this._roadBallPool.getRouBead(symbol);
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
//						ball.width = ballW;
//						ball.height = ballW;
						
//						ball.contentTxt.text = symbol;
//						ball.contentTxt.autoSize = TextFieldAutoSize.LEFT;
						
						
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
		
		
		
		public drawRedBlackRoad(readerDataGrid:any[]  , isAsk: boolean = false ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= this.gridWidth ? 0 : readerDataGrid.length - this.gridWidth;
				
			//console.log("startX::" + startX );
			
			var ball:BeadItem;
			var offtenWidth:number;
			var offtenHeight:number;
			var offtenX:number;
			var offtenY:number;
			var ballW:number;
			var ballH:number;
			
			offtenWidth = this._beadInfo.redMc_OfftenWidth;
			offtenHeight = this._beadInfo.redMc_OfftenHeight;
			offtenX = this._beadInfo.redMc_OfftenX;
			offtenY = this._beadInfo.redMc_OfftenY;
			
			// var tf:TextFormat = new TextFormat();
			// tf.bold = false;
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) {

				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) {
					symbol = readerDataGrid[x][y];
					
					if (x >= startX && symbol && symbol != "null") {
						
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
					/*		if ( symbol == RouData.RED ) {
								ball = this._roadBallPool.getBall( RoadBallPool.RED_MC_ROAD );
							}
							else if ( symbol == RouData.BLACK ) {
								
								ball = this._roadBallPool.getBall( RoadBallPool.BLACK_MC_ROAD );
							}
							else if(symbol == RouData.ZERO ){
								ball = this._roadBallPool.getBall( RoadBallPool.ZERO_MC_ROAD );
							}else {
								throw Error("Debug RouRoadCanvas.drawBigSmallRoad()");
							}*/
							ball = new BeadItemRou();
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
//						ball.width = ballW;
//						ball.height = ballH;
						
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
		
		public drawBigSmallRoad(  readerDataGrid:any[], isAsk: boolean = false  ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= this.gridWidth ? 0 : readerDataGrid.length - this.gridWidth;
				
			//console.log("startX::" + startX );
			
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
							/*if ( symbol == RouData.BIG ) 
							{
								
								//ball = this._roadBallPool.getBall( RoadBallPool.BIG_MC_ROAD );
							}
							else if ( symbol == RouData.SMALL ) 
							{
								ball = this._roadBallPool.getBall( RoadBallPool.SMALL_MC_ROAD );
							}
							else if(symbol == RouData.ZERO )
							{
								ball = this._roadBallPool.getBall( RoadBallPool.ZERO_MC_ROAD );
							}else 
							{
								console.log("轮盘路单错误："+symbol);
							}*/
							ball = new BeadItemRou();
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
//						ball.width = ballW-3;
//						ball.height = ballW-3;
						
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
		
		/**
		 * 畫出 打/列
		 * @param	readerDataGrid
		 * @param	
		 * @param	isAsk
		 */
		public drawZodenRowRoad( readerDataGrid:any[] , isAsk: boolean = false ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= this.gridWidth ? 0 : readerDataGrid.length - this.gridWidth;
				
			//console.log("startX::" + startX );
			var ball;
			var offtenWidth:number;
			var offtenHeight:number;
			var offtenX:number;
			var offtenY:number;
			var ballW:number;
			var ballH:number;
			
			offtenWidth = this._beadInfo.blueMc_OfftenWidth;
			offtenHeight = this._beadInfo.blueMc_OfftenHeight;
			offtenX = this._beadInfo.blueMc_OfftenX;
			offtenY = this._beadInfo.blueMc_OfftenY;
			
			
			
			var idx:number= -1;
			var zoen:string = '';
			var row:string = '';
			var zrAr:any[];
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) 
			{
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol && symbol != null) 
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
							if ( symbol == RouData.ZOEN_1 || symbol == RouData.ZOEN_2 || symbol == RouData.ZOEN_3 )
							{
								ball = this._roadBallPool.getBall( RoadBallPool.RED_BALL_MC_ROAD );
							}
							if ( symbol == RouData.ROW_1 || symbol == RouData.ROW_2 || symbol == RouData.ROW_3 )
							{
								ball = this._roadBallPool.getBall( RoadBallPool.BLUE_BALL_MC_ROAD );
							}
							if ( symbol == RouData.ZERO )
							{
								ball =  this._roadBallPool.getBall( RoadBallPool.GREEN_BALL_MC_ROAD );
							}
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
						
						
						ballW = this._beadInfo.zoenRowW ;
						ballH = this._beadInfo.zoenRowH;
//						ball.width = ballW-4;
//						ball.height = ballH-4;
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
		public drawOddEvenRoad(readerDataGrid:any[], isAsk: boolean = false):void {
		
			var symbol:string;
			var startX:number= readerDataGrid.length <= this.gridWidth ? 0 : readerDataGrid.length - this.gridWidth;
				
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
			
			// var tf:TextFormat = new TextFormat();
			// tf.bold = false;
			var tempChildVector = this.childVector.concat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) {

				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) {
					symbol = readerDataGrid[x][y];
					
					if (x >= startX && symbol && symbol != "null" ) {
						
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
						/*	if ( symbol == RouData.ODD ) {
								ball = this._roadBallPool.getBall( RoadBallPool.ODD_MC_ROAD );
							}
							else if ( symbol == RouData.EVEN ) {
								
								ball = this._roadBallPool.getBall( RoadBallPool.EVEN_MC_ROAD );
							}
							else if(symbol == RouData.ZERO ){
								ball = this._roadBallPool.getBall( RoadBallPool.ZERO_MC_ROAD );
							}else {
								throw Error("Debug RouRoadCanvas.drawBigSmallRoad()");
							}*/
							ball = new BeadItemRou();
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
						//				ball.width = ballW;
						//				ball.height = ballH;
						
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