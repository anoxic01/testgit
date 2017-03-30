module lobby.view.chip {
	export class ChipItem extends BSprite{
		private m_uValue	:	number;				//筹码面值
//		private m_bmpAsset	:	Bitmap;				//筹码皮肤
		private m_mcAsset	:	MovieClip;			//筹码按钮
		private m_mcContent	:	MMovieClip;
		private m_bSelect	:	 boolean;			//选中状态
		private m_chipPanel	:	ChipPanel;			//筹码面板
		private m_bGame		:	 boolean;			//面板类型
		private m_spHot		:	Sprite;				//筹码热区
		
		public constructor(bGame: boolean, _uValue:number, _chipPanel:ChipPanel) {
			
			m_bGame = bGame;
			m_uValue = _uValue;
			m_chipPanel = _chipPanel;
			
			var _class : Class = ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_CHIP, ("Chip_Asset_"+String(_uValue)));
			
			m_mcAsset = new _class();
			this.addChild(m_mcAsset);
			
			m_mcContent = new MMovieClip(m_mcAsset.mc_content);
			initContent();
			
			m_spHot = new Sprite();
			m_spHot.graphics.beginFill(0x000000,0);
			m_spHot.graphics.drawCircle(0,0,56);
			m_spHot.graphics.endFill();
			this.addChild(m_spHot);
			m_spHot.x = 55;
			m_spHot.y = 55;
			
			this.mouseEnabled = false;
			
			if(bGame){
//				_class = ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_CHIP, ("Chip_Asset_"+String(_uValue)));
			}else{
//				_class = ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_CHIP,("Chip_Asset_x_"+String(_uValue)));
				m_mcAsset.width = 91;
				m_mcAsset.height = 93;
			}
			if(_class==null){
				return;
			}
			
//			m_bmpAsset = new Bitmap();
//			this.addChild(m_bmpAsset);
//			m_bmpAsset.bitmapData = BitmapManager.getInstance().getBmpdChip(_uValue);
//			m_bmpAsset.smoothing = true;
			
			m_mcAsset.mouseChildren = false;
			m_mcAsset.mouseEnabled = false;
			m_mcAsset.mc_content.mouseChildren = false;
			m_mcAsset.mc_content.mouseEnabled = false;
			
			m_spHot.buttonMode = true;
			m_spHot.addEventListener(MouseEvent.CLICK, onClick);
			m_spHot.addEventListener(MouseEvent.MOUSE_OVER,over);
			m_spHot.addEventListener(MouseEvent.MOUSE_OUT,out);
			m_spHot.addEventListener(MouseEvent.MOUSE_DOWN,down);
			
			
		}

		
		 public destroy():void
		{
			if(m_spHot){
				m_spHot.removeEventListener(MouseEvent.CLICK, onClick);
				m_spHot.removeEventListener(MouseEvent.MOUSE_OVER,over);
				m_spHot.removeEventListener(MouseEvent.MOUSE_OUT,out);
				m_spHot.removeEventListener(MouseEvent.MOUSE_DOWN,down);
				this.removeChild(m_spHot);
				m_spHot = null;
			}
			
			
			if(m_mcContent){
				m_mcContent.dispose();
			}
			
			if(m_chipPanel){
				m_chipPanel = null;
			}
//			if(m_bmpAsset){
//				this.removeChild(m_bmpAsset);
//				m_bmpAsset = null;
//			}
			
			destroyChipItem();
		}
		private destroyChipItem():void{
			if(m_mcAsset){
				m_mcAsset.mc_hot.removeEventListener(MouseEvent.CLICK, onClick);
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
		}
		
		set  select(_bValue: boolean){
			if(m_bSelect!=_bValue){
				
				m_bSelect = _bValue;
//				m_btnChip.select = _bValue;
				if(m_bSelect){
					m_mcContent.gotoAndPlay("SELECT");
				}else{
					m_mcContent.gotoAndPlay("UNSELECT");
				}
				
				if(m_bSelect){
					LobbyManager.getInstance().setSelectChip(uValue);
				}
			}
		}
		
		public selectStatus(bValue: boolean):void{
			if(m_bSelect!=bValue){
				m_bSelect = bValue;
				if(m_bSelect){
					m_mcContent.gotoAndPlay("SELECT");
				}else{
					m_mcContent.gotoAndPlay("UNSELECT");
				}
			}
		}
		
		public bSelect(): boolean{
			return m_bSelect;
		}
		
		set  value(_uValue:number){
			var _class : Class;
//			if(m_bGame){
				_class = ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_CHIP, ("Chip_Asset_"+String(_uValue)));
//			}
//			else{
//				_class = ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_CHIP, ("Chip_Asset_x_"+String(_uValue)));
//			}
			
			destroyChipItem();
			
			m_mcAsset = new _class();
			this.addChild(m_mcAsset);
			
			m_mcContent = new MMovieClip(m_mcAsset.mc_content);
			initContent();
			
			m_mcAsset.addEventListener(MouseEvent.CLICK, onClick);
			
//			m_bmpAsset.bitmapData = BitmapManager.getInstance().getBmpdChip(_uValue);
//			m_bmpAsset.smoothing = true;
		}
		
		get uValue():number
		{
			return m_uValue;
		}
		
		set  uValue(value:number)
		{
			m_uValue = value;
		}
		
		
		protected onClick(event:MouseEvent):void
		{
			select = true;
			SoundManager.getInstance().play(SoundPackage.sChipSelect);
			event.stopImmediatePropagation();
		}
		
		protected over(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			m_mcContent.gotoAndPlay("HOVER");
			SoundManager.getInstance().play(SoundPackage.sChipOver);
		}
		
		protected out(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			m_mcContent.gotoAndPlay("HOUT");
		}
		
		protected down(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			m_mcContent.gotoAndPlay("HDOWN");
		}
		
		private initContent():void{
			m_mcContent.gotoAndStop("DEFAULT");
			
			m_mcContent.addFrameScript(3,function():void{
				if(m_mcContent){
					m_mcContent.gotoAndStop(4);
				}
			});
			m_mcContent.addFrameScript(5,function():void{
				if(m_mcContent){
					m_mcContent.gotoAndStop(6);
				}
			});
			m_mcContent.addFrameScript(43,function():void{
				if(m_mcContent){
					m_mcContent.gotoAndStop(44);
				}
			});
			m_mcContent.addFrameScript(46,function():void{
				if(m_mcContent){
					m_mcContent.gotoAndStop(47);
				}
			});
			m_mcContent.addFrameScript(36,function():void{
				if(m_mcContent){
					m_mcContent.currentFrame = 16;
				}
			});
		}
	}
}