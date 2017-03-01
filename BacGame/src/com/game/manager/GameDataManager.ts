class GameDataManager 
{
	private static _instance:GameDataManager;
	public static get instance():GameDataManager
	{
		if(this._instance==null)this._instance = new GameDataManager;
		return this._instance;
	}
	public constructor() 
	{
		
	}
}