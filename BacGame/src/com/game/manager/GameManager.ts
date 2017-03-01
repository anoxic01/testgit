class GameManager 
{
	private static _instance:GameManager;
	public static get instance():GameManager
	{
		if(this._instance==null)this._instance = new GameManager;
		return this._instance;
	}	
}