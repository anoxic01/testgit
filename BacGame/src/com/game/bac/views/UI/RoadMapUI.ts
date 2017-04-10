class RoadMapUI extends BaseComponent implements  eui.UIComponent
{
	/**统计按钮 */
	public staBtn:eui.Button;
	/**闲问路 */
	public playerAskBtn:eui.Button;
	/**庄问路 */
	public bankerAskBtn:eui.Button;
	/**大 */
	public big:eui.Label;
	/**小 */
	public small:eui.Label;
	/**庄对 */
	public bankerPair:eui.Label;
	/**和 */
	public tie:eui.Label;
	/**闲 */
	public player:eui.Label;
	/**庄 */
	public banker:eui.Label;
	/**闲对 */
	public playerPair:eui.Label;

	
	private mainRoadMap:RoadMap;
	private bigRoadMap:RoadMap;
	private bigEyeRoadMap:RoadMap;
	private smallEyeRoadMap:RoadMap;
	private roachRoadMap:RoadMap;
	private sharkTimer:JTimer;
	private data:string;
	
	
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

		var roadStr:string = "a.a.a.a.a.a.a.e.c.b.a.e.i.i.a.e.c.a.a.e.e.e.a.e.i.a.b.e.j.e.a.a.i.a.g.a.i.a.a.a.a.f.e.a.a.a.e.e.i.e.a.a.i.e.e.a.a.e.e.i.a.e.i.a.b.e.e.i.a.e.a.e.e.e.e.e";

		this.mainRoadMap = this.addChild(new RoadMap(RoadMapMainItem)) as RoadMap;
		////////////////////////// 创建路纸并绘制路纸格子背景和设置路纸位置
		this.bigRoadMap = this.addChild(RoadMapUtils.drawRoadMapGrid(42,6,17,17,378,2,new RoadMap(RoadMapBigRoadItem)))as RoadMap;
		this.bigEyeRoadMap = this.addChild(RoadMapUtils.drawRoadMapGrid(21,3,17,17,378,104,new RoadMap(RoadMapBigEyeRoadItem)))as RoadMap;
		this.smallEyeRoadMap = this.addChild(RoadMapUtils.drawRoadMapGrid(21,3,17,17,735.5,104,new RoadMap(RoadMapSmallRoadItem)))as RoadMap;
		this.roachRoadMap = this.addChild(RoadMapUtils.drawRoadMapGrid(21,3,17,17,378,155,new RoadMap(RoadMapRoachRoadItem)))as RoadMap;
		///////////////////////// 设置路纸的绘制器
		this.mainRoadMap.setDrawer(RoadMapDrawer.getMainRoadMapDrawer());
		this.bigRoadMap.setDrawer(RoadMapDrawer.getBigRoadMapDrawer());
		this.bigEyeRoadMap.setDrawer(RoadMapDrawer.getGeneralRoadMapDrawer());
		this.smallEyeRoadMap.setDrawer(RoadMapDrawer.getGeneralRoadMapDrawer());
		this.roachRoadMap.setDrawer(RoadMapDrawer.getGeneralRoadMapDrawer());
		///////////////////////// 设置路纸绘制时的相关参数
		this.mainRoadMap.setRoadMapInfo(RoadMapInfo.creat(34,34,6,66,1.5,1.5,false));
		this.bigRoadMap.setRoadMapInfo(RoadMapInfo.creat(17,17,6,30,0,0,true));
		this.bigEyeRoadMap.setRoadMapInfo(RoadMapInfo.creat(8.5,8.5,6,30,0,0,true));
		this.smallEyeRoadMap.setRoadMapInfo(RoadMapInfo.creat(8.5,8.5,6,30,0,0,true));
		this.roachRoadMap.setRoadMapInfo(RoadMapInfo.creat(8.5,8.5,6,30,0,0,true));
		/////////////////////////
		this.setData(roadStr);
		this.bankerAskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAskRoadMap,this);
		this.playerAskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAskRoadMap,this);
		this.staBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShowStatis,this);
	}

	private onShowStatis(evt:egret.TouchEvent)
	{
		this.setData("");
	}
	/**
	 * 设置路纸数据，当正处于问路时需要等问路结束后才会显示最新的数据
	 */
	public setData(v:string)
	{
		if(this.data==v)return;
		this.data = v;
		if(this.sharkTimer&&this.sharkTimer.running)return;//// 当前正处于问路中
		this.drawRoadMaps(this.data);		
	}
	/**
	 * 绘制所有的路纸
	 */
	private drawRoadMaps(v:string)
	{
		var roadObj:RoadStringObject = RoadMapUtils.createRoadReanderString(v);
		this.mainRoadMap.setData(v);
		this.bigRoadMap.setData(roadObj.bigRoad);
		this.bigEyeRoadMap.setData(roadObj.bigEyeRoad);
		this.smallEyeRoadMap.setData(roadObj.smallRoad);
		this.roachRoadMap.setData(roadObj.roachRoad);
	}
	/**
	 * 点击问路按钮，开始问路
	 */
	private onAskRoadMap(evt:egret.TouchEvent)
	{
		var s:string = "";
		if(evt.currentTarget==this.bankerAskBtn)
		{
			s = "a";
		}else
		{
			s = "e";
		}
		if(this.data.length>0)s="."+s;
		this.drawRoadMaps(this.data+s);
		if(this.sharkTimer==null)
		{
			this.sharkTimer = JTimer.getTimer(200);
			this.sharkTimer.addTimerCallback(this.onAskSharkRoadItems,this.onAskSharkRoadComplete,this);
		}
		this.sharkTimer.reset();
		this.sharkTimer.repeatCount = 7;
		this.sharkTimer.start();
	}
	/**
	 * 问路处理
	 */
	private onAskSharkRoadItems()
	{
		var vis:boolean = this.sharkTimer.currentCount%2==0;
		this.mainRoadMap.sharkLastItem(vis);
		this.bigRoadMap.sharkLastItem(vis);
		this.bigEyeRoadMap.sharkLastItem(vis);
		this.smallEyeRoadMap.sharkLastItem(vis);
		this.roachRoadMap.sharkLastItem(vis);
	}
	/**
	 * 问路结束，更新当前的路纸数据
	 */
	private onAskSharkRoadComplete()
	{
		this.drawRoadMaps(this.data);
	}
}