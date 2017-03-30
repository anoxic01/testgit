module lobby.model.struct {
	export class SoundStruct {
		
		public key:String;
		public loop:number;
		public lowerVolume: boolean = false;
		public fSoundLoadComplete:Function;
		public fPlayComplete:Function;

		public constructor() {
		}
	}
}