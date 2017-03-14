module language {
	export class Language_CN extends Language {

		public constructor() {
			super();

			/** 通用 **/
			this.dictionaryString[Language.sCoin]		=	"货币";
			this.dictionaryString[Language.sBCoin]	=	"B币";
			this.dictionaryString[Language.sGCoin]	=	"G币";
			this.dictionaryString[Language.sCancel]	=	"取 消";
			this.dictionaryString[Language.sReBet]	=	"重复下注";
			
			/** 通用对话框 **/
			this.dictionaryString[Language.sHint]	=	"提示";
			this.dictionaryString[Language.sGame_Relogin]	=	"此局游戏仍保有您的座位。\n是否继续游戏？ ";
			this.dictionaryString[Language.sPlease_Wait]	=	"该功能暂未开放，敬请期待！";
			this.dictionaryString[Language.sBet_Wait]	=	"您已下注，请等待开局！";
			this.dictionaryString[Language.sAll_Table_Maintenance]	=	"所有桌子维护中...";
			
			/** tip **/
			this.dictionaryString[Language.sTip_Refresh]	=	"刷新视讯";
			this.dictionaryString[Language.sTip_Tool_SD]	=	"标清视讯";
			this.dictionaryString[Language.sTip_Tool_HD]	=	"高清视讯";
			this.dictionaryString[Language.sTip_Tool_Detail]	=	"桌子详情";
			this.dictionaryString[Language.sTip_Tool_Full]	=	"全屏显示";
			this.dictionaryString[Language.sTip_Tool_ExitFull]	=	"退出全屏";
			this.dictionaryString[Language.sTip_Tool_PersonalInfo]	=	"个人资讯";
			this.dictionaryString[Language.sTip_Tool_Record]	=	"下注记录";
			this.dictionaryString[Language.sTip_Tool_Other]	=	"帮助";
			this.dictionaryString[Language.sTip_Tool_System]	=	"系统设置";
			this.dictionaryString[Language.sTip_Tool_Exit]	=	"退出游戏";
			this.dictionaryString[Language.sTip_recharge]	=	"充值";
			this.dictionaryString[Language.sTip_GoodRood_Setting]	=	"好路设置";
			this.dictionaryString[Language.sTip_ChipPanel_Rebet]	=	"重复下注";
			this.dictionaryString[Language.sTip_ChipPanel_Custom]	=	"自订筹码";
			this.dictionaryString[Language.sTip_Video_Open]	=	"开启视讯";
			this.dictionaryString[Language.sTip_Video_Close]	=	"关闭视讯";
			this.dictionaryString[Language.sTip_Video_ZoomIn]	=	"放大视讯";
			this.dictionaryString[Language.sTip_Video_ZoomOut]	=	"缩小视讯";
			
			/** 视讯 **/
			this.dictionaryString[Language.sLive]	=	"现场视频";
			
			/** 按钮 **/
			this.dictionaryString[Language.sOk] =	"确认";
			this.dictionaryString[Language.sNo] =	"取消";
			this.dictionaryString[Language.sOn] = "开";
			this.dictionaryString[Language.sOff] = "关";
			
			this.dictionaryString[Language.sChipPanelCustom_Label] = "自订筹码";
			this.dictionaryString[Language.sPanelChannel_Label] = "视讯频道";
			this.dictionaryString[Language.sChipPanelCustom] = "您还可以自订筹码数量";
			
			/** 功能列 **/
			this.dictionaryString[Language.sTool_ContactService] = "联系客服";
			this.dictionaryString[Language.sTool_AccountRecord] = "账号记录";
			this.dictionaryString[Language.sTool_GameRule] = "游戏规则";
			
			/** 百家乐 **/
			this.dictionaryString[Language.sRound] = "游戏局号";
			this.dictionaryString[Language.sShoe] = "游戏靴号";
			this.dictionaryString[Language.sRealPool] = "即时彩池";
			this.dictionaryString[Language.sDealer] = "荷官名称";
			
			this.dictionaryString[Language.sSpeed] = "极速百家乐";
			this.dictionaryString[Language.sVip] = "包桌百家乐";
			this.dictionaryString[Language.sTable] = "桌";
			
			this.dictionaryString[Language.sBanker] = "庄";
			this.dictionaryString[Language.sPlayer] = "闲";
			this.dictionaryString[Language.sTie] = "和";
			this.dictionaryString[Language.sBankerPair] = "庄对";
			this.dictionaryString[Language.sPlayerPair] = "闲对";
			this.dictionaryString[Language.sBankerWin] = "庄赢";
			this.dictionaryString[Language.sPlayerWin] = "闲赢";
			this.dictionaryString[Language.sTieWin] 	 = "和赢";
			this.dictionaryString[Language.sBankerPairWin] 	 = "庄对赢";
			this.dictionaryString[Language.sPlayerPairWin] 	 = "闲对赢";				
			
			this.dictionaryString[Language.sBankerRoute] = "庄问路";
			this.dictionaryString[Language.sPlayerRoute] = "闲问路";
			
			/** 桌子提示 **/
			this.dictionaryString[Language.sMaintenance] = "桌子维护中...";
			this.dictionaryString[Language.sNoTrial] = "不支持试玩";
			this.dictionaryString[Language.sChangeShoe] = "洗牌中";	
			
			
			this.dictionaryString[Language.sBetLimit] = "下注限额";
			this.dictionaryString[Language.sUserName] = "玩家账号";
			this.dictionaryString[Language.sAccountGold] = "账户金额";
			
			this.dictionaryString[Language.sTable_0] = "总筹码数";
			
			this.dictionaryString[Language.sOnlinePlayers] = "在线玩家";
			
			this.dictionaryString[Language.sLimitSelect] = "限红选择";
			
			this.dictionaryString[Language.sBig] = "大";
			this.dictionaryString[Language.sSmall] = "小";
			this.dictionaryString[Language.sRed] = "红";
			this.dictionaryString[Language.sBlack] = "黑";
			this.dictionaryString[Language.sOdd] = "单";
			this.dictionaryString[Language.sEven] = "双";
			
			this.dictionaryString[Language.sBig_Win]	= "大赢";
			this.dictionaryString[Language.sSmall_Win] = "小赢";
			this.dictionaryString[Language.sOdd_Win] 	 = "单赢";
			this.dictionaryString[Language.sEven_Win]  = "双赢";
			this.dictionaryString[Language.sRed_Win] 	 = "红赢";
			this.dictionaryString[Language.sBlack_Win] = "黑赢";					
			
			this.dictionaryString[Language.sExitGame] = "退出游戏";
			this.dictionaryString[Language.sCanNotExitGame] = "已投注，暂时不能离开游戏";
			this.dictionaryString[Language.sGameStaus_WaitNextNewgame] = "等待新局";
			this.dictionaryString[Language.sGameStaus_Ready] = "准备中";
			this.dictionaryString[Language.sGameStaus_Betting] = "请投注";
			this.dictionaryString[Language.sGameStaus_Dealing] = "发牌中";
			this.dictionaryString[Language.sGameStaus_Settling] = "结算中";
			this.dictionaryString[Language.sGameStaus_Settled] = "已结算";
			this.dictionaryString[Language.sGameStaus_Peeking] = "咪牌中";
			this.dictionaryString[Language.sGameStaus_Changing_Shoe] = "洗牌中";
//			this.dictionaryString[Language.sGameStaus_Failing_Game] = "退押注";
			this.dictionaryString[Language.sGameStaus_Fail_Game] = "退押注";
			
			this.dictionaryString[Language.sChange_Dealer] = "更换荷官";
			this.dictionaryString[Language.sDealer_Exit] = "荷官已离线，请选择其他桌台。";
			
			this.dictionaryString[Language.sPersonal_Label] = "个人资讯";
			this.dictionaryString[Language.sPersonal_0] = "用户账号";
			this.dictionaryString[Language.sPersonal_1] = "账号余额";
			this.dictionaryString[Language.sPersonal_2] = "有效下注";
			this.dictionaryString[Language.sPersonal_3] = "用户等级";
			this.dictionaryString[Language.sPersonal_4] = "用户积分";
			this.dictionaryString[Language.sPersonal_5] = "在线时间";
			this.dictionaryString[Language.sPersonal_6] = "下注限红";
			
			this.dictionaryString[Language.sMulti_Table_ID] = "台号";
			this.dictionaryString[Language.sMulti_Table_Bet] = "下注";
			this.dictionaryString[Language.sMulti_Table_Payout] = "派彩";
			
			/** 游戏名称 **/
			this.dictionaryString[Language.sGame_Name_Bac] = "百家乐";
			this.dictionaryString[Language.sGame_Name_Bac_Speed] = "极速百家乐";
			this.dictionaryString[Language.sGame_Name_Bac_Rebot] = "金臂百家乐";
			this.dictionaryString[Language.sGame_Name_Bac_Peek] = "竞咪百家乐";
			this.dictionaryString[Language.sGame_Name_Bac_Charter] = "包桌百家乐";
			this.dictionaryString[Language.sGame_Name_DTF] = "龙虎";
			this.dictionaryString[Language.sGame_Name_Sic] = "骰宝";
			this.dictionaryString[Language.sGame_Name_Rou] = "轮盘";
			
			this.dictionaryString[Language.sSystem_Setting] = "系统设置";
			this.dictionaryString[Language.sLanguage_setting] = "语言设置";
			this.dictionaryString[Language.sLanguage_CN] = "简体中文";
			this.dictionaryString[Language.sLanguage_TW] = "繁體中文";
			this.dictionaryString[Language.sLanguage_EN] = "English";
			this.dictionaryString[Language.sMusic] = "音乐";
			this.dictionaryString[Language.sMusic_BG] = "游戏音乐";
			this.dictionaryString[Language.sSound_Effect] = "游戏音效";
			this.dictionaryString[Language.sSound_Live] = "现场声音";
			this.dictionaryString[Language.sSound_Chinese] = "普通话";
			this.dictionaryString[Language.sSound_Cantonese] = "粤语";
			this.dictionaryString[Language.sSound_English] = "英语";
			
			this.dictionaryString[Language.sGoodRoadSetting] = "好路类型设置";
			this.dictionaryString[Language.sGoodRoadSetting_0] = "全选";
			this.dictionaryString[Language.sGoodRoad] = "好路通知";
			
			this.dictionaryString[Language.sSettingPwdPanel_0] = "独享";
			this.dictionaryString[Language.sSettingPwdPanel_1] = "密码可进";
			this.dictionaryString[Language.sSettingPwdPanel_2] = "公开";
			this.dictionaryString[Language.sSettingPwdPanel_3] = "密码设置：";
			
			this.dictionaryString[Language.sTableEnter_0] = "请输入密码";
			
			
			this.dictionaryString[Language.sMAKE_SURE_CHANGE_DEALER] = "确定更换荷官";
			this.dictionaryString[Language.sMAKE_SURE_CHANGE_SHOE] = "确定换靴";
			
			
			this.dictionaryString[Language.sOPERATION_CHANGE_DEALER_OK] = "更換荷官";
			this.dictionaryString[Language.sOPERATION_CHANGE_SHOE_OK] = "更换牌靴";
			this.dictionaryString[Language.sOPERATION_FLY_POKER_OK] = "飞牌";
			this.dictionaryString[Language.sOPERATION_START_BET_OK] = "开始下注";
			this.dictionaryString[Language.sOPERATION_DEAL_POKER_OK] = "开牌中";
			
			this.dictionaryString[Language.sOPERATION_CHANGE_DEALER_FAIL] = "更換荷官失败";
			this.dictionaryString[Language.sOPERATION_CHANGE_SHOE_FAIL] = "更换牌靴失败";
			this.dictionaryString[Language.sOPERATION_FLY_POKER_FAIL] = "飞牌失败";
			this.dictionaryString[Language.sOPERATION_START_BET_FAIL] = "开始下注失败";
			this.dictionaryString[Language.sOPERATION_DEAL_POKER_FAIL] = "开牌失败";
			
			this.dictionaryString[Language.sOPERATION_CHANGE_DEALER_NO] = "不允许更换荷官";
			this.dictionaryString[Language.sOPERATION_CHANGE_SHOE_NO] = "未超过45局，无法更换牌靴";
			this.dictionaryString[Language.sOPERATION_FLY_POKER_NO] = "不允许飞牌";
			this.dictionaryString[Language.sOPERATION_START_BET_NO] = "不允许开始下注";
			this.dictionaryString[Language.sOPERATION_DEAL_POKER_NO] = "不允许开牌";
			
			this.dictionaryString[Language.sExitGame] = "你确定退出";
	
			this.dictionaryString[Language.sBetLimit_Under]		= "下注额度低于最小额度";
			this.dictionaryString[Language.sBetLimit_Upper] 		= "此下注区已达押注上限";		
			
			this.dictionaryString[Language.sWinGold] 				= "总赢金";
			this.dictionaryString[Language.sNoWin] 				= "本局无输赢";
			this.dictionaryString[Language.sLose] 				= "您输了";
			
			this.dictionaryString[Language.sGold]					= "元";
			this.dictionaryString[Language.sTablePause] 			= "赌桌暂停，请返回大厅";
			
			this.dictionaryString[Language.sDealing]				= "下注结束，开牌";
			this.dictionaryString[Language.sBetting]				= "已开局，请下注";
			this.dictionaryString[Language.sSettled]				= "结算完成";
			this.dictionaryString[Language.sWaitNewGame]			= "等待新局";
			
			
			this.dictionaryString[Language.sIdleRound] 			= "闲置局数";
			this.dictionaryString[Language.sIdleMaxRound] 		= "最大闲置局数";
			this.dictionaryString[Language.sSurroundDice] 		= "围骰";
			
			this.dictionaryString[Language.sTotalBetGold]			= "总下注金额";
			this.dictionaryString[Language.sDragon]				= "龙";
			this.dictionaryString[Language.sTiger]				= "虎";		
			this.dictionaryString[Language.sDragonRoute] 			= "龙问路";
			this.dictionaryString[Language.sTigerRoute] 			= "虎问路";
			this.dictionaryString[Language.sDragon_Win]			= "龙赢";
			this.dictionaryString[Language.sTiger_Win]			= "虎赢";
			
			this.dictionaryString[Language.sPlayType]					= "玩法";		
			this.dictionaryString[Language.sPayout]				= "赔率";		
			this.dictionaryString[Language.sLimitBet]				= "限额";		
			
			/**轮盘投注种类*/
			this.dictionaryString[Language.sZero]						= "零";		
			this.dictionaryString[Language.sBetType_1]				= "直接注";		
			this.dictionaryString[Language.sBetType_2]				= "分注";		
			this.dictionaryString[Language.sBetType_3]				= "街注";		
			this.dictionaryString[Language.sBetType_3N]				= "三数";		
			this.dictionaryString[Language.sBetType_4]				= "角注";		
			this.dictionaryString[Language.sBetType_4N]				= "四数";		
			this.dictionaryString[Language.sBetType_5]				= "线注";		
			this.dictionaryString[Language.sDozen]					= "打";		
			this.dictionaryString[Language.sCol]						= "列";		
			this.dictionaryString[Language.sBetType_Dozen_1]			= "第一打";		
			this.dictionaryString[Language.sBetType_Dozen_2]			= "第二打";		
			this.dictionaryString[Language.sBetType_Dozen_3]			= "第三打";		
			this.dictionaryString[Language.sBetType_Col_1]			= "第一列";		
			this.dictionaryString[Language.sBetType_Col_2]			= "第二列";		
			this.dictionaryString[Language.sBetType_Col_3]			= "第三列";
			
			this.dictionaryString[Language.sDozen]	=	"打";
			this.dictionaryString[Language.sCol]		=	"列";
			this.dictionaryString[Language.sRedBlack]	=	"红黑";
			this.dictionaryString[Language.sDaLie]	=	"打列";
			this.dictionaryString[Language.sBigSmall]	=	"大小";
			this.dictionaryString[Language.sSingleDouble]	=	"单双";
			
			this.dictionaryString[Language.sAllSurround]					= "全围";
			
			/**連線狀態*/
			this.dictionaryString[Language.sConnectFailed]				= "游戏连接失败,请返回大厅";
			this.dictionaryString[Language.sDisConnect]					= "游戏断线";
			this.dictionaryString[Language.sConnecting]					= "连线中";
			
			
			/**進桌結果*/
			this.dictionaryString[Language.sEnterOk]						= "进桌成功";
			this.dictionaryString[Language.sEnterFail]					= "进桌失败";
			this.dictionaryString[Language.sEnterInvalid]					= "身份验证不通过";
			this.dictionaryString[Language.sNoSeat]						= "没有座位";			
			this.dictionaryString[Language.sTableOwnerExist]				= "桌主已存在，无法成为桌主";
			this.dictionaryString[Language.sJoinTbTypeFault]				= "进桌类型不对";
			this.dictionaryString[Language.sJoinDataError]				= "进桌数据不对";
			this.dictionaryString[Language.sBalanceNoEnough]				= "余额不够";
			this.dictionaryString[Language.sEnterPwError]					= "密码不正确";
			this.dictionaryString[Language.sTableLimit]					= "超过赌桌上限";
			this.dictionaryString[Language.sTablePrivate]					= "该桌已独享";
			this.dictionaryString[Language.sCharterTypeError]				= "包桌状态不对";			
			this.dictionaryString[Language.sTimeOut]						= "联机逾时";
			this.dictionaryString[Language.sProtocolError]						= "通信板本不对";
			this.dictionaryString[Language.sTryAccountDeny]				= "试玩帐号权限拒绝";
			this.dictionaryString[Language.sPermissionDeny]				= "权限不允许";
			this.dictionaryString[Language.sMasterExit]					= "桌主已离开";
			this.dictionaryString[Language.sNotFinish]					= "此局尚未结束";
			this.dictionaryString[Language.sMaintain]						= "维护中";
			this.dictionaryString[Language.sTableClosed]					= "赌桌关闭";
			this.dictionaryString[Language.sNoSettled]					= "请先至电投游戏结清筹码";
			this.dictionaryString[Language.sEnterSeatFail]				= "本局已结束，请重新进桌";
			this.dictionaryString[Language.sEnterGoodFail]				= "进入好路多桌失败";
			
			/**下注返回訊息*/
			this.dictionaryString[Language.sBetOk]						=	"下注成功";		
			this.dictionaryString[Language.sBetGoldNoEnough]				=	"下注金额不足";		
			this.dictionaryString[Language.sOverSelfLimit]				=	"下注金额超过自选限红";			
			this.dictionaryString[Language.sUnderSelfLimit]				=	"下注金额低于自选限红";			
			this.dictionaryString[Language.sOverTableLimit]				=	"下注金额超过赌桌限红";			
			this.dictionaryString[Language.sOverTotalLimit]				=	"此桌总押注金额已达上限\n下注失败";			
			this.dictionaryString[Language.sUnderTableLimit]				=	"下注金额低于赌桌限红";			
			this.dictionaryString[Language.sBetLimitNoFound]				=	"下注找不到押注上下限模式";			
			this.dictionaryString[Language.sBetPosNoFound]				=	"下注找不到押注位置";		
			this.dictionaryString[Language.sBetPosDisable]				=	"该位置不允许下注";		
			this.dictionaryString[Language.sBetFailed]					=	"下注失败";		
			
			this.dictionaryString[Language.sOverLimit]					=	"此下注区已达押注上限";		
			this.dictionaryString[Language.sUnderLimit]					=	"下注额度低于最小额度";		
			this.dictionaryString[Language.sBetAll]						=	"下注所有余额";		
			
			
			this.dictionaryString[Language.sVideoConnectFailed]			=	"视讯异常，请刷新或切换频道";
			
			/**閒置訊息*/
			this.dictionaryString[Language.sIdle_OverThreeNoBet]			=	"您有3局未下注，将于2局后返回大厅";		
			this.dictionaryString[Language.sIdle_OverFiveNoBet]			=	"您已经超过5局没有下注,即将返回大厅";		
			
			/**電投大廳*/
			this.dictionaryString[Language.sTel_Can_Change_Amount]		=	"可出码额";
			this.dictionaryString[Language.sTel_Chips]					=	"游戏余额";			
			this.dictionaryString[Language.sTelSelectTableFailed]			=	"选桌失败，请尝试选其他桌";
			this.dictionaryString[Language.sTelSelectTableSuccess]		=	"转桌成功";
			this.dictionaryString[Language.sTelGunnerSuccess]				=	"配槍手成功";
			this.dictionaryString[Language.sTelGunnerNotEnough]			=	"枪手不够";
			this.dictionaryString[Language.sTel_Telephone_Failed]			=	"枪手电话打不通";
			this.dictionaryString[Language.sTel_Gunner_Log_Out]			=	"枪手登出";
			this.dictionaryString[Language.sTel_Number]					=	"客服电话";
			this.dictionaryString[Language.sTel_ID_Code]					=	"配对码";
			this.dictionaryString[Language.sTel_Gunner_Login_Success]		=	"枪手登入成功";
			this.dictionaryString[Language.sTel_Gunner_LogOut_KNOCK_OFF]	=	"枪手收工登出";
			this.dictionaryString[Language.sTel_Gunner_LogOut_Relief]		=	"枪手换班登出";	
			this.dictionaryString[Language.sTel_RequestGunnersException]	=	"配枪手异常";
			this.dictionaryString[Language.sTel_Gunner_LogOut]			=	"枪手登出,如果要继续游戏,请重新在电话中配枪手";
			this.dictionaryString[Language.sTel_Table_Full_Strength]			=	"此桌座位已满，请转往其他桌进行游戏";
			
			
			/**電投百家*/
			this.dictionaryString[Language.sTel_TableID]					=	"桌号";
			this.dictionaryString[Language.sTel_RoundID]					=	"局号";
			this.dictionaryString[Language.sTel_MaxBet]					=	"最高投注";				
			this.dictionaryString[Language.sTel_MinBet]					=	"最低投注";				
			this.dictionaryString[Language.sTel_TieMaxBet]				=	"和注最高";			
			this.dictionaryString[Language.sTel_TieMinBet]				=	"和注最低";			
			this.dictionaryString[Language.sTel_PairMaxBet]				=	"对子最高";			
			this.dictionaryString[Language.sTel_PairMinBet]				=	"对子最低";	
			this.dictionaryString[Language.sTel_GiveChips]				=	"小费";
			this.dictionaryString[Language.sTel_GiveChipsFailed]			=	"给小费失败";
			this.dictionaryString[Language.sTel_EnterTable]				=	"进入本桌";
			this.dictionaryString[Language.sTel_ConnectPrinterSuccess]	=	"连接印表机成功";
			this.dictionaryString[Language.sTel_ConnectPrinterFailed]		=	"连接印表机失败";
			this.dictionaryString[Language.sTel_ConnectPrinterClosed]		=	"印表机连接关闭";			
			this.dictionaryString[Language.sTel_PrintPeek]				=	"列印咪牌";
			this.dictionaryString[Language.sTel_VideoPeek]				=	"视频咪牌";
			this.dictionaryString[Language.sTel_ElectronicPeek]			=	"电子咪牌";
			this.dictionaryString[Language.sTel_NoPeek]					=	"不咪牌";				
			
			
			this.dictionaryString[Language.sGoodRoadWait]					=	"好路等待中";	
			this.dictionaryString[Language.sGoodRoadType_1]				=	"长庄";	
			this.dictionaryString[Language.sGoodRoadType_2]				=	"长闲";	
			this.dictionaryString[Language.sGoodRoadType_3]				=	"拍拍黐";	
			this.dictionaryString[Language.sGoodRoadType_4]				=	"大路单跳";	
			this.dictionaryString[Language.sGoodRoadType_5]				=	"一厅两房(庄)";	
			this.dictionaryString[Language.sGoodRoadType_6]				=	"一厅两房(闲)";	
			this.dictionaryString[Language.sGoodRoadType_7]				=	"逢庄黐";	
			this.dictionaryString[Language.sGoodRoadType_8]				=	"逢闲黐";	
			this.dictionaryString[Language.sGoodRoadType_9]				=	"隔黐庄";	
			this.dictionaryString[Language.sGoodRoadType_10]				=	"隔黐庄";	
			
			/**骰寶*/
			this.dictionaryString[Language.sAnyTriple]					=	"全围";
			this.dictionaryString[Language.sSpecificTriple]				=	"围1~围6";
			this.dictionaryString[Language.sSpecificDouble]				=	"对子1~对子6";
			this.dictionaryString[Language.sSpecificSingle]				=	"单点1~单点6";
			this.dictionaryString[Language.sDiceCombination]				=	"组合";
			this.dictionaryString[Language.sSum_9_10_11_12]				=	"和值 9/10/11/12";
			this.dictionaryString[Language.sSum_8_13]						=	"和值 8/13";
			this.dictionaryString[Language.sSum_7_14]						=	"和值 7/14";
			this.dictionaryString[Language.sSum_6_15]						=	"和值 6/15";
			this.dictionaryString[Language.sSum_5_16]						=	"和值 5/16";
			this.dictionaryString[Language.sSum_4_17]						=	"和值4/17";
			this.dictionaryString[Language.sBig_Small]					=	"大/小";
			this.dictionaryString[Language.sOdd_Even]						=	"單/雙";			
			
			this.dictionaryString[Language.sTableMaintain]					=	"赌桌维护中, 请返回大厅";
			this.dictionaryString[Language.sWarn_ServerConnect_Fail]			=	"伺服器异常,请询问相关人员";
			this.dictionaryString[Language.sWarn_Login_Lobby_Fail]			=	"登入大厅失败";
			this.dictionaryString[Language.sWarn_Boss_Never_Login]			=	"老板尚未登入";
			this.dictionaryString[Language.sWarn_Deputy_Never_Reviewed]		=	"枪手尚未审核";
			this.dictionaryString[Language.sWarn_System_Maintain]				=	"系统维护中";
			this.dictionaryString[Language.sWarn_Login_Lobby_Other_Error]		=	"登入大厅,其他错误";
			this.dictionaryString[Language.sWarn_Lobby_Disconnect]			=	"大厅断线";
			this.dictionaryString[Language.sWarn_LobbyConnecting]				=	"大厅连线中";
			this.dictionaryString[Language.sWarn_Web_Data_Error]				=	"网页数据错误";
			this.dictionaryString[Language.sWarn_Web_Maintain]				=	"全站维护中不允许登入";
			this.dictionaryString[Language.sWarn_Proxy_Maintain]				=	"代理维护中不允许登入";
			
			
			
			/**背景音樂*/
			this.dictionaryString[Language.sBackground_Music_1]			=	"背景音乐1";
			this.dictionaryString[Language.sBackground_Music_2]			=	"背景音乐2";
			this.dictionaryString[Language.sBackground_Music_3]			=	"背景音乐3";			
			
			
			/**登出原因*/
			this.dictionaryString[Language.sLogout_Lobby_Repeat_Login]				=	"大厅重复登入";
			this.dictionaryString[Language.sLogout_Player_Active_Logout]				=	"玩家主动注销";
			this.dictionaryString[Language.sLogout_TRY_ACCOUNT_TIME_OUT]				=	"试玩帐号超过试玩时间";
			this.dictionaryString[Language.sLogout_CANCEL_SUBSCRIPTION_MULTI]			=	"取消订阅多桌注销";
			this.dictionaryString[Language.sLogout_DISCONNECT]						=	"玩家断线";
			this.dictionaryString[Language.sLogout_TABLER_DISCONNECT]					=	"包桌桌主已离开";
			this.dictionaryString[Language.sLogout_Lobby_Connect_Time_Out]			=	"大厅连线逾时";
			this.dictionaryString[Language.sLogout_Server_Maintain]					=	"服务器维护中";
			this.dictionaryString[Language.sLogout_exception]							=	"登出例外错误 ,无法辨识 服务端传来的登出原因";	
			this.dictionaryString[Language.sLogout_Proxy_Player_Suspended]			=	"后台或代理后台已停用此帐号";	
			this.dictionaryString[Language.sLogout_Game_Repeat_Login]					=	"该桌玩家重复登入";
			this.dictionaryString[Language.sLogout_Game_Connect_Time_Out]				=	"游戏连线逾时";
			
			
			/**Socket斷線*/
			this.dictionaryString[Language.sNetWork_Abnormal_Lobby]					=	"网络异常,请重新载入";
			this.dictionaryString[Language.sNetWork_Abnormal_Game]					=	"网络异常,请返回大厅";	
			
			/**例外處理*/
			this.dictionaryString[Language.sException_Login_Lobby_Pkt_Not_Return]		=	"大厅服务器异常,请尝试返回网站";
			this.dictionaryString[Language.sException_Bet_Not_Return]					=	"押注错误,请重新押注";
			this.dictionaryString[Language.sException_Connect_GameServer_Failed]		=	"连接游戏伺服器失败";
			this.dictionaryString[Language.sException_BetLimit_Is_NULL]				=	"服务器下注限额错误";
			
			/**下注紀錄*/
			this.dictionaryString[Language.sSearch]		=	"查询";			
			this.dictionaryString[Language.sListNumber]	=	"订单号";
			this.dictionaryString[Language.sBetTime]		=	"下注时间";
			this.dictionaryString[Language.sGameType]		=	"游戏类型";
			this.dictionaryString[Language.sTableID]		=	"桌号";
			this.dictionaryString[Language.sResult]		=	"结果";
			this.dictionaryString[Language.sTotalBet]		=	"总投注";
			this.dictionaryString[Language.sPayOut]		=	"派彩";
			this.dictionaryString[Language.sAvailableBet]	=	"有效投注";
			this.dictionaryString[Language.sListState]	=	"状态";			
			this.dictionaryString[Language.sSmallSum]		=	"小计";
			this.dictionaryString[Language.sTotalSum]		=	"总计";
			this.dictionaryString[Language.sSingleShow]	=	"单页显示";
			this.dictionaryString[Language.sTotalShow]	=	"共计";
			this.dictionaryString[Language.sGo]			=	"跳转到";
			this.dictionaryString[Language.sIsPayOuted]	=	"已派彩";
			this.dictionaryString[Language.sNoPayOut]		=	"未派彩";
			this.dictionaryString[Language.sYear]			=	"年";
			this.dictionaryString[Language.sMonth]		=	"月";
			this.dictionaryString[Language.sDay]			=	"日";
			this.dictionaryString[Language.sMonday]		=	"一";
			this.dictionaryString[Language.sTuesday]		=	"二";
			this.dictionaryString[Language.sWednesday]	=	"三";
			this.dictionaryString[Language.sThursday]		=	"四";
			this.dictionaryString[Language.sFriday]		=	"五";
			this.dictionaryString[Language.sSaturday]		=	"六";
			this.dictionaryString[Language.sSunday]		=	"日";
			this.dictionaryString[Language.sSinglePageShow] = "每页显示";
			this.dictionaryString[Language.sBetGold]		=	"投注金额";
			this.dictionaryString[Language.sReplay]		=	"重播";
			this.dictionaryString[Language.sGameNo]		=	"局号";
			this.dictionaryString[Language.sVideoRePlay]	=	"视频回放";
			this.dictionaryString[Language.sScaleBig]		=	"放大";
			this.dictionaryString[Language.sScaleSmall]	=	"缩小";
			this.dictionaryString[Language.sPageLimit]	=	"输入页码超过合法范围";
			this.dictionaryString[Language.sPleaseEnter]	=	"请输入";
			this.dictionaryString[Language.sValue]		=	"的值";
			this.dictionaryString[Language.sFourNumber]	=	"四数";
			
			this.dictionaryString[Language.sSicbo_X8_7] 	= "13点";
			this.dictionaryString[Language.sSicbo_X8_6] 	= "8点";
			this.dictionaryString[Language.sSicbo_X8_5] 	= "6对";
			
			this.dictionaryString[Language.sSicbo_X8_4] = "5对";
			this.dictionaryString[Language.sSicbo_X8_3] = "4对";
			this.dictionaryString[Language.sSicbo_X8_2] = "3对";
			this.dictionaryString[Language.sSicbo_X8_1] = "2对";
			
			this.dictionaryString[Language.sSicbo_X8_0] = "1对";
			this.dictionaryString[Language.sSicbo_X6_3] = "12点";
			this.dictionaryString[Language.sSicbo_X6_2] = "11点";
			this.dictionaryString[Language.sSicbo_X6_1] = "10点";
			this.dictionaryString[Language.sSicbo_X6_0] = "9点";
			
			this.dictionaryString[Language.sSicbo_X50_1] = "17点";
			this.dictionaryString[Language.sSicbo_X50_0] = "4点";
			
			this.dictionaryString[Language.sSicbo_X5_9] = "3, 4";
			this.dictionaryString[Language.sSicbo_X5_8] = "2, 6";
			this.dictionaryString[Language.sSicbo_X5_7] = "2, 5";
			this.dictionaryString[Language.sSicbo_X5_6] = "2, 4";
			this.dictionaryString[Language.sSicbo_X5_5] = "2, 3";
			
			this.dictionaryString[Language.sSicbo_X5_4] = "1, 6";
			this.dictionaryString[Language.sSicbo_X5_3] = "1, 5";
			this.dictionaryString[Language.sSicbo_X5_2] = "1, 4";
			this.dictionaryString[Language.sSicbo_X5_6] = "2, 4";
			this.dictionaryString[Language.sSicbo_X5_14] = "5, 6";
			this.dictionaryString[Language.sSicbo_X5_13] = "4, 6";
			this.dictionaryString[Language.sSicbo_X5_12] = "4, 5";
			this.dictionaryString[Language.sSicbo_X5_11] = "3, 6";
			
			
			this.dictionaryString[Language.sSicbo_X5_10] = "3, 5";
			this.dictionaryString[Language.sSicbo_X5_1] = "1, 3";
			this.dictionaryString[Language.sSicbo_X5_0] = "1, 2";
			this.dictionaryString[Language.sSicbo_X24_0] = "全围";
			this.dictionaryString[Language.sSicbo_X18_1] = "16点";
			this.dictionaryString[Language.sSicbo_X18_0] = "5点";
			this.dictionaryString[Language.sSicbo_X150_5] = "6, 6, 6";
			this.dictionaryString[Language.sSicbo_X150_4] = "5, 5, 5";
			
			this.dictionaryString[Language.sSicbo_X150_3] = "4, 4, 4";
			this.dictionaryString[Language.sSicbo_X150_2] = "3, 3, 3";
			
			this.dictionaryString[Language.sSicbo_X150_1] = "2, 2, 2";
			this.dictionaryString[Language.sSicbo_X150_0] = "1, 1, 1";
			
			this.dictionaryString[Language.sSicbo_X14_1] = "15点";
			this.dictionaryString[Language.sSicbo_X14_0] = "6点";
			this.dictionaryString[Language.sSicbo_X12_1] = "14点";
			this.dictionaryString[Language.sSicbo_X12_0] = "7点";
			
			this.dictionaryString[Language.sSicbo_X1_9] = "大";
			this.dictionaryString[Language.sSicbo_X1_8] = "小";
			this.dictionaryString[Language.sSicbo_X1_7] = "单";
			this.dictionaryString[Language.sSicbo_X1_6] = "双";
			this.dictionaryString[Language.sSicbo_X1_5] = "6";
			this.dictionaryString[Language.sSicbo_X1_4] = "5";
			this.dictionaryString[Language.sSicbo_X1_3] = "4";
			this.dictionaryString[Language.sSicbo_X1_2] = "3";
			this.dictionaryString[Language.sSicbo_X1_1] = "2";
			this.dictionaryString[Language.sSicbo_X1_0] = "1";		
			this.dictionaryString[Language.sBetRecord]  =	"下注纪录";
			this.dictionaryString[Language.sGO]		  =	"至";
			this.dictionaryString[Language.sB] 		  = "庄";
			this.dictionaryString[Language.sP] 		  = "闲";
			this.dictionaryString[Language.sD] 		  = "龙";
			this.dictionaryString[Language.sT] 		  = "虎";	
			this.dictionaryString[Language.sNoBetRecord]	=	"查无纪录";
			
//			dictionaryBmpd[sBitmapdataTest]	=	BitmapManager.getInstance().getBmpdLanguage(Define.LANGUAGE_CN, sBitmapdataTest);
			
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			// 2016-3-24 以后新增的内容要在分割线下面
			
			this.dictionaryString[Language.sTip_Channel]	=	"频道选择";
			this.dictionaryString[Language.sTableLogin_NoMoney] = "您的余额不足";
			this.dictionaryString[Language.sTableLogin_CAN_NOT_ENTER] = "不能进入游戏";

			this.dictionaryString[Language.sMinLimit]	 = "进入该桌最低额度";
			this.dictionaryString[Language.sLiveVideo] = "视讯加载中...";
			
			this.dictionaryString[Language.sOPERATION_FLY_OVER_TIME] = "超过飞牌次数";
			this.dictionaryString[Language.sPlayer_Repeat_Login]		= "玩家重复登入";
			this.dictionaryString[Language.sNotOpenGame]				= "未开局";
			
			this.dictionaryString[Language.sBetCount]				= "下注金额";
			this.dictionaryString[Language.sBetedCount]				= "已下注金额";
			
			this.dictionaryString[Language.sExitLobby]	=	"您确定要退出游戏大厅吗？";
			this.dictionaryString[Language.sLeaveToTel]	=	"您确认要离开当前游戏桌，前往'电投大厅'吗？";
			this.dictionaryString[Language.sLeaveToMultitable]	=	"您确认要离开当前游戏桌，前往'好路多桌'吗？";
			
			this.dictionaryString[Language.sTip_Disable30]	=	"已过30局，该区停止下注";
			
			this.dictionaryString[Language.sWarn_Server_Busy]	=	"服务器忙碌中,请稍后再试";
			
			this.dictionaryString[Language.sSelectOne] = "请至少选择一个好路类型";
			
			this.dictionaryString[Language.sHaveIn] = "您已在";
			
			this.dictionaryString[Language.sLiveError] = "视讯异常，请刷新或切换频道";
			this.dictionaryString[Language.sLiveError_1] = "视频读取异常， 请重连或联系客服";
			
			this.dictionaryString[Language.sResetPassword] = "您已重设密码，请重新登陆";
			this.dictionaryString[Language.sBackBet] = "此局作废，退回所有押注";
			

			/**電投大廳*/
			this.dictionaryString[Language.sTelConnected]	= "  连线成功";
			this.dictionaryString[Language.sTelNoConnect]	= "  未连线";

			this.dictionaryString[Language.sException_Lobby_Connect_Failed]="大厅服务器连接失败";
			
			
			this.dictionaryString[Language.sCannotCharter] = "不可包桌";
			
			this.dictionaryString[Language.sIllegalOperation] = "违法操作";
			this.dictionaryString[Language.sLiveVideoPanoramaDataError]="全景视讯尚未开放";
			
			this.dictionaryString[Language.sLogout_Lobby_All_Maintain]				=	"全站维护中";
			this.dictionaryString[Language.sLogout_Lobby_Agent_Maintain]				=	"代理维护中";
			this.dictionaryString[Language.sLogout_Lobby_Hall_Maintain]				=	"厅馆维护中";
			this.dictionaryString[Language.sLogout_Lobby_Table_Maintain]				=	"赌桌维护中";
			this.dictionaryString[Language.sLogout_Multi_Bet_Time_Out]				=	"您已超时未投注，将被移出游戏";
			
			this.dictionaryString[Language.sWarn_Account_Limit]	=	"一个IP地址，只允许登陆一个账号";
			this.dictionaryString[Language.sWarn_Ret_14]	=	"不允许登入真人视频网投大厅（信用帐户限制）";
			
			this.dictionaryString[Language.sTip_Back_To_Lobby]	=	"返回大厅";
			
			this.dictionaryString[Language.sMaintain_Notice_Whole] = "尊敬的会员，为了提供更优质的服务，网站将于{0}进行维护，维护期间，全场游戏及交易将暂时关闭，给您带来不便，敬请谅解。";
			this.dictionaryString[Language.sMaintain_Notice_Agent] = "尊敬的会员，为了提供更高品质的游戏体验，全场游戏将于{0}进行维护，给您带来不便，敬请谅解。";
			this.dictionaryString[Language.sMaintain_Notice_Theme] = "尊敬的会员，为了提供更优良的游戏品质，网站将于{0}对部分厅馆进行维护，具体厅馆如下：{1} 部分厅馆维护期间，其他未维护大厅皆可正常游戏，请放心下注。";
			this.dictionaryString[Language.sMaintain_Notice_Table] = "尊敬的会员，为了提供更好的游戏体验，网站将于{0}对部分桌台进行维护，具体桌台如下：{1} 部分桌台维护期间，其他未维护桌台皆可正常游戏，请放心下注。";
			
			this.dictionaryString[Language.sMaintain_Notice_Whole_1] = "尊敬的会员，为了提供更优质的服务，网站正在维护中，具体如下:{0}，维护期间，全场游戏及交易将暂时关闭，给您带来不便，敬请谅解。";
			this.dictionaryString[Language.sMaintain_Notice_Agent_1] = "尊敬的会员，为了提供更高品质的游戏体验，全场游戏正在进行维护，具体如下:{0}，给您带来不便，敬请谅解。";
			this.dictionaryString[Language.sMaintain_Notice_Theme_1] = "尊敬的会员，为了提供更优良的游戏品质，部分厅馆正在维护中，具体如下：{0} 维护时间：{1}；部分厅馆维护期间，其他未维护大厅皆可正常游戏。";
			this.dictionaryString[Language.sMaintain_Notice_Table_1] = "尊敬的会员，为了提供更好的游戏体验，网站正对部分桌台进行维护，具体如下：{0} 维护时间：{1}；部分桌台维护期间，其他未维护桌台皆可正常游戏。";
			
			this.dictionaryString[Language.sLogout_Lock_Account] = "帐号被停用,请联络客服人员";
			
			this.dictionaryString[Language.sVersion_Error] = "版本错误，请您清除浏览器缓存以后再进入游戏";
			
			this.dictionaryString[Language.sTip_Regist] = "注册";
			
			this.dictionaryString[Language.sHit_Leave_To_Regist] = "即将前往注册页面，此动作将会登出试玩帐号，确定前往？";
			
			this.dictionaryString[Language.sIsChangeRenderToLow] = "检测到你的电脑比较卡，是否切换到简易版？";
			
			//手机客户端界面
			this.dictionaryString[Language.ios1] = "使用扫描二维码工具或微信的“扫一扫”功能";
			this.dictionaryString[Language.ios2] = "进入下载页面";
			this.dictionaryString[Language.ios3] = "出现询问安装视窗，点击“安装”按钮";
			this.dictionaryString[Language.ios4] = "安装成功后，首次开启时会弹出询问视窗";
			this.dictionaryString[Language.ios5] = "打开iOS设备上的语音助手时提示“未受信任的企业级开发者”";
			this.dictionaryString[Language.ios6] = "打开设置-通用";
			this.dictionaryString[Language.ios7] = "选择描述文件";
			this.dictionaryString[Language.ios8] = "选择和弹窗对应名称的项目";
			this.dictionaryString[Language.ios9] = "点击信任";
			this.dictionaryString[Language.ios10] = "再次点击信任";
			this.dictionaryString[Language.ios11] = "然后你的语音助手就可以使用了";
			this.dictionaryString[Language.and1] = "进入设置页面，点击“安全”";
			this.dictionaryString[Language.and2] = "点选“未知来源”项";
			this.dictionaryString[Language.and3] = "方法一：用UC浏览器自带或其他扫描二维码工具；亦可打开微信，点击扫一扫";
			this.dictionaryString[Language.and4] = "扫描二维码后进入下载界面";
			this.dictionaryString[Language.and5] = "方法二：直接打开手机浏览器，输入网址：http://chat.agin.cc";
			this.dictionaryString[Language.and6] = "点击屏幕下方“安装”按钮";
			this.dictionaryString[Language.and7] = "点击“本地下载”按钮进行下载";
			this.dictionaryString[Language.and8] = "任务栏显示正在下载应用程式";
			this.dictionaryString[Language.and9] = "下载完成后，会显示请求获取权限界面，再次点击“安装”按钮";
			this.dictionaryString[Language.and10] = "安装完成后即可尽情耍乐";
		}
	}
}