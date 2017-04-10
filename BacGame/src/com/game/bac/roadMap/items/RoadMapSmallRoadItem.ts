/**
 * 百家路纸显示的小眼路item
 */
class RoadMapSmallRoadItem extends BaseRoadMapItem
{
	protected applyData(v:any,currentLang:any):void
	{
		if(v!=null)
		{
			this.bitmap.texture = RES.getRes("roadMap_small_road_"+v+"_png");
		}else
		{
			this.bitmap.texture = null;
		}
	}
}