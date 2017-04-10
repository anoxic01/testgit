/**
 * 百家路纸显示的大路item
 */
class RoadMapBigRoadItem extends BaseRoadMapItem
{
	private tieBitmap:egret.Bitmap;
	private tf:egret.TextField;
	protected applyData(v:any,currentLang:any):void
	{
		if(v!=null)
		{
			var arr:any = (v as string).split(",");
			if(arr[0])
			{
				this.bitmap.texture = RES.getRes("roadMap_big_road_"+arr[0]+"_png");
			}
			if(arr[1]>0)
			{
				if(this.tieBitmap==null)
				{
					this.tieBitmap = new egret.Bitmap();
					this.addChild(this.tieBitmap);
				}
				this.tieBitmap.texture = RES.getRes("roadMap_big_road_i_png");
				if(arr[1]>1)
				{
					if(this.tf==null)
					{
						this.tf = new egret.TextField();
						this.tf.size = 15;
						this.tf.bold = true;
						this.tf.textColor = 0x00ff00;
						this.addChild(this.tf);
					}
					this.tf.text = arr[1];
					this.tf.x = (this.bitmap.width-this.tf.width)*0.5;
					this.tf.y = (this.bitmap.height-this.tf.height)*0.5;
				}else
				{
					if(this.tf)this.tf.text = "";
				}
			}else
			{
				if(this.tieBitmap)this.tieBitmap.texture = null;
				if(this.tf)this.tf.text = "";
			}
		}else
		{
			if(this.bitmap)this.bitmap.texture = null;
			if(this.tieBitmap)this.tieBitmap.texture = null;
			if(this.tf)this.tf.text = "";
		}
	}
}