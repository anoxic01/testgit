module sound {
	export class SoundChannel_EX {
		public soundChannel			:	egret.SoundChannel;
		public fPlayComplete		:	Function;

		public constructor(_soundChannel , _fPlayComplete:Function ) {
			this.soundChannel = _soundChannel;
			this.fPlayComplete = _fPlayComplete;
		}
		public destroy():void {
			if(this.soundChannel) {
				this.soundChannel.stop();
				this.soundChannel = null;
			}
			if( this.fPlayComplete != null ){
				this.fPlayComplete = null;
			}
		}
		
		public end():void {
			if(this.soundChannel) {
				this.soundChannel.stop();
			}
			if( this.fPlayComplete != null ){
				this.fPlayComplete(this.soundChannel);
			}
		}
		public stop():void {
			if(this.soundChannel) {
				this.soundChannel.stop();
			}
		}
		
	}
}