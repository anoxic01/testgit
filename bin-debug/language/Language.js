var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var language;
(function (language) {
    var Language = (function () {
        /**
         *	添加新内容的时候注意检查是否已存在
         * 	修改内容时，注意全局搜索，看一下是否存在多处引用
         *
         */
        function Language() {
        }
        return Language;
    }());
    /** 通用 **/
    Language.sCoin = "coin";
    Language.sBCoin = "Bcoin";
    Language.sGCoin = "Gcoin";
    Language.sCancel = "Cancel";
    Language.sReBet = "ReBet";
    /** 通用对话框 **/
    Language.sHint = "sHint";
    Language.sGame_Relogin = "sGame_Relogin";
    Language.sPlease_Wait = "sPlease_Wait";
    Language.sBet_Wait = "sBet_Wait";
    Language.sAll_Table_Maintenance = "sAll_Table_Maintenance";
    /** tip **/
    Language.sTip_Refresh = "sTip_Tool_Refresh";
    Language.sTip_Tool_SD = "sTip_Tool_SD";
    Language.sTip_Tool_HD = "sTip_Tool_HD";
    Language.sTip_Tool_Detail = "sTip_Tool_Detail";
    Language.sTip_Tool_Full = "sTip_Tool_Full";
    Language.sTip_Tool_ExitFull = "sTip_Tool_ExitFull";
    Language.sTip_Tool_PersonalInfo = "sTip_Tool_PersonalInfo";
    Language.sTip_Tool_Record = "sTip_Tool_Record";
    Language.sTip_Tool_Other = "sTip_Tool_Other";
    Language.sTip_Tool_System = "sTip_Tool_System";
    Language.sTip_Tool_Exit = "sTip_Tool_Exit";
    Language.sTip_recharge = "sTip_recharge";
    Language.sTip_GoodRood_Setting = "sTip_GoodRood_Setting";
    Language.sTip_ChipPanel_Rebet = "sTip_ChipPanel_Rebet";
    Language.sTip_ChipPanel_Custom = "sTip_ChipPanel_Custom";
    Language.sTip_Video_Open = "sTip_Video_Open";
    Language.sTip_Video_Close = "sTip_Video_Close";
    Language.sTip_Video_ZoomIn = "sTip_Live_ZoomIn";
    Language.sTip_Video_ZoomOut = "sTip_Live_ZoomOut";
    /** 视讯 **/
    Language.sLive = "sLive";
    /** 按钮 **/
    Language.sOk = "ok";
    Language.sNo = "no";
    Language.sOn = "On";
    Language.sOff = "Off";
    Language.sChipPanelCustom_Label = "Custom Label";
    Language.sPanelChannel_Label = "Video Channel";
    Language.sChipPanelCustom = "sChipPanelCustom";
    /** 功能列 **/
    Language.sTool_ContactService = "sTool_ContactService";
    Language.sTool_AccountRecord = "sTool_AccountRecord";
    Language.sTool_GameRule = "sTool_GameRule";
    /** 百家乐 **/
    Language.sRound = "Round";
    Language.sShoe = "Shoe";
    Language.sRealPool = "RealPool";
    Language.sDealer = "Dealer";
    Language.sSpeed = "Speed"; //极速
    Language.sVip = "Vip"; //包桌
    Language.sTable = "Table"; //桌
    Language.sBanker = "Banker";
    Language.sPlayer = "Player";
    Language.sTie = "Tie";
    Language.sBankerPair = "BankerPair";
    Language.sPlayerPair = "PlayerPair";
    Language.sBankerWin = "BankerWin";
    Language.sPlayerWin = "PlayerWin";
    Language.sTieWin = "sTieWin";
    Language.sBankerPairWin = "sBankerPairWin";
    Language.sPlayerPairWin = "sPlayerPairWin";
    Language.sBankerRoute = "BankerRoute";
    Language.sPlayerRoute = "PlayerRoute";
    /** 桌子提示 **/
    Language.sMaintenance = "Maintenance";
    Language.sNoTrial = "sNoTrial";
    Language.sChangeShoe = "sChangeShoe";
    Language.sBetLimit = "BetLimit";
    Language.sUserName = "UserName";
    Language.sAccountGold = "AccountGold";
    Language.sTable_0 = "Table_0";
    Language.sOnlinePlayers = "OnlinePlayer";
    Language.sLimitSelect = "LimitSelect";
    Language.sBig = "Big";
    Language.sSmall = "Small";
    Language.sOdd = "Odd";
    Language.sEven = "Even";
    Language.sRed = "Red";
    Language.sBlack = "Black";
    Language.sBig_Win = "sBig_Win";
    Language.sSmall_Win = "sSmall_Win";
    Language.sOdd_Win = "sOdd_Win";
    Language.sEven_Win = "sEven_Win";
    Language.sRed_Win = "sRed_Win";
    Language.sBlack_Win = "sBlack_Win";
    Language.sExitGame = "ExitGame";
    Language.sCanNotExitGame = "CanNotExitGame";
    Language.sGameStaus_WaitNextNewgame = "wait_next";
    Language.sGameStaus_Ready = "ready";
    Language.sGameStaus_Betting = "betting";
    Language.sGameStaus_Dealing = "dealing";
    Language.sGameStaus_Settling = "settling";
    Language.sGameStaus_Settled = "settled";
    Language.sGameStaus_Peeking = "peeking";
    Language.sGameStaus_Changing_Shoe = "changing_shoe";
    Language.sGameStaus_Failing_Game = "failing_game";
    Language.sGameStaus_Fail_Game = "fail_game";
    Language.sChange_Dealer = "change_dealer";
    Language.sDealer_Exit = "dealer_exit";
    /** 个人资讯 **/
    Language.sPersonal_Label = "personal_label";
    Language.sPersonal_0 = "sPersonal_0";
    Language.sPersonal_1 = "sPersonal_1";
    Language.sPersonal_2 = "sPersonal_2";
    Language.sPersonal_3 = "sPersonal_3";
    Language.sPersonal_4 = "sPersonal_4";
    Language.sPersonal_5 = "sPersonal_5";
    Language.sPersonal_6 = "sPersonal_6";
    /** 多桌 **/
    Language.sMulti_Table_ID = "multi_table_id";
    Language.sMulti_Table_Bet = "multi_table_bet";
    Language.sMulti_Table_Payout = "multi_table_payout";
    /** 游戏名称 **/
    Language.sGame_Name_Bac = "sGame_Name_Bac";
    Language.sGame_Name_Bac_Speed = "sGame_Name_Bac_Speed";
    Language.sGame_Name_Bac_Rebot = "sGame_Name_Bac_Rebot";
    Language.sGame_Name_Bac_Peek = "sGame_Name_Bac_Peek";
    Language.sGame_Name_Bac_Charter = "sGame_Name_Bac_Charter";
    Language.sGame_Name_DTF = "sGame_Name_DTF";
    Language.sGame_Name_Sic = "sGame_Name_Sic";
    Language.sGame_Name_Rou = "sGame_Name_Rou";
    /** 系统设置 **/
    Language.sSystem_Setting = "system_setting";
    Language.sLanguage_setting = "language_setting";
    Language.sLanguage_CN = "language_cn";
    Language.sLanguage_TW = "language_tw";
    Language.sLanguage_EN = "language_en";
    Language.sMusic = "music";
    Language.sMusic_BG = "music_bg";
    Language.sSound_Effect = "sound_effect";
    Language.sSound_Live = "sound_live";
    Language.sSound_Chinese = "sound_chinese";
    Language.sSound_Cantonese = "sound_cantonese";
    Language.sSound_English = "sound_english";
    /** 好路提示 **/
    Language.sGoodRoadSetting = "good_road_type";
    Language.sGoodRoadSetting_0 = "good_road_0";
    Language.sGoodRoad = "good_road";
    /** 包桌设置 **/
    Language.sSettingPwdPanel_0 = "SettingPwdPanel 0";
    Language.sSettingPwdPanel_1 = "SettingPwdPanel 1";
    Language.sSettingPwdPanel_2 = "SettingPwdPanel 2";
    Language.sSettingPwdPanel_3 = "SettingPwdPanel 3";
    /** 进桌密码 **/
    Language.sTableEnter_0 = "Table Enter 0";
    /**包桌操作确认*/
    Language.sMAKE_SURE_CHANGE_DEALER = "make_sure_change_dealer";
    Language.sMAKE_SURE_CHANGE_SHOE = "make_sure_change_shoe";
    /**包桌操作返回成功*/
    Language.sOPERATION_CHANGE_DEALER_OK = "operation_change_dealer_ok";
    Language.sOPERATION_CHANGE_SHOE_OK = "operation_change_shoe_ok";
    Language.sOPERATION_FLY_POKER_OK = "operation_fly_poker_ok";
    Language.sOPERATION_START_BET_OK = "operation_start_bet_ok";
    Language.sOPERATION_DEAL_POKER_OK = "operation_deal_poker_ok";
    /**包桌操作返回失败*/
    Language.sOPERATION_CHANGE_DEALER_FAIL = "operation_change_dealer_fail";
    Language.sOPERATION_CHANGE_SHOE_FAIL = "operation_change_shoe_fail";
    Language.sOPERATION_FLY_POKER_FAIL = "operation_fly_poker_fail";
    Language.sOPERATION_START_BET_FAIL = "operation_start_bet_fail";
    Language.sOPERATION_DEAL_POKER_FAIL = "operation_deal_poker_fail";
    /**包桌操作返回拒绝*/
    Language.sOPERATION_CHANGE_DEALER_NO = "operation_change_dealer_no";
    Language.sOPERATION_CHANGE_SHOE_NO = "operation_change_shoe_no";
    Language.sOPERATION_DEAL_POKER_NO = "operation_deal_poker_no";
    Language.sOPERATION_FLY_POKER_NO = "operation_fly_poker_no";
    Language.sOPERATION_START_BET_NO = "operation_start_bet_no";
    /** 龍虎斗 **/
    Language.sDragon = "Dragon"; //龙
    Language.sTiger = "Tiger"; //虎
    Language.sDragonRoute = "Dragon_Route"; //龙问路
    Language.sTigerRoute = "Tiger_Route"; //虎问路
    Language.sDragon_Win = "sDragon_Win"; //龍贏
    Language.sTiger_Win = "sTiger_Win"; //虎贏
    /**下注限額*/
    Language.sBetLimit_Upper = "BetLimit_Upper"; //下注限額上限
    Language.sBetLimit_Under = "BetLimit_Under"; //下注限額下限
    /**結算訊息*/
    Language.sWinGold = "WinGold"; //總贏金
    Language.sNoWin = "NoWin"; //无输赢
    Language.sLose = "Lose"; //您輸了
    Language.sGold = "Gold"; //元
    Language.sTablePause = "TablePause"; //賭桌暫停,請返回大廳
    /**遊戲狀態訊息*/
    Language.sDealing = "sDealing"; //下注結束, 開牌
    Language.sBetting = "sBetting"; //已開局, 請下注
    Language.sSettled = "sSettled"; //結算完成
    Language.sWaitNewGame = "sWaitNewGame"; //等待新局
    /**閒置局數*/
    Language.sIdleRound = "IdelRound";
    /**最大閒置局數*/
    Language.sIdleMaxRound = "IdleMaxRound";
    /**骰寶 圍骰*/
    Language.sSurroundDice = "sSurroundDice";
    Language.sTotalBetGold = "sTotalBetGold"; //總下注金額
    Language.sPlayType = "sPlayType";
    Language.sPayout = "sPayout";
    Language.sLimitBet = "sLimitBet";
    /**轮盘投注种类*/
    Language.sZero = "Zero";
    Language.sBetType_1 = "sBetType_1";
    Language.sBetType_2 = "sBetType_2";
    Language.sBetType_3 = "sBetType_3";
    Language.sBetType_3N = "sBetType_3N";
    Language.sBetType_4 = "sBetType_4";
    Language.sBetType_4N = "sBetType_4N";
    Language.sBetType_5 = "sBetType_5";
    Language.sDozen = "sDozen";
    Language.sCol = "sCol";
    Language.sBetType_Dozen_1 = "sBetType_Dozen_1";
    Language.sBetType_Dozen_2 = "sBetType_Dozen_2";
    Language.sBetType_Dozen_3 = "sBetType_Dozen_3";
    Language.sBetType_Col_1 = "sBetType_Col_1";
    Language.sBetType_Col_2 = "sBetType_Col_2";
    Language.sBetType_Col_3 = "sBetType_Col_3";
    Language.sRedBlack = "Red Black";
    Language.sDaLie = "Da Lie";
    Language.sBigSmall = "Big Small";
    Language.sSingleDouble = "Single Double";
    Language.sAllSurround = "sAllSurround"; //全圍
    /**連線狀態*/
    Language.sConnectFailed = "sConnectFailed"; //連線失敗,請返回大廳
    Language.sDisConnect = "sDisConnect"; //斷線
    Language.sConnecting = "sConnecting"; //連線中
    /**進桌結果*/
    Language.sEnterOk = "sEnterOk"; //進桌成功
    Language.sEnterFail = "sEnterFail"; //進桌失敗
    Language.sEnterInvalid = "sEnterInvalid"; //進桌身分驗證不通過
    Language.sNoSeat = "sNoSeat"; //沒有座位
    Language.sTableOwnerExist = "sTableOwnerExist"; //桌主已存在
    Language.sJoinTbTypeFault = "sJoinTbTypeFault"; //進桌類型不對
    Language.sJoinDataError = "sJoinDataError"; //進桌資料不對
    Language.sBalanceNoEnough = "sBalanceNoEnough"; //餘額不夠
    Language.sEnterPwError = "sEnterPwError"; //進桌密碼不正確
    Language.sTableLimit = "sTableLimit"; //超過賭桌上限
    Language.sTablePrivate = "sTablePrivate"; //賭桌已獨享
    Language.sCharterTypeError = "sCharterTypeError"; //包桌狀態不對
    Language.sTimeOut = "sTimeOut"; //連線逾時
    Language.sProtocolError = "sProtocolError"; //通訊板本不對
    Language.sTryAccountDeny = "sTryAccountDeny"; //試玩帳號權限拒絕
    Language.sPermissionDeny = "sPermissionDeny"; //權限不允许，信用账号
    Language.sMasterExit = "sMasterExit"; //桌主已离开
    Language.sNotFinish = "sNotFinish"; //此局尚未结束
    Language.sMaintain = "sMaintain"; //维护中 桌主断线
    Language.sTableClosed = "sTableClosed"; //赌桌关闭
    Language.sNoSettled = "sNoSettled"; //玩家帳未結清
    Language.sEnterSeatFail = "sEnterSeatFail"; //玩家保留桌失败
    Language.sEnterGoodFail = "sEnterGoodFail"; //玩家进入好路多桌失败
    /**下注返回訊息*/
    Language.sBetOk = "sBetOk"; //下注成功
    Language.sBetGoldNoEnough = "sBetGoldNoEnough"; //下注金額不足
    Language.sOverSelfLimit = "sOverSelfLimit"; //下注金額超過自選限紅
    Language.sUnderSelfLimit = "sUnderSelfLimit"; //下注金額低於自選限紅
    Language.sOverTableLimit = "sOverTableLimit"; //下注金額超過賭桌限紅
    Language.sOverTotalLimit = "sOverTotalLimit"; //下注金額超過總押注金額
    Language.sUnderTableLimit = "sUnderTableLimit"; //下注金額低於賭桌限紅
    Language.sBetLimitNoFound = "sBetLimitNoFound"; //下注找不到押注上下限模式
    Language.sBetPosNoFound = "sBetPosNoFound"; //下注找不到押注位置
    Language.sBetPosDisable = "sBetPosNoFound"; //押注位置不允許
    Language.sBetFailed = "sBetFailed"; //押注失败
    /**下注检查訊息*/
    Language.sOverLimit = "sOverLimit"; //超出最大押注限额
    Language.sUnderLimit = "sUnderLimit"; //低于最小押注限额
    Language.sBetAll = "sBetAll"; //下注全部余额
    Language.sVideoConnectFailed = "sVideoConnectFailed"; //視訊連接失敗,請重新連接
    /**閒置訊息*/
    Language.sIdle_OverThreeNoBet = "sIdle_OverThreeNoBet"; //您已經超過三局沒有下注
    Language.sIdle_OverFiveNoBet = "sIdle_OverFiveNoBet"; //您已經超過五局沒有下注,即將返回大廳
    /**電投大廳*/
    Language.sTel_Can_Change_Amount = "sTel_Can_Change_Amount"; //可出碼金額
    Language.sTel_Chips = "sTel_Chips"; //籌碼
    Language.sTelSelectTableFailed = "sTelSelectTableFailed"; //轉桌失敗
    Language.sTelSelectTableSuccess = "sTelSelectTableSuccess"; //轉桌成功
    Language.sTelGunnerSuccess = "sTelGunnerSuccess"; //配槍手成功
    Language.sTelGunnerNotEnough = "sTelGunnerNotEnough"; //槍手不夠
    Language.sTel_Telephone_Failed = "sTel_Telephone_Failed"; //槍手打不通
    Language.sTel_Gunner_Log_Out = "sTel_LOG_OUT"; //槍手登出
    Language.sTel_number = "sTel_number"; //客服電話
    Language.sTel_ID_Code = "sTel_ID_Code"; //驗證碼
    Language.sTel_Gunner_Login_Success = "sTel_Gunner_Login_Success"; //槍手登入成功
    Language.sTel_Gunner_LogOut_KNOCK_OFF = "sTel_Gunner_Log_KNOCK_OFF"; //槍手收工登出
    Language.sTel_Gunner_LogOut_Relief = "sTel_Gunner_LogOut_Relief"; //槍手換班登出
    Language.sTel_RequestGunnersException = "sTel_RequestGunnersFailed"; //配槍手異常,服務端沒回覆
    Language.sTel_Gunner_LogOut = "sTel_Gunner_LogOut"; //槍手登出
    /**電投百家*/
    Language.sTel_TableID = "sTel_TableID"; //桌號
    Language.sTel_RoundID = "sTel_RoundID"; //局號
    Language.sTel_MaxBet = "sTel_MaxBet"; //最高投注
    Language.sTel_MinBet = "sTel_MinBet"; //最低投注
    Language.sTel_TieMaxBet = "sTel_TieMaxBet"; //和住最高
    Language.sTel_TieMinBet = "sTel_TieMinBet"; //和住最低
    Language.sTel_PairMaxBet = "sTel_PairMaxBet"; //對子最高
    Language.sTel_PairMinBet = "sTel_PairMinBet"; //對子最低
    Language.sTel_GiveChips = "sTel_GiveChips"; //小費
    Language.sTel_GiveChipsFailed = "sTel_GiveChipsFailed"; //給小費失敗
    Language.sTel_EnterTable = "sTel_EnterTable"; //進入本桌
    Language.sTel_ConnectPrinterSuccess = "sTel_ConnectPtSuccess"; //連接印表機成功
    Language.sTel_ConnectPrinterFailed = "sTel_ConnectPtFailed"; //連接印表機失敗
    Language.sTel_ConnectPrinterClosed = "sTel_ConnectPtClosed"; //印表機連線關閉
    Language.sTel_PrintPeek = "sTel_PrintPeek"; //列印瞇牌
    Language.sTel_VideoPeek = "sTel_VideoPeek"; //視頻瞇牌
    Language.sTel_ElectronicPeek = "sTel_ElectronicPeek"; //電子瞇牌
    Language.sTel_NoPeek = "sTel_NoPeek"; //不瞇牌
    Language.sTel_Table_Full_Strength = "sTel_Table_Full_Strength"; // 此桌座位已满，请转往其他桌进行游戏
    /**好路***/
    Language.sGoodRoadWait = "sGoodRoadWait"; //好路等待
    Language.sGoodRoadType_1 = "sGoodRoadType_1"; //
    Language.sGoodRoadType_2 = "sGoodRoadType_2"; //
    Language.sGoodRoadType_3 = "sGoodRoadType_3"; //
    Language.sGoodRoadType_4 = "sGoodRoadType_4"; //
    Language.sGoodRoadType_5 = "sGoodRoadType_5"; //
    Language.sGoodRoadType_6 = "sGoodRoadType_6"; //
    Language.sGoodRoadType_7 = "sGoodRoadType_7"; //
    Language.sGoodRoadType_8 = "sGoodRoadType_8"; //
    Language.sGoodRoadType_9 = "sGoodRoadType_9"; //
    Language.sGoodRoadType_10 = "sGoodRoadType_10"; //
    /**骰寶*/
    Language.sAnyTriple = "sAnyTriple"; //全圍
    Language.sSpecificTriple = "sSpecificTriple"; //圍1~圍6
    Language.sSpecificDouble = "sSpecificDouble"; //對子1~對子6
    Language.sSpecificSingle = "sSpecificSingle"; //單點1~單點6
    Language.sDiceCombination = "sDiceCombination"; //組合
    Language.sSum_9_10_11_12 = "sSum_9_10_11_12"; //和值 9/10/11/12
    Language.sSum_8_13 = "sSum_8_13"; //和值 8/13
    Language.sSum_7_14 = "sSum_7_14"; //和值 7/14
    Language.sSum_6_15 = "sSum_6_15"; //和值 6/15
    Language.sSum_5_16 = "sSum_5_16"; //和值 5/16
    Language.sSum_4_17 = "sSum_4_17"; //和值4/17
    Language.sBig_Small = "sBig_Small"; //大/小
    Language.sOdd_Even = "sOdd_Even"; //單/雙
    /** 位图按钮 **/
    Language.sMouseOver = "Mouse_over"; //鼠标以上
    Language.sDefault = "default"; //正常状态
    Language.sBitmapdataTest = "bitmapdata test"; //位图示例
    Language.sBitmapdataBQ = "BQ"; //标清
    Language.sBitmapdataGQ = "GQ"; //高清
    Language.sBitmapdataZS = "zhuan shi"; //钻石厅
    Language.sBitmapdataBJ = "bo jin"; //铂金厅
    Language.sBitmapdataJM = "bid"; //竞咪厅、翡翠厅
    Language.sBitmapdataGB = "vip"; //贵宾厅、银臂厅
    Language.sBitmapdataJB = "jin bi"; //金臂厅
    Language.sBitmapdataDZ = "duo zhuo"; //好路多桌
    Language.sBitmapdataDT = "dian tou"; //电投厅
    Language.sQuickBitmapdataZS = "quick zhuan shi"; //钻石厅
    Language.sQuickBitmapdataBJ = "quick bo jin"; //铂金厅
    Language.sQuickBitmapdataJM = "quick bid"; //竞咪厅、翡翠厅
    Language.sQuickBitmapdataGB = "quick vip"; //贵宾厅、银臂厅
    Language.sQuickBitmapdataJB = "quick jin bi"; //金臂厅
    Language.sQuickBitmapdataDZ = "quick duo zhuo"; //好路多桌
    Language.sQuickBitmapdataDT = "quick dian tou"; //电投厅
    Language.sTableMaintain = "sTableMaintain"; //賭桌維護中,請返回大廳
    /**大廳登入錯誤回復*/
    Language.sWarn_ServerConnect_Fail = "sServerConnect_Fail"; //伺服器異常,請詢問相關人員
    Language.sWarn_Login_Lobby_Fail = "sServer_Login_Lobby_Fail"; //登入大廳失敗
    Language.sWarn_Boss_Never_Login = "sBoss_Never_Login"; //老闆尚未登入
    Language.sWarn_Deputy_Never_Reviewed = "sDeputy_Never_Reviewed"; //槍手尚未審核
    Language.sWarn_System_Maintain = "sSystem_Maintain"; //系統維護中
    Language.sWarn_Login_Lobby_Other_Error = "sLogin_Lobby_Other_Error"; //登入大廳,其他錯誤
    Language.sWarn_Lobby_Disconnect = "sLobby_Disconnect"; //大廳斷線
    Language.sWarn_LobbyConnecting = "sLobbyConnecting"; //大廳連線中
    Language.sWarn_Web_Data_Error = "sWarn_Web_Data_Error"; //網頁數據錯誤
    Language.sWarn_Web_Maintain = "sWarn_Web_Maintain"; //全站維護中不允許登入
    Language.sWarn_Proxy_Maintain = "sWarn_Proxy_Maintain"; //代理維護中不允許登入
    /**背景音樂*/
    Language.sBackground_Music_1 = "sBackground_Music_1"; //背景音樂1
    Language.sBackground_Music_2 = "sBackground_Music_2"; //背景音樂2
    Language.sBackground_Music_3 = "sBackground_Music_3"; //背景音樂3
    /**登出原因  這邊少列到一個 因為上面有重複了 => sTel_Gunner_LogOut_Relief 槍手換班登出 */
    Language.sLogout_Lobby_Repeat_Login = "sWarn_Lobby_Repeat_Login"; //大廳重複登入
    Language.sLogout_Player_Active_Logout = "sLogout_Player_Active_Logout"; //玩家主動登出	
    Language.sLogout_TRY_ACCOUNT_TIME_OUT = "sLogout_TRY_ACCOUNT_TIME_OUT"; //試玩帳號超過試玩時間		
    Language.sLogout_CANCEL_SUBSCRIPTION_MULTI = "sLogout_CANCEL_SUBSCRIPTION_MULTI"; //取消訂閱多桌登出
    Language.sLogout_DISCONNECT = "sLogout_DISCONNECT"; //玩家斷線
    Language.sLogout_TABLER_DISCONNECT = "sLogout_TABLER_DISCONNECT"; //包桌桌主離線
    Language.sLogout_Lobby_Connect_Time_Out = "sWarn_Lobby_Connect_Time_Out"; //大廳連線逾時	
    Language.sLogout_Server_Maintain = "sLogout_Lobby_Server_Maintain"; //服務器維護中
    Language.sLogout_exception = "sLogout_exception"; //登出例外錯誤 ,無法辨識 服務端傳來的登出原因
    Language.sLogout_Proxy_Player_Suspended = "sLogout_Proxy_Player_Suspended"; //後台或代理後台停用玩家
    Language.sLogout_Game_Repeat_Login = "sLogout_Game_Repeat_Login"; //該桌玩家重複登入
    Language.sLogout_Game_Connect_Time_Out = "sLogout_Game_Connect_Time_Out"; //遊戲連線逾時
    /**Socket斷線*/
    Language.sNetWork_Abnormal_Lobby = "sNetWork_Abnormal_Lobby"; //網路異常,請重新載入
    Language.sNetWork_Abnormal_Game = "sNetWork_Abnormal_Game"; //網路異常,請返回大廳
    /**例外處理*/
    Language.sException_Login_Lobby_Pkt_Not_Return = "sException_Login_Lobby_Pkt_Not_Return"; //大廳登入沒回
    Language.sException_Bet_Not_Return = "sException_Bet_Not_Return"; //押注請求沒回
    Language.sException_Connect_GameServer_Failed = "sException_Connect_GameServer_Failed"; //連接遊戲伺服器失敗
    Language.sException_BetLimit_Is_NULL = "sException_BetLimit_Is_NULL"; //服務器下注限額錯誤,該賭桌維修中
    /**下注紀錄*/
    Language.sSearch = "sSearch"; //查詢
    Language.sListnumber = "sListnumber"; //訂單號
    Language.sBetTime = "sBetTime"; //下注時間
    Language.sGameType = "sGameType"; //遊戲類型
    Language.sTableID = "sTableID"; //桌號
    Language.sResult = "sResult"; //結果
    Language.sTotalBet = "sTotalBet"; //總投注
    Language.sPayOut = "sPayOut"; //派彩
    Language.sAvailableBet = "sAvailableBet"; //有效投住
    Language.sListState = "sListState"; //下注單狀態
    Language.sSmallSum = "sSmallSum"; //小計
    Language.sTotalSum = "sTotalSum"; //總計
    Language.sSingleShow = "sSingleShow"; //單頁顯示
    Language.sTotalShow = "sTotalShow"; //共計
    Language.sGo = "sGo"; //跳轉到
    Language.sIsPayOuted = "sIsPayOuted"; //已派彩
    Language.sNoPayOut = "sNoPayOut"; //未派彩
    Language.sYear = "sYear"; //年
    Language.sMonth = "sMonth"; //月
    Language.sDay = "sDay"; //日
    Language.sMonday = "sMonday"; //星期一
    Language.sTuesday = "sTuesday"; //星期二
    Language.sWednesday = "sWednesday"; //星期三
    Language.sThursday = "sThursday"; //星期四
    Language.sFriday = "sFriday"; //星期五
    Language.sSaturday = "sSaturday"; //星期六
    Language.sSunday = "sSunday"; //星期日
    Language.sSinglePageShow = "sSinglePageShow"; //每頁顯示
    Language.sBetGold = "sBetGold"; //投注金額
    Language.sReplay = "sReplay"; //重播
    Language.sGameNo = "sGameNo"; //局號
    Language.sVideoRePlay = "sVideoRePlay"; //視頻回放
    Language.sScaleBig = "sScaleBig"; //放大
    Language.sScaleSmall = "sScaleSmall"; //縮小
    Language.sPageLimit = "sPageLimit"; //輸入頁碼超過合法範圍
    Language.sPleaseEnter = "sPleaseEnter"; //請輸入
    Language.sValue = "sValue"; //值
    Language.sFournumber = "sFournumber"; //四數
    Language.sSicbo_X8_7 = "X8_7"; //
    Language.sSicbo_X8_6 = "X8_6"; //
    Language.sSicbo_X8_5 = "X8_5"; //
    Language.sSicbo_X8_4 = "X8_4"; //
    Language.sSicbo_X8_3 = "X8_3"; //
    Language.sSicbo_X8_2 = "X8_2"; //
    Language.sSicbo_X8_1 = "X8_1"; //
    Language.sSicbo_X8_0 = "X8_0"; //
    Language.sSicbo_X6_3 = "X6_3";
    Language.sSicbo_X6_2 = "X6_2";
    Language.sSicbo_X6_1 = "X6_1";
    Language.sSicbo_X6_0 = "X6_0";
    Language.sSicbo_X50_1 = "X50_1";
    Language.sSicbo_X50_0 = "X50_0";
    Language.sSicbo_X5_9 = "X5_9";
    Language.sSicbo_X5_8 = "X5_8";
    Language.sSicbo_X5_7 = "X5_7";
    Language.sSicbo_X5_6 = "X5_6";
    Language.sSicbo_X5_5 = "X5_5";
    Language.sSicbo_X5_4 = "X5_4";
    Language.sSicbo_X5_3 = "X5_3";
    Language.sSicbo_X5_2 = "X5_2";
    Language.sSicbo_X5_14 = "X5_14";
    Language.sSicbo_X5_13 = "X5_13";
    Language.sSicbo_X5_12 = "X5_12";
    Language.sSicbo_X5_11 = "X5_11";
    Language.sSicbo_X5_10 = "X5_10";
    Language.sSicbo_X5_1 = "X5_1";
    Language.sSicbo_X5_0 = "X5_0";
    Language.sSicbo_X24_0 = "X24_0";
    Language.sSicbo_X18_1 = "X18_1";
    Language.sSicbo_X18_0 = "X18_0";
    Language.sSicbo_X150_5 = "X150_5";
    Language.sSicbo_X150_4 = "X150_4";
    Language.sSicbo_X150_3 = "X150_3";
    Language.sSicbo_X150_2 = "X150_2";
    Language.sSicbo_X150_1 = "X150_1";
    Language.sSicbo_X150_0 = "X150_0";
    Language.sSicbo_X14_1 = "X14_1";
    Language.sSicbo_X14_0 = "X14_0";
    Language.sSicbo_X12_1 = "X12_1";
    Language.sSicbo_X12_0 = "X12_0";
    Language.sSicbo_X1_9 = "X1_9";
    Language.sSicbo_X1_8 = "X1_8";
    Language.sSicbo_X1_7 = "X1_7";
    Language.sSicbo_X1_6 = "X1_6";
    Language.sSicbo_X1_5 = "X1_5";
    Language.sSicbo_X1_4 = "X1_4";
    Language.sSicbo_X1_3 = "X1_3";
    Language.sSicbo_X1_2 = "X1_2";
    Language.sSicbo_X1_1 = "X1_1";
    Language.sSicbo_X1_0 = "X1_0";
    Language.sBetRecord = "sBetRecord";
    Language.sGO = "sGO";
    Language.sB = "sB"; //莊 縮寫
    Language.sP = "sP"; //閒 縮寫
    Language.sD = "sD"; //龍 縮寫		
    Language.sT = "sT"; //虎 縮寫	
    Language.sNoBetRecord = "sNoBetRecord"; //查無紀錄
    /** 游戏状态位图字 **/
    Language.sBmdBetWait = "BmdBetWait"; //等待下局
    Language.sBmdBetStart = "BmdBetStart"; //开始下注
    Language.sBmdBetStop = "BmdBetStop"; //停止下注
    Language.sBmdBetSuccess = "BmdBetSuccess"; //停止下注
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 2016-3-24 以后新增的内容要在分割线下面
    Language.sTip_Channel = "sTip_Channel"; //频道选择
    Language.sTableLogin_NoMoney = "sTableLogin_NoMoney"; //余额不足
    Language.sTableLogin_CAN_NOT_ENTER = "sTableLogin_CAN_NOT_ENTER"; //不能进入
    Language.sMinLimit = "sMinLimit"; //進入該桌最低額度
    Language.sLiveVideo = "sLiveVideo"; //视讯加载中
    Language.sOPERATION_FLY_OVER_TIME = "operation_fly_over_time"; //桌主超过飞牌次数
    Language.sPlayer_Repeat_Login = "sPlayer_Repeat_Login"; //玩家重複登入	
    Language.sNotOpenGame = "sNotOpenGame"; //未開局
    Language.sBetCount = "sBetCount"; //下注金额
    Language.sBetedCount = "sBetCounted"; //已下注金额
    Language.sExitLobby = "sExitLobby"; //退出大厅
    Language.sLeaveToTel = "sLeaveToTel"; //快速转桌
    Language.sLeaveToMultitable = "sLeaveToMultitable"; //快速转桌
    Language.sTip_Disable30 = "sTip_Disable30"; //超过30局禁止投注
    /**登入回復 失敗原因(用於大廳跟遊戲)*/
    Language.sWarn_Server_Busy = "sWarn_Server_Busy"; //服務器忙碌中,請稍後再試 
    Language.sSelectOne = "sSelectOne"; //至少选择一项
    /**電投大廳新增**/
    Language.sTelConnected = "sTelConnected"; //槍手連線成功
    Language.sTelNoConnect = "sTelNoConnect"; //槍手未連線
    /**例外處裡*/
    Language.sException_Lobby_Connect_Failed = "sException_Lobby_Connect_Failed"; //大廳伺服器連接埠上
    Language.sCannotCharter = "sCannotCharter"; //不能包桌
    Language.sIllegalOperation = "sIllegalOperation"; //違法操作
    Language.sHaveIn = "sHaveIn";
    Language.sLiveVideoPanoramaDataError = "sLiveVideoPanoramaDataError"; //全景視訊
    Language.sLiveError = "sLiveError"; //连接异常
    Language.sLiveError_1 = "sLiveError_1"; //联系客服
    Language.sFailGame = "sFailGame"; //赌桌废局
    Language.sQuickFailGame = "sQuickFailGame"; //赌桌废局
    Language.sFinalGame = "sFinalGame"; //最后一局
    Language.sOwnerLeave = "sOwnerLeave"; //桌主离开
    /** 登出原因 **/
    Language.sResetPassword = "sResetPassword"; //重设密码
    Language.sBackBet = "sBackBet"; //作废退押注
    Language.sLogout_Lobby_All_Maintain = "sLogout_Lobby_All_Maintain"; //大厅全站维护
    Language.sLogout_Lobby_Agent_Maintain = "sLogout_Lobby_Agent_Maintain"; //大厅代理维护中
    Language.sLogout_Lobby_Hall_Maintain = "sLogout_Lobby_Hall_Maintain"; //大厅厅馆维护中
    Language.sLogout_Lobby_Table_Maintain = "sLogout_Lobby_Table_Maintain"; //大厅赌桌维护中
    Language.sLogout_Multi_Bet_Time_Out = "sLogout_Multi_Bet_Time_Out"; //多桌下注超时
    Language.sMaintain_Notice_Whole = "sMaintain_Notice_Whole"; //全站维护-预告
    Language.sMaintain_Notice_Agent = "sMaintain_Notice_Agent"; //代理维护-预告
    Language.sMaintain_Notice_Theme = "sMaintain_Notice_Theme"; //厅馆维护-预告
    Language.sMaintain_Notice_Table = "sMaintain_Notice_Table"; //桌子维护-预告
    Language.sMaintain_Notice_Whole_1 = "sMaintain_Notice_Whole_1"; //全站维护-正式
    Language.sMaintain_Notice_Agent_1 = "sMaintain_Notice_Agent_1"; //代理维护-正式
    Language.sMaintain_Notice_Theme_1 = "sMaintain_Notice_Theme_1"; //厅馆维护-正式
    Language.sMaintain_Notice_Table_1 = "sMaintain_Notice_Table_1"; //桌子维护-正式
    Language.sMaintain_Theme = "sMaintain_Theme"; //厅馆维护-位图
    Language.sWarn_Account_Limit = "sWarn_Account_Limit"; //一个ip只能登陆一个账号
    Language.sWarn_Ret_14 = "sWarn_Ret_14"; //不允許登入真人視訊網投大廳(信用帳戶限制)
    Language.sTip_Back_To_Lobby = "sTip_Back_To_Lobby"; //返回大厅
    Language.sLogout_Lock_Account = "sLogout_Lock_Account"; //锁定账号（密码输入错误三次）
    Language.sVersion_Error = "sVersion_Error"; //版本错误
    Language.sTip_Regist = "sTip_Regist"; //注册按钮
    Language.sHit_Leave_To_Regist = "sHit_Leave_To_Regist"; //前往注册
    Language.sIsChangeRenderToLow = "sIsChangeRenderToLow";
    Language.ios1 = "ios1"; //手机客户端界面
    Language.ios2 = "ios2";
    Language.ios3 = "ios3";
    Language.ios4 = "ios4";
    Language.ios5 = "ios5";
    Language.ios6 = "ios6";
    Language.ios7 = "ios7";
    Language.ios8 = "ios8";
    Language.ios9 = "ios9";
    Language.ios10 = "ios10";
    Language.ios11 = "ios11";
    Language.and1 = "and1";
    Language.and2 = "and2";
    Language.and3 = "and3";
    Language.and4 = "and4";
    Language.and5 = "and5";
    Language.and6 = "and6";
    Language.and7 = "and7";
    Language.and8 = "and8";
    Language.and9 = "and9";
    Language.and10 = "and10";
    language.Language = Language;
    __reflect(Language.prototype, "language.Language");
})(language || (language = {}));
//# sourceMappingURL=Language.js.map