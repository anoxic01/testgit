module lobby.view.game {
	export class Game extends BSprite {

		public var GameID				:	int;					//游戏序号
		protected var m_bActive			:	Boolean;				//是否激活
		public var bIsInited			:	Boolean;				//是否初始化
		public var tableStruct			:	TableStruct;
		public var transitionDict		:	Dictionary;				//用来做动画的dict
		public var model				:	GameModel;
		
		public var Version				:	String	= "";
		
		public constructor() {
		}

		override public function destroy() : void
        {
            
        }

        public function registProtocol() : void
        {
            
        }

        public function insertRoom(socket:TCPSocket) : void
        {
            
        }

        public function setUserData() : void
        {
           
        }
		
		
		public function addPacket():void{
			
		}
		
		public function removePacket():void{
			PacketManager.getInstance().removeProtocol(PacketDefine.GAME,PacketDefine.S_Heart );					//客戶端主動發起心跳回復
			PacketManager.getInstance().removeProtocol(PacketDefine.GAME,PacketDefine.C_Heart );					//服務端主動發起心跳回復	
			PacketManager.getInstance().removeProtocol(PacketDefine.GAME,PacketDefine.ACK );						//ACK
			PacketManager.getInstance().removeProtocol(PacketDefine.GAME,PacketDefine.N_ACK);						//NACK	
			
			
		}
		
		/** 游戏数据 **/
		public function receiveTableStruct(_tableStruct:TableStruct) : void
		{
			
		}
		/** 多桌好路 **/
		public function receiveGoodRoadStruct(_goodRoadMapStruct:GoodRoadStruct):void{
			
		}
		
		/** 清空好路,不会搜寻新的好路 **/
		public function clearGoodRoad():void{
			
		}
		
		/**好路通知**/
		public function addGoodRoadNotification(_goodRoadMapStruct:GoodRoadStruct):void{
			
		}
		public function removeGoodRoadNotification(_tableID:int):void
		{
			
		}
		
		/**好路通知设置**/
		public function setGoodRoads():void
		{
			
		}
		
		public function get bActive():Boolean
		{
			return m_bActive;
		}
		
		public function set bActive(value:Boolean):void
		{
			m_bActive = value;
		}
		
		/**
		 *是否游戏中状态 
		 * @return 
		 * 
		 */
		public function get bGaming():Boolean
		{
			return false;
		}
		
		/**
		 *是否能退出游戏 （已下注不能退出） 
		 * @return 
		 * 
		 */
		public function get bCanExit():Boolean
		{
			return true;
		}
		
		
		public function get bTableClearing():Boolean{
			return false;
		}
		
		public function get chipSetSprite():Sprite{
			return null;
		}
		
		public function reset():void{
			
		}
		
		public function showMessage( msg:String ):void{
			
		}
		
		public function setDefCDN(arr:Array):void{
			
			
		}
		
		public function get bVideoConnected():Boolean{
			return false;
		}
		
		public function playVideo():void{
			
		}
		
		public function stopVideo():void{
			
		}
		
		
		public function refreshVideo():void{
			
		}
		
		
		
		public function submitBet():void{
			
		}
		
		public function cancelBet():void{
			
		}
		
		
		/**视讯切换**/
		public function changeVideoChannel():void{
			
		}
		
		
		/**断开游戏连接, 停留在游戏画面  */
		public function closeGame() : void
		{
			
		}
		
		/** 快速转桌 **/
		public function changeTable():void{
			
		}
		
		/**强制退出 , 不会检查退出条件  */
		public function forceExit() : void
		{
			
		}
		
		public function exit() : void
		{
			
		}
		
		public function init():void{
			
		}
		
		public function setChipPanel():void{
			
		}
		
		public function setTool():void{
			
		}
		
		/** 荷官数据 **/
		public function updateDealerInfo(_struct : DealerStruct):void{
			
		}
		
		public function updateCurrency():void
		{
			// TODO Auto Generated method stub
			
		}
		
		public function hidePanelDetail():void{
			
		}
		
		public function showStatistic():void{
			
		}
		public function hideStatistic():void{
			
		}
		
		/**设置“已下注”面板RightX值*/
		public function setBetSelectPannelRightX(x:int):void{
		
		}
		
		/**
		 *服务器异常断线通知 
		 * 
		 */
		public function offline(tableId:int):void{
			
		}
		
		public function setCacheBitmap(bCache:Boolean):void{
			
		}
		
	}
}