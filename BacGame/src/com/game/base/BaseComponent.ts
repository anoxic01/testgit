class BaseComponent extends eui.Component
{
	
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
	 * 销毁
	 */
	public dispose():void
	{
		//ViewManager.instance.removeView(this);
		this.disposeChilds();
		this.removeFromParent();
	}

	/**
	 * 切换多语言
	 */
	public onLanguageChange():void
	{

	}
}