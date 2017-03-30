module sound {
	export class GameSoundPlayVector {
		private soundVector:<String> = new <String>();
		private playSoundURL:String;
		/**
		 *延时播放时间 
		 */		
		public delayPlayInterval:number= 800;
		/**
		 *是否可以播放声音 
		 */		
		private isCanPlaySound: boolean = false;
		/**
		 *程序是否调用了播放声音的方法 
		 */		
		private isSetPlaySound: boolean = false;
		private timeOutId:number= 0;
		private soundDatas:Dictionary = new Dictionary();
		private currentGameModel:Object = null;
		
		public constructor(welcomeSound:String) {
			addSound(welcomeSound);// 将欢迎声音放在最开始
			timeOutId = setTimeout(setCanPlaySound,delayPlayInterval);
		}
		
		private setCanPlaySound():void
		{
			timeOutId = 0;
			isCanPlaySound = true;
			if(isSetPlaySound)autoStart();
		}
		public setGameModel(value:Object):void
		{
			currentGameModel = value;
			
		}
		/**
		 * 添加一个声音
		 * @param value 声音
		 * @param stopStatus 
		 */		
		public addSound(value:String,stopStatus:String=null,stopCountDown:Object = null):void
		{
			if(SoundManager.getInstance().soundEffectSwitch==false)return;
			if(soundDatas[value]==null)soundDatas[value] = [];
			soundDatas[value].push({stopStatus:stopStatus,stopCountDown:stopCountDown});
			var findex:number= soundindexOf("sFinal_Round");////// 播放顺序：   欢迎语----->阶段提示语---->本轮最后一局
			if(findex>-1)
			{
				if(soundindexOf(value)<0)
					soundsplice(findex,0,value);
			}else
			{
				if(soundindexOf(value)<0)
					soundpush(value);
			}
		}
		public addSounds(mSounds:any[]):void
		{
			if(SoundManager.getInstance().soundEffectSwitch==false)return;
			while(mSounds.length>0)
				soundpush(mSounds.shift());
		}
		/**
		 * 自动开始
		 */		
		public autoStart():void
		{
			isSetPlaySound = true;
			playNextSound();
		}
		/**
		 * 清空所有的声音
		 */		
		public clearSounds():void
		{
			soundlength = 0;
			playSoundURL = null;
		}
		
		private playNextSound():void
		{
			if(isCanPlaySound&&isSetPlaySound&&playSoundURL==null)
			{
				if(soundlength>0)
				{
					playSoundURL = soundshift();
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
		
		private onSoundError(sound:Sound):void
		{
			if(playSoundURL!=null)
			{
				Log.getInstance().log(this,"加载声音失败--->"+playSoundURL);
				delete soundDatas[playSoundURL];
				playSoundURL = null;
			}
			setTimeout(playNextSound,1);
		}
		
		private isCanPlayCurrentSound(): boolean
		{
			if(playSoundURL!=null)
			{
				var stopArr:any[] =  soundDatas[playSoundURL];
				if(stopArr&&stopArr.length>0)
				{
					for (var i:number= 0; i < stopArr.length; i++) 
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
		private onSoundPlayComplete(sound:SoundChannel):void
		{
			if(playSoundURL!=null)
			{
				delete soundDatas[playSoundURL];
				playSoundURL = null;
			}
			setTimeout(playNextSound,1);
		}
		public dispose():void
		{
			isCanPlaySound = false;
			isSetPlaySound = false;
			soundlength = 0;
			playSoundURL = null;
			soundDatas = null;
			if(timeOutId!=0)clearTimeout(timeOutId);
		}
	}
}