module sound {
	export class LiveSound {
		public sound				:	Sound;
		private m_fLoadComplete		:	Function;
		private m_fLoadError		:	Function;
		public bLoadComplete		:	 boolean;
		private url:String;
		private loadStart:Number = 0;
		public constructor(_stream:URLRequest , _context:SoundLoaderContext , _fLoadComplete:Function = null , _fLoadError:Function = null ) { 
			url = _stream.url;
			loadStart = getTimer();
			sound = new Sound( _stream, _context );
			sound.addEventListener(IOErrorEvent.IO_ERROR , onIoError);
			sound.addEventListener( Event.COMPLETE , onSoundComplete);
			m_fLoadComplete = _fLoadComplete;
			m_fLoadError 	= _fLoadError;
		}
		protected onSoundComplete(event:Event):void{
		//	console.log("Load Sound Success");
			
//			console.log(this,"加载声音文件-->"+url+"--耗时-->"+(getTimer()-loadStart));
			sound.removeEventListener(IOErrorEvent.IO_ERROR , onIoError);
			sound.removeEventListener( Event.COMPLETE , onSoundComplete);
			bLoadComplete = true;
			if( m_fLoadComplete != null ){
				m_fLoadComplete(this);
			}
			
		}
		
		protected onIoError(event:IOErrorEvent):void{
			console.log("Load Sound Path Error::" + event.text );
			sound.removeEventListener(IOErrorEvent.IO_ERROR , onIoError);
			sound.removeEventListener( Event.COMPLETE , onSoundComplete);		
			bLoadComplete = false;
			if( m_fLoadError != null ){
				m_fLoadError(sound);
			}			
			
		}
		
		public destroy():void {
			sound.removeEventListener(IOErrorEvent.IO_ERROR , onIoError);
			sound.removeEventListener( Event.COMPLETE , onSoundComplete);
			sound.close();
			sound = null;
			if( m_fLoadComplete != null ){
				m_fLoadComplete = null;
			}
			if( m_fLoadError != null ){
				m_fLoadError = null;
			}
			bLoadComplete = false;
		}
		
	}
}