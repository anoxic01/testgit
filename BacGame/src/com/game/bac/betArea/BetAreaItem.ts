class BetAreaItem extends BaseView
{
	protected bitmap:egret.Bitmap;
	protected titleBitmap:egret.Bitmap;
	protected resId:string;
	protected itemWidth:number;
	protected itemHeight:number;
	protected titleResId:string;
	public betAreaId:number = 0;
	/**
	 * 是否翻转
	 */
	protected isFlip:boolean = false;
	/**
	 * 素材无需加_png后辍
	 */
	public constructor(id:number,resId:string,titleResId:string,isFlip:boolean=false)
	{
		super();
		this.betAreaId = id;
		this.resId = resId;
		this.titleResId = titleResId;
		this.isFlip = isFlip;
		this.initView();
	}
	protected initView()
	{
		this.bitmap = this.addChild(new egret.Bitmap()) as egret.Bitmap;
		this.titleBitmap = this.addChild(new egret.Bitmap()) as egret.Bitmap;
		this.bitmap.texture = RES.getRes(this.resId+"_1_png");
		this.bitmap.smoothing = true;
		this.itemWidth = this.bitmap.width;
		this.itemHeight = this.bitmap.height;
		if(this.isFlip)this.bitmap.scaleX = -1;
		this.setItemCenter();
		this.setTitle();
		// this.graphics.beginFill(0,1);
		// this.graphics.drawRect(0,0,this.itemWidth,this.itemHeight);
		// this.graphics.endFill();
	}

	public setCanBet(v:boolean)
	{
		if(v)
		{
			this.touchEnabled = true;
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER,this.onMouseRollOver,this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.onMouseRollOut,this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER,this.onMouseRollOver,this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.onMouseRollOut,this);
		}else
		{
			this.touchEnabled = false;
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER,this.onMouseRollOver,this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT,this.onMouseRollOut,this);
		}
	}
	protected setTitle()
	{
		this.titleBitmap.texture = RES.getRes(this.titleResId+"_png");
		this.titleBitmap.smoothing = true;
		this.titleBitmap.x = (this.itemWidth-this.titleBitmap.width)*0.5;
		this.titleBitmap.y = (this.itemHeight-this.titleBitmap.height)*0.5;
	}
	protected setItemCenter()
	{
		if(this.isFlip)this.bitmap.x = this.bitmap.width+(this.itemWidth-this.bitmap.width)*0.5;
		else this.bitmap.x = (this.itemWidth-this.bitmap.width)*0.5;		
		this.bitmap.y = (this.itemHeight-this.bitmap.height)*0.5;
	}
	protected onMouseRollOver(evt:mouse.MouseEvent)
	{
		this.bitmap.texture = RES.getRes(this.resId+"_2_png");
		this.bitmap.smoothing = true;
		this.setItemCenter();
	}
	protected onMouseRollOut(evt:mouse.MouseEvent)
	{
		this.bitmap.texture = RES.getRes(this.resId+"_1_png");
		this.bitmap.smoothing = true;
		this.setItemCenter();
	}
}