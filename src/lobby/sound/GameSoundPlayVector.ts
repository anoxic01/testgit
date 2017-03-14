module lobby.sound {
	export class GameSoundPlayVector {
		private var soundVector:Vector.<String> = new Vector.<String>();
		private var playSoundURL:String;
		/**
		 *延时播放时间 
		 */		
		public var delayPlayInterval:int = 800;
		/**
		 *是否可以播放声音 
		 */		
		private var isCanPlaySound:Boolean = false;
		/**
		 *程序是否调用了播放声音的方法 
		 */		
		private var isSetPlaySound:Boolean = false;
		private var timeOutId:int = 0;
		private var soundDatas:Dictionary = new Dictionary();
		private var currentGameModel:Object = null;
		
		public constructor(welcomeSound:String) {
			addSound(welcomeSound);// 将欢迎声音放在最开始
			timeOutId = setTimeout(setCanPlaySound,delayPlayInterval);
		}
		
		private function setCanPlaySound():void
		{
			timeOutId = 0;
			isCanPlaySound = true;
			if(isSetPlaySound)autoStart();
		}
		public function setGameModel(value:Object):void
		{
			currentGameModel = value;
			
		}
		/**
		 * 添加一个声音
		 * @param value 声音
		 * @param stopStatus 
		 */		
		public function addSound(value:String,stopStatus:String=null,stopCountDown:Object = null):void
		{
			if(SoundManager.getInstance().soundEffectSwitch==false)return;
			if(soundDatas[value]==null)soundDatas[value] = [];
			soundDatas[value].push({stopStatus:stopStatus,stopCountDown:stopCountDown});
			var findex:int = soundVector.indexOf("sFinal_Round");////// 播放顺序：   欢迎语----->阶段提示语---->本轮最后一局
			if(findex>-1)
			{
				if(soundVector.indexOf(value)<0)
					soundVector.splice(findex,0,value);
			}else
			{
				if(soundVector.indexOf(value)<0)
					soundVector.push(value);
			}
		}
		public function addSounds(mSounds:Array):void
		{
			if(SoundManager.getInstance().soundEffectSwitch==false)return;
			while(mSounds.length>0)
				soundVector.push(mSounds.shift());
		}
		/**
		 * 自动开始
		 */		
		public function autoStart():void
		{
			isSetPlaySound = true;
			playNextSound();
		}
		/**
		 * 清空所有的声音
		 */		
		public function clearSounds():void
		{
			soundVector.length = 0;
			playSoundURL = null;
		}
		
		private function playNextSound():void
		{
			if(isCanPlaySound&&isSetPlaySound&&playSoundURL==null)
			{
				if(soundVector.length>0)
				{
					playSoundURL = soundVector.shift();
					if(isCanPlayCurrentSound())
					{
						SoundManager.getInstance().play(playSoundURL,0,true,null,onSoundPlayComplete,false,onSoundError);
					}else 
					{
						onSoundPlayComplete(null);
					}
				}
			}
		}
		
		private function onSoundError(sound:Sound):void
		{
			if(playSoundURL!=null)
			{
				Log.getInstance().log(this,"加载声音失败--->"+playSoundURL);
				delete soundDatas[playSoundURL];
				playSoundURL = null;
			}
			setTimeout(playNextSound,1);
		}
		
		private function isCanPlayCurrentSound():Boolean
		{
			if(playSoundURL!=null)
			{
				var stopArr:Array =  soundDatas[playSoundURL];
				if(stopArr&&stopArr.length>0)
				{
					for (var i:int = 0; i < stopArr.length; i++) 
					{
						var stopData:Object = stopArr[i];
						if(stopData.stopStatus!=null)
						{
							if(currentGameModel.tableStruct.GameStatus==stopData.stopStatus)
							{
								if(stopData.stopCountDown!=null)
								{
									if(currentGameModel.tableStruct.CountDownTime<int(stopData.stopCountDown))
									{
										//  播放时机在快倒计时结束时跳过
										return false;
									}
								}else
								{
									//  播放时机在指定跳过时间段
									return false;
								}
							}
						}
					}
				}
				return true;
			}
			return false;// 没有声音可以播放
		}
		/**
		 * 声音播放完成
		 */		
		private function onSoundPlayComplete(sound:SoundChannel):void
		{
			if(playSoundURL!=null)
			{
				delete soundDatas[playSoundURL];
				playSoundURL = null;
			}
			setTimeout(playNextSound,1);
		}
		public function dispose():void
		{
			isCanPlaySound = false;
			isSetPlaySound = false;
			soundVector.length = 0;
			playSoundURL = null;
			soundDatas = null;
			if(timeOutId!=0)clearTimeout(timeOutId);
		}
	}
}