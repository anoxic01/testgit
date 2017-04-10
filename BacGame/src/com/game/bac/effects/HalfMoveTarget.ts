class HalfMoveTarget extends BaseEffect
{
	protected startPoint:egret.Point;
	protected endPoint:egret.Point;
	protected framer:JFramer;
	protected halfTime:number;
	public constructor(target:any,sp:egret.Point,ep:egret.Point,halfTime:number) 
	{
		super(target);
		this.startPoint = sp;
		this.endPoint = ep;
		this.halfTime = halfTime;
		this.framer = JFramer.getFramer();
		this.framer.addFramerCallback(this.onFrame,this);
	}
	public start()
	{
		this.target.x = this.startPoint.x;
		this.target.y = this.startPoint.y;
		this.framer.start();
		super.start();
	}
	protected onFrame()
	{
		var xx:number = this.endPoint.x - this.target.x;
		var yy:number = this.endPoint.y - this.target.y;
		xx/=this.halfTime;
		yy/=this.halfTime;
		this.target.x+=xx;
		this.target.y+=yy;
		if(Math.abs(xx)<0.01&&Math.abs(yy)<0.01)
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