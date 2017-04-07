module lobby.view.route {
	export class RouDozenCanvas extends game.rou.RouRoadCanvas{
		public constructor() {
		super();
		}
		
		
		 public drawBg(colNum:number,rowNum:number,size:number,lineBordSize:number= 1):void{
			var w:number=this.headW+colNum*size;
			var h:number = rowNum * size;
			
			var g = this.graphics;
			g.clear();
			
			g.beginFill(0xf3f3f3);
			
			g.drawRect(0, 0, w, h);
			g.endFill();
			g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",egret.CapsStyle.NONE);
			
			for (var i:number= 0; i <= colNum; i++) 
			{
				if(i==0 || i==colNum){
					g.lineStyle(1.5, 0, 0.75,false,"normal",egret.CapsStyle.NONE);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",egret.CapsStyle.NONE);
				}
				g.moveTo(this.headW+i*size,0);
				g.lineTo(this.headW+i*size,h);
			}
			for (var j:number= 0; j <= rowNum; j++) 
			{
				if(j==rowNum){
					g.lineStyle(1.5, 0, 0.75);
				}else{
					g.lineStyle(1, 0xBBBBBB, 0.75,false,"normal",egret.CapsStyle.NONE);
				}
				g.moveTo(0,j*size);
				g.lineTo(w,j*size);
			}
			g.endFill();
		}
		
	}
}