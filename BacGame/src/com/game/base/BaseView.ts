class BaseView extends egret.Sprite
{
	public constructor() 
	{
		super();
		if(this.stage==null)
		{
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddThisToStage,this);
		}else
		{
			this.onAddToStage();
		}
		ViewManager.instance.addView(this);
	}
	private onAddThisToStage(evt:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddThisToStage,this);
		this.onAddToStage();
	}
	/**
	 * 添加到舞台显示
	 */
	protected onAddToStage():void
	{
		
	}
	
	/**
	 * 销毁
	 */
	public dispose():void
	{
		ViewManager.instance.removeView(this);
		this.disposeChilds();
		this.removeFromParent();
	}
	/**
	 * 从父对象中删除
	 */
	public removeFromParent():void
	{
		if(this.parent)
		{
			this.parent.removeChild(this);
		}
	}
	/**
	 * 销毁子对象
	 */
	protected disposeChilds():void
	{
		var c:any;
		while(this.numChildren>0)
		{
			c = this.removeChildAt(0);
			if(c as BaseView)
			{
				(c as BaseView).dispose();
			}
		}
	}
	/**
	 * 切换多语言
	 */
	public onLanguageChange():void
	{

	}
}