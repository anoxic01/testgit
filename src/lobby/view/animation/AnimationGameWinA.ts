module lobby.view.animation {
	export class AnimationGameWinA extends BSprite{
		private m_mcAsset;
		
		public constructor(_nValue:number, _uCount:number=1) {
			super();
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_WINA,"Game_Win_A_Asset");
			this.addChild(this.m_mcAsset);
			this.m_mcAsset.addFrameScript(this.m_mcAsset.totalFrames-1, this.stop);
			this.m_mcAsset.label.tf_label.text = _nValue.toString();
			this.m_mcAsset.mc_0.gotoAndStop(_uCount);
			
		}
		
		public count(value:number):void{
			this.m_mcAsset.mc_0.gotoAndStop(value);
		}
		
		 public destroy():void{
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
		}
		set  value(_nValue:number){
			if(this.m_mcAsset){
				this.m_mcAsset.label.tf_label.text = _nValue.toString();
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