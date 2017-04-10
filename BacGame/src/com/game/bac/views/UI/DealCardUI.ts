class DealCardUI extends BaseComponent implements  eui.UIComponent 
{
	public playerPoint:eui.Label;
	public bankerPoint:eui.Label;
	public bankerCard:Card;
	public playerCard:Card;

	protected bankerCardPos:egret.Point;
	protected playerCardPos:egret.Point;
	protected dealCardPos:egret.Point;
	protected dealBankerCardEffect:BaseEffect;
	protected dealPlayerCardEffect:BaseEffect;

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
		this.bankerCardPos = new egret.Point(320,180);
		this.playerCardPos = new egret.Point(105,180);
		this.dealCardPos = new egret.Point(210,480);
		this.bankerCard = new Card();
		this.playerCard = new Card();
		this.flyCards();
	}
	public flyCards()
	{
		this.playerCard.x = this.dealCardPos.x;
		this.playerCard.y = this.dealCardPos.y;
		this.addChild(this.playerCard);

		this.bankerCard.x = this.dealCardPos.x;
		this.bankerCard.y = this.dealCardPos.y;
		this.addChild(this.bankerCard);

		JDelayTimer.delayTime(this.flyBankerCard,this,10);
		JDelayTimer.delayTime(this.flyPlayerCard,this,500);
	}
	protected flyBankerCard()
	{
		this.dealBankerCardEffect = new HalfMoveTarget(this.bankerCard,this.dealCardPos,this.bankerCardPos,10);
		this.dealBankerCardEffect.setComplete(this.onDealBankerCardComplete,this);
		this.dealBankerCardEffect.start();
	}
	protected flyPlayerCard()
	{
		this.dealPlayerCardEffect = new HalfMoveTarget(this.playerCard,this.dealCardPos,this.playerCardPos,10);
		this.dealPlayerCardEffect.setComplete(this.onDealPlayerCardComplete,this);
		this.dealPlayerCardEffect.start();
	}
	protected onDealBankerCardComplete()
	{
		this.dealBankerCardEffect = null;
		this.bankerCard.turnCard();
	}
	protected onDealPlayerCardComplete()
	{
		this.dealPlayerCardEffect = null;
		this.playerCard.turnCard();
	}
}