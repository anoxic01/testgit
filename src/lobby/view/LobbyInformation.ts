module lobby.view {
	export class LobbyInformation extends egret.DisplayObjectContainer {
		
		private txt_name 	: 	egret.TextField;
		private txt_money	:	egret.TextField;
		private txt_online	:	egret.TextField;

		private txt_y		:	number	=	21;
		
		public constructor() {
			super();

			let information  = new egret.DisplayObjectContainer();
			this.addChild(information);

			let logo = manager.ResourceManager.getInstance().createBitmapByName("logo_png");
			this.addChild(logo);

			let line_top = manager.ResourceManager.getInstance().createBitmapByName("line_top_png");
			this.addChild(line_top);
			line_top.x = 256;
			line_top.y = 49;

			let iocn_me = manager.ResourceManager.getInstance().createBitmapByName("icon_me_png");
			this.addChild(iocn_me);
			iocn_me.x = 235;
			iocn_me.y = 15;

			this.txt_name = new egret.TextField();
			this.addChild(this.txt_name);
			this.txt_name.textColor = 0x5EB0C1;
			this.txt_name.size = 22;
			this.txt_name.text = "eason maaaaaaaa";
			this.txt_name.x = 276;
			this.txt_name.y = this.txt_y;

			let cut_off_line_0 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_0);
			cut_off_line_0.x = 465;
			cut_off_line_0.y = 16;

			let icon_money = manager.ResourceManager.getInstance().createBitmapByName("icon_money_png");
			this.addChild(icon_money);
			icon_money.x = 477;
			icon_money.y = 10;

			this.txt_money = new egret.TextField();
			this.addChild(this.txt_money);
			this.txt_money.textColor = 0xFFCC00;
			this.txt_money.size = 22;
			this.txt_money.text = "1,123,456.00";
			this.txt_money.x = 514;
			this.txt_money.y = this.txt_y;

			let btn_recharge = new ui.button.Button_Recharge();
			this.addChild(btn_recharge);
			btn_recharge.x = 655;
			btn_recharge.y = 14;

			let cut_off_line_1 = manager.ResourceManager.getInstance().createBitmapByName("cut_off_line_png");
			this.addChild(cut_off_line_1);
			cut_off_line_1.x = 696;
			cut_off_line_1.y = 16;

			let icon_online = manager.ResourceManager.getInstance().createBitmapByName("icon_online_png");
			this.addChild(icon_online);
			icon_online.x = 719;
			icon_online.y = 21;
			
			this.txt_online = new egret.TextField();
			this.addChild(this.txt_online);
			this.txt_online.textColor = 0xffffff;
			this.txt_online.size = 22;
			this.txt_online.text = "1,234";
			this.txt_online.x = 761;
			this.txt_online.y = this.txt_y;

			
		}

		public setName(str:string):void{
			if(this.txt_name!=null){
				this.txt_name.text = str;
			}
		}

		public setMoney(str:string):void{
			if(this.txt_money!=null){
				this.txt_money.text = str;
			}
		}

		public setOnline(str:string):void{
			if(this.txt_online!=null){
				this.txt_online.text = str;
			}
		}


	}
}