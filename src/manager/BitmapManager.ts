module manager {
	export class BitmapManager {

		/** 位图数字 **/
		public numberTable			:	tool.BitmapNumberUtil;			//桌子数字
		public numberChip			:	tool.BitmapNumberUtil;			//筹码数字
		public numberOnline			:	tool.BitmapNumberUtil;			//在线人数
		public numberBet			:	tool.BitmapNumberUtil;			//下注统计
		public numberTime			:	tool.BitmapNumberUtil;			//计时数字
		public numberTimeRed			:	tool.BitmapNumberUtil;			//计时数字
		public numberCountdown			:	tool.BitmapNumberUtil;			//游戏倒计时数字
		public numberCountdownRed		:	tool.BitmapNumberUtil;			//游戏倒计时数字
		public statistics_red			:	tool.BitmapNumberUtil;			//红色统计
		public statistics_blue			:	tool.BitmapNumberUtil;			//蓝色统计
		public statistics_green			:	tool.BitmapNumberUtil;			//绿色统计
		public numberGameGCoin			:	tool.BitmapNumberUtil;			//遊戲G幣
		public numberBetGCoin			:	tool.BitmapNumberUtil;			//下注金額
		public numberBetedGCoin			:	tool.BitmapNumberUtil;			//已确认下注金額
		public numberGold			:	tool.BitmapNumberUtil;			//输赢金额
		public numberMachineBacCountDown	:	tool.BitmapNumberUtil;			//機械百家倒計時數字
		public numberMachineBacRedCountDown	:	tool.BitmapNumberUtil;			//機械百家倒計時數字
		public numberPoolBac			:	tool.BitmapNumberUtil;			//百家彩池数字
		
		/** 筹码位图 **/
		private m_dicChips			:	Object;
		private m_dicGameChips			:	Object;					//下注筹码
		/** 筹码阴影 **/
		public bmpChipShadow			:	egret.Bitmap;
		
		/** 珠盘路子 **/
		private m_dicBeads			:	Object;
		
		/** 桌子图标 **/
		private m_dicTableIcon			:	Object;
		
		/**	语言位图 **/
		private m_aLanguage			:	Object[];
		
		/** 龙虎路纸按钮背景 **/
		
		/** 厅别按钮位图 **/
		private m_aTheme			:	egret.Bitmap[];
		
		/** 对话背景 **/
		public bmpdDialogBg			:	egret.BitmapData;
		
		/** 扑克 **/
		private m_dicCard			:	Object;
		/** 小扑克 **/
		private m_dicCardSmall			:	Object;
		/** 大扑克 **/
		private m_dicCardBig			:	Object;
		
		/** 多桌过渡 **/
		private m_dicMultiTrans			:	Object;
		
		/** 桌子背景 **/
		private m_aTableBg			:	egret.Bitmap[];
		public aTableBgHover			:	egret.Bitmap[];
		private m_dicMultitableBg		:	Object;
		private m_dicMultitableFillBg		:	Object;
		
		/** 默认桌 **/
		private m_dicTable			:	Object;
		
		private m_mobile			:	Object;

		private static instance			:	BitmapManager;

		public static getInstance():BitmapManager{
            	if(this.instance == null){
                    this.instance = new BitmapManager();
            	}
            	return this.instance;
     		}

		public constructor() {
		}

		
		public initialize():void{
			this.initNumber();
//			this.initChip();
			this.initGameChip();
			this.initBead();
			this.initTableIcon();
			this.initLanguage();
			this.initDialogBg();
			this.initCard();
			this.initMultitableStransition();
			this.initTableBg();
			this.initTableBgHover();
			this.initMultitableBg();
			this.initTableDefault();
		}
		
		/**
		 * 资源点击打开界面才加载
		 */		
		public initMobileApp():void
		{
			this.m_mobile = new Object();
			var num:egret.MovieClip;
			for (var i:number = 0; i < define.MobileDefine.IOS_COUNT; i++) 
			{
				this.m_mobile[define.MobileDefine.LINK_IOS+(i+1)] = MobileAppManager.getInstance().getInstanceByNameFromDomain(define.MobileDefine.LINK_IOS+(i+1));
				num = MobileAppManager.getInstance().getInstanceByNameFromDomain(define.MobileDefine.LINK_NUM+(i+1));
				// this.m_mobile[define.MobileDefine.LINK_NUM+(i+1)] = MovieclipFrameToBitmapData.draw(num);
				if(i<define.MobileDefine.AND_COUNT)
				{
					this.m_mobile[define.MobileDefine.LINK_AND+(i+1)] = MobileAppManager.getInstance().getInstanceByNameFromDomain(define.MobileDefine.LINK_AND+(i+1));
				}
			}
		}
		// public getMobileApp(type:number,index:number):egret.BitmapData
		// {
		// 	var prifex:string;
		// 	if(type == define.MobileDefine.IOS)
		// 	{
		// 		prifex = define.MobileDefine.LINK_IOS;
		// 	}
		// 	else if(type==define.MobileDefine.ANDROID)
		// 	{
		// 		prifex = define.MobileDefine.LINK_AND;
		// 	}
		// 	else
		// 	{
		// 		prifex = define.MobileDefine.LINK_NUM;
		// 	}
		// 	return this.m_mobile[prifex+(index+1)];
		// }
		
		public getBmpdChip(_uValue:number):egret.BitmapData{
			return this.m_dicChips[_uValue];
		}
		public getBmpdGameChip(_uValue:number):egret.BitmapData{
			return this.m_dicGameChips[_uValue];
		}
		
		
		public getBmpdBead(_sValue:string):egret.BitmapData{
			return this.m_dicBeads[_sValue+LobbyManager.getInstance().lobbyAuth.Lang];
		}
		
		public getBmpdBeadRouNum(_sValue:string):egret.BitmapData{
			return this.m_dicBeads[define.Define.BEAD_NUMBER+_sValue];
		}
		
		public getBmpdTableIcon(_iValue:number):egret.BitmapData{
			return this.m_dicTableIcon[_iValue];
		}
		
		public getBmpdLanguage( _iLanguage:number, _sKey:string):egret.BitmapData{
			return this.m_aLanguage[_iLanguage][_sKey];
		}
		
		public getCard(_sCardID:string, _type:number=1):egret.BitmapData{
			if (_type==2){
				return this.m_dicCardSmall[_sCardID];
			}
			if(_type==3){
				return this.m_dicCardBig[_sCardID];
			}
			return this.m_dicCard[_sCardID];
		}
		
		
		public getMultiTransitionTable(uMode:number):egret.BitmapData{
			return this.m_dicMultiTrans[LobbyManager.getInstance().lobbyAuth.Lang+uMode];
		}
		
		public getTableBg(uFrame:number):egret.BitmapData{
			return this.m_aTableBg[uFrame].bitmapData;
		}
		
		public getTableBgHover(uFrame:number):egret.BitmapData{
			return this.aTableBgHover[uFrame].bitmapData;
		}
		
		public getMultitableBg(uMode:number):egret.BitmapData{
			return this.m_dicMultitableBg[uMode];
		}
		
		public getTableDefault(uLanguage:number):egret.BitmapData{
			return this.m_dicTable[uLanguage];
		}
		
		private initNumber():void{
			this.numberTable = new tool.BitmapNumberUtil(ResourceManager.getInstance().createBitmapByName("Number_Table_Asset"), 16);
			this.numberTime = new tool.BitmapNumberUtil(ResourceManager.getInstance().createBitmapByName("Number_Time_Asset"), 10);
			this.numberTimeRed = new tool.BitmapNumberUtil(ResourceManager.getInstance().createBitmapByName("Number_Time_Red_Asset") , 10);
			this.numberCountdown = new tool.BitmapNumberUtil(ResourceManager.getInstance().createBitmapByName("Number_Countdown_Asset") , 10);
			this.numberCountdownRed = new tool.BitmapNumberUtil(ResourceManager.getInstance().createBitmapByName("Number_Countdown_Red_Asset") , 10);
			this.numberChip = new tool.BitmapNumberUtil(ResourceManager.getInstance().createBitmapByName("Number_Chip_Asset") , 16);
			this.numberOnline = new tool.BitmapNumberUtil(ResourceManager.getInstance().createBitmapByName("Number_Chip_Asset") , 16);
			this.numberBet  = new tool.BitmapNumberUtil(ResourceManager.getInstance().createBitmapByName("Number_Chip_Asset") , 16);
			this.numberGameGCoin = new tool.BitmapNumberUtil( ResourceManager.getInstance().createBitmapByName("Number_Chip_Asset") , 16 );
			this.numberBetGCoin = new tool.BitmapNumberUtil( ResourceManager.getInstance().createBitmapByName("Number_Chip_Asset") , 16 );
			this.numberBetedGCoin = new tool.BitmapNumberUtil( ResourceManager.getInstance().createBitmapByName("Number_Game_Asset_01") , 16 );
			this.numberGold = new tool.BitmapNumberUtil( ResourceManager.getInstance().createBitmapByName("Number_Gold_Asset") , 16 );
			this.numberMachineBacCountDown = new tool.BitmapNumberUtil( ResourceManager.getInstance().createBitmapByName("Number_Countdown_Machine_Bac_Asset")  , 10 );
			this.numberMachineBacRedCountDown = new tool.BitmapNumberUtil( ResourceManager.getInstance().createBitmapByName("Number_Countdown_Machine_Bac_Red_Asset")  , 10 );
			this.numberPoolBac = new tool.BitmapNumberUtil( ResourceManager.getInstance().createBitmapByName("Number_Pool_Bet_Asset")  , 13 );
		}
		
		private initChip():void
		{
			this.m_dicChips = new Object();

			this.m_dicChips[10] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_10") ;
			this.m_dicChips[100] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_100") ;
			this.m_dicChips[1000] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_1000") ;
			this.m_dicChips[10000] = ResourceManager.getInstance().createBitmapByName( "Chip_Asset_10000") ;
			this.m_dicChips[100000] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_100000") ;
			this.m_dicChips[300] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_300") ;
			this.m_dicChips[3000] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_3000") ;
			this.m_dicChips[30000] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_30000") ;
			this.m_dicChips[300000] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_300000") ;
			this.m_dicChips[50] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_50") ;
			this.m_dicChips[500] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_500") ;
			this.m_dicChips[5000] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_5000") ;
			this.m_dicChips[50000] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_50000") ;
			this.m_dicChips[500000] = ResourceManager.getInstance().createBitmapByName("Chip_Asset_500000"); 

		}
		private initGameChip():void{
			this.m_dicGameChips = new Object();
			// MovieclipFrameToBitmapData.transform(ResourceManager.getInstance().createBitmapByName("Game_Chip"),this.m_dicGameChips);
			this.bmpChipShadow = ResourceManager.getInstance().createBitmapByName("ChipShadowBG") ;	
			
		}
		private initBead():void
		{
			this.m_dicBeads = new Object();
			
			/** 庄 **/
			this.m_dicBeads[define.Define.BEAD_BANKER+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Banker_CN_Asset") ;
			this.m_dicBeads[define.Define.BEAD_BANKER+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Banker_TW_Asset") ;
			this.m_dicBeads[define.Define.BEAD_BANKER+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Banker_EN_Asset") ;
			
			/** 闲 **/
			this.m_dicBeads[define.Define.BEAD_PLAYER+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Player_CN_Asset") ;
			this.m_dicBeads[define.Define.BEAD_PLAYER+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Player_TW_Asset") ;
			this.m_dicBeads[define.Define.BEAD_PLAYER+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Player_EN_Asset") ;
			
			/** 和 **/
			this.m_dicBeads[define.Define.BEAD_TIE+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Tie_CN_Asset") ;
			this.m_dicBeads[define.Define.BEAD_TIE+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Tie_TW_Asset") ;
			this.m_dicBeads[define.Define.BEAD_TIE+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Tie_EN_Asset") ;
			
			/** 龙 **/
			this.m_dicBeads[define.Define.BEAD_DRAGON+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Dragon_CN_Asset") ;
			this.m_dicBeads[define.Define.BEAD_DRAGON+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Dragon_TW_Asset") ;
			this.m_dicBeads[define.Define.BEAD_DRAGON+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Dragon_EN_Asset") ;
			
			/** 虎 **/
			this.m_dicBeads[define.Define.BEAD_TIGER+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Tiger_CN_Asset") ;
			this.m_dicBeads[define.Define.BEAD_TIGER+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Tiger_TW_Asset") ;
			this.m_dicBeads[define.Define.BEAD_TIGER+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Tiger_EN_Asset") ;
			
			/** 单 **/
			this.m_dicBeads[define.Define.BEAD_DAN+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Dan_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_DAN+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Dan_TW_Asset");
			this.m_dicBeads[define.Define.BEAD_DAN+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Dan_EN_Asset");
			this.m_dicBeads[define.Define.BEAD_DAN_DZ+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Dan_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_DAN_DZ+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Dan_TW_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_DAN_DZ+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Dan_EN_DZ_Asset");
			
			/** 双 **/
			this.m_dicBeads[define.Define.BEAD_SHUANG+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Shuang_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_SHUANG+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Shuang_TW_Asset");
			this.m_dicBeads[define.Define.BEAD_SHUANG+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Shuang_EN_Asset");
			this.m_dicBeads[define.Define.BEAD_SHUANG_DZ+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Shuang_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_SHUANG_DZ+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Shuang_TW_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_SHUANG_DZ+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Shuang_EN_DZ_Asset");
			
			/** 大 **/
			this.m_dicBeads[define.Define.BEAD_BIG+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Big_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_BIG+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Big_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_BIG+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Big_EN_Asset");
			this.m_dicBeads[define.Define.BEAD_BIG_DZ+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Big_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_BIG_DZ+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Big_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_BIG_DZ+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Banker_EN_Asset");
						
			/** 小 **/
			this.m_dicBeads[define.Define.BEAD_SMALL+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Small_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_SMALL+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Small_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_SMALL+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Small_EN_Asset");
			this.m_dicBeads[define.Define.BEAD_SMALL_DZ+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Small_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_SMALL_DZ+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Small_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_SMALL_DZ+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Small_EN_DZ_Asset");
			
			/** 红 **/
			this.m_dicBeads[define.Define.BEAD_RED+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Red_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_RED+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Red_TW_Asset");
			this.m_dicBeads[define.Define.BEAD_RED+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Red_EN_Asset");
			this.m_dicBeads[define.Define.BEAD_RED_DZ+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Red_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_RED_DZ+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Red_TW_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_RED_DZ+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Red_EN_DZ_Asset");
			
			/** 黑 **/
			this.m_dicBeads[define.Define.BEAD_BLACK+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Black_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_BLACK+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Black_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_BLACK+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Black_EN_Asset");
			this.m_dicBeads[define.Define.BEAD_BLACK_DZ+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Black_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_BLACK_DZ+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Black_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_BLACK_DZ+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Black_EN_DZ_Asset");
			
			/** 围 **/
			this.m_dicBeads[define.Define.BEAD_WEI+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Wei_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_WEI+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Wei_TW_Asset");
			this.m_dicBeads[define.Define.BEAD_WEI+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Wei_EN_Asset");
			this.m_dicBeads[define.Define.BEAD_WEI_DZ+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Wei_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_WEI_DZ+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Wei_TW_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_WEI_DZ+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Wei_EN_DZ_Asset");
			
			/** 零 **/
			this.m_dicBeads[define.Define.BEAD_ZERO+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Zero_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_ZERO+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Zero_CN_Asset");
			this.m_dicBeads[define.Define.BEAD_ZERO+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Zero_EN_Asset");
			this.m_dicBeads[define.Define.BEAD_ZERO_DZ+define.Define.LANGUAGE_CN] = ResourceManager.getInstance().createBitmapByName("Bead_Zero_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_ZERO_DZ+define.Define.LANGUAGE_TW] = ResourceManager.getInstance().createBitmapByName("Bead_Zero_CN_DZ_Asset");
			this.m_dicBeads[define.Define.BEAD_ZERO_DZ+define.Define.LANGUAGE_EN] = ResourceManager.getInstance().createBitmapByName("Bead_Zero_EN_DZ_Asset");
			
			// var m_rouBead:MovieClip = ResourceManager.getInstance().createBitmapByName("linkRouBead");
			// m_rouBead.stop();
			// for (var i:number = 0; i <= 36; i++) 
			// {
			// 	m_dicBeads[define.Define.BEAD_NUMBER+i] = null;
			// 	var color:number = RouData.getInstance().getColor(i);
			// 	m_rouBead.gotoAndStop(color);
			// 	m_rouBead.contentTxt.text = String(i);
			// 	m_dicBeads[Define.BEAD_NUMBER+i] = BitmapUtil.snapshot(m_rouBead);
			// }
			// m_rouBead = null;
			
		}
		
		private initTableIcon():void{
			this.m_dicTableIcon = new Object();
			this.m_dicTableIcon[define.Define.TABLE_TYPE_NORMAL] 	= 	ResourceManager.getInstance().createBitmapByName("Table_Icon_Bac_Asset") ;
			this.m_dicTableIcon[define.Define.TABLE_TYPE_SPEEDY] 	= 	ResourceManager.getInstance().createBitmapByName("Table_Icon_Bac_Speed_Asset") ;
			this.m_dicTableIcon[define.Define.TABLE_TYPE_PEEK] 		= 	ResourceManager.getInstance().createBitmapByName("Table_Icon_Bac_Peek_Asset") ;
			this.m_dicTableIcon[define.Define.TABLE_TYPE_ROBOT] 	= 	ResourceManager.getInstance().createBitmapByName("Table_Icon_Bac_Robot_Asset") ;
			this.m_dicTableIcon[define.Define.TABLE_TYPE_CHARTER] 	= 	ResourceManager.getInstance().createBitmapByName("Table_Icon_Bac_Charter_Asset") ;
			this.m_dicTableIcon[define.Define.TABLE_TYPE_DTF] 		= 	ResourceManager.getInstance().createBitmapByName("Table_Icon_DTF_Asset") ;
			this.m_dicTableIcon[define.Define.TABLE_TYPE_ROU] 		= 	ResourceManager.getInstance().createBitmapByName("Table_Icon_Rou_Asset") ;
			this.m_dicTableIcon[define.Define.TABLE_TYPE_SIC] 		= 	ResourceManager.getInstance().createBitmapByName("Table_Icon_Sic_Asset");
		}
		
		private initLanguage():void
		{
			this.m_aLanguage = [new Object(),new Object(),new Object()];
			// this.addBmpdLanguage(language.Language.sBitmapdataTest, new egret.BitmapData(30,10));
//			this.addBmpdLanguage_2(Language.sBitmapdataBQ,[[new BQ_Default_CN_Asset(), new BQ_Default_TW_Asset(), new BQ_Default_EN_Asset()],[new BQ_Rollover_CN_Asset(), new BQ_Rollover_TW_Asset(), new BQ_Rollover_EN_Asset()]]);
//			this.addBmpdLanguage_2(Language.sBitmapdataGQ,[[new GQ_Default_CN_Asset(), new GQ_Default_CN_Asset(), new GQ_Default_EN_Asset()],[new GQ_Rollover_CN_Asset(), new GQ_Rollover_CN_Asset(), new GQ_Rollover_EN_Asset()]]);
//			
//			this.addBmpdLanguage_2(Language.sBitmapdataZS,[[new ZS_Default_CN_Asset(), new ZS_Default_TW_Asset(), new ZS_Default_TW_Asset()],[new ZS_Rollover_CN_Asset(), new ZS_Rollover_TW_Asset(), new ZS_Rollover_TW_Asset()]]);
//			this.addBmpdLanguage_2(Language.sBitmapdataBJ,[[new BJ_Default_CN_Asset(), new BJ_Default_TW_Asset(), new BJ_Default_TW_Asset()],[new BJ_Rollover_CN_Asset(), new BJ_Rollover_TW_Asset(), new BJ_Rollover_TW_Asset()]]);
//			this.addBmpdLanguage_2(Language.sBitmapdataJM,[[new JM_Default_CN_Asset(), new JM_Default_TW_Asset(), new JM_Default_TW_Asset()],[new JM_Rollover_CN_Asset(), new JM_Rollover_TW_Asset(), new JM_Rollover_TW_Asset()]]);
//			this.addBmpdLanguage_2(Language.sBitmapdataGB,[[new GB_Default_CN_Asset(), new GB_Default_TW_Asset(), new GB_Default_TW_Asset()],[new GB_Rollover_CN_Asset(), new GB_Rollover_TW_Asset(), new GB_Rollover_TW_Asset()]]);
//			this.addBmpdLanguage_2(Language.sBitmapdataJB,[[new JB_Default_CN_Asset(), new JB_Default_TW_Asset(), new JB_Default_TW_Asset()],[new JB_Rollover_CN_Asset(), new JB_Rollover_TW_Asset(), new JB_Rollover_TW_Asset()]]);
			this.addBmpdLanguage_2(language.Language.sBitmapdataDZ,[[ResourceManager.getInstance().createBitmapByName("Theme_DZ_Default_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Theme_DZ_Default_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Theme_DZ_Default_TW_Asset") ],[ResourceManager.getInstance().createBitmapByName("Theme_DZ_Rollover_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Theme_DZ_Rollover_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Theme_DZ_Rollover_TW_Asset") ]]);
//			this.addBmpdLanguage_2(Language.sBitmapdataDT,[[new DT_Default_CN_Asset(), new DT_Default_TW_Asset(), new DT_Default_TW_Asset()],[new DT_Rollover_CN_Asset(), new DT_Rollover_TW_Asset(), new DT_Rollover_TW_Asset()]]);
			
			this.addBmpdLanguage_2(language.Language.sQuickBitmapdataZS,[[ResourceManager.getInstance().createBitmapByName("Quick_ZS_Default_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_ZS_Default_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_ZS_Default_TW_Asset") ],[ResourceManager.getInstance().createBitmapByName("Quick_ZS_Rollover_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_ZS_Rollover_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_ZS_Rollover_TW_Asset")]]);
			this.addBmpdLanguage_2(language.Language.sQuickBitmapdataBJ,[[ResourceManager.getInstance().createBitmapByName("Quick_BJ_Default_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_BJ_Default_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_BJ_Default_TW_Asset") ],[ResourceManager.getInstance().createBitmapByName("Quick_BJ_Rollover_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_BJ_Rollover_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_BJ_Rollover_TW_Asset") ]]);
			this.addBmpdLanguage_2(language.Language.sQuickBitmapdataJM,[[ResourceManager.getInstance().createBitmapByName("Quick_JM_Default_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_JM_Default_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_JM_Default_TW_Asset") ],[ResourceManager.getInstance().createBitmapByName("Quick_JM_Rollover_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_JM_Rollover_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_JM_Rollover_TW_Asset") ]]);
			this.addBmpdLanguage_2(language.Language.sQuickBitmapdataGB,[[ResourceManager.getInstance().createBitmapByName("Quick_GB_Default_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_GB_Default_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_GB_Default_TW_Asset") ],[ResourceManager.getInstance().createBitmapByName("Quick_GB_Rollover_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_GB_Rollover_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_GB_Rollover_TW_Asset") ]]);
			this.addBmpdLanguage_2(language.Language.sQuickBitmapdataJB,[[ResourceManager.getInstance().createBitmapByName("Quick_JB_Default_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_JB_Default_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_JB_Default_TW_Asset") ],[ResourceManager.getInstance().createBitmapByName("Quick_JB_Rollover_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_JB_Rollover_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_JB_Rollover_TW_Asset") ]]);
			this.addBmpdLanguage_2(language.Language.sQuickBitmapdataDZ,[[ResourceManager.getInstance().createBitmapByName("Quick_DZ_Default_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_DZ_Default_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_DZ_Default_TW_Asset") ],[ResourceManager.getInstance().createBitmapByName("Quick_DZ_Rollover_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_DZ_Rollover_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_DZ_Rollover_TW_Asset") ]]);
			this.addBmpdLanguage_2(language.Language.sQuickBitmapdataDT,[[ResourceManager.getInstance().createBitmapByName("Quick_DT_Default_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_DT_Default_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_DT_Default_TW_Asset") ],[ResourceManager.getInstance().createBitmapByName("Quick_DT_Rollover_CN_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_DT_Rollover_TW_Asset") , ResourceManager.getInstance().createBitmapByName("Quick_DT_Rollover_TW_Asset") ]]);
			
			
			this.addBmpdLanguage_3(language.Language.sBmdBetWait,[ResourceManager.getInstance().createBitmapByName("BET_WAIT_CN_Asset"), ResourceManager.getInstance().createBitmapByName("BET_WAIT_CN_Asset"), ResourceManager.getInstance().createBitmapByName("BET_WAIT_EN_Asset")]);
			this.addBmpdLanguage_3(language.Language.sBmdBetStart,[ResourceManager.getInstance().createBitmapByName("BET_START_CN_Asset"), ResourceManager.getInstance().createBitmapByName("BET_START_TW_Asset"), ResourceManager.getInstance().createBitmapByName("BET_START_EN_Asset") ]);
			this.addBmpdLanguage_3(language.Language.sBmdBetStop,[ResourceManager.getInstance().createBitmapByName("BET_STOP_CN_Asset"), ResourceManager.getInstance().createBitmapByName("BET_STOP_CN_Asset"), ResourceManager.getInstance().createBitmapByName("BET_STOP_EN_Asset") ]);
			this.addBmpdLanguage_3(language.Language.sBmdBetSuccess,[ResourceManager.getInstance().createBitmapByName("BET_SUCCESS_CN_Asset") , ResourceManager.getInstance().createBitmapByName("BET_SUCCESS_CN_Asset"), ResourceManager.getInstance().createBitmapByName("BET_SUCCESS_EN_Asset")]);
			
			this.addBmpdLanguage_3(language.Language.sMaintenance, [ResourceManager.getInstance().createBitmapByName("Table_Hint_Maintain_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Maintain_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Maintain_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sNoTrial, [ResourceManager.getInstance().createBitmapByName("Table_Hint_NoTrial_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_NoTrial_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Table_Hint_NoTrial_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sChangeShoe, [ResourceManager.getInstance().createBitmapByName("Table_Hint_Shuffle_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Shuffle_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Shuffle_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sGoodRoadWait, [ResourceManager.getInstance().createBitmapByName("Table_Hint_Wait_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Wait_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Wait_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sFailGame, [ResourceManager.getInstance().createBitmapByName("Table_Hint_FailGamel_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_FailGamel_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Table_Hint_FailGamel_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sWinGold, [ResourceManager.getInstance().createBitmapByName("Table_Hint_Win_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Win_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Win_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sLose, [ResourceManager.getInstance().createBitmapByName("Table_Hint_Lose_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Lose_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Lose_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sNoWin, [ResourceManager.getInstance().createBitmapByName("Table_Hint_NoWin_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_NoWin_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Table_Hint_NoWin_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sBalanceNoEnough, [ResourceManager.getInstance().createBitmapByName("Table_Hint_NoEnough_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_NoEnough_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Table_Hint_NoEnough_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sFinalGame, [ResourceManager.getInstance().createBitmapByName("Table_Hint_Final_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Final_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Final_Asset_EN")]);
			this.addBmpdLanguage_3(language.Language.sOwnerLeave,[ResourceManager.getInstance().createBitmapByName("Table_Hint_Owner_Leave_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Owner_Leave_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Table_Hint_Owner_Leave_Asset_EN")]);
			
			this.addBmpdLanguage_3(language.Language.sMaintain_Theme,[ResourceManager.getInstance().createBitmapByName("Maintain_Theme_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Maintain_Theme_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Maintain_Theme_Asset_EN")]);
		
			this.addBmpdLanguage_3(language.Language.sQuickFailGame, [ResourceManager.getInstance().createBitmapByName("Quick_Table_Hint_FailGamel_Asset_CN"), ResourceManager.getInstance().createBitmapByName("Quick_Table_Hint_FailGamel_Asset_TW"), ResourceManager.getInstance().createBitmapByName("Quick_Table_Hint_FailGamel_Asset_EN")]);
		}
		 
		// private addBmpdLanguage( _sKey:string, _bmpd:egret.BitmapData):void{
		// 	var arr : Array = tool.BitmapLanguageUtil.cut(_bmpd,3);
		// 	this.m_aLanguage[define.Define.LANGUAGE_CN][_sKey] = arr[define.Define.LANGUAGE_CN];
		// 	this.m_aLanguage[define.Define.LANGUAGE_TW][_sKey] = arr[define.Define.LANGUAGE_TW];
		// 	this.m_aLanguage[define.Define.LANGUAGE_EN][_sKey] = arr[define.Define.LANGUAGE_EN];
		// 	_bmpd.dispose();
		// 	arr = null;
		// }
		
		/**
		 *	帧按钮 
		 * @param _sKey
		 * @param _arr
		 * 
		 */		
		private addBmpdLanguage_2(_sKey:string, _arr:any[][]):void{
			this.m_aLanguage[define.Define.LANGUAGE_CN][_sKey+"_"+language.Language.sDefault] = _arr[0][define.Define.LANGUAGE_CN];
			this.m_aLanguage[define.Define.LANGUAGE_TW][_sKey+"_"+language.Language.sDefault] = _arr[0][define.Define.LANGUAGE_TW];
			this.m_aLanguage[define.Define.LANGUAGE_EN][_sKey+"_"+language.Language.sDefault] = _arr[0][define.Define.LANGUAGE_EN];
			this.m_aLanguage[define.Define.LANGUAGE_CN][_sKey+"_"+language.Language.sMouseOver] = _arr[1][define.Define.LANGUAGE_CN];
			this.m_aLanguage[define.Define.LANGUAGE_TW][_sKey+"_"+language.Language.sMouseOver] = _arr[1][define.Define.LANGUAGE_TW];
			this.m_aLanguage[define.Define.LANGUAGE_EN][_sKey+"_"+language.Language.sMouseOver] = _arr[1][define.Define.LANGUAGE_EN];
						
			_arr = null;
		}
		
		private addBmpdLanguage_3( _sKey:string, _arr:egret.Bitmap[]):void{
			this.m_aLanguage[define.Define.LANGUAGE_CN][_sKey] = _arr[define.Define.LANGUAGE_CN];
			this.m_aLanguage[define.Define.LANGUAGE_TW][_sKey] = _arr[define.Define.LANGUAGE_TW];
			this.m_aLanguage[define.Define.LANGUAGE_EN][_sKey] = _arr[define.Define.LANGUAGE_EN];
		}
		
		
		private initDialogBg():void
		{
			// this.bmpdDialogBg = MovieclipFrameToBitmapData.draw(ResourceManager.getInstance().createBitmapByName("Dialog_Bg_Asset"));
		}
		
		private initCard():void{
			this.m_dicCard = new Object();
			this.m_dicCardSmall = new Object();
			this.m_dicCardBig = new Object();
			
			var arr : string[] = ["s","h","c","d"];
			var strA : String = "A";
			var strT : String = "T";
			var strJ : String = "J";
			var strQ : String = "Q";
			var strK : String = "K";
			
			var _w : number = 237;
			var _h : number = 330;
			var card : any;
			var cardBB : any = ResourceManager.getInstance().createBitmapByName("Card_BB");
			var cardBg : any = ResourceManager.getInstance().createBitmapByName("Card_Bg");
			// this.m_dicCard["BB"] = tool.BitmapUtil.snapshot(cardBB);
			// this.m_dicCard["Bg"] = tool.BitmapUtil.snapshot(cardBg);
			// this.m_dicCardSmall["BB"] = tool.BitmapUtil.snapshot(ResourceManager.getInstance().createBitmapByName("CardX_BB"));
			// this.m_dicCardSmall["Bg"] = tool.BitmapUtil.snapshot(ResourceManager.getInstance().createBitmapByName("CardX_Bg"));
			
			cardBB.width = _w;
			cardBB.height = _h;
			// this.m_dicCardBig["BB"] = tool.BitmapUtil.snapshot(cardBB,_w,_h);
			cardBg.width = _w;
			cardBg.height = _h;
			// this.m_dicCardBig["Bg"] = tool.BitmapUtil.snapshot(cardBg,_w,_h);
			
			for (var i:number = 0; i < 4; i++) 
			{
				for (var j:number = 0; j < 13; j++) 
				{
					switch(j){
						case 0:
							card = ResourceManager.getInstance().createBitmapByName("Card_"+strA+arr[i]);
							// this.m_dicCard[strA+arr[i]] = BitmapUtil.snapshot(card);
							// this.m_dicCardSmall[strA+arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().createBitmapByName("CardX_"+strA+arr[i]));
							card.width = 214;
							card.height = 292;
							// this.m_dicCardBig[strA+arr[i]] = BitmapUtil.snapshot(card,214,292);
							break;
						case 9:
							card = ResourceManager.getInstance().createBitmapByName("Card_"+strT+arr[i]);
							// this.m_dicCard[strT+arr[i]] = BitmapUtil.snapshot(card);
							// this.m_dicCardSmall[strT+arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().createBitmapByName("CardX_"+strT+arr[i]));
							card.width = 214;
							card.height = 292;
							// this.m_dicCardBig[strT+arr[i]] = BitmapUtil.snapshot(card,214,292);
							break;
						case 10:
							card = ResourceManager.getInstance().createBitmapByName("Card_"+strJ+arr[i]);
							// this.m_dicCard[strJ+arr[i]] = BitmapUtil.snapshot(card);
							// this.m_dicCardSmall[strJ+arr[i]] =  BitmapUtil.snapshot(ResourceManager.getInstance().createBitmapByName("CardX_"+strJ+arr[i]));
							card.width = 214;
							card.height = 292;
							// this.m_dicCardBig[strJ+arr[i]] = BitmapUtil.snapshot(card,214,292);
							break;
						case 11:
							card = ResourceManager.getInstance().createBitmapByName("Card_"+strQ+arr[i]);
							// this.m_dicCard[strQ+arr[i]] = BitmapUtil.snapshot(card);
							// this.m_dicCardSmall[strQ+arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().createBitmapByName("CardX_"+strQ+arr[i]));
							card.width = 214;
							card.height = 292;
							// this.m_dicCardBig[strQ+arr[i]] = BitmapUtil.snapshot(card,214,292);
							break;
						case 12:
							card = ResourceManager.getInstance().createBitmapByName("Card_"+strK+arr[i]);
							// this.m_dicCard[strK+arr[i]] = BitmapUtil.snapshot(card);
							// this.m_dicCardSmall[strK+arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().createBitmapByName("CardX_"+strK+arr[i]));
							card.width = 214;
							card.height = 292;
							// this.m_dicCardBig[strK+arr[i]] = BitmapUtil.snapshot(card,214,292);
							break;
						
						default:
							card = ResourceManager.getInstance().createBitmapByName("Card_"+String(j+1)+arr[i]);
							// this.m_dicCard[String(j+1)+arr[i]] = BitmapUtil.snapshot(card);
							// this.m_dicCardSmall[String(j+1)+arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().createBitmapByName("CardX_"+String(j+1)+arr[i]));
							card.width = 214;
							card.height = 292;
							// this.m_dicCardBig[String(j+1)+arr[i]] = BitmapUtil.snapshot(card,214,292);
							break;
					}
				}
				
			}
			
		}
		
		
		
		private initMultitableStransition():void{
			this.m_dicMultiTrans = new Object();
			
			// var _mc : MovieClip = ResourceManager.getInstance().createBitmapByName("Multi_Table_Item_Asset_4_default");
			// _mc.gotoAndStop(Define.LANGUAGE_CN+1);
			// this.m_dicMultiTrans[Define.LANGUAGE_CN+Define.MULTI_TABLE_MODE_4] = BitmapUtil.snapshot(_mc);
			// _mc.gotoAndStop(Define.LANGUAGE_TW+1);
			// this.m_dicMultiTrans[Define.LANGUAGE_TW+Define.MULTI_TABLE_MODE_4] = BitmapUtil.snapshot(_mc);
			// _mc.gotoAndStop(Define.LANGUAGE_EN+1);
			// this.m_dicMultiTrans[Define.LANGUAGE_EN+Define.MULTI_TABLE_MODE_4] = BitmapUtil.snapshot(_mc);
			
			// _mc = ResourceManager.getInstance().createBitmapByName("Multi_Table_Item_Asset_8_default");
			// _mc.gotoAndStop(Define.LANGUAGE_CN+1);
			// this.m_dicMultiTrans[Define.LANGUAGE_CN+Define.MULTI_TABLE_MODE_8] = BitmapUtil.snapshot(_mc);
			// _mc.gotoAndStop(Define.LANGUAGE_TW+1);
			// this.m_dicMultiTrans[Define.LANGUAGE_TW+Define.MULTI_TABLE_MODE_8] = BitmapUtil.snapshot(_mc);
			// _mc.gotoAndStop(Define.LANGUAGE_EN+1);
			// this.m_dicMultiTrans[Define.LANGUAGE_EN+Define.MULTI_TABLE_MODE_8] = BitmapUtil.snapshot(_mc);
			
			// _mc = ResourceManager.getInstance().createBitmapByName("Multi_Table_Item_Asset_16_default");
			// _mc.gotoAndStop(Define.LANGUAGE_CN+1);
			// this.m_dicMultiTrans[Define.LANGUAGE_CN+Define.MULTI_TABLE_MODE_16] = BitmapUtil.snapshot(_mc);
			// _mc.gotoAndStop(Define.LANGUAGE_TW+1);
			// this.m_dicMultiTrans[Define.LANGUAGE_TW+Define.MULTI_TABLE_MODE_16] = BitmapUtil.snapshot(_mc);
			// _mc.gotoAndStop(Define.LANGUAGE_EN+1);
			// this.m_dicMultiTrans[Define.LANGUAGE_EN+Define.MULTI_TABLE_MODE_16] = BitmapUtil.snapshot(_mc);
			
			// if(_mc){
			// 	_mc = null;
			// }
		}
		
		private initTableBg():void{
			this.m_aTableBg = [];
			// var _mc:MovieClip = ResourceManager.getInstance().createBitmapByName("Table_bg_Asset");
			
			// _mc.gotoAndStop(1);
			// this.m_aTableBg[0] =  BitmapUtil.snapshot(_mc);
			
			// _mc.gotoAndStop(2);
			// this.m_aTableBg[1] =  BitmapUtil.snapshot(_mc);
			
			// if(_mc){
			// 	_mc = null;
			// }
		}
		private initTableBgHover():void{
			// var _mc : MovieClip = ResourceManager.getInstance().createBitmapByName("Lobby_Table_Hover_Asset");
			// var _len : int = _mc.totalFrames;
			// var _bmpd : BitmapData;
			// aTableBgHover = [];
			// for (var i:number = 0; i < _len; i++)
			// {
			// 	_mc.gotoAndStop(i+1);
			// 	_bmpd = new BitmapData(_mc.width+20, _mc.height+20, true, 0);
			// 	_bmpd.draw(_mc);
			// 	aTableBgHover[i] = _bmpd;
			// }
			// if(_bmpd){
			// 	_bmpd = null;
			// }
			// if(_mc){
			// 	_mc = null;
			// }
		}
		
		private initMultitableBg():void{
			this.m_dicMultitableBg = new Object();
			
			// var _mc:MovieClip;
			// var _bmd:BitmapData;
			// var _fillBmd:BitmapData 
			// var pt:Point = new Point(0,0);
			// _mc = ResourceManager.getInstance().createBitmapByName("Table_bg_Asset_4");
			// _bmd = BitmapUtil.snapshot(_mc);
			// _fillBmd = new BitmapData(426,240);
			// _fillBmd.copyPixels(_bmd,new Rectangle(11,11,426,240),pt);
			// _bmd.fillRect(new Rectangle(11,11,426,240),0x00000000);
			// this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_4] = _bmd;
			// this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_4+100]=_fillBmd;
			
			// _mc = ResourceManager.getInstance().createBitmapByName("Table_bg_Asset_8");
			// _bmd = BitmapUtil.snapshot(_mc);
			// _fillBmd = new BitmapData(426,240);
			// _fillBmd.copyPixels(_bmd,new Rectangle(11,11,426,240),pt);
			// _bmd.fillRect(new Rectangle(11,11,426,240),0x00000000);
			// this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_8] = _bmd;
			// this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_8+100]=_fillBmd;
			
			// _mc = ResourceManager.getInstance().createBitmapByName("Table_bg_Asset_16");
			// _bmd = BitmapUtil.snapshot(_mc);
			// _fillBmd = new BitmapData(389,242);
			// _fillBmd.copyPixels(_bmd,new Rectangle(11,11,389,242),pt);
			// _bmd.fillRect(new Rectangle(11,11,389,242),0x00000000);
			// this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_16] =  _bmd;
			// this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_16+100]=_fillBmd;
			
			// if(_mc){
			// 	_mc = null;
			// }
		}
		
		private initTableDefault():void{
			this.m_dicTable = new Object();
			// var _mc : MovieClip = ResourceManager.getInstance().createBitmapByName("Table_Default_Asset");
			// _mc.gotoAndStop(1);
			// this.m_dicTable[Define.LANGUAGE_CN] = BitmapUtil.snapshot(_mc);
			
			// _mc.gotoAndStop(2);
			// this.m_dicTable[Define.LANGUAGE_TW] = BitmapUtil.snapshot(_mc);
			
			// _mc.gotoAndStop(3);
			// this.m_dicTable[Define.LANGUAGE_EN] = BitmapUtil.snapshot(_mc);
		}
		
	}
}