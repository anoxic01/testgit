module manager {
	export class SharedObjectManager {
		public static FILE_NAME			:	string	=	"game_2015_11_30";
		
        private static m_soSharedObject;

		public constructor() {
		}
		
        static get data() : Object
        {
            try
            {
                SharedObjectManager.m_soSharedObject = SharedObject.getLocal(SharedObjectManager.FILE_NAME);
            }
            catch (err)
            {
                console.log("本地缓存文件读取失败...");
            }
            return SharedObjectManager.m_soSharedObject.data;
        }

        public static flush() : void
        {
            SharedObjectManager.m_soSharedObject = SharedObject.getLocal(SharedObjectManager.FILE_NAME);
            try
            {
                SharedObjectManager.m_soSharedObject.flush();
            }
            catch (err)
            {
                console.log("本地缓存文件存储失败...");
            }
            
        }

        public static clear() : void
        {
            SharedObjectManager.m_soSharedObject = SharedObject.getLocal(SharedObjectManager.FILE_NAME);
            SharedObjectManager.m_soSharedObject.clear();
            SharedObjectManager.flush();
        }

        public static initialize() : void
        {
            if (!this.data["SystemSetting"])
            {
                this.data["SystemSetting"] = {};
            }
			
			if(!this.data["SystemSetting"]["language sound"]){
				this.data["SystemSetting"]["language sound"] = 0;
			}
            
			if (!this.data["SystemSetting"]["music on_off"]==null)
			{
				this.data["SystemSetting"]["music on_off"] = true;
			}
			if (!this.data["SystemSetting"]["effect on_off"]==null)
			{
				this.data["SystemSetting"]["effect on_off"] = true;
			}
			if (!this.data["SystemSetting"]["sound on_off"]==null)
			{
				this.data["SystemSetting"]["sound on_off"] = true;
			}
            
            if (!this.data["SystemSetting"]["music value"])
            {
                this.data["SystemSetting"]["music value"] = 0.6;
            }
			if (!this.data["SystemSetting"]["effect value"])
			{
				this.data["SystemSetting"]["effect value"] = 0.6;
			}
            if (!this.data["SystemSetting"]["live value"])
            {
               this.data["SystemSetting"]["live value"] = 0.6;
            }
			if(!this.data["SystemSetting"]["music selectIndex"])
			{
				this.data["SystemSetting"]["music selectIndex"] = 0;
			}
			
			
			/** 好路提示设置 **/
			if(!this.data["GoodRoadSetting"])
			{
				this.data["GoodRoadSetting"] = [true, true, true, true, true, true, true, true, true, true];
			}
			
			if(!this.data["PeekSelect"]){
				this.data["PeekSelect"] = {};
				this.data["PeekSelect"]["Type"] = 3;
			}
			
			/** 点击全屏按钮次数 **/
			if(!this.data["ClickFullScreenCount"]){
				this.data["ClickFullScreenCount"] = 0;
			}
			
			this.flush();
        }
		
		public static setLanguageSound(_iValue:number):void{
			this.data["SystemSetting"]["language sound"] = _iValue;
		}
		public static getLanguageSound():number{
			return this.data["SystemSetting"]["language sound"];
		}
		
		public static setMusicOnOff(_bValue: boolean):void{
			this.data["SystemSetting"]["music on_off"] = _bValue;
		}
		public static getMusicOnOff(): boolean{
			return this.data["SystemSetting"]["music on_off"];
		}
		public static setEffectOnOff(_bValue: boolean):void{
			this.data["SystemSetting"]["effect on_off"] = _bValue;
		}
		public static getEffectOnOff():number{
			return this.data["SystemSetting"]["effect on_off"];
		}
		public static setLiveOnOff(_bValue: boolean):void{
			this.data["SystemSetting"]["live on_off"] = _bValue;
		}
		public static getLiveOnOff():number{
			return this.data["SystemSetting"]["live on_off"];
		}
		
		/**
		 * 设置选中的背景音乐
		 */
		public static setMusicSelectIndex(value:number):void
		{
			this.data["SystemSetting"]["music selectIndex"] = value;
		}
		/**
		 * 获取选中的背景音乐
		 */
		public static getMusicSelectIndex():number
		{
			return this.data["SystemSetting"]["music selectIndex"];
		}
		
		public static setMusicVolume(_nValue:number):void{
			this.data["SystemSetting"]["music value"] = _nValue.toFixed(2);
		}
		public static getMusicVolume():number{
			return this.data["SystemSetting"]["music value"];
		}
		
		public static setEffectVolume(_nValue:number):void{
			this.data["SystemSetting"]["effect value"] = _nValue.toFixed(2);
		}
		public static getEffectVolume():number{
			return this.data["SystemSetting"]["effect value"];
		}
		
		public static setLiveVolume(_nValue:number):void{
			this.data["SystemSetting"]["live value"] = _nValue.toFixed(2);
		}
		public static getLiveVolume():number{
			return this.data["SystemSetting"]["live value"];
		}
		
		
		
		public static setGoodRoadSetting(_iIndex:number, _bValue: boolean):void{
			this.data["GoodRoadSetting"][_iIndex] = _bValue;
		}
		public static getGoodRoadSetting():any[]{
			return this.data["GoodRoadSetting"];
		}
		
		
		/** 视讯频道 **/
		public static setCDNList(_strct:lobby.model.struct.VideoCDNStruct):void{
			this.data["CDNList"] = _strct;
		}
		public static getCDNList():any{
			return this.data["CDNList"];
		}
		
		
		
		/** 视讯分辨率 **/
		public static setResolution(_strct:lobby.model.struct.ResolutionStruct):void{
			this.data["Resolution"] = _strct;
		}
		public static getResolution():any{
			return this.data["Resolution"];
		}
		/**電投百家瞇牌選擇*/
		public static setPeekSelect(_iVlaue:number):void {
			this.data["PeekSelect"]["Type"] = _iVlaue;
		}
		public static getPeekSelect():number{
			return this.data["PeekSelect"]["Type"];
		}
		public static clearPeekSelect():void {
			this.data["PeekSelect"] = null;
			this.flush();
		}
		
		/** 全屏按钮点击次数 **/
		public static setClickFullScreenCount():void{
			this.data["ClickFullScreenCount"] += 1; 
		}
		public static getClickFullScreenCount():number{
			return this.data["ClickFullScreenCount"];
		}

//        public static setPlazaCheckBoxStatus(uIndex:number, bStatus: boolean) : void
//        {
//            data["SystemSettingPlaza"]["status"][uIndex] = bStatus;
//            return;
//        }// end function

//        public static get plazaCheckBoxStatus() : any[]
//        {
//            return data["SystemSettingPlaza"]["status"];
//        }// end function

//        public static get plazaBlueFilter() :  boolean
//        {
//            return data["SystemSettingPlaza"]["status"][1];
//        }// end function
//
//        public static get plazaMusic() :  boolean
//        {
//            return data["SystemSettingPlaza"]["status"][2];
//        }// end function
//
//        public static set plazaMusic(bValue: boolean) : void
//        {
//            data["SystemSettingPlaza"]["status"][2] = bValue;
//            return;
//        }// end function
//
//        public static get plazaSound() :  boolean
//        {
//            return data["SystemSettingPlaza"]["status"][3];
//        }// end function
//
//        public static set plazaSound(bValue: boolean) : void
//        {
//            data["SystemSettingPlaza"]["status"][3] = bValue;
//            return;
//        }// end function
//
//        public static get plazaMusicVolume() : Number
//        {
//            return data["SystemSettingPlaza"]["music value"];
//        }// end function
//
//        public static set plazaMusicVolume(nVolume:number) : void
//        {
//            data["SystemSettingPlaza"]["music value"] = nVolume.toFixed(2);
//            return;
//        }// end function
//
//        public static get plazaSoundVolume() : Number
//        {
//            return data["SystemSettingPlaza"]["sound value"];
//        }// end function
//
//        public static set plazaSoundVolume(nVolume:number) : void
//        {
//            data["SystemSettingPlaza"]["sound value"] = nVolume.toFixed(2);
//            return;
//        }// end function

//        public static get bright() : Number
//        {
//            return data["bright"];
//        }// end function
//
//        public static set bright(nValue:number) : void
//        {
//            data["bright"] = nValue;
//            return;
//        }// end function

	}
}