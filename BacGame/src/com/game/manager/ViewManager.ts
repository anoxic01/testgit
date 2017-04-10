class ViewManager 
{

	private static _instance:ViewManager;
	public static get instance():ViewManager
	{
		if(this._instance==null)this._instance = new ViewManager;
		return this._instance;
	}	

	public constructor() 
	{
	}

	public addView(v:BaseView):void
	{

	}

	public removeView(v:BaseView):void
	{

	}


	public onLanguageChange()
	{
		
	}
}