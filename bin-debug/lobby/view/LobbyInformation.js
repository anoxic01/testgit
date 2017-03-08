var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var LobbyInformation = (function (_super) {
            __extends(LobbyInformation, _super);
            function LobbyInformation() {
                var _this = _super.call(this) || this;
                _this.txt_y = 21;
                var information = new egret.DisplayObjectContainer();
                _this.addChild(information);
                var logo = tool.BitmapTool.getInstance().createBitmapByName("logo_png");
                _this.addChild(logo);
                var line_top = tool.BitmapTool.getInstance().createBitmapByName("line_top_png");
                _this.addChild(line_top);
                line_top.x = 256;
                line_top.y = 49;
                var iocn_me = tool.BitmapTool.getInstance().createBitmapByName("icon_me_png");
                _this.addChild(iocn_me);
                iocn_me.x = 235;
                iocn_me.y = 15;
                _this.txt_name = new egret.TextField();
                _this.addChild(_this.txt_name);
                _this.txt_name.textColor = 0x5EB0C1;
                _this.txt_name.size = 22;
                _this.txt_name.text = "eason maaaaaaaa";
                _this.txt_name.x = 276;
                _this.txt_name.y = _this.txt_y;
                var cut_off_line_0 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
                _this.addChild(cut_off_line_0);
                cut_off_line_0.x = 465;
                cut_off_line_0.y = 16;
                var icon_money = tool.BitmapTool.getInstance().createBitmapByName("icon_money_png");
                _this.addChild(icon_money);
                icon_money.x = 477;
                icon_money.y = 10;
                _this.txt_money = new egret.TextField();
                _this.addChild(_this.txt_money);
                _this.txt_money.textColor = 0xFFCC00;
                _this.txt_money.size = 22;
                _this.txt_money.text = "1,123,456.00";
                _this.txt_money.x = 514;
                _this.txt_money.y = _this.txt_y;
                var btn_recharge = new ui.button.Button_Recharge();
                _this.addChild(btn_recharge);
                btn_recharge.x = 655;
                btn_recharge.y = 14;
                var cut_off_line_1 = tool.BitmapTool.getInstance().createBitmapByName("cut_off_line_png");
                _this.addChild(cut_off_line_1);
                cut_off_line_1.x = 696;
                cut_off_line_1.y = 16;
                var icon_online = tool.BitmapTool.getInstance().createBitmapByName("icon_online_png");
                _this.addChild(icon_online);
                icon_online.x = 719;
                icon_online.y = 21;
                _this.txt_online = new egret.TextField();
                _this.addChild(_this.txt_online);
                _this.txt_online.textColor = 0xffffff;
                _this.txt_online.size = 22;
                _this.txt_online.text = "1,234";
                _this.txt_online.x = 761;
                _this.txt_online.y = _this.txt_y;
                return _this;
            }
            LobbyInformation.prototype.setName = function (str) {
                if (this.txt_name != null) {
                    this.txt_name.text = str;
                }
            };
            LobbyInformation.prototype.setMoney = function (str) {
                if (this.txt_money != null) {
                    this.txt_money.text = str;
                }
            };
            LobbyInformation.prototype.setOnline = function (str) {
                if (this.txt_online != null) {
                    this.txt_online.text = str;
                }
            };
            return LobbyInformation;
        }(egret.DisplayObjectContainer));
        view.LobbyInformation = LobbyInformation;
        __reflect(LobbyInformation.prototype, "lobby.view.LobbyInformation");
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=LobbyInformation.js.map