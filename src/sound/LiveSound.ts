module sound {
	export class LiveSound {
		public sound				:	egret.Sound;
		private m_fLoadComplete		:	Function;
		private m_fLoadError		:	Function;
		public bLoadComplete		:	boolean;
		private url:string;
		private loadStart:number = 0;
		public constructor(_stream , _context , _fLoadComplete:Function = null , _fLoadError:Function = null ) { 
			this.url = _stream.url;
			this.loadStart = egret.getTimer();
			this.sound = new egret.Sound( _stream, _context );
			sound.addEventListener(egret.IOErrorEvent.IO_ERROR , this.onIoError);
			sound.addEventListener( egret.Event.COMPLETE , this.onSoundComplete);
			this.m_fLoadComplete = _fLoadComplete;
			this.m_fLoadError 	= _fLoadError;
		}
		protected onSoundComplete(event:Event):void{
		//	console.log("Load Sound Success");
			
//			console.log(this,"加载声音文件-->"+url+"--耗时-->"+(getTimer()-loadStart));
			sound.removeEventListener(egret.IOErrorEvent.IO_ERROR , this.onIoError);
			sound.removeEventListener( egret.Event.COMPLETE , this.onSoundComplete);
			this.bLoadComplete = true;
			if( this.m_fLoadComplete != null ){
				this.m_fLoadComplete(this);
			}
			
		}
		
		protected onIoError(event:egret.IOErrorEvent):void{
			console.log("Load Sound Path Error::" + event.text );
			sound.removeEventListener( egret.IOErrorEvent.IO_ERROR , this.onIoError);
			sound.removeEventListener( egret.Event.COMPLETE , this.onSoundComplete);		
			this.bLoadComplete = false;
			if( this.m_fLoadError != null ){
				this.m_fLoadError(sound);
			}			
			
		}
		
		public destroy():void {
			sound.removeEventListener( egret.IOErrorEvent.IO_ERROR , this.onIoError);
			sound.removeEventListener( egret.Event.COMPLETE , this.onSoundComplete);
			sound.close();
			this.sound = null;
			if( this.m_fLoadComplete != null ){
				this.m_fLoadComplete = null;
			}
			if( this.m_fLoadError != null ){
				this.m_fLoadError = null;
			}
			this.bLoadComplete = false;
		}
		
	}
}