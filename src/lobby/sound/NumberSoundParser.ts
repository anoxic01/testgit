module lobby.sound {
	export class NumberSoundParser {
		public constructor() {
		}
		/**
		 * 按照扑克牌的牌面读法获取声音
		 * @param num
		 * @return 
		 */		
		public static function getCardSoundString(num:int):String
		{
			if(num<=10)
			{
				return SoundPackage["s"+num];
			}else
			{
				return SoundPackage["s"+(["J","Q","K"][num%11])];
			}
		}
		/**
		 * 获取对应语言下的数字组合
		 * @param num
		 * @param lang
		 * @return 
		 */		
		public static function getSoundNumArr(num:uint,lang:int):Array
		{
			var mSounds:Array=[];
			if(lang==2)// 英文
			{
				if(num<=15)
				{
					mSounds.push(SoundPackage["s"+num]);
				}else if(num>15&&num<20)
				{
					mSounds.push(SoundPackage["s"+(num%10)]);
					mSounds.push(SoundPackage.sTeen);
				}else
				{
					mSounds.push(SoundPackage["s"+int(num/10)+"0"]);
					if((num%10)>0)mSounds.push(SoundPackage["s"+(num%10)]);
				}
			}else// 中文
			{
				if(num<=10)
				{
					mSounds.push(SoundPackage["s"+num]);
				}else 
				{
					if(num>=20)
					{
						mSounds.push(SoundPackage["s"+int(num/10)]);
					}
					mSounds.push(SoundPackage.s10);
					if((num%10)!=0)
					{
						mSounds.push(SoundPackage["s"+(num%10)]);
					}
				}
			}
			return mSounds;
		}
	}
}