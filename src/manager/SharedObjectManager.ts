module manager {
	export class SharedObjectManager {
		public static const	FILE_NAME				:	String	=	"game_2015_11_30";
		
        private static var m_soSharedObject			:	SharedObject;

		public constructor() {
		}
		
        public static function get data() : Object
        {
            try
            {
                m_soSharedObject = SharedObject.getLocal(FILE_NAME);
            }
            catch (err:Error)
            {
                trace("本地缓存文件读取失败...");
            }
            return m_soSharedObject.data;
        }

        public static function flush() : void
        {
            m_soSharedObject = SharedObject.getLocal(FILE_NAME);
            try
            {
                m_soSharedObject.flush();
            }
            catch (err:Error)
            {
                trace("本地缓存文件存储失败...");
            }
            
        }

        public static function clear() : void
        {
            m_soSharedObject = SharedObject.getLocal(FILE_NAME);
            m_soSharedObject.clear();
            SharedObjectManager.flush();
        }

        public static function initialize() : void
        {
            if (!data["SystemSetting"])
            {
                data["SystemSetting"] = {};
            }
			
			if(!data["SystemSetting"]["language sound"]){
				data["SystemSetting"]["language sound"] = 0;
			}
            
			if (!data["SystemSetting"]["music on_off"]==null)
			{
				data["SystemSetting"]["music on_off"] = true;
			}
			if (!data["SystemSetting"]["effect on_off"]==null)
			{
				data["SystemSetting"]["effect on_off"] = true;
			}
			if (!data["SystemSetting"]["sound on_off"]==null)
			{
				data["SystemSetting"]["sound on_off"] = true;
			}
            
            if (!data["SystemSetting"]["music value"])
            {
                data["SystemSetting"]["music value"] = 0.6;
            }
			if (!data["SystemSetting"]["effect value"])
			{
				data["SystemSetting"]["effect value"] = 0.6;
			}
            if (!data["SystemSetting"]["live value"])
            {
                data["SystemSetting"]["live value"] = 0.6;
            }
			if(!data["SystemSetting"]["music selectIndex"])
			{
				data["SystemSetting"]["music selectIndex"] = 0;
			}
			
			
			/** 好路提示设置 **/
			if(!data["GoodRoadSetting"])
			{
				data["GoodRoadSetting"] = [true, true, true, true, true, true, true, true, true, true];
			}
			
			if(!data["PeekSelect"]){
				data["PeekSelect"] = {};
				data["PeekSelect"]["Type"] = 3;
			}
			
			/** 点击全屏按钮次数 **/
			if(!data["ClickFullScreenCount"]){
				data["ClickFullScreenCount"] = 0;
			}
			
			flush();
        }
		
		public static function setLanguageSound(_iValue:int):void{
			data["SystemSetting"]["language sound"] = _iValue;
		}
		public static function getLanguageSound():int{
			return data["SystemSetting"]["language sound"];
		}
		
		public static function setMusicOnOff(_bValue:Boolean):void{
			data["SystemSetting"]["music on_off"] = _bValue;
		}
		public static function getMusicOnOff():Boolean{
			return data["SystemSetting"]["music on_off"];
		}
		public static function setEffectOnOff(_bValue:Boolean):void{
			data["SystemSetting"]["effect on_off"] = _bValue;
		}
		public static function getEffectOnOff():Number{
			return data["SystemSetting"]["effect on_off"];
		}
		public static function setLiveOnOff(_bValue:Boolean):void{
			data["SystemSetting"]["live on_off"] = _bValue;
		}
		public static function getLiveOnOff():Number{
			return data["SystemSetting"]["live on_off"];
		}
		
		/**
		 * 设置选中的背景音乐
		 */
		public static function setMusicSelectIndex(value:int):void
		{
			data["SystemSetting"]["music selectIndex"] = value;
		}
		/**
		 * 获取选中的背景音乐
		 */
		public static function getMusicSelectIndex():int
		{
			return data["SystemSetting"]["music selectIndex"];
		}
		
		public static function setMusicVolume(_nValue:Number):void{
			data["SystemSetting"]["music value"] = _nValue.toFixed(2);
		}
		public static function getMusicVolume():Number{
			return data["SystemSetting"]["music value"];
		}
		
		public static function setEffectVolume(_nValue:Number):void{
			data["SystemSetting"]["effect value"] = _nValue.toFixed(2);
		}
		public static function getEffectVolume():Number{
			return data["SystemSetting"]["effect value"];
		}
		
		public static function setLiveVolume(_nValue:Number):void{
			data["SystemSetting"]["live value"] = _nValue.toFixed(2);
		}
		public static function getLiveVolume():Number{
			return data["SystemSetting"]["live value"];
		}
		
		
		
		public static function setGoodRoadSetting(_iIndex:int, _bValue:Boolean):void{
			data["GoodRoadSetting"][_iIndex] = _bValue;
		}
		public static function getGoodRoadSetting():Array{
			return data["GoodRoadSetting"];
		}
		
		
		/** 视讯频道 **/
		public static function setCDNList(_strct:VideoCDNStruct):void{
			data["CDNList"] = _strct;
		}
		public static function getCDNList():Object{
			return data["CDNList"];
		}
		
		
		
		/** 视讯分辨率 **/
		public static function setResolution(_strct:ResolutionStruct):void{
			data["Resolution"] = _strct;
		}
		public static function getResolution():Object{
			return data["Resolution"];
		}
		/**電投百家瞇牌選擇*/
		public static function setPeekSelect(_iVlaue:int):void {
			data["PeekSelect"]["Type"] = _iVlaue;
		}
		public static function getPeekSelect():int {
			return data["PeekSelect"]["Type"];
		}
		public static function clearPeekSelect():void {
			data["PeekSelect"] = null;
			flush();
		}
		
		/** 全屏按钮点击次数 **/
		public static function setClickFullScreenCount():void{
			data["ClickFullScreenCount"] += 1; 
		}
		public static function getClickFullScreenCount():int{
			return data["ClickFullScreenCount"];
		}

//        public static function setPlazaCheckBoxStatus(uIndex:uint, bStatus:Boolean) : void
//        {
//            data["SystemSettingPlaza"]["status"][uIndex] = bStatus;
//            return;
//        }// end function

//        public static function get plazaCheckBoxStatus() : Array
//        {
//            return data["SystemSettingPlaza"]["status"];
//        }// end function

//        public static function get plazaBlueFilter() : Boolean
//        {
//            return data["SystemSettingPlaza"]["status"][1];
//        }// end function
//
//        public static function get plazaMusic() : Boolean
//        {
//            return data["SystemSettingPlaza"]["status"][2];
//        }// end function
//
//        public static function set plazaMusic(bValue:Boolean) : void
//        {
//            data["SystemSettingPlaza"]["status"][2] = bValue;
//            return;
//        }// end function
//
//        public static function get plazaSound() : Boolean
//        {
//            return data["SystemSettingPlaza"]["status"][3];
//        }// end function
//
//        public static function set plazaSound(bValue:Boolean) : void
//        {
//            data["SystemSettingPlaza"]["status"][3] = bValue;
//            return;
//        }// end function
//
//        public static function get plazaMusicVolume() : Number
//        {
//            return data["SystemSettingPlaza"]["music value"];
//        }// end function
//
//        public static function set plazaMusicVolume(nVolume:Number) : void
//        {
//            data["SystemSettingPlaza"]["music value"] = nVolume.toFixed(2);
//            return;
//        }// end function
//
//        public static function get plazaSoundVolume() : Number
//        {
//            return data["SystemSettingPlaza"]["sound value"];
//        }// end function
//
//        public static function set plazaSoundVolume(nVolume:Number) : void
//        {
//            data["SystemSettingPlaza"]["sound value"] = nVolume.toFixed(2);
//            return;
//        }// end function

//        public static function get bright() : Number
//        {
//            return data["bright"];
//        }// end function
//
//        public static function set bright(nValue:Number) : void
//        {
//            data["bright"] = nValue;
//            return;
//        }// end function

	}
}