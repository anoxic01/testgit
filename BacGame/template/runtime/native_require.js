
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/mouse/mouse.js",
	"polyfill/promise.js",
	"bin-debug/com/game/base/BaseView.js",
	"bin-debug/com/game/base/BaseComponent.js",
	"bin-debug/com/game/base/JClip.js",
	"bin-debug/com/game/utils/Dictionary.js",
	"bin-debug/com/game/bac/effects/BaseEffect.js",
	"bin-debug/com/game/bac/roadMap/items/BaseRoadMapItem.js",
	"bin-debug/com/game/bac/views/UI/GameUI.js",
	"bin-debug/com/game/bac/effects/HalfMoveTarget.js",
	"bin-debug/com/game/bac/effects/TransformTarget.js",
	"bin-debug/com/game/bac/betArea/BetAreaSeatItem.js",
	"bin-debug/com/game/bac/roadMap/items/IRoadMapItem.js",
	"bin-debug/com/game/bac/roadMap/items/RoadMapBigEyeRoadItem.js",
	"bin-debug/com/game/bac/roadMap/items/RoadMapBigRoadItem.js",
	"bin-debug/com/game/bac/roadMap/items/RoadMapMainItem.js",
	"bin-debug/com/game/bac/roadMap/items/RoadMapRoachRoadItem.js",
	"bin-debug/com/game/bac/roadMap/items/RoadMapSmallRoadItem.js",
	"bin-debug/com/game/bac/roadMap/RoadMap.js",
	"bin-debug/com/game/bac/roadMap/RoadMapDrawer.js",
	"bin-debug/com/game/bac/roadMap/RoadMapInfo.js",
	"bin-debug/com/game/bac/roadMap/RoadMapUtils.js",
	"bin-debug/com/game/bac/roadMap/RoadStringObject.js",
	"bin-debug/com/game/bac/views/UI/BetAreaUI.js",
	"bin-debug/com/game/bac/views/UI/BetSubmitContentUI.js",
	"bin-debug/com/game/bac/views/UI/BetSubmitUI.js",
	"bin-debug/com/game/bac/views/UI/DealCardUI.js",
	"bin-debug/com/game/bac/views/UI/GameStatusUI.js",
	"bin-debug/com/game/bac/betArea/BetAreaItem.js",
	"bin-debug/com/game/bac/views/UI/RoadMapUI.js",
	"bin-debug/com/game/bac/cards/Card.js",
	"bin-debug/com/game/bac/cards/CardImage.js",
	"bin-debug/com/game/base/FrameLabel.js",
	"bin-debug/com/game/base/JBitmapClip.js",
	"bin-debug/com/game/bac/cards/CardUtils.js",
	"bin-debug/com/game/interfaces/IClip.js",
	"bin-debug/com/game/interfaces/IJuggle.js",
	"bin-debug/com/game/manager/GameDataManager.js",
	"bin-debug/com/game/manager/GameManager.js",
	"bin-debug/com/game/manager/JuggleManager.js",
	"bin-debug/com/game/manager/LanguageManager.js",
	"bin-debug/com/game/manager/ViewManager.js",
	"bin-debug/com/game/utils/ClipUtils.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/com/game/utils/FrameScript.js",
	"bin-debug/com/game/utils/GameUtils.js",
	"bin-debug/com/game/utils/JDelayFramer.js",
	"bin-debug/com/game/utils/JDelayTimer.js",
	"bin-debug/com/game/utils/JFramer.js",
	"bin-debug/com/game/utils/JFrameTicker.js",
	"bin-debug/com/game/utils/JTimer.js",
	"bin-debug/com/game/utils/JuggleAdvanceTick.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
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
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 1920,
		contentHeight: 1080,
		showPaintRect: false,
		showFPS: true,
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