module sound {
	export class GameSoundPlayVector {
		private soundVector = new Array<string>();
		private playSoundURL:string;
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
		private soundDatas = {};
		private currentGameModel = null;
		
		public constructor(welcomeSound:string) {
			this.addSound(welcomeSound);// 将欢迎声音放在最开始
			this.timeOutId = setTimeout(this.setCanPlaySound, this.delayPlayInterval);
		}
		
		private setCanPlaySound():void
		{
			this.timeOutId = 0;
			this.isCanPlaySound = true;
			if(this.isSetPlaySound)this.autoStart();
		}
		public setGameModel(value:Object):void
		{
			this.currentGameModel = value;
			
		}
		/**
		 * 添加一个声音
		 * @param value 声音
		 * @param stopStatus 
		 */		
		public addSound(value:string,stopStatus:string=null,stopCountDown:Object = null):void
		{
			if(manager.SoundManager.getInstance().soundEffectSwitch==false)return;
			if(this.soundDatas[value]==null)this.soundDatas[value] = [];
			this.soundDatas[value].push({stopStatus:stopStatus,stopCountDown:stopCountDown});
			var findex:number= this.soundVector.indexOf("sFinal_Round");////// 播放顺序：   欢迎语----->阶段提示语---->本轮最后一局
			if(findex>-1)
			{
				if(this.soundVector.indexOf(value)<0)
					this.soundVector.splice(findex,0,value);
			}else
			{
				if(this.soundVector.indexOf(value)<0)
					this.soundVector.push(value);
			}
		}
		public addSounds(mSounds):void
		{
			if(manager.SoundManager.getInstance().soundEffectSwitch==false)return;
			while(mSounds.length>0)
				this.soundVector.push(mSounds.shift());
		}
		/**
		 * 自动开始
		 */		
		public autoStart():void
		{
			this.isSetPlaySound = true;
			this.playNextSound();
		}
		/**
		 * 清空所有的声音
		 */		
		public clearSounds():void
		{
			this.soundVector.length = 0;
			this.playSoundURL = null;
		}
		
		private playNextSound():void
		{
			if(this.isCanPlaySound && this.isSetPlaySound && this.playSoundURL==null)
			{
				if(this.soundVector.length>0)
				{
					this.playSoundURL = this.soundVector.shift();
					if(this.isCanPlayCurrentSound())
					{
						manager.SoundManager.getInstance().play(this.playSoundURL,0,true,null, this.onSoundPlayComplete,false, this.onSoundError);
					}else 
					{
						this.onSoundPlayComplete(null);
					}
				}
			}
		}
		
		private onSoundError(sound):void
		{
			if(this.playSoundURL!=null)
			{
				console.log(this,"加载声音失败--->"+this.playSoundURL);
				delete this.soundDatas[this.playSoundURL];
				this.playSoundURL = null;
			}
			setTimeout(this.playNextSound,1);
		}
		
		private isCanPlayCurrentSound(): boolean
		{
			if(this.playSoundURL!=null)
			{
				var stopArr:any[] =  this.soundDatas[this.playSoundURL];
				if(stopArr&&stopArr.length>0)
				{
					for (var i:number= 0; i < stopArr.length; i++) 
					{
						var stopData = stopArr[i];
						if(stopData.stopStatus!=null)
						{
							if(this.currentGameModel.tableStruct.GameStatus==stopData.stopStatus)
							{
								if(stopData.stopCountDown!=null)
								{
									if(this.currentGameModel.tableStruct.CountDownTime<(stopData.stopCountDown))
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
		private onSoundPlayComplete(sound):void
		{
			if(this.playSoundURL!=null)
			{
				delete this.soundDatas[this.playSoundURL];
				this.playSoundURL = null;
			}
			setTimeout(this.playNextSound,1);
		}
		public dispose():void
		{
			this.isCanPlaySound = false;
			this.isSetPlaySound = false;
			this.soundVector.length = 0;
			this.playSoundURL = null;
			this.soundDatas = null;
			if(this.timeOutId!=0)clearTimeout(this.timeOutId);
		}
	}
}