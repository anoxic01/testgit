class TransformTarget extends BaseEffect
{
	protected startPoint:egret.Point;
	protected endPoint:egret.Point;
	protected speed:number;
	protected framer:JFramer;
	protected step:number;
	protected speedX:number;
	protected speedY:number;
	public constructor(target:any,sp:egret.Point,ep:egret.Point,speed:number) 
	{
		super(target);
		this.startPoint = sp;
		this.endPoint = ep;
		this.speed = speed;
		this.framer = JFramer.getFramer();
		this.framer.addFramerCallback(this.onFrame,this);
	}
	public start()
	{
		this.target.x = this.startPoint.x;
		this.target.y = this.startPoint.y;
		var xx:number = this.endPoint.x-this.startPoint.x;
		var yy:number = this.endPoint.y-this.startPoint.y;
		var len:number = Math.sqrt(xx*xx+yy*yy);
		this.step = Math.floor(len/this.speed);
		this.speedX = xx/this.step;
		this.speedY = yy/this.step;
		this.framer.start();
		super.start();

	}
	protected onFrame()
	{
		if(this.step>0)
		{
			this.step--;
			this.target.x+=this.speedX;
			this.target.y+=this.speedY;
		}else
		{
			this.complete();
		}
	}
	public end()
	{
		super.end();
		this.target.x = this.endPoint.x;
		this.target.y = this.endPoint.y;
	}
	public dispose()
	{
		this.framer.dispose();
		this.framer = null;
		super.dispose();

	}
}