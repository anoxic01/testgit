module lobby.view.chip {
	export class ChipItem extends BSprite{
		private m_uValue	:	number;				//筹码面值
//		private m_bmpAsset	:	Bitmap;				//筹码皮肤
		private m_mcAsset	;			//筹码按钮
		private m_mcContent	;
		private m_bSelect	:	 boolean;			//选中状态
		private m_chipPanel	:	ChipPanel;			//筹码面板
		private m_bGame		:	 boolean;			//面板类型
		private m_spHot		;				//筹码热区
		
		public constructor(bGame: boolean, _uValue:number, _chipPanel:ChipPanel) {
			super();
			this.m_bGame = bGame;
			this.m_uValue = _uValue;
			this.m_chipPanel = _chipPanel;
			
			var _class  = manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_CHIP, ("Chip_Asset_"+String(_uValue)));
			
			this.m_mcAsset = new _class();
			this.addChild(this.m_mcAsset);
			
			this.m_mcContent = new egret.MovieClip(this.m_mcAsset.mc_content);
			this.initContent();
			
			this.m_spHot = new egret.Sprite();
			this.m_spHot.graphics.beginFill(0x000000,0);
			this.m_spHot.graphics.drawCircle(0,0,56);
			this.m_spHot.graphics.endFill();
			this.addChild(this.m_spHot);
			this.m_spHot.x = 55;
			this.m_spHot.y = 55;
			
			this.touchEnabled = false;
			
			if(bGame){
//				_class = manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_CHIP, ("Chip_Asset_"+String(_uValue)));
			}else{
//				_class = manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_CHIP,("Chip_Asset_x_"+String(_uValue)));
				this.m_mcAsset.width = 91;
				this.m_mcAsset.height = 93;
			}
			if(_class==null){
				return;
			}
			
//			m_bmpAsset = new Bitmap();
//			this.addChild(m_bmpAsset);
//			m_bmpAsset.bitmapData = BitmapManager.getInstance().getBmpdChip(_uValue);
//			m_bmpAsset.smoothing = true;
			
			this.m_mcAsset.mouseChildren = false;
			this.m_mcAsset.mouseEnabled = false;
			this.m_mcAsset.mc_content.mouseChildren = false;
			this.m_mcAsset.mc_content.mouseEnabled = false;
			
			this.m_spHot.buttonMode = true;
			this.m_spHot.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick,this);
			this.m_spHot.addEventListener(mouse.MouseEvent.MOUSE_OVER,this.over,this);
			this.m_spHot.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.out,this);
			this.m_spHot.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.down ,this);
			
			
		}

		
		 public destroy():void
		{
			if(this.m_spHot){
				this.m_spHot.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick,this);
				this.m_spHot.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.over,this);
				this.m_spHot.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.out,this);
				this.m_spHot.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down,this);
				this.removeChild(this.m_spHot);
				this.m_spHot = null;
			}
			
			
			if(this.m_mcContent){
				this.m_mcContent.dispose();
			}
			
			if(this.m_chipPanel){
				this.m_chipPanel = null;
			}
//			if(m_bmpAsset){
//				this.removeChild(m_bmpAsset);
//				m_bmpAsset = null;
//			}
			
			this.destroyChipItem();
		}
		private destroyChipItem():void{
			if(this.m_mcAsset){
				this.m_mcAsset.mc_hot.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick);
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
		}
		
		set  select(_bValue: boolean){
			if(this.m_bSelect!=_bValue){
				
				this.m_bSelect = _bValue;
//				m_btnChip.select = _bValue;
				if(this.m_bSelect){
					this.m_mcContent.gotoAndPlay("SELECT");
				}else{
					this.m_mcContent.gotoAndPlay("UNSELECT");
				}
				
				if(this.m_bSelect){
					manager.LobbyManager.getInstance().setSelectChip(this.uValue);
				}
			}
		}
		
		public selectStatus(bValue: boolean):void{
			if(this.m_bSelect!=bValue){
				this.m_bSelect = bValue;
				if(this.m_bSelect){
					this.m_mcContent.gotoAndPlay("SELECT");
				}else{
					this.m_mcContent.gotoAndPlay("UNSELECT");
				}
			}
		}
		
		public bSelect(): boolean{
			return this.m_bSelect;
		}
		
		set  value(_uValue:number){
			var _class;
//			if(this.m_bGame){
				_class = manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_CHIP, ("Chip_Asset_"+String(_uValue)));
//			}
//			else{
//				_class = manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_CHIP, ("Chip_Asset_x_"+String(_uValue)));
//			}
			
			this.destroyChipItem();
			
			this.m_mcAsset = new _class();
			this.addChild(this.m_mcAsset);
			
			this.m_mcContent = new egret.MovieClip(this.m_mcAsset.mc_content);
			this.initContent();
			
			this.m_mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick);
			
//			m_bmpAsset.bitmapData = BitmapManager.getInstance().getBmpdChip(_uValue);
//			m_bmpAsset.smoothing = true;
		}
		
		get uValue():number
		{
			return this.m_uValue;
		}
		
		set  uValue(value:number)
		{
			this.m_uValue = value;
		}
		
		
		protected onClick(event:MouseEvent):void
		{
			this.select = true;
			manager.SoundManager.getInstance().play(sound.SoundPackage.sChipSelect);
			event.stopImmediatePropagation();
		}
		
		protected over(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.m_mcContent.gotoAndPlay("HOVER");
			manager.SoundManager.getInstance().play(sound.SoundPackage.sChipOver);
		}
		
		protected out(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.m_mcContent.gotoAndPlay("HOUT");
		}
		
		protected down(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.m_mcContent.gotoAndPlay("HDOWN");
		}
		
		private initContent():void{
			this.m_mcContent.gotoAndStop("DEFAULT");
			
			this.m_mcContent.addFrameScript(3,function():void{
				if(this.m_mcContent){
					this.m_mcContent.gotoAndStop(4);
				}
			});
			this.m_mcContent.addFrameScript(5,function():void{
				if(this.m_mcContent){
					this.m_mcContent.gotoAndStop(6);
				}
			});
			this.m_mcContent.addFrameScript(43,function():void{
				if(this.m_mcContent){
					this.m_mcContent.gotoAndStop(44);
				}
			});
			this.m_mcContent.addFrameScript(46,function():void{
				if(this.m_mcContent){
					this.m_mcContent.gotoAndStop(47);
				}
			});
			this.m_mcContent.addFrameScript(36,function():void{
				if(this.m_mcContent){
					this.m_mcContent.currentFrame = 16;
				}
			});
		}
	}
}