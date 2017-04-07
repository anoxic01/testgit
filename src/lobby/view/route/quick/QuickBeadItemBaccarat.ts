module lobby.view.route.quick {
	export class QuickBeadItemBaccarat extends BeadItem{
		private m_spRed		 ;		//对子标识
		private m_spBlue	 ;		//对子标识
		private m_uMode		:	number;		//珠子类型	0-大厅	1-转桌	2-好路通知	3-好路多桌	4-游戏	
		
		
		public constructor(_uMode:number=0) {
		
			super();
			this.m_uMode = _uMode;
			
			this.m_spRed = new egret.Sprite();
			this.addChild(this.m_spRed);
			this.m_spRed.graphics.beginFill(0xff0000);
			this.m_spRed.graphics.drawCircle(0,0,4);
			this.m_spRed.graphics.endFill();
			this.m_spRed.x = 4;
			this.m_spRed.y = 4;
			
			this.m_spBlue = new egret.Sprite();
			this.addChild(this.m_spBlue);
			this.m_spBlue.graphics.beginFill(0x0000ff);
			this.m_spBlue.graphics.drawCircle(0,0,4);
			this.m_spBlue.graphics.endFill();
			this.m_spBlue.x = 16;
			this.m_spBlue.y = 17;
			
			
			this.m_spRed.visible = false;
			this.m_spBlue.visible = false;
		}
		
		
		 public destroy():void{
			super.destroy();
			
			if(this.m_spRed){
				this.removeChild(this.m_spRed);
				this.m_spRed = null;
			}
			if(this.m_spBlue){
				this.removeChild(this.m_spBlue);
				this.m_spBlue = null;
			}
		}
		
		 public setLabel(sLabel:string):void{
			this.m_sLabel = sLabel;
			this.m_spRed.visible = false;
			this.m_spBlue.visible = false;
			
			switch(this.m_sLabel){
				case BeadItem.B:
				case BeadItem.F:
				case BeadItem.J:
					this.m_spRed.visible = true;
					break;
				case BeadItem.C:
				case BeadItem.G:
				case BeadItem.K:
					this.m_spBlue.visible = true;
					break;
				case BeadItem.D: 
				case BeadItem.H:
				case BeadItem.L:
					this.m_spRed.visible = true;
					this.m_spBlue.visible = true;
					break;
			}
			
			this.onChangeLanguage();
		}
		
		 public onChangeLanguage():void{
			if(this.m_bmp){
				switch(this.m_sLabel){
					case BeadItem.A:
					case BeadItem.B:
					case BeadItem.C:
					case BeadItem.D:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_BANKER);
						break;
					
					case BeadItem.E:
					case BeadItem.F:
					case BeadItem.G:
					case BeadItem.H:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_PLAYER);
						break;
					
					case BeadItem.I:
					case BeadItem.J:
					case BeadItem.K:
					case BeadItem.L:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_TIE);
						break;
					
				}
				this.m_bmp.smoothing = true;
				this.m_bmp.width = 20;
				this.m_bmp.height = 21;
			}else{
				console.log("设置珠子位图异常...");
			}
			
		}
		
		
	}
}