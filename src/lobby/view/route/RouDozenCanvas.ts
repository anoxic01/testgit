module lobby.view.route {
	export class RouDozenCanvas extends RouRoadCanvas{
		public constructor() {
		super();
		}
		
		
		override public function drawBg(colNum:Number,rowNum:Number,size:Number,lineBordSize:int = 1):void{
			var w:Number=headW+colNum*size;
			var h:Number = rowNum * size;
			
			var g:Graphics = this.graphics;
			g.clear();
			
			g.beginFill(0xf3f3f3);
			
			g.drawRect(0, 0, w, h);
			g.endFill();
			g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",CapsStyle.NONE);
			
			for (var i:int = 0; i <= colNum; i++) 
			{
				if(i==0 || i==colNum){
					g.lineStyle(1.5, 0, 0.75,false,"normal",CapsStyle.NONE);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",CapsStyle.NONE);
				}
				g.moveTo(headW+i*size,0);
				g.lineTo(headW+i*size,h);
			}
			for (var j:int = 0; j <= rowNum; j++) 
			{
				if(j==rowNum){
					g.lineStyle(1.5, 0, 0.75);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",CapsStyle.NONE);
				}
				g.moveTo(0,j*size);
				g.lineTo(w,j*size);
			}
			g.endFill();
		}
		
	}
}