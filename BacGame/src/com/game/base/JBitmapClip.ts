class JBitmapClip extends JClip
{
	protected bitmap:egret.Bitmap;
	protected initClip(clipData:any=null)
	{
		this.bitmap = this.addChild(new egret.Bitmap()) as egret.Bitmap;
		super.initClip(clipData);
	}

	protected rendererCurrentFrame():boolean
	{
		if(this.bitmap==null||this.clipData==null)return false;
		if(this.currentFrame<1&&this.currentFrame>this.totalFrames)return false;
		var index:number = this.currentFrame-1;
		this.bitmap.texture = RES.getRes(this.clipData[index]);
		this.bitmap.smoothing = true;
		return true;
	}

	public addLabel(frameName:string,startFrame:number)
	{
		var frameLabel:FrameLabel = new FrameLabel(frameName,startFrame);
		var labels:any[] = this.currentLabels;
		if(labels==null)labels = [];
		labels.push(frameLabel);
		this.setCurrentLabels(labels);
	}
}