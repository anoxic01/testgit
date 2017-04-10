class BetAreaSeatItem extends BaseView
{
	private static COLORFILTER:egret.ColorMatrixFilter = new egret.ColorMatrixFilter([1,0,0,0,255,0,1,0,0,255,0,0,1,0,0,0,0,0,1,0]);
	protected bitmap:egret.Bitmap;
	protected titleBitmap:egret.Bitmap;
	protected itemWidth:number;
	protected itemHeight:number;
	protected isFlip:boolean = false;
	protected resId:string;
	protected titleResId:string;
	
	public seatId:number;
	/**
	 * 
	 * 
	 * 
	 * ///// 原色
	 * [1,0,0,0,0,
		0,1,0,0,0,
		0,0,1,0,0,
		0,0,0,1,0]

		///// 黄色
		[1,0,0,0,255,// red
		0,1,0,0,255,// green
		0,0,1,0,0,// blue
		0,0,0,1,0]// alpha
	 */

	public constructor(id:number,resId:string,titleResId:string,isFlip:boolean=false) 
	{
		super();
		this.seatId = id;
		this.resId = resId;
		this.titleResId = titleResId;
		this.isFlip = isFlip;
		this.initView();
	}
	protected initView()
	{
		this.bitmap = this.addChild(new egret.Bitmap()) as egret.Bitmap;
		this.titleBitmap = this.addChild(new egret.Bitmap()) as egret.Bitmap;
		this.bitmap.texture = RES.getRes(this.resId+"_png");
		this.bitmap.smoothing = true;
		this.itemWidth = this.bitmap.width;
		this.itemHeight = this.bitmap.height;
		if(this.isFlip)this.bitmap.scaleX = -1;
		this.setItemCenter();
		this.setTitle();
	}
	protected setTitle()
	{
		this.titleBitmap.texture = RES.getRes(this.titleResId+"_png");
		this.titleBitmap.smoothing = true;
		if(this.seatId>=6&&this.isFlip)
		{
			if(this.seatId==7)this.titleBitmap.x = this.itemWidth-this.titleBitmap.width-60;
			else if(this.seatId==8)this.titleBitmap.x = this.itemWidth-this.titleBitmap.width-20;
			else this.titleBitmap.x = this.itemWidth-this.titleBitmap.width-40;
		}else this.titleBitmap.x = this.itemWidth-this.titleBitmap.width-25;
		this.titleBitmap.y = 15;
	}
	/**
	 * 设置座位信息
	 */
	public setSeatData(v:any)
	{
		if(v!=null)
		{
			this.titleBitmap.filters = [BetAreaSeatItem.COLORFILTER];
		}else
		{
			this.titleBitmap.filters = [];
		}
	}
	protected setItemCenter()
	{
		if(this.isFlip)this.bitmap.x = this.bitmap.width+(this.itemWidth-this.bitmap.width)*0.5;
		else this.bitmap.x = (this.itemWidth-this.bitmap.width)*0.5;		
		this.bitmap.y = (this.itemHeight-this.bitmap.height)*0.5;
	}
}