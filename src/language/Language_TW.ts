module language {
	export class Language_TW extends Language{
		public constructor() {
			super();

			/** 通用 **/
			this.dictionaryString[Language.sCoin]		=	"貨幣";
			this.dictionaryString[Language.sBCoin]	=	"B幣";
			this.dictionaryString[Language.sGCoin]	=	"G幣";
			this.dictionaryString[Language.sCancel]	=	"取 消";
			this.dictionaryString[Language.sReBet]	=	"重複下注";
			
			/** 通用对话框 **/
			this.dictionaryString[Language.sHint]	=	"提示";
			this.dictionaryString[Language.sGame_Relogin]	=	"此局遊戲仍保有您的座位。\n是否繼續遊戲？";
			this.dictionaryString[Language.sPlease_Wait]	=	"該功能暫未開放，敬請期待！";
			this.dictionaryString[Language.sBet_Wait]	=	"您已下注，請等待開局！";
			this.dictionaryString[Language.sAll_Table_Maintenance]	=	"所有桌子維護中...";
			
			/** tip **/
			this.dictionaryString[Language.sTip_Refresh]	=	"刷新視訊";
			this.dictionaryString[Language.sTip_Tool_SD]	=	"標清視訊";
			this.dictionaryString[Language.sTip_Tool_HD]	=	"高清視訊";
			this.dictionaryString[Language.sTip_Tool_Detail]	=	"桌子詳情";
			this.dictionaryString[Language.sTip_Tool_Full]	=	"全屏顯示";
			this.dictionaryString[Language.sTip_Tool_ExitFull]	=	"退出全屏";
			this.dictionaryString[Language.sTip_Tool_PersonalInfo]	=	"個人資訊";
			this.dictionaryString[Language.sTip_Tool_Record]	=	"下注記錄";
			this.dictionaryString[Language.sTip_Tool_Other]	=	"幫助";
			this.dictionaryString[Language.sTip_Tool_System]	=	"系統設置";
			this.dictionaryString[Language.sTip_Tool_Exit]	=	"退出遊戲";
			this.dictionaryString[Language.sTip_recharge]	=	"充值";
			this.dictionaryString[Language.sTip_GoodRood_Setting]	=	"好路設置";
			this.dictionaryString[Language.sTip_ChipPanel_Rebet]	=	"重複下注";
			this.dictionaryString[Language.sTip_ChipPanel_Custom]	=	"自訂籌碼";
			this.dictionaryString[Language.sTip_Video_Open]	=	"開啓視訊";
			this.dictionaryString[Language.sTip_Video_Close]	=	"關閉視訊";
			this.dictionaryString[Language.sTip_Video_ZoomIn]	=	"放大視訊";
			this.dictionaryString[Language.sTip_Video_ZoomOut]	=	"縮小視訊";
			
			/** 视讯 **/
			this.dictionaryString[Language.sLive]	=	"現場視頻";
			
			/** 按钮 **/
			this.dictionaryString[Language.sOk] =	"確認";
			this.dictionaryString[Language.sNo] =	"取消";
			this.dictionaryString[Language.sOn] = "開";
			this.dictionaryString[Language.sOff] = "關";
			
			this.dictionaryString[Language.sChipPanelCustom_Label] = "自訂籌碼";
			this.dictionaryString[Language.sPanelChannel_Label] = "視訊頻道";
			
			this.dictionaryString[Language.sChipPanelCustom] = "您還可以自訂籌碼數量";
			
			/** 功能列 **/
			this.dictionaryString[Language.sTool_ContactService] = "聯系客服";
			this.dictionaryString[Language.sTool_AccountRecord] = "賬號記錄";
			this.dictionaryString[Language.sTool_GameRule] = "遊戲規則";
			
			/** 百家乐 **/
			this.dictionaryString[Language.sRound] = "遊戲局號";
			this.dictionaryString[Language.sShoe] = "遊戲靴號";
			this.dictionaryString[Language.sRealPool] = "即時彩池";
			this.dictionaryString[Language.sDealer] = "荷官名稱";
			
			this.dictionaryString[Language.sSpeed] = "極速百家樂";
			this.dictionaryString[Language.sVip] = "包桌百家樂";
			this.dictionaryString[Language.sTable] = "桌";
			
			this.dictionaryString[Language.sBanker] = "莊";
			this.dictionaryString[Language.sPlayer] = "閒";
			this.dictionaryString[Language.sTie] = "和";
			this.dictionaryString[Language.sBankerPair] = "莊对";
			this.dictionaryString[Language.sPlayerPair] = "閒对";
			this.dictionaryString[Language.sBankerWin] = "莊赢";
			this.dictionaryString[Language.sPlayerWin] = "閒赢";
			this.dictionaryString[Language.sTieWin] 	 = "和赢";
			this.dictionaryString[Language.sBankerPairWin] 	 = "莊對赢";
			this.dictionaryString[Language.sPlayerPairWin] 	 = "閒對赢";
			
			this.dictionaryString[Language.sBankerRoute] = "莊問路";
			this.dictionaryString[Language.sPlayerRoute] = "閒問路";
			
			/** 桌子提示 **/
			this.dictionaryString[Language.sMaintenance] = "桌子維修中...";
			this.dictionaryString[Language.sNoTrial] = "不支持試玩";
			this.dictionaryString[Language.sChangeShoe] = "洗牌中";
			
			this.dictionaryString[Language.sBetLimit] = "下注限額";
			this.dictionaryString[Language.sUserName] = "玩家賬號";
			this.dictionaryString[Language.sAccountGold] = "賬戶金額";
			
			this.dictionaryString[Language.sTable_0] = "總籌碼數";
						
			this.dictionaryString[Language.sOnlinePlayers] = "在線玩家";
			
			this.dictionaryString[Language.sLimitSelect] = "限紅選擇";

			this.dictionaryString[Language.sBig] = "大";
			this.dictionaryString[Language.sSmall] = "小";
			this.dictionaryString[Language.sOdd] = "單";
			this.dictionaryString[Language.sEven] = "雙";
			this.dictionaryString[Language.sRed] = "紅";
			this.dictionaryString[Language.sBlack] = "黑";
			
			this.dictionaryString[Language.sBig_Win]	= "大贏";
			this.dictionaryString[Language.sSmall_Win] = "小贏";
			this.dictionaryString[Language.sOdd_Win] 	 = "單贏";
			this.dictionaryString[Language.sEven_Win]  = "雙贏";
			this.dictionaryString[Language.sRed_Win] 	 = "紅贏";
			this.dictionaryString[Language.sBlack_Win] = "黑贏";

			this.dictionaryString[Language.sExitGame] = "退出游戏";
			this.dictionaryString[Language.sCanNotExitGame] = "已投注，暂时不能离开游戏";
			this.dictionaryString[Language.sGameStaus_WaitNextNewgame] = "等待新局";
			this.dictionaryString[Language.sGameStaus_Ready] = "准备中";
			this.dictionaryString[Language.sGameStaus_Betting] = "請下注";
			this.dictionaryString[Language.sGameStaus_Dealing] = "發牌中";
			this.dictionaryString[Language.sGameStaus_Settling] = "結算中";
			this.dictionaryString[Language.sGameStaus_Settled] = "已結算";
			this.dictionaryString[Language.sGameStaus_Peeking] = "咪牌中";
			this.dictionaryString[Language.sGameStaus_Changing_Shoe] = "洗牌中";
			this.dictionaryString[Language.sGameStaus_Fail_Game] = "退押注";
			
			this.dictionaryString[Language.sChange_Dealer] = "更换荷官";
			this.dictionaryString[Language.sDealer_Exit] = "荷官已離線，請選擇其他桌台。";
			
			this.dictionaryString[Language.sPersonal_Label] = "個人資訊";
			this.dictionaryString[Language.sPersonal_0] = "用戶賬號";
			this.dictionaryString[Language.sPersonal_1] = "賬號余額";
			this.dictionaryString[Language.sPersonal_2] = "有效下注";
			this.dictionaryString[Language.sPersonal_3] = "用戶等級";
			this.dictionaryString[Language.sPersonal_4] = "用戶積分";
			this.dictionaryString[Language.sPersonal_5] = "在線時間";
			this.dictionaryString[Language.sPersonal_6] = "下注限紅";
			
			this.dictionaryString[Language.sMulti_Table_ID] = "台號";
			this.dictionaryString[Language.sMulti_Table_Bet] = "下注";
			this.dictionaryString[Language.sMulti_Table_Payout] = "派彩";
			
			/** 游戏名称 **/
			this.dictionaryString[Language.sGame_Name_Bac] = "百家樂";
			this.dictionaryString[Language.sGame_Name_Bac_Speed] = "極速百家樂";
			this.dictionaryString[Language.sGame_Name_Bac_Rebot] = "金臂百家樂";
			this.dictionaryString[Language.sGame_Name_Bac_Peek] = "競咪百家樂";
			this.dictionaryString[Language.sGame_Name_Bac_Charter] = "包桌百家樂";
			this.dictionaryString[Language.sGame_Name_DTF] = "龍虎";
			this.dictionaryString[Language.sGame_Name_Sic] = "骰寳";
			this.dictionaryString[Language.sGame_Name_Rou] = "輪盤";
			
			this.dictionaryString[Language.sSystem_Setting] = "系統設置";
			this.dictionaryString[Language.sLanguage_setting] = "語言設置";
			this.dictionaryString[Language.sLanguage_CN] = "简体中文";
			this.dictionaryString[Language.sLanguage_TW] = "繁體中文";
			this.dictionaryString[Language.sLanguage_EN] = "English";
			this.dictionaryString[Language.sMusic] = "音樂";
			this.dictionaryString[Language.sMusic_BG] = "遊戲音樂";
			this.dictionaryString[Language.sSound_Effect] = "遊戲音效";
			this.dictionaryString[Language.sSound_Live] = "現場聲音";
			this.dictionaryString[Language.sSound_Chinese] = "普通話";
			this.dictionaryString[Language.sSound_Cantonese] = "粵語";
			this.dictionaryString[Language.sSound_English] = "英語";
			
			this.dictionaryString[Language.sGoodRoadSetting] = "好路類型設置";
			this.dictionaryString[Language.sGoodRoadSetting_0] = "全選";
			this.dictionaryString[Language.sGoodRoad] = "好路通知";
			
			this.dictionaryString[Language.sSettingPwdPanel_0] = "獨享";
			this.dictionaryString[Language.sSettingPwdPanel_1] = "密碼可進";
			this.dictionaryString[Language.sSettingPwdPanel_2] = "公開";
			this.dictionaryString[Language.sSettingPwdPanel_3] = "密碼設定：";
			
			this.dictionaryString[Language.sTableEnter_0] = "請輸入密碼";
			
			this.dictionaryString[Language.sMAKE_SURE_CHANGE_DEALER] = "確定更換荷官";
			this.dictionaryString[Language.sMAKE_SURE_CHANGE_SHOE] = "確定換靴";
			
			this.dictionaryString[Language.sOPERATION_CHANGE_DEALER_OK] = "更換荷官";
			this.dictionaryString[Language.sOPERATION_CHANGE_SHOE_OK] = "更換牌靴";
			this.dictionaryString[Language.sOPERATION_FLY_POKER_OK] = "飛牌";
			this.dictionaryString[Language.sOPERATION_START_BET_OK] = "开始下注";
			this.dictionaryString[Language.sOPERATION_DEAL_POKER_OK] = "開牌中";
			
			this.dictionaryString[Language.sOPERATION_CHANGE_DEALER_FAIL] = "更換荷官失敗";
			this.dictionaryString[Language.sOPERATION_CHANGE_SHOE_FAIL] = "更換牌靴失敗";
			this.dictionaryString[Language.sOPERATION_FLY_POKER_FAIL] = "飛牌失敗";
			this.dictionaryString[Language.sOPERATION_START_BET_FAIL] = "开始下注失败";
			this.dictionaryString[Language.sOPERATION_DEAL_POKER_FAIL] = "開牌失敗";
			
			this.dictionaryString[Language.sOPERATION_CHANGE_DEALER_NO] = "不允許更換荷官";
			this.dictionaryString[Language.sOPERATION_CHANGE_SHOE_NO] = "未超過45局，無法更換牌靴";
			this.dictionaryString[Language.sOPERATION_FLY_POKER_NO] = "不允許飛牌";
			this.dictionaryString[Language.sOPERATION_START_BET_NO] = "不允許开始下注";
			this.dictionaryString[Language.sOPERATION_DEAL_POKER_NO] = "不允許開牌";
			
			this.dictionaryString[Language.sExitGame] 		= "你確定退出";
			
			this.dictionaryString[Language.sBetLimit_Under] 	= "下注額度低於最小額度";
			this.dictionaryString[Language.sBetLimit_Upper] 	= "此下注區已達押注上限";
			
			this.dictionaryString[Language.sWinGold] 			= "總贏金";	
			this.dictionaryString[Language.sNoWin] 			= "本局無輸贏";
			this.dictionaryString[Language.sLose] 			= "您輸了";
			
			this.dictionaryString[Language.sGold]				= "元";
			this.dictionaryString[Language.sTablePause] 		= "賭桌暫停,請返回大廳";
			
			this.dictionaryString[Language.sDealing]			= "下注結束, 開牌";
			this.dictionaryString[Language.sBetting]			= "已開局, 請下注";
			this.dictionaryString[Language.sSettled]			= "結算完成";
			this.dictionaryString[Language.sWaitNewGame]		= "等待新局";
			
			this.dictionaryString[Language.sBalanceNoEnough]	= "餘額不夠";
			
			this.dictionaryString[Language.sIdleRound] 			= "閒置局數";
			this.dictionaryString[Language.sIdleMaxRound] 		= "最大閒置局數";
			this.dictionaryString[Language.sSurroundDice] 		= "圍骰";
			
			this.dictionaryString[Language.sTotalBetGold]			= "總下注金額";
			
			this.dictionaryString[Language.sDragon]				= "龍";
			this.dictionaryString[Language.sTiger]				= "虎";
			this.dictionaryString[Language.sDragonRoute] 			= "龍問路";
			this.dictionaryString[Language.sTigerRoute] 			= "虎問路";
			this.dictionaryString[Language.sDragon_Win]			= "龍贏";
			this.dictionaryString[Language.sTiger_Win]			= "虎贏";

			this.dictionaryString[Language.sPlayType]				= "玩法";		
			this.dictionaryString[Language.sPayout]				= "賠率";		
			this.dictionaryString[Language.sLimitBet]				= "限額";		
			
			this.dictionaryString[Language.sZero]						= "零";		
			this.dictionaryString[Language.sBetType_1]				= "直接注";		
			this.dictionaryString[Language.sBetType_2]				= "分注";		
			this.dictionaryString[Language.sBetType_3]				= "街注";		
			this.dictionaryString[Language.sBetType_3N]				= "三数";		
			this.dictionaryString[Language.sBetType_4]				= "角注";		
			this.dictionaryString[Language.sBetType_4N]				= "四数";		
			this.dictionaryString[Language.sBetType_5]				= "線注";		
			this.dictionaryString[Language.sDozen]					= "打";		
			this.dictionaryString[Language.sCol]						= "列";	
			this.dictionaryString[Language.sBetType_Dozen_1]				= "第一打";		
			this.dictionaryString[Language.sBetType_Dozen_2]				= "第二打";		
			this.dictionaryString[Language.sBetType_Dozen_3]				= "第三打";		
			this.dictionaryString[Language.sBetType_Col_1]				= "第一列";		
			this.dictionaryString[Language.sBetType_Col_2]				= "第二列";		
			this.dictionaryString[Language.sBetType_Col_3]				= "第三列";	
			
			this.dictionaryString[Language.sRedBlack]	=	"紅黑";
			this.dictionaryString[Language.sDaLie]	=	"打列";
			this.dictionaryString[Language.sBigSmall]	=	"大小";
			this.dictionaryString[Language.sSingleDouble]	=	"單雙";
			
			this.dictionaryString[Language.sAllSurround]					= "全圍";
			
			/**連線狀態*/
			this.dictionaryString[Language.sConnectFailed]				= "遊戲連線失敗,請返回大廳";
			this.dictionaryString[Language.sDisConnect]					= "遊戲斷線";
			this.dictionaryString[Language.sConnecting]					= "連線中";
			

			/**進桌結果*/
			this.dictionaryString[Language.sEnterOk]						= "進桌成功";
			this.dictionaryString[Language.sEnterFail]					= "進桌失敗";
			this.dictionaryString[Language.sEnterInvalid]					= "身分驗證不通過";
			this.dictionaryString[Language.sNoSeat]						= "沒有座位";			
			this.dictionaryString[Language.sTableOwnerExist]				= "桌主已存在";
			this.dictionaryString[Language.sJoinTbTypeFault]				= "進桌類型不對";
			this.dictionaryString[Language.sJoinDataError]				= "進桌資料不對";
			this.dictionaryString[Language.sBalanceNoEnough]				= "余额不够";
			this.dictionaryString[Language.sEnterPwError]					= "密碼不正確";
			this.dictionaryString[Language.sTableLimit]					= "超過賭桌上限";
			this.dictionaryString[Language.sTablePrivate]					= "該桌已獨享";
			this.dictionaryString[Language.sCharterTypeError]				= "包桌狀態不對";			
			this.dictionaryString[Language.sTimeOut]						= "連線逾時";
			this.dictionaryString[Language.sProtocolError]				= "通訊板本不對";
			this.dictionaryString[Language.sTryAccountDeny]				= "試玩帳號權限拒絕";
			this.dictionaryString[Language.sPermissionDeny]				= "權限不允许";
			this.dictionaryString[Language.sMasterExit]					= "桌主已離開";
			this.dictionaryString[Language.sNotFinish]					= "此局尚未結束";
			this.dictionaryString[Language.sMaintain]						= "維護中";
			this.dictionaryString[Language.sTableClosed]					= "賭桌關閉";
			this.dictionaryString[Language.sNoSettled]					= "請先至電投遊戲結清籌碼";
			this.dictionaryString[Language.sEnterSeatFail]				= "本局已結束，請重新進桌";
			this.dictionaryString[Language.sEnterGoodFail]				= "進入好路多桌失敗";
			
			/**下注返回訊息*/
			this.dictionaryString[Language.sBetOk]						=	"下注成功";		
			this.dictionaryString[Language.sBetGoldNoEnough]				=	"下注金額不足";		
			this.dictionaryString[Language.sOverSelfLimit]				=	"下注金額超過自選限紅";			
			this.dictionaryString[Language.sUnderSelfLimit]				=	"下注金額低於自選限紅";			
			this.dictionaryString[Language.sOverTableLimit]				=	"下注金額超過賭桌限紅";			
			this.dictionaryString[Language.sOverTotalLimit]				=	"此桌總押注金額已達上限\n下注失敗";			
			this.dictionaryString[Language.sUnderTableLimit]				=	"下注金額低於賭桌限紅";			
			this.dictionaryString[Language.sBetLimitNoFound]				=	"下注找不到押注上下限模式";			
			this.dictionaryString[Language.sBetPosNoFound]				=	"下注找不到押注位置";	
			this.dictionaryString[Language.sBetPosDisable]				=	"該位置不允許下注";		
			this.dictionaryString[Language.sBetFailed]				=	"下注失敗";
			
			this.dictionaryString[Language.sOverLimit]					=	"此下注區已達押注上限";		
			this.dictionaryString[Language.sUnderLimit]					=	"下注額度低於最小額度";		
			this.dictionaryString[Language.sBetAll]						=	"下注所有餘額";
			
			
			this.dictionaryString[Language.sVideoConnectFailed]			=	"視訊異常，請刷新或切換頻道";
			
			/**閒置訊息*/
			this.dictionaryString[Language.sIdle_OverThreeNoBet]			=	"您有3局沒有下注，將於2局返回大廳";		
			this.dictionaryString[Language.sIdle_OverFiveNoBet]			=	"您已經超過5局沒有下注,即將返回大廳";		
			
			/**電投大廳*/
			this.dictionaryString[Language.sTel_Can_Change_Amount]		=	"可出碼額";
			this.dictionaryString[Language.sTel_Chips]					=	"遊戲餘額";
			this.dictionaryString[Language.sTelSelectTableFailed]			=	"選桌失敗,請嘗試選其他桌";
			this.dictionaryString[Language.sTelSelectTableSuccess]		=	"轉桌成功";
			this.dictionaryString[Language.sTelGunnerSuccess]				=	"配槍手成功";
			this.dictionaryString[Language.sTelGunnerNotEnough]			=	"槍手不夠";
			this.dictionaryString[Language.sTel_Telephone_Failed]			=	"槍手電話打不通";
			this.dictionaryString[Language.sTel_Gunner_Log_Out]			=	"槍手登出";
			this.dictionaryString[Language.sTel_Number]					=	"客服電話";
			this.dictionaryString[Language.sTel_ID_Code]					=	"配對碼";
			this.dictionaryString[Language.sTel_Gunner_Login_Success]		=	"槍手登入成功";
			this.dictionaryString[Language.sTel_Gunner_LogOut_KNOCK_OFF]	=	"槍手收工登出";
			this.dictionaryString[Language.sTel_Gunner_LogOut_Relief]		=	"槍手換班登出";
			this.dictionaryString[Language.sTel_RequestGunnersException]	=	"配槍手異常";
			this.dictionaryString[Language.sTel_Gunner_LogOut]			=	"槍手登出,如果要繼續遊戲,請重新在電話中配槍手";
			this.dictionaryString[Language.sTel_Table_Full_Strength]			=	"此桌座位已滿，請轉往其他桌進行遊戲";

			/**電投百家*/
			this.dictionaryString[Language.sTel_TableID]					=	"桌號";
			this.dictionaryString[Language.sTel_RoundID]					=	"局號";
			this.dictionaryString[Language.sTel_MaxBet]					=	"最高投注";				
			this.dictionaryString[Language.sTel_MinBet]					=	"最低投注";				
			this.dictionaryString[Language.sTel_TieMaxBet]				=	"和注最高";			
			this.dictionaryString[Language.sTel_TieMinBet]				=	"和注最低";			
			this.dictionaryString[Language.sTel_PairMaxBet]				=	"對子最高";			
			this.dictionaryString[Language.sTel_PairMinBet]				=	"對子最低";						
			this.dictionaryString[Language.sTel_GiveChips]				=	"小費";
			this.dictionaryString[Language.sTel_GiveChipsFailed]			=	"給小費失敗";
			this.dictionaryString[Language.sTel_EnterTable]				=	"進入本桌";
			this.dictionaryString[Language.sTel_ConnectPrinterSuccess]	=	"連接印表機成功";
			this.dictionaryString[Language.sTel_ConnectPrinterFailed]		=	"連接印表機失敗";
			this.dictionaryString[Language.sTel_ConnectPrinterClosed]		=	"印表機連接關閉";
			this.dictionaryString[Language.sTel_PrintPeek]				=	"列印咪牌";
			this.dictionaryString[Language.sTel_VideoPeek]				=	"視訊咪牌";
			this.dictionaryString[Language.sTel_ElectronicPeek]			=	"電子咪牌";
			this.dictionaryString[Language.sTel_NoPeek]					=	"不咪牌";	
			
			
			this.dictionaryString[Language.sGoodRoadWait]					=	"好路等待中";	
			this.dictionaryString[Language.sGoodRoadType_1]				=	"長莊";	
			this.dictionaryString[Language.sGoodRoadType_2]				=	"長閒";	
			this.dictionaryString[Language.sGoodRoadType_3]				=	"拍拍黐";	
			this.dictionaryString[Language.sGoodRoadType_4]				=	"大路單跳";	
			this.dictionaryString[Language.sGoodRoadType_5]				=	"一廳兩房(莊)";	
			this.dictionaryString[Language.sGoodRoadType_6]				=	"一廳兩房(閒)";	
			this.dictionaryString[Language.sGoodRoadType_7]				=	"逢莊黐";	
			this.dictionaryString[Language.sGoodRoadType_8]				=	"逢闲黐";	
			this.dictionaryString[Language.sGoodRoadType_9]				=	"隔黐莊";	
			this.dictionaryString[Language.sGoodRoadType_10]				=	"隔黐莊";	
			/**骰寶*/
			this.dictionaryString[Language.sAnyTriple]					=	"全圍";
			this.dictionaryString[Language.sSpecificTriple]				=	"圍1~圍6";
			this.dictionaryString[Language.sSpecificDouble]				=	"對子1~對子6";
			this.dictionaryString[Language.sSpecificSingle]				=	"單點1~單點6";
			this.dictionaryString[Language.sDiceCombination]				=	"組合";
			this.dictionaryString[Language.sSum_9_10_11_12]				=	"和值 9/10/11/12";
			this.dictionaryString[Language.sSum_8_13]						=	"和值 8/13";
			this.dictionaryString[Language.sSum_7_14]						=	"和值 7/14";
			this.dictionaryString[Language.sSum_6_15]						=	"和值 6/15";
			this.dictionaryString[Language.sSum_5_16]						=	"和值 5/16";
			this.dictionaryString[Language.sSum_4_17]						=	"和值4/17";
			this.dictionaryString[Language.sBig_Small]					=	"大/小";
			this.dictionaryString[Language.sOdd_Even]						=	"單/雙";
			
			this.dictionaryString[Language.sTableMaintain]				=	"賭桌維護中, 請返回大廳";
			
			/**大廳登入錯誤回復*/
			this.dictionaryString[Language.sWarn_ServerConnect_Fail]			=	"伺服器異常,請詢問相關人員";
			this.dictionaryString[Language.sWarn_Login_Lobby_Fail]			=	"登入大廳失敗";
			this.dictionaryString[Language.sWarn_Boss_Never_Login]			=	"老闆尚未登入";
			this.dictionaryString[Language.sWarn_Deputy_Never_Reviewed]		=	"槍手尚未審核";
			this.dictionaryString[Language.sWarn_System_Maintain]				=	"系統維護中";
			this.dictionaryString[Language.sWarn_Login_Lobby_Other_Error]		=	"登入大廳,其他錯誤";
			this.dictionaryString[Language.sWarn_Lobby_Disconnect]			=	"大廳斷線";
			this.dictionaryString[Language.sWarn_LobbyConnecting]				=	"大廳連線中";
			this.dictionaryString[Language.sWarn_Web_Data_Error]				=	"網頁資料錯誤";
			this.dictionaryString[Language.sWarn_Web_Maintain]				=	"全站維護中不允許登入";
			this.dictionaryString[Language.sWarn_Proxy_Maintain]				=	"代理維護中不允許登入";
					
			
			/**背景音樂*/
			this.dictionaryString[Language.sBackground_Music_1]			=	"背景音樂1";
			this.dictionaryString[Language.sBackground_Music_2]			=	"背景音樂2";
			this.dictionaryString[Language.sBackground_Music_3]			=	"背景音樂3";

			/**登出原因*/
			this.dictionaryString[Language.sLogout_Lobby_Repeat_Login]				=	"大廳重複登入";
			this.dictionaryString[Language.sLogout_Player_Active_Logout]				=	"玩家主動註銷";
			this.dictionaryString[Language.sLogout_TRY_ACCOUNT_TIME_OUT]				=	"試玩帳號超過試玩時間";
			this.dictionaryString[Language.sLogout_CANCEL_SUBSCRIPTION_MULTI]			=	"取消訂閱多桌註銷";
			this.dictionaryString[Language.sLogout_DISCONNECT]						=	"玩家斷線";
			this.dictionaryString[Language.sLogout_TABLER_DISCONNECT]					=	"包桌桌主已離開";
			this.dictionaryString[Language.sLogout_Lobby_Connect_Time_Out]			=	"大廳連線逾時";
			this.dictionaryString[Language.sLogout_Server_Maintain]					=	"伺服器維護中";
			this.dictionaryString[Language.sLogout_exception]							=	"登出例外錯誤 ,無法辨識 服務端傳來的登出原因";
			this.dictionaryString[Language.sLogout_Proxy_Player_Suspended]			=	"後台或代理後台已停用此帳號";
			this.dictionaryString[Language.sLogout_Game_Repeat_Login]					=	"該桌玩家重複登入";
			this.dictionaryString[Language.sLogout_Game_Connect_Time_Out]				=	"遊戲連線逾時";
			
			
			/**Socket斷線*/
			this.dictionaryString[Language.sNetWork_Abnormal_Lobby]					=	"網路異常,請重新載入";
			this.dictionaryString[Language.sNetWork_Abnormal_Game]					=	"網路異常,請返回大廳";
			
			/**例外處理*/
			this.dictionaryString[Language.sException_Login_Lobby_Pkt_Not_Return]		=	"大廳伺服器異常,請嘗試返回網站";
			this.dictionaryString[Language.sException_Bet_Not_Return]					=	"押注錯誤,請重新押注";
			this.dictionaryString[Language.sException_Connect_GameServer_Failed]		=	"連接遊戲伺服器失敗";
			this.dictionaryString[Language.sException_BetLimit_Is_NULL]				=	"伺服器下注限額錯誤";
			
			/**下注紀錄*/
			this.dictionaryString[Language.sSearch]		=	"查詢";
			this.dictionaryString[Language.sListNumber]	=	"訂單號";
			this.dictionaryString[Language.sBetTime]		=	"下注時間";
			this.dictionaryString[Language.sGameType]		=	"遊戲類型";
			this.dictionaryString[Language.sTableID]		=	"桌號";
			this.dictionaryString[Language.sResult]		=	"結果";
			this.dictionaryString[Language.sTotalBet]		=	"總投注";
			this.dictionaryString[Language.sPayOut]		=	"派彩";
			this.dictionaryString[Language.sAvailableBet]	=	"有效投注";
			this.dictionaryString[Language.sListState]	=	"狀態";
			this.dictionaryString[Language.sSmallSum]		=	"小計";
			this.dictionaryString[Language.sTotalSum]		=	"總計";
			this.dictionaryString[Language.sSingleShow]	=	"單頁顯示";
			this.dictionaryString[Language.sTotalShow]	=	"共計";
			this.dictionaryString[Language.sGo]			=	"跳轉到";
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
			this.dictionaryString[Language.sSinglePageShow] = "每頁顯示";
			this.dictionaryString[Language.sBetGold]		=	"投注金額";
			this.dictionaryString[Language.sReplay]		=	"重播";
			this.dictionaryString[Language.sGameNo]		=	"局號";
			this.dictionaryString[Language.sVideoRePlay]	=	"視訊回放";
			this.dictionaryString[Language.sScaleBig]		=	"放大";
			this.dictionaryString[Language.sScaleSmall]	=	"縮小";
			this.dictionaryString[Language.sPageLimit]	=	"輸入頁碼超過合法範圍";
			this.dictionaryString[Language.sPleaseEnter]	=	"請輸入";
			this.dictionaryString[Language.sValue]		=	"的值";
			this.dictionaryString[Language.sFourNumber]	=	"四數";
			
			this.dictionaryString[Language.sSicbo_X8_7]	=	"13點";
			this.dictionaryString[Language.sSicbo_X8_6]	=	"8點";
			this.dictionaryString[Language.sSicbo_X8_5]	=	"6對";
			
			this.dictionaryString[Language.sSicbo_X8_4]	=	"5對";
			this.dictionaryString[Language.sSicbo_X8_3]	=	"4對";
			this.dictionaryString[Language.sSicbo_X8_2]	=	"3對";
			this.dictionaryString[Language.sSicbo_X8_1]	=	"2對";
			
			this.dictionaryString[Language.sSicbo_X8_0]	=	"1對";
			this.dictionaryString[Language.sSicbo_X6_3]	=	"12點";
			this.dictionaryString[Language.sSicbo_X6_2]	=	"11點";
			this.dictionaryString[Language.sSicbo_X6_1]	=	"10點";
			this.dictionaryString[Language.sSicbo_X6_0]	=	"9點";
			
			this.dictionaryString[Language.sSicbo_X50_1]	=	"17點";
			this.dictionaryString[Language.sSicbo_X50_0]	=	"4點";
			
			this.dictionaryString[Language.sSicbo_X5_9]	=	"3, 4";
			this.dictionaryString[Language.sSicbo_X5_8]	=	"2, 6";
			this.dictionaryString[Language.sSicbo_X5_7]	=	"2, 5";
			this.dictionaryString[Language.sSicbo_X5_6]	=	"2, 4";
			this.dictionaryString[Language.sSicbo_X5_5]	=	"2, 3";
			
			this.dictionaryString[Language.sSicbo_X5_4]	=	"1, 6";
			this.dictionaryString[Language.sSicbo_X5_3]	=	"1, 5";
			this.dictionaryString[Language.sSicbo_X5_2]	=	"1, 4";
			this.dictionaryString[Language.sSicbo_X5_6]	=	"2, 4";
			this.dictionaryString[Language.sSicbo_X5_14]	=	"5, 6";			
			this.dictionaryString[Language.sSicbo_X5_13]	=	"4, 6";	
			this.dictionaryString[Language.sSicbo_X5_12]	=	"4, 5";	
			this.dictionaryString[Language.sSicbo_X5_11]	=	"3, 6";	
		
			
			this.dictionaryString[Language.sSicbo_X5_10]	=	"3, 5";
			this.dictionaryString[Language.sSicbo_X5_1]	=	"1, 3";
			this.dictionaryString[Language.sSicbo_X5_0]	=	"1, 2";
			this.dictionaryString[Language.sSicbo_X24_0]	=	"全圍";
			this.dictionaryString[Language.sSicbo_X18_1]	=	"16點";			
			this.dictionaryString[Language.sSicbo_X18_0]	=	"5點";	
			this.dictionaryString[Language.sSicbo_X150_5]	=	"6, 6, 6";	
			this.dictionaryString[Language.sSicbo_X150_4]	=	"5, 5, 5";				
		
			this.dictionaryString[Language.sSicbo_X150_3]	=	"4, 4, 4";	
			this.dictionaryString[Language.sSicbo_X150_2]	=	"3, 3, 3";	
			
			this.dictionaryString[Language.sSicbo_X150_1]	=	"2, 2, 2";	
			this.dictionaryString[Language.sSicbo_X150_0]	=	"1, 1, 1";	
			
			this.dictionaryString[Language.sSicbo_X14_1]	=	"15點";	
			this.dictionaryString[Language.sSicbo_X14_0]	=	"6點";	
			this.dictionaryString[Language.sSicbo_X12_1]	=	"14點";	
			this.dictionaryString[Language.sSicbo_X12_0]	=	"7點";	
			
			this.dictionaryString[Language.sSicbo_X1_9]	=	"大";	
			this.dictionaryString[Language.sSicbo_X1_8]	=	"小";	
			this.dictionaryString[Language.sSicbo_X1_7]	=	"單";	
			this.dictionaryString[Language.sSicbo_X1_6]	=	"雙";	
			this.dictionaryString[Language.sSicbo_X1_5]	=	"6";	
			this.dictionaryString[Language.sSicbo_X1_4]	=	"5";
			this.dictionaryString[Language.sSicbo_X1_3]	=	"4";	
			this.dictionaryString[Language.sSicbo_X1_2]	=	"3";	
			this.dictionaryString[Language.sSicbo_X1_1]	=	"2";	
			this.dictionaryString[Language.sSicbo_X1_0]	=	"1";	
			this.dictionaryString[Language.sBetRecord]	=	"下注紀錄";
			this.dictionaryString[Language.sGO]			=	"至";
			this.dictionaryString[Language.sB]			=	"莊";
			this.dictionaryString[Language.sP]			=	"閒";
			this.dictionaryString[Language.sD]			=	"龍";
			this.dictionaryString[Language.sT]			=	"虎";
			this.dictionaryString[Language.sNoBetRecord]	=	"查無紀錄";

			
//			dictionaryBmpd[sBitmapdataTest]	=	BitmapManager.getInstance().getBmpdLanguage(Define.LANGUAGE_TW, sBitmapdataTest);
			
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			// 2016-3-24 以后新增的内容要在分割线下面
			
			this.dictionaryString[Language.sTip_Channel]	=	"頻道選擇";
			this.dictionaryString[Language.sTableLogin_NoMoney] = "您的余額不足";
			this.dictionaryString[Language.sTableLogin_CAN_NOT_ENTER] = "不能進入遊戲";

			this.dictionaryString[Language.sMinLimit]					= "進入該桌最低額度";
			this.dictionaryString[Language.sLiveVideo]				 = "視訊加載中...";

			
			this.dictionaryString[Language.sOPERATION_FLY_OVER_TIME] = "超過飛牌次數";
			this.dictionaryString[Language.sPlayer_Repeat_Login]		= "玩家重複登入";
			this.dictionaryString[Language.sNotOpenGame]				= "未開局";
			
			
			this.dictionaryString[Language.sBetCount]				= "下注金額";
			this.dictionaryString[Language.sBetedCount]				= "已下注金額";
			
			this.dictionaryString[Language.sExitLobby]	=	"您確定要退出遊戲大廳嗎？";
			this.dictionaryString[Language.sLeaveToTel]	=	"您確認要離開當前遊戲桌，前往'電投大廳'嗎？";
			this.dictionaryString[Language.sLeaveToMultitable]	=	"您確認要離開當前遊戲桌，前往'好路多桌'嗎？";
			
			this.dictionaryString[Language.sTip_Disable30]	=	"已過30局,該區停止下注";
			
			this.dictionaryString[Language.sWarn_Server_Busy]	=	"伺服器忙碌中,請稍後再試";
			
			this.dictionaryString[Language.sSelectOne] = "請至少選擇一個好路類型";
			
			this.dictionaryString[Language.sHaveIn] = "您已在";
			
			this.dictionaryString[Language.sLiveError] = "視訊異常，請刷新或切換頻道";
			this.dictionaryString[Language.sLiveError_1] = "視訊讀取異常，請重連或聯繫客服";
			
			this.dictionaryString[Language.sResetPassword] = "您已重設密碼，請重新登陸";
			
			this.dictionaryString[Language.sBackBet] = "此局作廢,退回所有押注";
			
			

			/**電投大廳*/
			this.dictionaryString[Language.sTelConnected]	= "  連線成功";
			this.dictionaryString[Language.sTelNoConnect]	= "  未連線";
			
			/**例外處裡*/
			this.dictionaryString[Language.sException_Lobby_Connect_Failed]="大廳伺服器連接失敗";

			this.dictionaryString[Language.sCannotCharter] = "不可包桌";
			
			this.dictionaryString[Language.sIllegalOperation] = "違法操作";
			this.dictionaryString[Language.sLiveVideoPanoramaDataError]="全景視訊尚未開放";
			
			this.dictionaryString[Language.sLogout_Lobby_All_Maintain]				=	"全站維護中";
			this.dictionaryString[Language.sLogout_Lobby_Agent_Maintain]				=	"代理維護中";
			this.dictionaryString[Language.sLogout_Lobby_Hall_Maintain]				=	"廳館維護中";
			this.dictionaryString[Language.sLogout_Lobby_Table_Maintain]				=	"賭桌維護中";
			this.dictionaryString[Language.sLogout_Multi_Bet_Time_Out]				=	"您已超時未投注，將被移出遊戲";
			
			
			this.dictionaryString[Language.sWarn_Account_Limit]	=	"一個IP地址，只允許登陸一個帳號";
			this.dictionaryString[Language.sWarn_Ret_14]	=	"不允許登入真人視訊網投大廳(信用帳戶限制)";
			
			this.dictionaryString[Language.sTip_Back_To_Lobby]	=	"返回大廳";
			
			this.dictionaryString[Language.sMaintain_Notice_Whole] = "尊敬的會員，爲了提供更優質的服務，網站將於{0}進行維護，維護期間，全場遊戲及交易將暫時關閉，給您帶來不便，敬請諒解。";
			this.dictionaryString[Language.sMaintain_Notice_Agent] = "尊敬的會員，爲了提供更高品質的遊戲體驗，全場遊戲將於{0}進行維護，給您帶來不便，敬請諒解。";
			this.dictionaryString[Language.sMaintain_Notice_Theme] = "尊敬的會員，爲了提供更優良的遊戲品質，網站將於{0}對部分廳館進行維護，具體廳館如下：{1} 部分廳館維護期間，其他未維護大廳皆可正常遊戲，請放心下注。";
			this.dictionaryString[Language.sMaintain_Notice_Table] = "尊敬的會員，爲了提供更好的遊戲體驗，網站將於{0}對部分桌台進行維護，具體桌台如下：{1} 部分桌台維護期間，其他未維護桌台皆可正常遊戲，請放心下注。";
			
			this.dictionaryString[Language.sMaintain_Notice_Whole_1] = "尊敬的會員，爲了提供更優質的服務，網站正在維護中，具體如下:{0}，維護期間，全場遊戲及交易將暫時關閉，給您帶來不便，敬請諒解。";
			this.dictionaryString[Language.sMaintain_Notice_Agent_1] = "尊敬的會員，爲了提供更高品質的遊戲體驗，全場遊戲正在進行維護，具體如下:{0}，給您帶來不便，敬請諒解。";
			this.dictionaryString[Language.sMaintain_Notice_Theme_1] = "尊敬的會員，爲了提供更優良的遊戲品質，部分廳館正在維護中，具體如下：{0} 維護時間：{1}；部分廳館維護期間，其他未維護大廳皆可正常遊戲。";
			this.dictionaryString[Language.sMaintain_Notice_Table_1] = "尊敬的會員，爲了提供更好的遊戲體驗，網站正對部分桌台進行維護，具體如下：{0} 維護時間：{1}；部分桌台維護期間，其他未維護桌台皆可正常遊戲。";
			
			this.dictionaryString[Language.sLogout_Lock_Account] = "帳號被停用，請聯絡客服人員";
			
			this.dictionaryString[Language.sVersion_Error] = "版本錯誤，請您清除瀏覽器緩存以後再進入遊戲";
			
			this.dictionaryString[Language.sTip_Regist] = "註冊";
			
			this.dictionaryString[Language.sHit_Leave_To_Regist] = "即將前往註冊頁面，此動作將會登出試玩帳號，確定前往？";
			
			this.dictionaryString[Language.sIsChangeRenderToLow] = "檢測到妳的電腦比較卡，是否切換到簡易版？";
			
			
			//手机客户端界面
			this.dictionaryString[Language.ios1] = "使用掃描二維碼工具或微信的“掃一掃”功能";
			this.dictionaryString[Language.ios2] = "進入下載頁面";
			this.dictionaryString[Language.ios3] = "出現詢問安裝視窗，點擊“安裝”按鈕";
			this.dictionaryString[Language.ios4] = "安裝成功後，首次開啟時會彈出詢問視窗";
			this.dictionaryString[Language.ios5] = "打開iOS設備上的語音助手時提示“未受信任的企業級開發者”";
			this.dictionaryString[Language.ios6] = "打開設定-通用";
			this.dictionaryString[Language.ios7] = "選擇描述檔案";
			this.dictionaryString[Language.ios8] = "選擇和彈窗對應名稱的項目";
			this.dictionaryString[Language.ios9] = "點擊信任";
			this.dictionaryString[Language.ios10] = "再次點擊信任";
			this.dictionaryString[Language.ios11] = "然後你的語音助手就可以使用了";
			this.dictionaryString[Language.and1] = "進入設置頁面，點擊“安全”";
			this.dictionaryString[Language.and2] = "點選“未知來源”項";
			this.dictionaryString[Language.and3] = "方法一：用UC瀏覽器自帶或其他掃描二維碼工具；亦可打開微信，點擊掃一掃";
			this.dictionaryString[Language.and4] = "掃描二維碼後進入下載介面";
			this.dictionaryString[Language.and5] = "方法二：直接打開手機瀏覽器，輸入網址：http://chat.agin.cc";
			this.dictionaryString[Language.and6] = "點擊荧幕下方“安裝”按鈕";
			this.dictionaryString[Language.and7] = "點擊“本地下載”按鈕進行下載";
			this.dictionaryString[Language.and8] = "工作列顯示正在下載應用程式";
			this.dictionaryString[Language.and9] = "下載完成後，會顯示請求獲取許可權介面，再次點擊“安裝”按鈕";
			this.dictionaryString[Language.and10] = "安裝完成後即可盡情耍樂 ";
		}
	}
}