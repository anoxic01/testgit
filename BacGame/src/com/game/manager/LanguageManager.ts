/**
 * 多语言管理类
 */
class LanguageManager 
{
	private static _instance:LanguageManager;
	public static get instance():LanguageManager
	{
		if(this._instance==null)this._instance = new LanguageManager;
		return this._instance;
	}

	private _lang:any = 0;
	public get currentLang():any
	{
		return this._lang;
	}

	public constructor()
	{
	}
	/**
	 * 切换语言
	 */
	public changeLanguage(lang:any)
	{
		
	}
}