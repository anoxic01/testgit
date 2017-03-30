module lobby.view.route.game.rou {
	export class RouRoadCanvas extends RoadCanvas{
		public var headW				:	Number	=	0;
		private var tfArr				:	any[];
		
		public var gridWidth			:	int 	= 	0;			//格子数量
		private var m_mcRouAsset		:	MovieClip;
		
		public constructor() {
		}
		 public function destroy():void{
			if(m_mcRouAsset){
				this.removeChild(m_mcRouAsset);
				m_mcRouAsset = null;
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
		
		 public function init():void {
			while( this.numChildren > 0 ) {
				this.removeChildAt(0);
			}
			
			if (m_mcRouAsset){
				addChild(m_mcRouAsset);
			}
		}
		
		public function setTxtName(arr:any[]):void{
//			for (var i:number= 0; i < tfArr.length; i++) 
//			{
//				tfArr[i].text=arr[i]	
//			}
		}
		
		 public function onChangeLanguage():void{
			var mc:MovieClip;
			var bead:BeadItem
			for (var i:number= 0; i < this.numChildren; i++) 
			{
				bead = this.getChildAt(i) as BeadItem;
				if (bead){
					bead.onChangeLanguage();
				}
				
			}
			if(m_mcRouAsset){
				for (var j:number= 0; j < m_mcRouAsset.numChildren; j++) 
				{
					mc = m_mcRouAsset.getChildByName("mc_dalie_" + string(j)) as MovieClip;
					mc.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				}
			}
		}
		
		
		public function drawHeadBg(colNum:Number,rowNum:Number,size:Number):void{
			drawBg(colNum,rowNum,size);
			tfArr=[];
//			var format:TextFormat = new TextFormat(null,15);
//			format.align = TextFormatAlign.CENTER;
//			for (var i:number= 0; i < rowNum; i++) 
//			{
//				var txtLabel:TextField = new TextField();
//				txtLabel.selectable = false;
//				txtLabel.mouseEnabled = false;
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
			if(m_mcRouAsset==null){
				m_mcRouAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Rou_Dalie_Assset");
				m_mcRouAsset.x = (headW-m_mcRouAsset.width)/2;
				m_mcRouAsset.y = 2;
				m_mcRouAsset.mouseEnabled = m_mcRouAsset.mouseEnabled = false;
				this.addChild(m_mcRouAsset);
			}
			
			var lang:number=1;
			if(LobbyManager.getInstance().lobbyAuth){
				lang = LobbyManager.getInstance().lobbyAuth.Lang+1;
			}
			var mc:MovieClip;
			for (var i:number= 0; i < rowNum; i++) 
			{
				mc = m_mcRouAsset.getChildByName("mc_dalie_" + string(i)) as MovieClip;
			//	mc.mouseEnabled = false;
//				
//				mc.x = (headW-mc.width)/2;
//				mc.y = 2+size*i;
				
				mc.gotoAndStop(lang);
				//this.addChild(mc);
			}
			
			
		//	console.log("frst"+numChildren)
			
		}
		
		 public function drawBg(colNum:Number,rowNum:Number,size:Number,lineBordSize:number=1):void{
			var w:Number=headW+colNum*size;
			var h:Number = rowNum * size;
			
			var g:Graphics = this.graphics;
			g.clear();
			
			g.beginFill(0xf3f3f3);
			
			g.drawRect(0, 0, w, h);
			g.endFill();
			g.lineStyle(1, 0xBBBBBB, 0.75);
			for (var k:number= 0; k <= 1; k++) 
			{
				g.lineStyle(2, 0, 0.75);
				g.moveTo(headW,0);
				g.lineTo(headW,h);
			}
			
			
			for (var i:number= 0; i <= colNum; i++) 
			{
				if(i==0 || i==colNum){
					g.lineStyle(2, 0, 0.75);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75);
				}
				g.moveTo(headW+i*size,0);
				g.lineTo(headW+i*size,h);
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
		
		
		 public function put(ball:DisplayObject, symbol:string, x:Number, y:Number):void {
			if (ball is MovieClip ){
				MovieClip(ball).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			}
			ball.x = x;
			ball.y = y;
			
			//if( !this.contains(ball ) )
			this.addChild(ball);
		}
		
		 public function setBeadSize(beadInfo:BeadInfo):void {
			this._beadInfo = beadInfo;
			gridWidth = beadInfo.gridWidth;
		}
		
		
		public function drawBeadRoad(readerDataGrid:any[]  , isAsk: boolean = false ):void {
			
			var symbol:string;
			var startX:number= readerDataGrid.length <= gridWidth ? 0 : readerDataGrid.length - gridWidth;
			
			//console.log("startX::" + startX );
			
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
			var tempChildVector:<DisplayObject> = childconcat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) {
				
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) {
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
							ball = this._roadBallPool.getRouBead(symbol);
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
		
		
		
		public function drawRedBlackRoad(readerDataGrid:any[]  , isAsk: boolean = false ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= gridWidth ? 0 : readerDataGrid.length - gridWidth;
				
			//console.log("startX::" + startX );
			
			var ball:BeadItem;
			var offtenWidth:Number;
			var offtenHeight:Number;
			var offtenX:Number;
			var offtenY:Number;
			var ballW:Number;
			var ballH:Number;
			
			offtenWidth = this._beadInfo.redMc_OfftenWidth;
			offtenHeight = this._beadInfo.redMc_OfftenHeight;
			offtenX = this._beadInfo.redMc_OfftenX;
			offtenY = this._beadInfo.redMc_OfftenY;
			
			var tf:TextFormat = new TextFormat();
			tf.bold = false;
			var tempChildVector:<DisplayObject> = childconcat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) {

				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) {
					symbol = readerDataGrid[x][y];
					
					if (x >= startX && symbol && symbol != "null") {
						
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
		
		public function drawBigSmallRoad(  readerDataGrid:any[], isAsk: boolean = false  ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= gridWidth ? 0 : readerDataGrid.length - gridWidth;
				
			//console.log("startX::" + startX );
			
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
		
		/**
		 * 畫出 打/列
		 * @param	readerDataGrid
		 * @param	
		 * @param	isAsk
		 */
		public function drawZodenRowRoad( readerDataGrid:any[] , isAsk: boolean = false ):void {
			var symbol:string;
			var startX:number= readerDataGrid.length <= gridWidth ? 0 : readerDataGrid.length - gridWidth;
				
			//console.log("startX::" + startX );
			var ball:DisplayObject;
			var offtenWidth:Number;
			var offtenHeight:Number;
			var offtenX:Number;
			var offtenY:Number;
			var ballW:Number;
			var ballH:Number;
			
			offtenWidth = this._beadInfo.blueMc_OfftenWidth;
			offtenHeight = this._beadInfo.blueMc_OfftenHeight;
			offtenX = this._beadInfo.blueMc_OfftenX;
			offtenY = this._beadInfo.blueMc_OfftenY;
			
			
			
			var idx:number= -1;
			var zoen:string = '';
			var row:string = '';
			var zrAr:any[];
			var tempChildVector:<DisplayObject> = childconcat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) 
			{
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++)
				{
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol && symbol != null) 
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
		 public function resetPool():void {
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
		public function drawOddEvenRoad(readerDataGrid:any[], isAsk: boolean = false):void {
		
			var symbol:string;
			var startX:number= readerDataGrid.length <= gridWidth ? 0 : readerDataGrid.length - gridWidth;
				
			//console.log("startX::" + startX );
			
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
			
			var tf:TextFormat = new TextFormat();
			tf.bold = false;
			var tempChildVector:<DisplayObject> = childconcat();
			for (var x:number= startX,  colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) {

				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) {
					symbol = readerDataGrid[x][y];
					
					if (x >= startX && symbol && symbol != "null" ) {
						
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