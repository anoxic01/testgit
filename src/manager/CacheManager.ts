module manager {
	export class CacheManager {
		private static pot = new egret.Point();
		private static _instance:CacheManager;
		public static getInstance() : CacheManager
		{
			if(CacheManager._instance==null){
				CacheManager._instance = new CacheManager();
			}
			return CacheManager._instance;
		}
		
		
		private cacheDict;
		
		public constructor() {
			this.cacheDict = {};
		}
		
		/**
		 * 
		 * @param lable
		 * @param bmds
		 * @param infos
		 */		
		public cacheBitmapData(label,infos,frameLabels=null):void
		{
			this.cacheDict[label]={infos:infos,frameLabels:frameLabels};
		}
		
		public getCacheLangFrameInfo(label):item.LangFrameInfo
		{
			if(this.hasCache(label))
			{
				if(this.cacheDict[label].langInfo!=null)
				{
					var cinfo = this.cacheDict[label].langInfo;
					var info = new item.LangFrameInfo();
					info.totalFrames = cinfo.totalFrames;
					info.langs = cinfo.langs.concat();
					return info;
				}
			}
			return null;
		}
		
		public getCacheFrameInfos(label):item.FrameInfo[]
		{
			if(this.hasCache(label))
			{
				if(this.cacheDict[label].infos!=null)
					return this.cacheDict[label].infos.concat();
			}
			return null;
		}
		public getCacheFrameLabels(label):any[]
		{
			if(this.hasCache(label))
			{
				if(this.cacheDict[label].frameLabels!=null)
					return this.cacheDict[label].frameLabels.concat();
			}
			return null;
		}
		
		public hasCache(label):Boolean
		{
			return this.cacheDict[label]!=null;
		}
		
		public convertFrameInfo(dis):item.FrameInfo
		{
			var info = new item.FrameInfo();
			var rect = dis.getBounds(dis);
			info.x = Math.round(rect.x * 1);
			info.y = Math.round(rect.y * 1);
			rect.width = (Math.ceil(rect.width * 1));
			rect.height = (Math.ceil(rect.height * 1));
			if (rect.isEmpty())
			{
				rect.width = 1;
				rect.height = 1;
			}
			var bitData : egret.RenderTexture = new egret.RenderTexture();
			bitData.drawToTexture(dis );
			//剔除边缘空白像素
			var realRect = bitData.bitmapData.getColorBoundsRect(0xFF000000, 0x00000000, false);
			if (!realRect.isEmpty() && (bitData.bitmapData.width != realRect.width || bitData.bitmapData.height != realRect.height))
			{
				var realBitData = new egret.BitmapData();
				realBitData.copyPixels(bitData, realRect, CacheManager.pot);
				bitData.dispose();
				bitData = realBitData;
				info.x += realRect.x;
				info.y += realRect.y;
			}
			info.bitmapData = bitData;
			return info;
		}
		
		public cacheMovieClip(label,mc):void
		{
			var len = mc.totalFrames;
			var index = 1;
			var frameInfos = new Array<item.FrameInfo>();
			var labels = mc.currentLabels;
			while(index<=len)
			{
				mc.gotoAndStop(index);
				var info = this.convertFrameInfo(mc);
				frameInfos.push(info);
				index++;
			}
			this.cacheBitmapData(label,frameInfos,labels);
		}
		public cacheLangBitmapData(label,info,frameLabels=null):void
		{
			this.cacheDict[label]={langInfo:info,frameLabels:frameLabels};
		}
		/**
		 *缓存多语言的MC 
		 */		
		public cacheLangMovieClip(label,mc,hasLangChildNames):void
		{
			var langFrameInfo = new item.LangFrameInfo();
			var len = mc.totalFrames;
			var index = 1;
			var dict = {};
			var clipMaxLangNum = 1;// 默认为只有1种语言，防止hasLangChildNames传入空数据时lang为0
			var labels = mc.currentLabels;
			var i = 0,j = 0;
			langFrameInfo.totalFrames = len;
			while(index<=len)
			{
				mc.gotoAndStop(index);
				var isFindLangChild:Boolean = false;
				var maxLangNum = 0;// 最大的多语言数量 
				var langChilds = []; // 所有在此帧的多语言元件
				for (i = 0; i < hasLangChildNames.length; i++) 
				{
					var langChildParents = hasLangChildNames[i].split(".");
					var tempMC = mc;
					var langChildName:string = null;
					while(langChildParents.length>0)
					{
						if(langChildName!=null)
						{
							if(tempMC.hasOwnProperty(langChildName))
							{
								tempMC = tempMC[langChildName];
							}else
							{
								tempMC = null;
								console.log("无法cache元件--->",langChildName);
								break;
							}
						}
						langChildName = langChildParents.shift();
					}
					if(tempMC&&tempMC.hasOwnProperty(langChildName))///// 存在指定名称的多语言元件
					{
						var langChild = tempMC[langChildName];
						if(langChild!=null)
						{
							isFindLangChild = true;
							langChild.gotoAndStop(1);
							langChilds.push(langChild);
							if(langChild.totalFrames>maxLangNum)
								maxLangNum = langChild.totalFrames;
						}
					}
				}
				if(isFindLangChild==false)
				{
					dict[index] = CacheManager.getInstance().convertFrameInfo(mc);
				}else/// 如果已找到多语言元件
				{
					var langs = new Array<item.FrameInfo>();
					if(clipMaxLangNum<maxLangNum)clipMaxLangNum = maxLangNum;// 帧里面的的多语言最大数量
					for (i = 1; i <=maxLangNum; i++) 
					{
						for (j = 0; j < langChilds.length; j++) 
						{
							var child = langChilds[j];
							if(child.totalFrames>i)child.gotoAndStop(i);
							else child.gotoAndStop(child.totalFrames);
						}
						langs.push( CacheManager.getInstance().convertFrameInfo(mc));
					}
					dict[index] = langs;
				}
				index++;
			}
			for (i = 0; i < clipMaxLangNum; i++) 
			{
				var frameInfos = new Array<item.FrameInfo>();
				index = 1;
				while(index<=len)
				{
					var frameData = dict[index];
					if(frameData instanceof item.FrameInfo)
					{
						frameInfos.push(frameData);
					}else 
					{
						frameInfos.push(frameData[i]);
					}
					index++;
				}
				langFrameInfo.langs.push(frameInfos);
			}
			this.cacheLangBitmapData(label,langFrameInfo,labels);
		}
	}
}