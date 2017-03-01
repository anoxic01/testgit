class BaseRoadMapItem extends BaseView implements IRoadMapItem
{
	private data:any;
	/**
	 * 当前路纸item的显示元素
	 */
	protected bitmap:egret.Bitmap;
	public constructor() 
	{
		super();
	}
	/**
	 * 设置item的路纸数据
	 */
	public setData(v:any)
	{
		if(this.data==v)return;
		this.data = v;
		if(this.bitmap==null)
		{
			this.bitmap = new egret.Bitmap();
			this.addChild(this.bitmap);
		}
		this.applyData(this.data,LanguageManager.instance.currentLang);
	}
	/**
	 * 获取当前的item数据
	 */
	public getData():any
	{
		return this.data;
	}
	/**
	 * 应用数据
	 */
	protected applyData(v:any,currentLang:any):void
	{
		
	}
	public onLanguageChange():void
	{
		this.applyData(this.data,LanguageManager.instance.currentLang);
	}

	public dispose():void
	{
		super.dispose();
		this.bitmap = null;
		this.data = null;
	}
}