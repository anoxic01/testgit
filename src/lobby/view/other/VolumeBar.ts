module lobby.view.other {
	export class VolumeBar extends BSprite{
		private m_mcAsset			;
		private m_bar				;
		private m_rec				;
		private m_bDown				:	boolean;
		private m_nVolume			:	number;
		private m_iType				:	number;
		private m_on_off			:	OnOff;
		
		public constructor(_iType:number) {
			super();
			this.m_iType = _iType;
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"VolumeLineAsset");
			this.addChild(this.m_mcAsset);
			
			this.m_rec = new egret.Rectangle(0,5,105, 0);
			
			this.m_bar = this.m_mcAsset.mc_bar;
			this.m_bar.gotoAndStop(1);
			
			this.m_mcAsset.mc_value.mask = this.m_bar.mc_mask;
			
			this.m_bar.buttonMode = true;
			
			
			switch(this.m_iType){
				case define.Define.MUSIC:
					this.setvolume(manager.SharedObjectManager.getMusicVolume());
					break;
				case define.Define.EFFECT:
					this.setvolume(manager.SharedObjectManager.getEffectVolume());
					break;
				case define.Define.LIVE:
					this.setvolume(manager.SharedObjectManager.getLiveVolume());				
					break;
			}
			
			this.m_bar.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.over);
			this.m_bar.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.out);
			this.m_bar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down);
			manager.LobbyManager.getInstance().stage.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
		}
		get nVolume():number
		{
			return this.m_nVolume;
		}

		set  nVolume(value:number)
		{
			this.m_nVolume = value;
		}

		 public destroy():void{
			this.m_bar.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.over);
			this.m_bar.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.out);
			this.m_bar.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down);
			manager.LobbyManager.getInstance().stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
		}
		
		public setvolume(_nValue:number ):void{
			this.nVolume = _nValue;	
			var _nX:number = (_nValue*105);
			
			if( _nX > 105 ){
				_nX = 105;
			}
			else if( _nX < 0 ){
				_nX = 0;
			}
			
			this.m_bar.x = _nX;
			
			switch(this.m_iType){
				case define.Define.MUSIC:
					manager.MusicManager.singleton.nVolume = this.nVolume;
					break;
				case define.Define.EFFECT:
					manager.SoundManager.getInstance().nVolume = this.nVolume;
					break;
				case define.Define.LIVE:
					manager.LobbyManager.getInstance().nLiveVolume = this.nVolume;
					break;
			}			
		}		
		
		
		protected over(event:MouseEvent):void
		{
			this.m_bar.gotoAndStop(2);
		}
		
		protected out(event:MouseEvent):void
		{
			if(this.m_bDown){
				return;
			}
			this.m_bar.gotoAndStop(1);
		}
		
		protected down(event:MouseEvent):void
		{
			this.m_bDown = true;
			this.m_bar.gotoAndStop(3);
			this.m_bar.startDrag(false, this.m_rec);
		}
		
		protected up(event:MouseEvent):void
		{
			if(this.m_bDown){
				this.m_bDown = false;
				this.m_bar.gotoAndStop(1);
				this.m_bar.stopDrag();
				
				switch(this.m_iType){
					case define.Define.MUSIC:
						this.setvolume(this.m_bar.x/this.m_rec.width);
						break;
					case define.Define.EFFECT:
						this.setvolume(this.m_bar.x/this.m_rec.width);
						break;
					case define.Define.LIVE:
						this.setvolume(this.m_bar.x/this.m_rec.width);
						break;
				}
			}
		}
		
		set  on_off( _on_off:OnOff ) {
			this.m_on_off = _on_off;
			
			switch(this.m_iType){
				case define.Define.MUSIC:
					if( sound.SoundData.getInstance().nMusicVolume != -1 )
						this.m_on_off.volume = sound.SoundData.getInstance().nMusicVolume;
					break;
				case define.Define.EFFECT:
					if( sound.SoundData.getInstance().nSoundVolume != -1 )
						this.m_on_off.volume = sound.SoundData.getInstance().nSoundVolume;
					break;
				case define.Define.LIVE:
					if( sound.SoundData.getInstance().nLiveVolume != -1 )
						this.m_on_off.volume = sound.SoundData.getInstance().nLiveVolume;
					break;
			}	
		}
		
		set  enable(_bValue: boolean){
			this.m_bar.mouseEnabled = _bValue;
			this.m_bar.mouseChildren = _bValue;
		}

	}
}