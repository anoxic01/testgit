module lobby.view.game {
	export class Game extends BSprite {

		public GameID				:	number;					//游戏序号
		protected m_bActive			:	 boolean;				//是否激活
		public bIsInited			:	 boolean;				//是否初始化
		public tableStruct			:	model.struct.TableStruct;
		public transitionDict		;				//用来做动画的dict
		public model				:	model.game.GameModel;
		
		public Version				:	String	= "";
		
		public constructor() {
			super();
		}

		 public destroy() : void
        {
            
        }

        public registProtocol() : void
        {
            
        }

        public insertRoom(socket:socket.TCPSocket) : void
        {
            
        }

        public setUserData() : void
        {
           
        }
		
		
		public addPacket():void{
			
		}
		
		public removePacket():void{
			manager.PacketManager.getInstance().removeProtocol(define.PacketDefine.GAME,define.PacketDefine.S_Heart );					//客戶端主動發起心跳回復
			manager.PacketManager.getInstance().removeProtocol(define.PacketDefine.GAME,define.PacketDefine.C_Heart );					//服務端主動發起心跳回復	
			manager.PacketManager.getInstance().removeProtocol(define.PacketDefine.GAME,define.PacketDefine.ACK );						//ACK
			manager.PacketManager.getInstance().removeProtocol(define.PacketDefine.GAME,define.PacketDefine.N_ACK);						//NACK	
			
			
		}
		
		/** 游戏数据 **/
		public receiveTableStruct(_tableStruct:model.struct.TableStruct) : void
		{
			
		}
		/** 多桌好路 **/
		public receiveGoodRoadStruct(_goodRoadMapStruct:model.struct.GoodRoadStruct):void{
			
		}
		
		/** 清空好路,不会搜寻新的好路 **/
		public clearGoodRoad():void{
			
		}
		
		/**好路通知**/
		public addGoodRoadNotification(_goodRoadMapStruct:model.struct.GoodRoadStruct):void{
			
		}
		public removeGoodRoadNotification(_tableID:number):void
		{
			
		}
		
		/**好路通知设置**/
		public setGoodRoads():void
		{
			
		}
		
		get bActive(): boolean
		{
			return this.m_bActive;
		}
		
		set  bActive(value: boolean)
		{
			this.m_bActive = value;
		}
		
		/**
		 *是否游戏中状态 
		 * @return 
		 * 
		 */
		get bGaming(): boolean
		{
			return false;
		}
		
		/**
		 *是否能退出游戏 （已下注不能退出） 
		 * @return 
		 * 
		 */
		get bCanExit(): boolean
		{
			return true;
		}
		
		
		get bTableClearing(): boolean{
			return false;
		}
		
		get chipSetSprite():egret.Sprite{
			return null;
		}
		
		public reset():void{
			
		}
		
		public showMessage( msg:String ):void{
			
		}
		
		public setDefCDN(arr:any[]):void{
			
			
		}
		
		get bVideoConnected(): boolean{
			return false;
		}
		
		public playVideo():void{
			
		}
		
		public stopVideo():void{
			
		}
		
		
		public refreshVideo():void{
			
		}
		
		
		
		public submitBet():void{
			
		}
		
		public cancelBet():void{
			
		}
		
		
		/**视讯切换**/
		public changeVideoChannel():void{
			
		}
		
		
		/**断开游戏连接, 停留在游戏画面  */
		public closeGame() : void
		{
			
		}
		
		/** 快速转桌 **/
		public changeTable():void{
			
		}
		
		/**强制退出 , 不会检查退出条件  */
		public forceExit() : void
		{
			
		}
		
		public exit() : void
		{
			
		}
		
		public init():void{
			
		}
		
		public setChipPanel():void{
			
		}
		
		public setTool():void{
			
		}
		
		/** 荷官数据 **/
		public updateDealerInfo(_struct : model.struct.DealerStruct):void{
			
		}
		
		public updateCurrency():void
		{
			// TODO Auto Generated method stub
			
		}
		
		public hidePanelDetail():void{
			
		}
		
		public showStatistic():void{
			
		}
		public hideStatistic():void{
			
		}
		
		/**设置“已下注”面板RightX值*/
		public setBetSelectPannelRightX(x:number):void{
		
		}
		
		/**
		 *服务器异常断线通知 
		 * 
		 */
		public offline(tableId:number):void{
			
		}
		
		public setCacheBitmap(bCache: boolean):void{
			
		}
		
	}
}