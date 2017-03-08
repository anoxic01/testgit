module ui.button.theme {
	export class Button_Theme extends egret.DisplayObjectContainer{

		//方式一
		// private btn : eui.Button;	

		//方式二
		private btn_bg;
		private btn_bg_default;
		private btn_bg_over;
		private icon;
		private icon_default;
		private icon_over;
		private label;
		private label_default;
		private label_over;

		private arr:string[];
		public bSelect : boolean = false;

		/*
			$bClick, 是否添加点击侦听
		*/
		public constructor($arr:string[], $bClick:boolean) {
			super();
			this.arr = $arr;

			/*this.btn = new eui.Button();
			this.btn.skinName = "resource/eui_skins/button/theme/ButtonSkin_Theme_0.exml";
			this.addChild(this.btn);
			this.touchEnabled = true;
       		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);  
			console.log("初始化 theme_0 按钮!");*/

			this.touchEnabled = true;
			mouse.setButtonMode(this, true);
			mouse.setMouseMoveEnabled(true);

			this.btn_bg_default = tool.BitmapTool.getInstance().createBitmapByName(this.arr[0]);
			this.addChild(this.btn_bg_default);			
			this.btn_bg_over = tool.BitmapTool.getInstance().createBitmapByName(this.arr[1]);
						

			this.icon_default = tool.BitmapTool.getInstance().createBitmapByName(this.arr[2]);
			this.addChild(this.icon_default);
			this.icon_over = tool.BitmapTool.getInstance().createBitmapByName(this.arr[3]);
			this.icon_default.x = 53;
			this.icon_default.y = 23;
			this.icon_over.x = 53;
			this.icon_over.y = 23;
			
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.onOut, this);
			if($bClick){
				this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);  
			}
			
			this.onChangeLanguage();
			this.onOut(null);

		}
		
		private onOver(evt:egret.TouchEvent):void{
			if(this.bSelect){
				return;
			}
			// console.log("mouse over ...........................");
			this.over();
		}
		private over():void{
			if(this.contains(this.btn_bg_over)==false){
				this.addChild(this.btn_bg_over);
			}
			if(this.contains(this.btn_bg_default)){
				this.removeChild(this.btn_bg_default);
			}

			if(this.contains(this.icon_over)==false){
				this.addChild(this.icon_over);
			}
			if(this.contains(this.icon_default)){
				this.removeChild(this.icon_default);
			}

			if(this.contains(this.label_over)==false){
				this.addChild(this.label_over);
			}
			if(this.contains(this.label_default)){
				this.removeChild(this.label_default);
			}
		}
		private onOut(evt:egret.TouchEvent):void{
			if(this.bSelect){
				return;
			}
			this.out();
		}
		private out():void{
			if(this.contains(this.btn_bg_default)==false){
				this.addChild(this.btn_bg_default);
			}
			if(this.contains(this.btn_bg_over)){
				this.removeChild(this.btn_bg_over);
			}

			if(this.contains(this.icon_default)==false){
				this.addChild(this.icon_default);
			}
			if(this.contains(this.icon_over)){
				this.removeChild(this.icon_over);
			}

			if(this.contains(this.label_default)==false){
				this.addChild(this.label_default);
			}
			if(this.contains(this.label_over)){
				this.removeChild(this.label_over);
			}
		}

		private onTouch(e:egret.TouchEvent):void{
			this.onClick();
		}
		protected onClick():void{
			
		}

		public disabled():void{
			this.touchEnabled = false;
			// this.btn.currentState = "disabled";
		}

		public setSelect(value:boolean):void{
			if(this.bSelect != value){
				this.bSelect = value;

				if(this.bSelect == true){
					this.over();
				}else{
					this.out();
				}
			}

		}

		public onChangeLanguage():void{
			if(this.label_default){
				if(this.contains(this.label_default)){
					this.removeChild(this.label_default);
				}
				this.label_default = null;
			}
			if(this.label_over){
				if(this.contains(this.label_over)){
					this.removeChild(this.label_over);
				}
				this.label_over = null;
			}
			switch(manager.LobbyManager.getInstance().lobbyAuth.iLang){
				case 0:
				this.label_default = tool.BitmapTool.getInstance().createBitmapByName(this.arr[4]);
				this.addChild(this.label_default);
				this.label_over = tool.BitmapTool.getInstance().createBitmapByName(this.arr[5]);
				// this.addChild(this.label_over);
				break;

				case 1:
				case 2:
				this.label_default = tool.BitmapTool.getInstance().createBitmapByName(this.arr[6]);
				this.addChild(this.label_default);
				this.label_over = tool.BitmapTool.getInstance().createBitmapByName(this.arr[7]);
				// this.addChild(this.label_over);
				break;
			}
			if(this.label_default){
				this.label_default.x = 122;
				this.label_default.y = 39;
			}
			if(this.label_over){
				this.label_over.x = 122;
				this.label_over.y = 39;
			}
		}
	}
}