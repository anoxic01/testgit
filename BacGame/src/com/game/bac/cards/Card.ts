class Card extends BaseView
{
	/**
	 * 卡牌背面的素材资源名称
	 */
	private static CARD_BACKGROUND_RES:string = "card_bg_png";
	private _cardValue : string;
	private _isHorizontal : boolean = false;

	protected cardProgress : number = 0;
	protected cardImage:CardImage;
	protected cardContainer:egret.Sprite;
	protected cardWidth:number;
	protected cardHeight:number;
	protected turnCardFramer:JFramer;

	public turnCardSpeed:number = 0.2;


	public constructor() 
	{
		super();
		this.initView();
	}
	/**
	 * 初始化纸牌元素
	 */
	protected initView()
	{
		this.cardContainer = this.addChild(new egret.Sprite()) as egret.Sprite;
		this.cardImage = this.cardContainer.addChild(new CardImage()) as CardImage;
		this.cardImage.setCardRes(Card.CARD_BACKGROUND_RES);// 设置背景
		this.cardWidth = this.cardImage.width;
		this.cardHeight = this.cardImage.height;
		this.turnCardFramer = JFramer.getFramer();
		this.turnCardFramer.addFramerCallback(this.onTurnCardFrame,this);
		this.autoSetCardView();
	}
	protected onTurnCardFrame()
	{
		this.setCardProgress(this.cardProgress+this.turnCardSpeed);
		if(this.cardProgress>=1)this.stopTurnCard();
	}
	protected stopTurnCard()
	{
		this.turnCardFramer.stop();
	}
	protected startTurnCard()
	{
		this.turnCardFramer.start();
	}
	protected updateCardView()
	{
		var res:string = this.cardProgress<=0.5?Card.CARD_BACKGROUND_RES:CardUtils.getCardRes(this.cardValue);
		if(this.cardImage.getCardRes()!=res)
		{
			this.cardImage.setCardRes(res);
			if(res!=null)this.setCardCenterPosition();
		}
		var tempScale:number = (0.5 - this.cardProgress)/0.5;
		var tempSkew:number = this.cardProgress<=0.5?(this.cardProgress/0.5*(this.cardHeight*0.3)):-((1-this.cardProgress)*(this.cardHeight*0.3));
		if(tempScale<0)tempScale = -tempScale;
		if(this.isHorizontal)
		{
			this.cardContainer.scaleY = tempScale;
			this.cardContainer.skewX = tempSkew;
		}else
		{
			this.cardContainer.scaleX = tempScale;
			this.cardContainer.skewY = tempSkew;
		}
	}
	/**自动设置牌的位置和 */
	protected autoSetCardView()
	{
		if(this.isHorizontal)
		{
			this.cardWidth = this.cardImage.height;
			this.cardHeight = this.cardImage.width;
			this.cardImage.rotation = 90;
			this.cardImage.x = this.cardWidth*0.5;
		}else
		{
			this.cardWidth = this.cardImage.width;
			this.cardHeight = this.cardImage.height;
			this.cardImage.rotation = 0;
			this.cardImage.x = -this.cardWidth*0.5;
		}
		this.cardImage.y = -this.cardHeight*0.5;
		this.setCardCenterPosition();
		this.drawCardBackground();
	}
	/**
	 * 画牌背景
	 */
	protected drawCardBackground()
	{
		this.cardContainer.graphics.clear();
		this.cardContainer.graphics.beginFill(0xeff0f2);
		this.cardContainer.graphics.lineStyle(1,0x999999);
		this.cardContainer.graphics.drawRoundRect(-this.cardWidth*0.5,-this.cardHeight*0.5,this.cardWidth-1,this.cardHeight-1,10,10);
		this.cardContainer.graphics.endFill();
	}
	/**
	 * 设置牌剧中显示
	 */
	protected setCardCenterPosition()
	{
		if(this.isHorizontal)
		{
			this.cardImage.x = this.cardWidth*0.5-(this.cardWidth-this.cardImage.height)*0.5;
			this.cardImage.y = -this.cardHeight*0.5+(this.cardHeight-this.cardImage.width)*0.5;
		}else
		{
			this.cardImage.x = -this.cardWidth*0.5+(this.cardWidth-this.cardImage.width)*0.5;
			this.cardImage.y = -this.cardHeight*0.5+(this.cardHeight-this.cardImage.height)*0.5;
		}		
	}
	/**当前的翻牌进度 */
	protected setCardProgress(v : number) 
	{
		if(v<=0)v = 0;// 限制最小值为0
		if(v>=1)v = 1;// 限制最大值为1
		if(this.cardProgress == v)return;
		this.cardProgress = v;
		JDelayFramer.delayFrame(this.updateCardView,this);
	}
	public set isHorizontal(v : boolean) 
	{
		if(this._isHorizontal==v)return;
		this._isHorizontal = v;
		this.autoSetCardView();
	}
	public set cardValue(v : string) 
	{
		if(this._cardValue==v)return;
		this._cardValue = v;
		if(this.cardProgress==1)
		{
			if(v==null)this.cardImage.setCardRes(null);
			else JDelayFramer.delayFrame(this.updateCardView,this);
		}
	}
	public turnCard()
	{
		this.startTurnCard();
	}
	/**当前的牌是否已经处于翻过来的状态 */
	public get isTurnedCard() : boolean {return this.cardProgress!=0;}
	/**当前的牌面值 */
	public get cardValue() : string{return this._cardValue;}
	/**是否为横向牌 */
	public get isHorizontal() : boolean {return this._isHorizontal;}
	/**
	 * 重置
	 */
	public reset()
	{
		this.cardValue = null;
		this.setCardProgress(0);
		this.isHorizontal = false;
		this.stopTurnCard();
	}
	public dispose():void
	{
		this.turnCardFramer.dispose();
		this.turnCardFramer = null;
		super.dispose();
	}
}