class GameUtils {
	
	public static fixedAngle(angle:number):number
	{
		if(angle<0)
		{
			angle=360+angle;
		}
		return angle;
	}

	public static fixedModelActionDirection(direction:number,oldDirection:number,newDirection:number):number
	{
		if(oldDirection==4&&newDirection==8)// 从4方向转向8方向
		{
			direction+=4;
		}else if(oldDirection==8&&newDirection==4)// 从8方向转向4方向
		{
			direction%=4;
		}
		return direction;
	}
	/**
	 * this.canvas=document.getElementsByTagName("CANVAS")[0];
	 * this.canvas.addEventListener('mousemove',this.onMove);
	 * private onMove(evt: MouseEvent): void 
	 * {
	 * 	var temp = GameUtils.fixedMousePoint(evt.currentTarget,evt.x,evt.y);
	 * } 
	 */
	public static fixedMousePoint(canvas:any,x: number,y: number): any 
	{
        var style = window.getComputedStyle(canvas,null);
        var rect = canvas.getBoundingClientRect();
        return {
            x: (x - rect.left) * (canvas.width / parseFloat(style["width"])),// 全局坐标*水平方向的缩放因子
            y: (y - rect.top) * (canvas.height / parseFloat(style["height"]))
        };
    }

	public static getDistance(px:number,py:number,mx:number,my:number):number
	{
		let dx:number = px - mx;
		let dy:number = py - my;
		if(dx==0&&dy==0)return 0;
		return Math.sqrt(dx*dx+dy*dy);
	}
}