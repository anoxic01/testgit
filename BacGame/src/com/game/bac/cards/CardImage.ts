class CardImage extends egret.Bitmap
{
	private cardRes:string;
	public setCardRes(value:string)
	{
		this.cardRes = value;
		if(value)this.texture = RES.getRes(this.cardRes);
		else this.texture = null;
	}

	public getCardRes():string
	{
		return this.cardRes;
	}

	public dispose()
	{
		this.cardRes = null;
		this.texture = null;
	}
}