module lobby.model.status {
	export class TableInfoStatus {
		/**
		 *不显示信息 	
		 */		
		public static NONE:number= 0;
		/**
		 *显示洗牌 
		 */		
		public static CHANGE_SHOE:number= 30;
		/**
		 *显示此局作废 
		 */		
		public static FAIL_GAME:number= 40;
		/**
		 *显示暂停 
		 */		
		public static PAUSE:number= 60;
		/**
		 *显示维护并且洗牌中 
		 */		
		public static MAINTENANCE_AND_CHANGE_SHOE:number= 70;
		/**
		 *显示维护 
		 */		
		public static MAINTENANCE:number= 80;
		
		
		
		
		/**
		 *获取到游戏的信息提示状态  
		 * 与 getTableInfoStatus的区别在于在厅馆或赌桌维护的时候，如果赌桌正处于牌局进行中，需要等到牌局完成后才后得到维护状态
		 * @param table
		 * @return 
		 * 
		 */		
		public static getGameInfoStatus(model:game.GameModel):number
		{
			var state:number= this.getTableInfoStatus(model.tableStruct);
			if(state==this.MAINTENANCE)
			{
				if(model.tableStruct.IsMaintaining)
				{
					// 游戏中如果当前赌局正在进行需要等到当前局完成后才显示维护中
					if(model.tableStruct.GameStatus==GameStatus.WAIT_NEXT_NEWGAME||model.tableStruct.IsChangingShoe||model.tableStruct.IsCurrFailGame)
					{
						// 桌子正在维护中
						state = this.MAINTENANCE;
					}else
					{
						state = this.NONE;
					}
				}
			}
			return state;
		}
		/**
		 *获取到桌子的信息提示状态 
		 * @param table
		 * @param isMaintChangeShoe 是否需要维护与洗牌并存
		 * @return 
		 * 
		 */		
		public static getTableInfoStatus(table:struct.TableStruct,isMaintChangeShoe: boolean=false):number
		{
			var state:number= this.NONE;
			if(table&&table.TableID>-1)
			{
				if(table.GameStatus==GameStatus.NOT_FINISHED)
				{
					//荷官系統 與 GS 尚未準備完成  显示维护状态
					state = this.MAINTENANCE;
				}else if(table.DealerLoginID==null||table.DealerLoginID=="")
				{
						//沒有荷官
						//state = MAINTENANCE;
				}else if(table.IsOffline)
				{
					// 桌子异常关闭
					state = this.MAINTENANCE;
				}else if(table.getRoadMaps().indexOf("#")!=-1&&table.IsCurrFailGame==false)
				{
						// 路纸错误
						state = this.MAINTENANCE;
				}else if(table.IsMaintaining)
				{
					// 桌子正在维护中
					state = this.MAINTENANCE;
				}else if(table.IsPaused)
				{
					// 赌桌暂停中
					state = this.PAUSE;
				}else if(table.GameStatus==GameStatus.FAIL_GAME)
				{
					// 废局中
					state = this.FAIL_GAME;
				}else if(table.GameStatus==GameStatus.FAILING_GAME)
				{
					// 废局中
					state = this.FAIL_GAME;
				}else if(table.IsChangingShoe&&table.GameStatus==GameStatus.CHANGING_SHOE)
				{
					// 赌桌洗牌中
					state = this.CHANGE_SHOE;
				}
			}
			return state;
		}
		
		/**
		 * 是否需要重新更新路纸信息
		 */
		public static isNeedUpdateRoadMap(table:struct.TableStruct): boolean
		{
			var roadMap:String = table.getRoadMaps();
			//// 路纸数据出错时不更新
			if(roadMap.indexOf("#")!=-1)return false;
			var gameStatus:String = table.GameStatus;
			var gameNo:number= table.GameNo;
			var roadMapLen:number= 0;
			if(roadMap!="")roadMapLen = roadMap.split(".").length;
			if(gameNo!=0)
			{
				// 如果当前的路纸数据比当前的局数少
				if(roadMapLen<gameNo)
				{
					/// 当前游戏处于结算完成状态，说明路纸缺失，需要向服务器申请补路纸
					if(gameStatus==GameStatus.SETTLED)
					{
						return true;
					}
					/*else if(gameStatus==GameStatus.SETTLING)
					{
					/// 正处于结算中，倒计时开始
					if(table.CountDownTime<=1)
					return true;
					}*/
				}
			}
			return false;
		}
		
		
		
		public constructor() {
		}
	}
}