/**
 * 百家路纸显示的主路item
 */
class RoadMapMainItem extends BaseRoadMapItem
{
	/**
	 * 庄对
	 */
	private bankerPair:egret.Bitmap;
	/**
	 * 闲对
	 */
	private playerPair:egret.Bitmap;
	protected applyData(v:any,currentLang:any):void
	{
		if(v!=null)
		{
			if(v==RoadMap.A||v==RoadMap.B||v==RoadMap.C||v==RoadMap.D)
			{
				this.bitmap.texture = RES.getRes("main_roadMap_banker_png");
			}else if(v==RoadMap.E||v==RoadMap.F||v==RoadMap.G||v==RoadMap.H)
			{
				this.bitmap.texture = RES.getRes("main_roadMap_player_png");
			}else if(v==RoadMap.I||v==RoadMap.J||v==RoadMap.K||v==RoadMap.L)
			{
				this.bitmap.texture = RES.getRes("main_roadMap_tie_png");
			}
			if(v==RoadMap.B||v==RoadMap.F||v==RoadMap.J)// 庄对
			{
				this.setBankerPair();
				this.bankerPair.texture = RES.getRes("main_roadMap_bankerPair_png");
			}else if(v==RoadMap.C||v==RoadMap.G||v==RoadMap.K)// 闲对
			{
				this.setPlayerPair();
				this.playerPair.texture = RES.getRes("main_roadMap_playerPair_png");
			}else if(v==RoadMap.D||v==RoadMap.H||v==RoadMap.L)// 庄对闲对
			{
				this.setBankerPair();
				this.bankerPair.texture = RES.getRes("main_roadMap_bankerPair_png");
				this.setPlayerPair();
				this.playerPair.texture = RES.getRes("main_roadMap_playerPair_png");
			}
		}else 
		{
			if(this.bitmap)this.bitmap.texture = null;
			if(this.bankerPair)this.bankerPair.texture = null;
			if(this.playerPair)this.playerPair.texture = null;
		}
	}
	private setBankerPair()
	{
		if(this.bankerPair==null)
		{
			this.bankerPair = new egret.Bitmap();
			this.addChild(this.bankerPair);
			this.bankerPair.x = 0;
			this.bankerPair.y = 0;
		}
	}
	private setPlayerPair()
	{
		if(this.playerPair==null)
		{
			this.playerPair = new egret.Bitmap();
			this.addChild(this.playerPair);
			this.playerPair.x = 19;
			this.playerPair.y = 19;
		}
	}
}