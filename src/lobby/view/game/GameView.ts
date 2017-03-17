module lobby.view.game {
	export class GameView  extends BSprite implements IConnectState{
		
		public var model				:	GameModel;
		public var sendFun				:	Function;
		public var gameType				:	int;
		public var bInited				:	Boolean			//是否已登录成功,收到初始化数据
		
		public constructor(gameType:int) {
			this.gameType=gameType;
		}
		
		override public function destroy():void {
			bInited = false;
			model = null;
			sendFun = null;
		}
		
		/**
		 * 登录返回数据之前，
		 *根据已有台子数据数据设置view 
		 * @param model
		 * 
		 */
		public function setup(model:GameModel):void{
			
		}
		
		
		
		
		public function updateView(model:GameModel):void{
			
		}
		
		public function onConnectFailed():void {

		}
		
		public function onConnectClosed():void {

		}
		
		public function onConnect():void {

		}		
		
		
		public function onReConnect():void
		{
			
		}
		
		//销毁视讯
		public function destroyVideo():void{
			
		}
		
		/**
		 * 显示房间资讯面板
		 */
		public function showRoomInf():void{
			
		}
		/**
		 * 关闭房间资讯面板
		 */
		public function hideRoomInf():void{
			
		}
		
		
	}
}