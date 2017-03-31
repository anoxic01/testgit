module lobby.view.animation {
	export class AnimationGameWinC extends BSprite{
		private m_mcAsset;
		
		public constructor(_nValue:number) {
			super();
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_WIN,"Game_Win_Asset");
			this.addChild(this.m_mcAsset);
			this.m_mcAsset.addFrameScript(this.m_mcAsset.totalFrames-1, this.stop);
			this.m_mcAsset.mc_label.tf_label.text = _nValue.toString();
			
		}
		
		 public destroy():void{
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
		}
		set  value(_nValue:Number){
			if(this.m_mcAsset){
				this.m_mcAsset.mc_label.tf_label.text = _nValue.toString();
			}
		}
		public play():void{
			if(this.m_mcAsset){
				this.m_mcAsset.visible = true;
				this.m_mcAsset.gotoAndPlay(1);
			}
		}
		public stop():void{
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndStop(1);
				this.m_mcAsset.visible = false;
			}
		}	
	}
}