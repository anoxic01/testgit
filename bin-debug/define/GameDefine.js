var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var define;
(function (define) {
    var GameDefine = (function () {
        function GameDefine() {
        }
        return GameDefine;
    }());
    /** 游戏名称 **/
    GameDefine.BAC_NAME = "GameBaccarat";
    GameDefine.DTF_NAME = "GameDrTi";
    GameDefine.ROU_NAME = "GameRoulette";
    GameDefine.SIC_NAME = "GameSicBo";
    GameDefine.TEL_BAC_NAME = "Tel_GameBaccarat";
    GameDefine.TEL_BAC_SIDE_NAME = "Tel_GameBaccarat_Side";
    GameDefine.ROBOT_BAC_NAME = "GameMachineBaccarat";
    GameDefine.BAC_MULTI_NAME = "GameBaccaratMulti";
    /** 游戏类型 **/
    GameDefine.LOBBY = 0; //大厅
    GameDefine.BAC = 1; //百家乐
    GameDefine.SIC = 2; //骰宝
    GameDefine.ROU = 3; //轮盘
    GameDefine.DTF = 4; //龙虎
    GameDefine.TEL_BAC = 5; //電投百家
    GameDefine.TEL_LOBBY = 6; //電投大廳
    GameDefine.MACHINE_BAC = 7; //機械臂百家
    GameDefine.BAC_MIN = 100; //好路百家
    GameDefine.BAC_PANEL = 101; //好路百家操作
    GameDefine.GAME = 999; //游戏
    /** 进桌方式 **/
    GameDefine.SINGEL = 0; //一般進桌不配位
    GameDefine.NORMAL_PAIR_TABLE_SEAT = 1; //一般進桌(配桌配位)
    GameDefine.PEEK_TABLEER = 2; //競瞇下注進桌
    GameDefine.PEEK_OTHER = 3; //競瞇旁觀下注進桌
    GameDefine.CHARTER_TABLE_OWNER = 4; //包桌桌主進桌
    GameDefine.CHARTER_TABLER = 5; //包桌進桌下注進桌
    GameDefine.CHARTER_OTHER = 6; //包桌旁觀下注進桌
    GameDefine.MULTIPLE = 7; //多桌進桌
    GameDefine.TELBET = 8; //電投進桌
    GameDefine.DEPUTY = 9; //槍手進桌
    /** 好路提示类型 **/
    GameDefine.GOOD_ROAD_TYPE_1 = 1; //.長庄
    GameDefine.GOOD_ROAD_TYPE_2 = 2; //.長閑
    GameDefine.GOOD_ROAD_TYPE_3 = 3; //.拍拍黐
    GameDefine.GOOD_ROAD_TYPE_4 = 4; //.大路單跳
    GameDefine.GOOD_ROAD_TYPE_5 = 5; //.一廳兩房(庄)
    GameDefine.GOOD_ROAD_TYPE_6 = 6; //.一廳兩房(閑)
    GameDefine.GOOD_ROAD_TYPE_7 = 7; //.逢庄黐
    GameDefine.GOOD_ROAD_TYPE_8 = 8; //.逢閑黐
    GameDefine.GOOD_ROAD_TYPE_9 = 9; //.隔黐庄
    GameDefine.GOOD_ROAD_TYPE_10 = 10; //.隔黐閑
    /**獨享*/
    GameDefine.SINGLE = 0;
    /**密碼可進*/
    GameDefine.PRIVATE = 1;
    /**公開*/
    GameDefine.PUBLIC = 2;
    /**游戏操作*/
    GameDefine.BET = 1;
    GameDefine.CANCEL_BET = 2;
    GameDefine.REBET = 3;
    GameDefine.EXIT_GAME = 10;
    /**咪牌进度*/
    GameDefine.PEEK_PROCCESS = 11;
    /**咪牌翻牌*/
    GameDefine.OPEN_PEEKCARD = 12;
    /**桌主操作*/
    GameDefine.CHARTER_OPERATION = 13;
    /**补全路纸**/
    GameDefine.COMPLEMENTED_ROADMAP = 40; /// 补全路纸
    /**桌主操作类型*/
    GameDefine.OPERATION_CHANGE_DEALER = 0; // 更換荷官
    GameDefine.OPERATION_CHANGE_SHOE = 1; //	更換牌靴
    GameDefine.OPERATION_FLY_POKER = 2; // 飛牌
    GameDefine.OPERATION_START_BET = 3; // 開始下注
    GameDefine.OPERATION_DEAL_POKER = 4; // 開牌
    /************************登入错误返回值************************************************/
    GameDefine.ENTER_OK = 0;
    GameDefine.ENTER_FAIL = 1;
    GameDefine.ENTER_INVALID = 2;
    GameDefine.ENTER_NO_AVAILABLE_SEAT = 3;
    GameDefine.ENTER_TABLE_OWNER_EXIST = 4;
    //public static BOSS_NOT_LOGIN					:	number 	= 	5;
    GameDefine.ENTER_JOIN_TB_TYPE_NOT_EXIST = 6;
    GameDefine.ENTER_JOIN_TB_DATA_INCORRECT = 7;
    GameDefine.ENTER_BALANCE_NOT_ENOUGH = 8;
    GameDefine.ENTER_JOIN_TB_PASSWORD_INVAILD = 9; // 進桌密碼不正確
    GameDefine.ENTER_OVER_PLAYERS_LIMIT = 10;
    GameDefine.ENTER_TABLE_IS_PRIVATE = 11; // 賭桌獨享
    GameDefine.ENTER_CHARTER_TYPE_IS_NOT_CORRECT = 12; // 包桌狀態不對
    GameDefine.ENTER_TIMEOUT = 13; // 逾時
    GameDefine.ENTER_PROTOCOL_VER_MISMATCH = 14; // 通訊版本不對
    GameDefine.ENTER_TRY_ACCOUNT_PERMISSION_DENY = 15; //試玩帳號 權限拒絕
    GameDefine.ENTER_PERMISSION_DENY = 16; //權限不允许，信用账号 枪手
    GameDefine.ENTER_MASTER_EXIT = 17; //桌主已离开
    GameDefine.ENTER_NOT_FINISH = 18; //此局尚未结束
    GameDefine.ENTER_MAINTAIN = 19; //维护中
    GameDefine.ROAD_MAP_ERROR = 20; //路紙錯誤
    GameDefine.ENTER_SERVER_BUSY = 21; //服務器忙碌中,需重新登入
    GameDefine.ENTER_CLOSED = 22; //赌桌关闭
    GameDefine.ENTER_NOSETTLED = 23; //玩家帳未結清
    GameDefine.ENTER_MAINTAIN_ALL = 24; //全站维护
    GameDefine.ENTER_MAINTAIN_THEME = 25; //厅馆维护
    GameDefine.ENTER_MAINTAIN_TABLE = 26; //赌桌维护
    GameDefine.ENTER_MAINTAIN_AGENT = 27; //代理维护
    GameDefine.ENTER_DIFFERENT_IP = 28; //玩家IP不同
    GameDefine.ENTER_SEAT_FAIL = 29; //保留進桌失败
    GameDefine.ENTER_PERMISSION_30 = 30; //不允許 進入 網投桌(信用帳戶 限制 )
    /************************登入错误返回END************************************************/
    /**押注回復*/
    GameDefine.BET_ERROR = -1; // 押注錯誤
    GameDefine.BET_ACCEPT = 0; // 押注成功
    GameDefine.BET_NOT_ENOUGH_MONY = 1; // 餘額不夠
    GameDefine.BET_OVER_SELF_LIMIT = 2; //超過玩家自選限紅
    GameDefine.BET_UNDER_SELF_LIMIT = 3; //低於玩家自選限紅
    GameDefine.BET_OVER_TABLE_LIMIT = 4; //超過賭桌限紅  (赌桌总投注额)
    GameDefine.BET_UNDER_TABLE_LIMIT = 5; //低於賭桌限紅
    GameDefine.BET_LIMIT_NOT_FOUND = 6; // 找不到押注上下限模式
    GameDefine.BET_POSITION_NOT_FOUND = 7; // 找不到押注位置
    GameDefine.BET_POSITION_DISABLE = 8; // 该位置不允许下注
    GameDefine.BET_TIME_OUT = 9; // 押注逾時
    GameDefine.BET_OFF_TIME = 10; // 非押注時間不允許下注
    /**下注限額判斷*/
    GameDefine.BETLIMIT_UNDER = 2; //下注額度低於最小額度
    GameDefine.BETLIMIT_OVER = 3; //此押注區已達押注上限
    /**老闆給小費*/
    GameDefine.TEL_BOSS_GIVE_CHIPS_SUCCESS = 0; //老闆給小費成功
    GameDefine.TEL_BOSS_GIVE_CHIPS_FAILED = 1; //老闆給小費失敗
    GameDefine.CHIP_LIST = [10, 50, 100, 300, 500, 1000, 3000, 5000, 10000, 30000, 50000, 100000, 300000, 500000];
    /** 缓动速度 **/
    GameDefine.CHIP_SPEED = 0.8;
    GameDefine.COUNTDOWN_SPEED = 0.3;
    GameDefine.TWEEN_SPEED = 0.35;
    GameDefine.Transition_TableInfo = "Transition_TableInfo";
    GameDefine.Transition_Route = "Transition_Route";
    GameDefine.Transition_CountDown = "Transition_CountDown";
    GameDefine.Transition_GoodRoad = "Transition_GoodRoad";
    define.GameDefine = GameDefine;
    __reflect(GameDefine.prototype, "define.GameDefine");
})(define || (define = {}));
//# sourceMappingURL=GameDefine.js.map