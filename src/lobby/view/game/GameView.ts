module lobby.view.game {
	export class GameView  extends BSprite implements iface.IConnectState{
		
		public model				:	model.game.GameModel;
		public sendFun				:	Function;
		public gameType				:	number;
		public bInited				:	boolean;			//是否已登录成功,收到初始化数据
		
		public constructor($gameType:number) {
			super();
			this.gameType = $gameType;
		}
		
		 public destroy():void {
			this.bInited = false;
			this.model = null;
			this.sendFun = null;
		}
		
		/**
		 * 登录返回数据之前，
		 *根据已有台子数据数据设置view 
		 * @param model
		 * 
		 */
		public setup(model:model.game.GameModel):void{
			
		}
		
		
		
		
		public updateView(model:model.game.GameModel):void{
			
		}
		
		public onConnectFailed():void {

		}
		
		public onConnectClosed():void {

		}
		
		public onConnect():void {

		}		
		
		
		public onReConnect():void
		{
			
		}
		
		//销毁视讯
		public destroyVideo():void{
			
		}
		
		/**
		 * 显示房间资讯面板
		 */
		public showRoomInf():void{
			
		}
		/**
		 * 关闭房间资讯面板
		 */
		public hideRoomInf():void{
			
		}
		
		
	}
}