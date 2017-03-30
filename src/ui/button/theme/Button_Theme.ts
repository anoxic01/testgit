module ui.button.theme {
	export class Button_Theme extends Button{

		//方式一
		// private btn : eui.Button;	

		//方式二
		private m_bg_default;
		private m_bg_over;
		private m_icon_default;
		private m_icon_over;
		private m_label_default;
		private m_label_over;

		public bSelect :  boolean = false;
		
		public constructor($arr:string[], $fClick:Function) {
			
			super($arr, $fClick);

			/*this.btn = new eui.Button();
			this.btn.skinName = "resource/eui_skins/button/theme/ButtonSkin_Theme_0.exml";
			this.addChild(this.btn);
			this.touchEnabled = true;
       		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);  
			console.log("初始化 theme_0 按钮!");*/

			
			this.m_bg_default = manager.ResourceManager.getInstance().createBitmapByName(this.arr[0]);
			this.addChild(this.m_bg_default);			
			this.m_bg_over = manager.ResourceManager.getInstance().createBitmapByName(this.arr[1]);
			
			this.m_icon_default = manager.ResourceManager.getInstance().createBitmapByName(this.arr[2]);
			this.addChild(this.m_icon_default);
			this.m_icon_over = manager.ResourceManager.getInstance().createBitmapByName(this.arr[3]);
			this.m_icon_default.x = 53;
			this.m_icon_default.y = 23;
			this.m_icon_over.x = 53;
			this.m_icon_over.y = 23;
			
			this.onChangeLanguage();
			this.onOut(null);
		}
		
		protected onOver(evt:egret.TouchEvent):void{
			if(this.bSelect){
				return;
			}
			// console.log("mouse over ...........................");
			this.over();
		}
		protected over():void{
			if(this.contains(this.m_bg_over)==false){
				this.addChild(this.m_bg_over);
			}
			if(this.contains(this.m_bg_default)){
				this.removeChild(this.m_bg_default);
			}

			if(this.contains(this.m_icon_over)==false){
				this.addChild(this.m_icon_over);
			}
			if(this.contains(this.m_icon_default)){
				this.removeChild(this.m_icon_default);
			}

			if(this.contains(this.m_label_over)==false){
				this.addChild(this.m_label_over);
			}
			if(this.contains(this.m_label_default)){
				this.removeChild(this.m_label_default);
			}
		}
		protected onOut(evt:egret.TouchEvent):void{
			if(this.bSelect){
				return;
			}
			this.out();
		}
		protected out():void{
			if(this.contains(this.m_bg_default)==false){
				this.addChild(this.m_bg_default);
			}
			if(this.contains(this.m_bg_over)){
				this.removeChild(this.m_bg_over);
			}

			if(this.contains(this.m_icon_default)==false){
				this.addChild(this.m_icon_default);
			}
			if(this.contains(this.m_icon_over)){
				this.removeChild(this.m_icon_over);
			}

			if(this.contains(this.m_label_default)==false){
				this.addChild(this.m_label_default);
			}
			if(this.contains(this.m_label_over)){
				this.removeChild(this.m_label_over);
			}
		}

		protected onTouch(e:egret.TouchEvent):void{
			this.onClick();
		}
		protected onClick():void{
			
		}

		public disabled():void{
			this.touchEnabled = false;
			// this.btn.currentState = "disabled";
		}

		public setSelect(value: boolean):void{
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
			if(this.m_label_default){
				if(this.contains(this.m_label_default)){
					this.removeChild(this.m_label_default);
				}
				this.m_label_default = null;
			}
			if(this.m_label_over){
				if(this.contains(this.m_label_over)){
					this.removeChild(this.m_label_over);
				}
				this.m_label_over = null;
			}
			switch(manager.LobbyManager.getInstance().lobbyAuth.Lang){
				case 0:
				this.m_label_default = manager.ResourceManager.getInstance().createBitmapByName(this.arr[4]);
				this.addChild(this.m_label_default);
				this.m_label_over = manager.ResourceManager.getInstance().createBitmapByName(this.arr[5]);
				// this.addChild(this.label_over);
				break;

				case 1:
				case 2:
				this.m_label_default = manager.ResourceManager.getInstance().createBitmapByName(this.arr[6]);
				this.addChild(this.m_label_default);
				this.m_label_over = manager.ResourceManager.getInstance().createBitmapByName(this.arr[7]);
				// this.addChild(this.label_over);
				break;
			}
			if(this.m_label_default){
				this.m_label_default.x = 122;
				this.m_label_default.y = 39;
			}
			if(this.m_label_over){
				this.m_label_over.x = 122;
				this.m_label_over.y = 39;
			}
		}
	}
}