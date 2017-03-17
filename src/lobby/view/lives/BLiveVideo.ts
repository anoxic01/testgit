module lobby.view.lives {
	export class BLiveVideo implements ISprite{
		protected var m_rtmpPlayer		:	RTMPPlayer;				//播放视讯
		
		protected var m_sServer			:	String;					//服务地址
		protected var m_sStream			:	String;					//媒体名称
		protected var m_sHash			:	String;					//
		protected var m_sSharedSecuret	:	String;					//共享密钥
		
		protected var uCount			:	uint;					//重连次数
		
		public constructor() {
		}
		
		public function destroy():void{
			if(m_rtmpPlayer){
				m_rtmpPlayer.destroy();
				m_rtmpPlayer = null;
			}
		}
		
		public function get connected():Boolean{
			if(m_rtmpPlayer){
				return m_rtmpPlayer.connected;
			}
			return false;
		}
		
		public function get iMaxBytePerSecond():int{
			if( m_rtmpPlayer ){
				return m_rtmpPlayer.iMaxBytePerSecond;
			}
			else {
				return 0;
			}
		}
		
		protected function hash(_sServer:String, _sStream:String):void{
			m_sSharedSecuret = "Aa123456Aa";	//stage.loaderInfo.parameters["sharedSecuret"];
			var _sParameterPrefix : String = "wowzatoken";	//stage.loaderInfo.parameters["parameterPrefix"];
			var _uEndtime : uint = 1544267500;			//stage.loaderInfo.parameters["endtime"];
			var _uStarttime : uint = 0;					//stage.loaderInfo.parameters["starttime"];
			var _sHash : String = _sServer.slice(_sServer.lastIndexOf("/")+1) + "/" + _sStream + "?" + m_sSharedSecuret + "&" + _sParameterPrefix + "endtime=" + String(_uEndtime) + "&" + _sParameterPrefix + "starttime=" + String(_uStarttime);
			var _SHA256 : SHA256 = new SHA256();
			var data : ByteArray = Hex.toArray(Hex.fromString(_sHash));
			var _sHashValue : ByteArray = _SHA256.hash(data);
			var _usableHash	:String	= Base64.encodeByteArray(_sHashValue);
//			trace("base64.encode:",_usableHash);
			var _add : RegExp = /\+/g;
			var _slash : RegExp = /\//g;
			//RegExp /a/是要替换的字符，g全部有关字符串都将被替换 
			_usableHash = _usableHash.replace(_add, '-'); 
//			trace('提示：+替换-之后的字符串为: ' + _usableHash); 
			_usableHash = _usableHash.replace(_slash, '_'); 
//			trace('提示：\\替换_之后的字符串为: ' + _usableHash);
			m_sHash = _sStream+"?"+_sParameterPrefix+"endtime="+String(_uEndtime)+"&"+_sParameterPrefix+"starttime="+String(_uStarttime)+"&"+_sParameterPrefix+"hash="+_usableHash;
		}
		
		public function change():void{
			
		}
		
		public function refresh():void{
			
		}
		
		public function setVolume( vol:Number , panning:Number = 0):void {
			if( m_rtmpPlayer ){
				m_rtmpPlayer.setVolume( vol , panning );
			}
		}
		
		public function clearView():void{
			m_rtmpPlayer.clearVideoFull();
		}
	}
}