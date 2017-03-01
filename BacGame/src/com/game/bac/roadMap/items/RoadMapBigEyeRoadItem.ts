
/**
 * 百家路纸显示的大眼路item
 * */
class RoadMapBigEyeRoadItem extends BaseRoadMapItem
{
	protected applyData(v:any,currentLang:any):void
	{
		if(v!=null)
		{
			this.bitmap.texture = RES.getRes("roadMap_bigEye_road_"+v+"_png");
		}else
		{
			if(this.bitmap)this.bitmap.texture = null;
		}
	}
}