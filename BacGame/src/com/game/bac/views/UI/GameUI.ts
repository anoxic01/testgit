class GameUI extends BaseComponent implements  eui.UIComponent 
{
	public roadMapUI:RoadMapUI;
	public betAreaUI:BetAreaUI;
	public dealCardUI:DealCardUI;
	public constructor() 
	{
		super();
	}	
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	protected childrenCreated():void
	{
		super.childrenCreated();
	}
}