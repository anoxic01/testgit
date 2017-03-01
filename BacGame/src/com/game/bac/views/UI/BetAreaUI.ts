class BetAreaUI extends BaseComponent implements  eui.UIComponent 
{
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
		this.getChildAt(0).visible = false;
		this.createItem(0,24,-4,"betArea_1","betArea_title_big");// 大
		this.createItem(0,415,-4,"betArea_2","betArea_title_playerPair");// 闲对
		this.createItem(0,844,-4,"betArea_2","betArea_title_bankerPair",-1);// 庄对
		this.createItem(0,1250,-4,"betArea_1","betArea_title_small",-1);// 小
		this.createItem(0,-1,76,"betArea_3","betArea_title_player");// 闲
		this.createItem(0,539,76,"betArea_4","betArea_title_tie");// 和
		this.createItem(0,1131,76,"betArea_5","betArea_title_banker");// 庄

		this.createSeat(1,2,198,"betArea_seat_1","betArea_seat_title_1");
		this.createSeat(2,166,198,"betArea_seat_2","betArea_seat_title_2");
		this.createSeat(3,438,198,"betArea_seat_3","betArea_seat_title_3");
		this.createSeat(5,709,198,"betArea_seat_4","betArea_seat_title_5");
		this.createSeat(6,970,198,"betArea_seat_3","betArea_seat_title_6",-1);
		this.createSeat(7,1225,198,"betArea_seat_2","betArea_seat_title_7",-1);
		this.createSeat(8,1480,198,"betArea_seat_1","betArea_seat_title_8",-1);

		console.log(ClipUtils.getMovieClips("seat_win_effect00{00}_png",1,20));
		var mc:JBitmapClip = new JBitmapClip(ClipUtils.getMovieClips("seat_win_effect00{00}_png",1,20));
		this.addChild(mc);
	}
	private createItem(id:number,xx:number,yy:number,res:string,titleRes:string,sx:number=1):BetAreaItem
	{
		var item:BetAreaItem = new BetAreaItem(id,res,titleRes,sx==-1);
		item.setCanBet(true);
		this.addChild(item);
		item.x = xx;
		item.y = yy;
		return item;
	}

	private createSeat(id:number,xx:number,yy:number,res:string,titleRes,sx:number=1):BetAreaSeatItem
	{
		var item:BetAreaSeatItem = new BetAreaSeatItem(id,res,titleRes,sx==-1);
		this.addChild(item);
		//item.setSeatData(new Object());
		item.x = xx;
		item.y = yy;
		return item;
	}
}