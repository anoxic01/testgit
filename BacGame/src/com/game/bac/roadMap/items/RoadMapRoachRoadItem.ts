/**
 * 百家路纸显示的蟑螂路item
 */
class RoadMapRoachRoadItem extends BaseRoadMapItem
{
	protected applyData(v:any,currentLang:any):void
	{
		if(v!=null)
		{
			this.bitmap.texture = RES.getRes("roadMap_roach_road_"+v+"_png");
		}else
		{
			this.bitmap.texture = null;
		}
	}
}