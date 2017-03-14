module lobby.view.windows {
	export class GameMsgWnd extends MessageWindow {

		private m_bmp				:	egret.Bitmap;
		private m_bmp2				:	egret.Bitmap;
		public scale				:	number	=	1;
		private static m_bmdTipArr	:	string[]	=	[language.Language.sBmdBetWait,
														language.Language.sBmdBetStart,
														language.Language.sBmdBetStop,
														language.Language.sBmdBetSuccess,
														language.Language.sFailGame,
														language.Language.sFinalGame,
														language.Language.sNoWin,
														language.Language.sMaintain_Theme,
														language.Language.sBalanceNoEnough]
		

		public constructor() {
			super();
		}

		public resize(_w:number=0, _h:number=0):void {
			super.resize(_w,_h);

			if (this.m_bg){
				this.m_bmp.x = (this.m_bg.width - (this.m_bmp.width + this.m_bmp2.width)) >> 1;
				this.m_bmp.y = (this.m_bg.height - this.m_bmp.height) >> 1;
				this.m_bmp2.x = this.m_bmp.x+this.m_bmp.width +10;
				this.m_bmp2.y = (this.m_bg.height - this.m_bmp2.height) >> 1;
			}else{
				this.m_bmp.x = (this.iWidth - (this.m_bmp.width + this.m_bmp2.width)) >> 1;
				this.m_bmp.y = (this.iHeight - this.m_bmp.height) >> 1;
				this.m_bmp2.x = this.m_bmp.x + this.m_bmp.width +10;
				this.m_bmp2.y = (this.iHeight - this.m_bmp2.height) >> 1;
			}
			
		}	
		
		
		public showBmp(key:string, keep:boolean = false):void{
			this.m_bmp.visible=true;
			let bmd:egret.BitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang,language.Language.sBmdBetStart);
			this.m_bmp.bitmapData = bmd;
			this.m_bmp.smoothing = true;
			this.resize();

			super.show("",keep);
		}
		
		public show(str:string , keep:boolean =false ,time:number=1.5):void{
			if (this.msg==str &&  this.msg != language.Language.sBmdBetSuccess && this.alpha>0.4){
				return;
			}
			this.msg = str;
			this.m_bmp2.bitmapData=null;
			this.m_bmp2.visible=false;
			if (GameMsgWnd.m_bmdTipArr.indexOf(str)>-1){
				var bmd:egret.BitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang,str);
				this.m_bmp.scaleX = this.m_bmp.scaleY = this.scale;
				this.m_bmp.bitmapData = bmd;
				this.m_bmp.smoothing = true;
				if (time==1.5 && this.m_bmp.width>350){
					time=2;
				}
				this.resize();
				this.m_bmp.visible=true;
				
				super.show("",keep,time);
			}else{
				if (time==1.5 && str.length>12){
					time=2;
				}
				super.show(str,keep,time);
				this.m_bmp.visible=false;
			}
			this.msg = str;
			
		}
		
		
		//含位图数字
		public show2(str:string , value:number,keep:boolean =false ,time:number=1.5):void{
			if (this.msg==str && this.alpha>0.4){
				return;
			}
			this.msg = str;
			if (str == language.Language.sWinGold || str == language.Language.sLose){
				var bmd:egret.BitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang,str);
				this.m_bmp.scaleX=this.m_bmp.scaleY=this.scale;
				this.m_bmp.bitmapData = bmd;
				this.m_bmp.smoothing = true;
				this.m_bmp.visible=true;
				
				
				// 将数字的大小设置成与文字的大小一致 (美术已更换一致)
				//m_bmp2.scaleX=m_bmp2.scaleY=bmd.height/bmd2.height;//scale;
				if (this.scale!=1){
					this.m_bmp2.scaleX=this.scale;
					this.m_bmp2.scaleY=this.scale;
				}
				
				var bmd2:egret.BitmapData = manager.BitmapManager.getInstance().numberGold.conversion( <number>(value) );
				
				this.m_bmp2.bitmapData = bmd2;
				this.m_bmp2.smoothing = true;
				this.m_bmp2.visible=true;
				
				this.resize();
				if (this.m_bmp.width + this.m_bmp2.width>220){
					this.m_bmp.scaleX = this.m_bmp.scaleY = this.scale-0.2;
					this.m_bmp2.scaleX = this.m_bmp2.scaleY =this.scale-0.2;
				//	trace(m_bmp2.scaleX+"弹出bmd信息："+str);
				}
				
				super.show("",keep,time);
				
				
			}
		}
		
		public onChangeLanguage():void{
			var bmd:egret.BitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, this.msg);
			this.m_bmp.scaleX=this.m_bmp.scaleY=this.scale;
			this.m_bmp.bitmapData = bmd;
			this.m_bmp.smoothing = true;
			if (this.m_bmp2 && this.scale!=1){
				this.m_bmp2.scaleX=this.scale;
				this.m_bmp2.scaleY=this.scale;
			}
			
		}
	}
}