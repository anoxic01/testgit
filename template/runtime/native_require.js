
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/modules/mouse/mouse.js",
	"bin-debug/lobby/view/BSprite.js",
	"bin-debug/ui/button/Button.js",
	"bin-debug/language/Language.js",
	"bin-debug/lobby/view/panel/PanelWindow.js",
	"bin-debug/lobby/view/table/Table.js",
	"bin-debug/lobby/view/windows/MessageWindow.js",
	"bin-debug/ui/button/Button_Tool.js",
	"bin-debug/ui/button/theme/Button_Theme.js",
	"bin-debug/lobby/view/theme/QuickThemeList.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/lobby/data/LobbyAuth.js",
	"bin-debug/lobby/data/LobbyData.js",
	"bin-debug/lobby/struct/Struct_CharterSetting.js",
	"bin-debug/lobby/struct/Struct_StaticsInfo.js",
	"bin-debug/lobby/struct/Struct_Table.js",
	"bin-debug/lobby/struct/Struct_Theme.js",
	"bin-debug/lobby/view/BFrame.js",
	"bin-debug/Main.js",
	"bin-debug/lobby/view/LobbyInformation.js",
	"bin-debug/lobby/view/LobbyToolList.js",
	"bin-debug/lobby/view/LobbyView.js",
	"bin-debug/lobby/view/advertisements/Advertisement.js",
	"bin-debug/lobby/view/game/SpGame.js",
	"bin-debug/lobby/view/lives/LiveVideo.js",
	"bin-debug/lobby/view/notice/NoticeManeger.js",
	"bin-debug/lobby/view/other/MouseFollow.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/lobby/view/quick/QuickTable.js",
	"bin-debug/lobby/view/quick/QuickTableList.js",
	"bin-debug/lobby/view/route/StatisticsUI.js",
	"bin-debug/config/TemConfig.js",
	"bin-debug/lobby/view/table/TableBaccarat.js",
	"bin-debug/lobby/view/table/TableDTF.js",
	"bin-debug/lobby/view/table/TableLogin.js",
	"bin-debug/lobby/view/table/TableRoulette.js",
	"bin-debug/lobby/view/table/TableSic.js",
	"bin-debug/lobby/view/table/Table_Lobby.js",
	"bin-debug/lobby/view/theme/MobileAppUI.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/lobby/view/theme/ThemeItem.js",
	"bin-debug/lobby/view/theme/ThemeList.js",
	"bin-debug/lobby/view/windows/GameMsgWnd.js",
	"bin-debug/define/Define.js",
	"bin-debug/manager/BitmapManager.js",
	"bin-debug/manager/LobbyManager.js",
	"bin-debug/manager/MobileAppManager.js",
	"bin-debug/manager/ResourceManager.js",
	"bin-debug/manager/TextManager.js",
	"bin-debug/tool/BitmapLanguageUtil.js",
	"bin-debug/tool/BitmapNumberUtil.js",
	"bin-debug/tool/BitmapUtil.js",
	"bin-debug/define/GameDefine.js",
	"bin-debug/ui/button/Button_Language.js",
	"bin-debug/ui/button/Button_Recharge.js",
	"bin-debug/ui/button/Button_Refresh.js",
	"bin-debug/define/JoinTableType.js",
	"bin-debug/ui/button/Button_ZoomIn.js",
	"bin-debug/define/MobileDefine.js",
	"bin-debug/ui/button/theme/Button_Theme_0.js",
	"bin-debug/ui/button/theme/Button_Theme_1.js",
	"bin-debug/ui/button/theme/Button_Theme_2.js",
	"bin-debug/ui/button/theme/Button_Theme_3.js",
	"bin-debug/ui/button/theme/Button_Theme_4.js",
	"bin-debug/ui/button/theme/Button_Theme_5.js",
	"bin-debug/ui/button/theme/Button_Theme_6.js",
	"bin-debug/ui/button/tool_list/Button_Channel.js",
	"bin-debug/ui/button/tool_list/Button_Detail.js",
	"bin-debug/ui/button/tool_list/Button_Exit.js",
	"bin-debug/ui/button/tool_list/Button_Exit_FullScreen.js",
	"bin-debug/ui/button/tool_list/Button_FullScreen.js",
	"bin-debug/ui/button/tool_list/Button_HD.js",
	"bin-debug/ui/button/tool_list/Button_Other.js",
	"bin-debug/ui/button/tool_list/Button_PersonInfo.js",
	"bin-debug/ui/button/tool_list/Button_Record.js",
	"bin-debug/ui/button/tool_list/Button_SD.js",
	"bin-debug/ui/button/tool_list/Button_Setting.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1920,
		contentHeight: 1080,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};