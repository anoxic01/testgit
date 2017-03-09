var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var manager;
(function (manager) {
    var BitmapManager = (function () {
        function BitmapManager() {
        }
        BitmapManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new BitmapManager();
            }
            return this.instance;
        };
        BitmapManager.prototype.initialize = function () {
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
        };
        /**
         * 资源点击打开界面才加载
         */
        BitmapManager.prototype.initMobileApp = function () {
            this.m_mobile = new Dictionary();
            var num;
            for (var i = 0; i < define.MobileDefine.IOS_COUNT; i++) {
                this.m_mobile[define.MobileDefine.LINK_IOS + (i + 1)] = manager.MobileAppManager.getInstance().getInstanceByNameFromDomain(define.MobileDefine.LINK_IOS + (i + 1));
                num = manager.MobileAppManager.getInstance().getInstanceByNameFromDomain(define.MobileDefine.LINK_NUM + (i + 1));
                // this.m_mobile[define.MobileDefine.LINK_NUM+(i+1)] = MovieclipFrameToBitmapData.draw(num);
                if (i < define.MobileDefine.AND_COUNT) {
                    this.m_mobile[define.MobileDefine.LINK_AND + (i + 1)] = manager.MobileAppManager.getInstance().getInstanceByNameFromDomain(define.MobileDefine.LINK_AND + (i + 1));
                }
            }
        };
        // public getMobileApp(type:number,index:number):egret.BitmapData
        // {
        // 	var prifex:String;
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
        BitmapManager.prototype.getBmpdChip = function (_uValue) {
            return this.m_dicChips[_uValue];
        };
        BitmapManager.prototype.getBmpdGameChip = function (_uValue) {
            return this.m_dicGameChips[_uValue];
        };
        BitmapManager.prototype.getBmpdBead = function (_sValue) {
            return this.m_dicBeads[_sValue + manager.LobbyManager.getInstance().lobbyAuth.Lang];
        };
        BitmapManager.prototype.getBmpdBeadRouNum = function (_sValue) {
            return this.m_dicBeads[define.Define.BEAD_NUMBER + _sValue];
        };
        BitmapManager.prototype.getBmpdTableIcon = function (_iValue) {
            return this.m_dicTableIcon[_iValue];
        };
        BitmapManager.prototype.getBmpdLanguage = function (_iLanguage, _sKey) {
            return this.m_aLanguage[_iLanguage][_sKey];
        };
        BitmapManager.prototype.getCard = function (_sCardID, _type) {
            if (_type === void 0) { _type = 1; }
            if (_type == 2) {
                return this.m_dicCardSmall[_sCardID];
            }
            if (_type == 3) {
                return this.m_dicCardBig[_sCardID];
            }
            return this.m_dicCard[_sCardID];
        };
        BitmapManager.prototype.getMultiTransitionTable = function (uMode) {
            return this.m_dicMultiTrans[manager.LobbyManager.getInstance().lobbyAuth.Lang + uMode];
        };
        BitmapManager.prototype.getTableBg = function (uFrame) {
            return this.m_aTableBg[uFrame];
        };
        BitmapManager.prototype.getTableBgHover = function (uFrame) {
            return this.aTableBgHover[uFrame];
        };
        BitmapManager.prototype.getMultitableBg = function (uMode) {
            return this.m_dicMultitableBg[uMode];
        };
        BitmapManager.prototype.getTableDefault = function (uLanguage) {
            return this.m_dicTable[uLanguage];
        };
        BitmapManager.prototype.initNumber = function () {
            this.numberTable = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Table_Asset"), 16);
            this.numberTime = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Time_Asset"), 10);
            this.numberTimeRed = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Time_Red_Asset"), 10);
            this.numberCountdown = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Countdown_Asset"), 10);
            this.numberCountdownRed = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Countdown_Red_Asset"), 10);
            this.numberChip = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Chip_Asset"), 16);
            this.numberOnline = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Chip_Asset"), 16);
            this.numberBet = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Chip_Asset"), 16);
            this.numberGameGCoin = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Chip_Asset"), 16);
            this.numberBetGCoin = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Chip_Asset"), 16);
            this.numberBetedGCoin = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Game_Asset_01"), 16);
            this.numberGold = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Gold_Asset"), 16);
            this.numberMachineBacCountDown = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Countdown_Machine_Bac_Asset"), 10);
            this.numberMachineBacRedCountDown = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Countdown_Machine_Bac_Red_Asset"), 10);
            this.numberPoolBac = new tool.BitmapNumberUtil(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_NUMBER, "Number_Pool_Bet_Asset"), 13);
        };
        BitmapManager.prototype.initChip = function () {
            this.m_dicChips = new Dictionary();
            this.m_dicChips[10] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_10");
            this.m_dicChips[100] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_100");
            this.m_dicChips[1000] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_1000");
            this.m_dicChips[10000] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_10000");
            this.m_dicChips[100000] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_100000");
            this.m_dicChips[300] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_300");
            this.m_dicChips[3000] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_3000");
            this.m_dicChips[30000] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_30000");
            this.m_dicChips[300000] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_300000");
            this.m_dicChips[50] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_50");
            this.m_dicChips[500] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_500");
            this.m_dicChips[5000] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_5000");
            this.m_dicChips[50000] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_50000");
            this.m_dicChips[500000] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Chip_Asset_500000");
        };
        BitmapManager.prototype.initGameChip = function () {
            this.m_dicGameChips = new Dictionary();
            MovieclipFrameToBitmapData.transform(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "Game_Chip"), this.m_dicGameChips);
            this.bmpChipShadow = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP, "ChipShadowBG");
        };
        BitmapManager.prototype.initBead = function () {
            this.m_dicBeads = new Dictionary();
            /** 庄 **/
            this.m_dicBeads[define.Define.BEAD_BANKER + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Banker_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_BANKER + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Banker_TW_Asset");
            this.m_dicBeads[define.Define.BEAD_BANKER + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Banker_EN_Asset");
            /** 闲 **/
            this.m_dicBeads[define.Define.BEAD_PLAYER + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Player_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_PLAYER + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Player_TW_Asset");
            this.m_dicBeads[define.Define.BEAD_PLAYER + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Player_EN_Asset");
            /** 和 **/
            this.m_dicBeads[define.Define.BEAD_TIE + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Tie_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_TIE + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Tie_TW_Asset");
            this.m_dicBeads[define.Define.BEAD_TIE + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Tie_EN_Asset");
            /** 龙 **/
            this.m_dicBeads[define.Define.BEAD_DRAGON + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Dragon_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_DRAGON + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Dragon_TW_Asset");
            this.m_dicBeads[define.Define.BEAD_DRAGON + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Dragon_EN_Asset");
            /** 虎 **/
            this.m_dicBeads[define.Define.BEAD_TIGER + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Tiger_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_TIGER + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Tiger_TW_Asset");
            this.m_dicBeads[define.Define.BEAD_TIGER + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Tiger_EN_Asset");
            /** 单 **/
            this.m_dicBeads[define.Define.BEAD_DAN + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Dan_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_DAN + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Dan_TW_Asset");
            this.m_dicBeads[define.Define.BEAD_DAN + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Dan_EN_Asset");
            this.m_dicBeads[define.Define.BEAD_DAN_DZ + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Dan_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_DAN_DZ + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Dan_TW_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_DAN_DZ + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Dan_EN_DZ_Asset");
            /** 双 **/
            this.m_dicBeads[define.Define.BEAD_SHUANG + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Shuang_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_SHUANG + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Shuang_TW_Asset");
            this.m_dicBeads[define.Define.BEAD_SHUANG + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Shuang_EN_Asset");
            this.m_dicBeads[define.Define.BEAD_SHUANG_DZ + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Shuang_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_SHUANG_DZ + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Shuang_TW_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_SHUANG_DZ + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Shuang_EN_DZ_Asset");
            /** 大 **/
            this.m_dicBeads[define.Define.BEAD_BIG + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Big_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_BIG + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Big_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_BIG + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Big_EN_Asset");
            this.m_dicBeads[define.Define.BEAD_BIG_DZ + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Big_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_BIG_DZ + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Big_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_BIG_DZ + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Banker_EN_Asset");
            /** 小 **/
            this.m_dicBeads[define.Define.BEAD_SMALL + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Small_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_SMALL + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Small_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_SMALL + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Small_EN_Asset");
            this.m_dicBeads[define.Define.BEAD_SMALL_DZ + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Small_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_SMALL_DZ + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Small_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_SMALL_DZ + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Small_EN_DZ_Asset");
            /** 红 **/
            this.m_dicBeads[define.Define.BEAD_RED + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Red_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_RED + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Red_TW_Asset");
            this.m_dicBeads[define.Define.BEAD_RED + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Red_EN_Asset");
            this.m_dicBeads[define.Define.BEAD_RED_DZ + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Red_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_RED_DZ + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Red_TW_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_RED_DZ + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Red_EN_DZ_Asset");
            /** 黑 **/
            this.m_dicBeads[define.Define.BEAD_BLACK + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Black_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_BLACK + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Black_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_BLACK + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Black_EN_Asset");
            this.m_dicBeads[define.Define.BEAD_BLACK_DZ + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Black_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_BLACK_DZ + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Black_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_BLACK_DZ + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Black_EN_DZ_Asset");
            /** 围 **/
            this.m_dicBeads[define.Define.BEAD_WEI + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Wei_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_WEI + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Wei_TW_Asset");
            this.m_dicBeads[define.Define.BEAD_WEI + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Wei_EN_Asset");
            this.m_dicBeads[define.Define.BEAD_WEI_DZ + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Wei_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_WEI_DZ + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Wei_TW_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_WEI_DZ + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Wei_EN_DZ_Asset");
            /** 零 **/
            this.m_dicBeads[define.Define.BEAD_ZERO + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Zero_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_ZERO + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Zero_CN_Asset");
            this.m_dicBeads[define.Define.BEAD_ZERO + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Zero_EN_Asset");
            this.m_dicBeads[define.Define.BEAD_ZERO_DZ + define.Define.LANGUAGE_CN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Zero_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_ZERO_DZ + define.Define.LANGUAGE_TW] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Zero_CN_DZ_Asset");
            this.m_dicBeads[define.Define.BEAD_ZERO_DZ + define.Define.LANGUAGE_EN] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP, "Bead_Zero_EN_DZ_Asset");
            var m_rouBead = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_ROAD_MAP, "linkRouBead");
            m_rouBead.stop();
            for (var i = 0; i <= 36; i++) {
                m_dicBeads[define.Define.BEAD_NUMBER + i] = null;
                var color = RouData.getInstance().getColor(i);
                m_rouBead.gotoAndStop(color);
                m_rouBead.contentTxt.text = String(i);
                m_dicBeads[Define.BEAD_NUMBER + i] = BitmapUtil.snapshot(m_rouBead);
            }
            m_rouBead = null;
        };
        BitmapManager.prototype.initTableIcon = function () {
            this.m_dicTableIcon = new Dictionary();
            this.m_dicTableIcon[define.Define.TABLE_TYPE_NORMAL] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE, "Table_Icon_Bac_Asset");
            this.m_dicTableIcon[define.Define.TABLE_TYPE_SPEEDY] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE, "Table_Icon_Bac_Speed_Asset");
            this.m_dicTableIcon[define.Define.TABLE_TYPE_PEEK] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE, "Table_Icon_Bac_Peek_Asset");
            this.m_dicTableIcon[define.Define.TABLE_TYPE_ROBOT] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE, "Table_Icon_Bac_Robot_Asset");
            this.m_dicTableIcon[define.Define.TABLE_TYPE_CHARTER] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE, "Table_Icon_Bac_Charter_Asset");
            this.m_dicTableIcon[define.Define.TABLE_TYPE_DTF] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE, "Table_Icon_DTF_Asset");
            this.m_dicTableIcon[define.Define.TABLE_TYPE_ROU] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE, "Table_Icon_Rou_Asset");
            this.m_dicTableIcon[define.Define.TABLE_TYPE_SIC] = ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE, "Table_Icon_Sic_Asset");
        };
        BitmapManager.prototype.initLanguage = function () {
            this.m_aLanguage = [new Dictionary(), new Dictionary(), new Dictionary()];
            addBmpdLanguage(Language.sBitmapdataTest, new BitmapData(30, 10));
            //			this.addBmpdLanguage_2(Language.sBitmapdataBQ,[[new BQ_Default_CN_Asset(), new BQ_Default_TW_Asset(), new BQ_Default_EN_Asset()],[new BQ_Rollover_CN_Asset(), new BQ_Rollover_TW_Asset(), new BQ_Rollover_EN_Asset()]]);
            //			this.addBmpdLanguage_2(Language.sBitmapdataGQ,[[new GQ_Default_CN_Asset(), new GQ_Default_CN_Asset(), new GQ_Default_EN_Asset()],[new GQ_Rollover_CN_Asset(), new GQ_Rollover_CN_Asset(), new GQ_Rollover_EN_Asset()]]);
            //			
            //			this.addBmpdLanguage_2(Language.sBitmapdataZS,[[new ZS_Default_CN_Asset(), new ZS_Default_TW_Asset(), new ZS_Default_TW_Asset()],[new ZS_Rollover_CN_Asset(), new ZS_Rollover_TW_Asset(), new ZS_Rollover_TW_Asset()]]);
            //			this.addBmpdLanguage_2(Language.sBitmapdataBJ,[[new BJ_Default_CN_Asset(), new BJ_Default_TW_Asset(), new BJ_Default_TW_Asset()],[new BJ_Rollover_CN_Asset(), new BJ_Rollover_TW_Asset(), new BJ_Rollover_TW_Asset()]]);
            //			this.addBmpdLanguage_2(Language.sBitmapdataJM,[[new JM_Default_CN_Asset(), new JM_Default_TW_Asset(), new JM_Default_TW_Asset()],[new JM_Rollover_CN_Asset(), new JM_Rollover_TW_Asset(), new JM_Rollover_TW_Asset()]]);
            //			this.addBmpdLanguage_2(Language.sBitmapdataGB,[[new GB_Default_CN_Asset(), new GB_Default_TW_Asset(), new GB_Default_TW_Asset()],[new GB_Rollover_CN_Asset(), new GB_Rollover_TW_Asset(), new GB_Rollover_TW_Asset()]]);
            //			this.addBmpdLanguage_2(Language.sBitmapdataJB,[[new JB_Default_CN_Asset(), new JB_Default_TW_Asset(), new JB_Default_TW_Asset()],[new JB_Rollover_CN_Asset(), new JB_Rollover_TW_Asset(), new JB_Rollover_TW_Asset()]]);
            this.addBmpdLanguage_2(Language.sBitmapdataDZ, [[ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Theme_DZ_Default_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Theme_DZ_Default_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Theme_DZ_Default_TW_Asset")], [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Theme_DZ_Rollover_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Theme_DZ_Rollover_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Theme_DZ_Rollover_TW_Asset")]]);
            //			this.addBmpdLanguage_2(Language.sBitmapdataDT,[[new DT_Default_CN_Asset(), new DT_Default_TW_Asset(), new DT_Default_TW_Asset()],[new DT_Rollover_CN_Asset(), new DT_Rollover_TW_Asset(), new DT_Rollover_TW_Asset()]]);
            this.addBmpdLanguage_2(Language.sQuickBitmapdataZS, [[ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_ZS_Default_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_ZS_Default_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_ZS_Default_TW_Asset")], [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_ZS_Rollover_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_ZS_Rollover_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_ZS_Rollover_TW_Asset")]]);
            this.addBmpdLanguage_2(Language.sQuickBitmapdataBJ, [[ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_BJ_Default_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_BJ_Default_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_BJ_Default_TW_Asset")], [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_BJ_Rollover_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_BJ_Rollover_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_BJ_Rollover_TW_Asset")]]);
            this.addBmpdLanguage_2(Language.sQuickBitmapdataJM, [[ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_JM_Default_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_JM_Default_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_JM_Default_TW_Asset")], [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_JM_Rollover_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_JM_Rollover_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_JM_Rollover_TW_Asset")]]);
            this.addBmpdLanguage_2(Language.sQuickBitmapdataGB, [[ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_GB_Default_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_GB_Default_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_GB_Default_TW_Asset")], [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_GB_Rollover_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_GB_Rollover_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_GB_Rollover_TW_Asset")]]);
            this.addBmpdLanguage_2(Language.sQuickBitmapdataJB, [[ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_JB_Default_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_JB_Default_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_JB_Default_TW_Asset")], [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_JB_Rollover_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_JB_Rollover_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_JB_Rollover_TW_Asset")]]);
            this.addBmpdLanguage_2(Language.sQuickBitmapdataDZ, [[ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_DZ_Default_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_DZ_Default_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_DZ_Default_TW_Asset")], [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_DZ_Rollover_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_DZ_Rollover_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_DZ_Rollover_TW_Asset")]]);
            this.addBmpdLanguage_2(Language.sQuickBitmapdataDT, [[ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_DT_Default_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_DT_Default_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_DT_Default_TW_Asset")], [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME, "Quick_DT_Rollover_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_DT_Rollover_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME, "Quick_DT_Rollover_TW_Asset")]]);
            this.addBmpdLanguage_3(Language.sBmdBetWait, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "BET_WAIT_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "BET_WAIT_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "BET_WAIT_EN_Asset")]);
            this.addBmpdLanguage_3(Language.sBmdBetStart, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "BET_START_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "BET_START_TW_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "BET_START_EN_Asset")]);
            this.addBmpdLanguage_3(Language.sBmdBetStop, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "BET_STOP_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "BET_STOP_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "BET_STOP_EN_Asset")]);
            this.addBmpdLanguage_3(Language.sBmdBetSuccess, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "BET_SUCCESS_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "BET_SUCCESS_CN_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "BET_SUCCESS_EN_Asset")]);
            this.addBmpdLanguage_3(Language.sMaintenance, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_Maintain_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Maintain_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Maintain_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sNoTrial, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_NoTrial_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_NoTrial_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_NoTrial_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sChangeShoe, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_Shuffle_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Shuffle_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Shuffle_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sGoodRoadWait, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_Wait_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Wait_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Wait_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sFailGame, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_FailGamel_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_FailGamel_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_FailGamel_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sWinGold, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_Win_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Win_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Win_Asset_EN")]);
            addBmpdLanguage_3(Language.sLose, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_Lose_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Lose_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Lose_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sNoWin, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_NoWin_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_NoWin_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_NoWin_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sBalanceNoEnough, [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_NoEnough_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_NoEnough_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_NoEnough_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sFinalGame, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_Final_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Final_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Final_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sOwnerLeave, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Table_Hint_Owner_Leave_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Owner_Leave_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Table_Hint_Owner_Leave_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sMaintain_Theme, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Maintain_Theme_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Maintain_Theme_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Maintain_Theme_Asset_EN")]);
            this.addBmpdLanguage_3(Language.sQuickFailGame, [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Quick_Table_Hint_FailGamel_Asset_CN"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "Quick_Table_Hint_FailGamel_Asset_TW"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "Quick_Table_Hint_FailGamel_Asset_EN")]);
        };
        BitmapManager.prototype.addBmpdLanguage = function (_sKey, _bmpd) {
            var arr = BitmapLanguageUtil.cut(_bmpd, 3);
            this.m_aLanguage[define.Define.LANGUAGE_CN][_sKey] = arr[define.Define.LANGUAGE_CN];
            this.m_aLanguage[define.Define.LANGUAGE_TW][_sKey] = arr[define.Define.LANGUAGE_TW];
            this.m_aLanguage[define.Define.LANGUAGE_EN][_sKey] = arr[define.Define.LANGUAGE_EN];
            _bmpd.dispose();
            arr = null;
        };
        /**
         *	帧按钮
         * @param _sKey
         * @param _arr
         *
         */
        BitmapManager.prototype.addBmpdLanguage_2 = function (_sKey, _arr) {
            this.m_aLanguage[define.Define.LANGUAGE_CN][_sKey + "_" + Language.sDefault] = _arr[0][define.Define.LANGUAGE_CN];
            this.m_aLanguage[define.Define.LANGUAGE_TW][_sKey + "_" + Language.sDefault] = _arr[0][define.Define.LANGUAGE_TW];
            this.m_aLanguage[define.Define.LANGUAGE_EN][_sKey + "_" + Language.sDefault] = _arr[0][define.Define.LANGUAGE_EN];
            this.m_aLanguage[define.Define.LANGUAGE_CN][_sKey + "_" + Language.sMouseOver] = _arr[1][define.Define.LANGUAGE_CN];
            this.m_aLanguage[define.Define.LANGUAGE_TW][_sKey + "_" + Language.sMouseOver] = _arr[1][define.Define.LANGUAGE_TW];
            this.m_aLanguage[define.Define.LANGUAGE_EN][_sKey + "_" + Language.sMouseOver] = _arr[1][define.Define.LANGUAGE_EN];
            _arr = null;
        };
        BitmapManager.prototype.addBmpdLanguage_3 = function (_sKey, _arr) {
            this.m_aLanguage[define.Define.LANGUAGE_CN][_sKey] = _arr[define.Define.LANGUAGE_CN];
            this.m_aLanguage[define.Define.LANGUAGE_TW][_sKey] = _arr[define.Define.LANGUAGE_TW];
            this.m_aLanguage[define.Define.LANGUAGE_EN][_sKey] = _arr[define.Define.LANGUAGE_EN];
        };
        BitmapManager.prototype.initDialogBg = function () {
            this.bmpdDialogBg = MovieclipFrameToBitmapData.draw(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL, "Dialog_Bg_Asset"));
        };
        BitmapManager.prototype.initCard = function () {
            this.m_dicCard = new Dictionary();
            this.m_dicCardSmall = new Dictionary();
            this.m_dicCardBig = new Dictionary();
            var arr = ["s", "h", "c", "d"];
            var strA = "A";
            var strT = "T";
            var strJ = "J";
            var strQ = "Q";
            var strK = "K";
            var _w = 237;
            var _h = 330;
            var card;
            var cardBB = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "Card_BB");
            var cardBg = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "Card_Bg");
            this.m_dicCard["BB"] = BitmapUtil.snapshot(cardBB);
            this.m_dicCard["Bg"] = BitmapUtil.snapshot(cardBg);
            this.m_dicCardSmall["BB"] = BitmapUtil.snapshot(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "CardX_BB"));
            this.m_dicCardSmall["Bg"] = BitmapUtil.snapshot(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "CardX_Bg"));
            cardBB.width = _w;
            cardBB.height = _h;
            this.m_dicCardBig["BB"] = BitmapUtil.snapshot(cardBB, _w, _h);
            cardBg.width = _w;
            cardBg.height = _h;
            this.m_dicCardBig["Bg"] = BitmapUtil.snapshot(cardBg, _w, _h);
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 13; j++) {
                    switch (j) {
                        case 0:
                            card = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "Card_" + strA + arr[i]);
                            this.m_dicCard[strA + arr[i]] = BitmapUtil.snapshot(card);
                            this.m_dicCardSmall[strA + arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "CardX_" + strA + arr[i]));
                            card.width = 214;
                            card.height = 292;
                            this.m_dicCardBig[strA + arr[i]] = BitmapUtil.snapshot(card, 214, 292);
                            break;
                        case 9:
                            card = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "Card_" + strT + arr[i]);
                            this.m_dicCard[strT + arr[i]] = BitmapUtil.snapshot(card);
                            this.m_dicCardSmall[strT + arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "CardX_" + strT + arr[i]));
                            card.width = 214;
                            card.height = 292;
                            this.m_dicCardBig[strT + arr[i]] = BitmapUtil.snapshot(card, 214, 292);
                            break;
                        case 10:
                            card = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "Card_" + strJ + arr[i]);
                            this.m_dicCard[strJ + arr[i]] = BitmapUtil.snapshot(card);
                            this.m_dicCardSmall[strJ + arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "CardX_" + strJ + arr[i]));
                            card.width = 214;
                            card.height = 292;
                            this.m_dicCardBig[strJ + arr[i]] = BitmapUtil.snapshot(card, 214, 292);
                            break;
                        case 11:
                            card = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "Card_" + strQ + arr[i]);
                            this.m_dicCard[strQ + arr[i]] = BitmapUtil.snapshot(card);
                            this.m_dicCardSmall[strQ + arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "CardX_" + strQ + arr[i]));
                            card.width = 214;
                            card.height = 292;
                            this.m_dicCardBig[strQ + arr[i]] = BitmapUtil.snapshot(card, 214, 292);
                            break;
                        case 12:
                            card = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "Card_" + strK + arr[i]);
                            this.m_dicCard[strK + arr[i]] = BitmapUtil.snapshot(card);
                            this.m_dicCardSmall[strK + arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "CardX_" + strK + arr[i]));
                            card.width = 214;
                            card.height = 292;
                            this.m_dicCardBig[strK + arr[i]] = BitmapUtil.snapshot(card, 214, 292);
                            break;
                        default:
                            card = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "Card_" + String(j + 1) + arr[i]);
                            this.m_dicCard[String(j + 1) + arr[i]] = BitmapUtil.snapshot(card);
                            this.m_dicCardSmall[String(j + 1) + arr[i]] = BitmapUtil.snapshot(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CARD, "CardX_" + String(j + 1) + arr[i]));
                            card.width = 214;
                            card.height = 292;
                            this.m_dicCardBig[String(j + 1) + arr[i]] = BitmapUtil.snapshot(card, 214, 292);
                            break;
                    }
                }
            }
        };
        BitmapManager.prototype.initMultitableStransition = function () {
            this.m_dicMultiTrans = new Dictionary();
            var _mc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "Multi_Table_Item_Asset_4_default");
            _mc.gotoAndStop(Define.LANGUAGE_CN + 1);
            this.m_dicMultiTrans[Define.LANGUAGE_CN + Define.MULTI_TABLE_MODE_4] = BitmapUtil.snapshot(_mc);
            _mc.gotoAndStop(Define.LANGUAGE_TW + 1);
            this.m_dicMultiTrans[Define.LANGUAGE_TW + Define.MULTI_TABLE_MODE_4] = BitmapUtil.snapshot(_mc);
            _mc.gotoAndStop(Define.LANGUAGE_EN + 1);
            this.m_dicMultiTrans[Define.LANGUAGE_EN + Define.MULTI_TABLE_MODE_4] = BitmapUtil.snapshot(_mc);
            _mc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "Multi_Table_Item_Asset_8_default");
            _mc.gotoAndStop(Define.LANGUAGE_CN + 1);
            this.m_dicMultiTrans[Define.LANGUAGE_CN + Define.MULTI_TABLE_MODE_8] = BitmapUtil.snapshot(_mc);
            _mc.gotoAndStop(Define.LANGUAGE_TW + 1);
            this.m_dicMultiTrans[Define.LANGUAGE_TW + Define.MULTI_TABLE_MODE_8] = BitmapUtil.snapshot(_mc);
            _mc.gotoAndStop(Define.LANGUAGE_EN + 1);
            this.m_dicMultiTrans[Define.LANGUAGE_EN + Define.MULTI_TABLE_MODE_8] = BitmapUtil.snapshot(_mc);
            _mc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "Multi_Table_Item_Asset_16_default");
            _mc.gotoAndStop(Define.LANGUAGE_CN + 1);
            this.m_dicMultiTrans[Define.LANGUAGE_CN + Define.MULTI_TABLE_MODE_16] = BitmapUtil.snapshot(_mc);
            _mc.gotoAndStop(Define.LANGUAGE_TW + 1);
            this.m_dicMultiTrans[Define.LANGUAGE_TW + Define.MULTI_TABLE_MODE_16] = BitmapUtil.snapshot(_mc);
            _mc.gotoAndStop(Define.LANGUAGE_EN + 1);
            this.m_dicMultiTrans[Define.LANGUAGE_EN + Define.MULTI_TABLE_MODE_16] = BitmapUtil.snapshot(_mc);
            if (_mc) {
                _mc = null;
            }
        };
        BitmapManager.prototype.initTableBg = function () {
            this.m_aTableBg = [];
            var _mc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE, "Table_bg_Asset");
            _mc.gotoAndStop(1);
            this.m_aTableBg[0] = BitmapUtil.snapshot(_mc);
            _mc.gotoAndStop(2);
            this.m_aTableBg[1] = BitmapUtil.snapshot(_mc);
            if (_mc) {
                _mc = null;
            }
        };
        BitmapManager.prototype.initTableBgHover = function () {
            var _mc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE, "Lobby_Table_Hover_Asset");
            var _len = _mc.totalFrames;
            var _bmpd;
            aTableBgHover = [];
            for (var i = 0; i < _len; i++) {
                _mc.gotoAndStop(i + 1);
                _bmpd = new BitmapData(_mc.width + 20, _mc.height + 20, true, 0);
                _bmpd.draw(_mc);
                aTableBgHover[i] = _bmpd;
            }
            if (_bmpd) {
                _bmpd = null;
            }
            if (_mc) {
                _mc = null;
            }
        };
        BitmapManager.prototype.initMultitableBg = function () {
            this.m_dicMultitableBg = new Dictionary();
            var _mc;
            var _bmd;
            var _fillBmd;
            var pt = new Point(0, 0);
            _mc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "Table_bg_Asset_4");
            _bmd = BitmapUtil.snapshot(_mc);
            _fillBmd = new BitmapData(426, 240);
            _fillBmd.copyPixels(_bmd, new Rectangle(11, 11, 426, 240), pt);
            _bmd.fillRect(new Rectangle(11, 11, 426, 240), 0x00000000);
            this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_4] = _bmd;
            this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_4 + 100] = _fillBmd;
            _mc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "Table_bg_Asset_8");
            _bmd = BitmapUtil.snapshot(_mc);
            _fillBmd = new BitmapData(426, 240);
            _fillBmd.copyPixels(_bmd, new Rectangle(11, 11, 426, 240), pt);
            _bmd.fillRect(new Rectangle(11, 11, 426, 240), 0x00000000);
            this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_8] = _bmd;
            this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_8 + 100] = _fillBmd;
            _mc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "Table_bg_Asset_16");
            _bmd = BitmapUtil.snapshot(_mc);
            _fillBmd = new BitmapData(389, 242);
            _fillBmd.copyPixels(_bmd, new Rectangle(11, 11, 389, 242), pt);
            _bmd.fillRect(new Rectangle(11, 11, 389, 242), 0x00000000);
            this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_16] = _bmd;
            this.m_dicMultitableBg[Define.MULTI_TABLE_MODE_16 + 100] = _fillBmd;
            if (_mc) {
                _mc = null;
            }
        };
        BitmapManager.prototype.initTableDefault = function () {
            this.m_dicTable = new Dictionary();
            var _mc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE, "Table_Default_Asset");
            _mc.gotoAndStop(1);
            this.m_dicTable[Define.LANGUAGE_CN] = BitmapUtil.snapshot(_mc);
            _mc.gotoAndStop(2);
            this.m_dicTable[Define.LANGUAGE_TW] = BitmapUtil.snapshot(_mc);
            _mc.gotoAndStop(3);
            this.m_dicTable[Define.LANGUAGE_EN] = BitmapUtil.snapshot(_mc);
        };
        return BitmapManager;
    }());
    manager.BitmapManager = BitmapManager;
    __reflect(BitmapManager.prototype, "manager.BitmapManager");
})(manager || (manager = {}));
//# sourceMappingURL=BitmapManager.js.map