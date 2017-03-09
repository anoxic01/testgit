var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var struct;
    (function (struct) {
        var Struct_Table = (function () {
            function Struct_Table() {
                this.DealerLoginID = ""; //荷官序号
                this.DealerName = ""; //荷官名称
                this.DealerPhotoUrl = ""; //荷官相片
                this.GameLogUrl = ""; //游戏输出
                this.GameRuleUrl = ""; //游戏规则
                this.GameStatus = ""; //游戏状态
                this.JoinTbStatus = ""; //进桌状态	進桌狀態 格式: 0000000
                this.LastRoadMap = ""; //最新数据	(单个路纸)
                this.ManagerLoginID = ""; //经理账号
                this.ManagerName = ""; //经理名称
                this.ManagerPhotoUrl = ""; //经理相片
                this.OnlineCustServiceUrl = ""; //线上客服
                this.RoadMaps = ""; //路单描述
                this.ServerIP = ""; //连接地址
                this.StreamAppName = ""; //应用名称
                this.StreamName = ""; //视讯名称
                this.StreamUrl = ""; //视讯地址
                this.TableName_EN = ""; //桌子名称
                this.TableName_TW = ""; //桌子名称
                this.TableName_CN = ""; //桌子名称
                /**客户端
                 // 單桌進桌
                 public byte SINGEL = 0;
                 // 競瞇下注進桌
                 public byte PEEK_TABLEER = 1;
                 // 競瞇旁觀下注進桌
                 public byte PEEK_OTHER = 2;
                 // 包桌桌主進桌
                 public byte CHARTER_TABLE_OWNER = 3;
                 // 包桌進桌下注進桌
                 public byte CHARTER_TABLER = 4;
                 // 包桌旁觀下注進桌
                 public byte CHARTER_OTHER = 5;
                 // 多桌進桌
                 public byte MULTIPLE = 6;
                 */
                this.joinTableType = lobby.define.JoinTableType.NORMAL_PAIR_TABLE_SEAT;
                this.joinTbPwd = null;
                this.ThemeName = ""; //厅馆名称
                this.BetLimitID_Panel = -1; //限红序号
            }
            return Struct_Table;
        }());
        struct.Struct_Table = Struct_Table;
        __reflect(Struct_Table.prototype, "lobby.struct.Struct_Table");
    })(struct = lobby.struct || (lobby.struct = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=Struct_Table.js.map