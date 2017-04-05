module lobby.model.struct {
	export class SoundStruct {
		
		public key:string;
		public loop:number;
		public lowerVolume: boolean = false;
		public fSoundLoadComplete:Function;
		public fPlayComplete:Function;

		public constructor() {
		}
	}
}