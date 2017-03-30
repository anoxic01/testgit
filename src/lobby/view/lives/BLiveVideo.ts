module lobby.view.lives {
	export class BLiveVideo implements iface.ISprite{
		protected m_rtmpPlayer		:	util.rtmp.RTMPPlayer;				//播放视讯
		
		protected m_sServer			:	String;					//服务地址
		protected m_sStream			:	String;					//媒体名称
		protected m_sHash			:	String;					//
		protected m_sSharedSecuret	:	String;					//共享密钥
		
		protected uCount			:	number;					//重连次数
		
		public constructor() {
		}
		
		public destroy():void{
			if(this.m_rtmpPlayer){
				this.m_rtmpPlayer.destroy();
				this.m_rtmpPlayer = null;
			}
		}
		
		get connected(): boolean{
			if(this.m_rtmpPlayer){
				return this.m_rtmpPlayer.connected;
			}
			return false;
		}
		
		get iMaxBytePerSecond():number{
			if( this.m_rtmpPlayer ){
				return this.m_rtmpPlayer.iMaxBytePerSecond;
			}
			else {
				return 0;
			}
		}
		
		protected hash(_sServer:string, _sStream:string):void{
			this.m_sSharedSecuret = "Aa123456Aa";	//stage.loaderInfo.parameters["sharedSecuret"];
			var _sParameterPrefix : string = "wowzatoken";	//stage.loaderInfo.parameters["parameterPrefix"];
			var _uEndtime : number = 1544267500;			//stage.loaderInfo.parameters["endtime"];
			var _uStarttime : number = 0;					//stage.loaderInfo.parameters["starttime"];
			var _sHash : string = _sServer.slice(_sServer.lastIndexOf("/")+1) + "/" + _sStream + "?" + this.m_sSharedSecuret + "&" + _sParameterPrefix + "endtime=" + String(_uEndtime) + "&" + _sParameterPrefix + "starttime=" + String(_uStarttime);
			var _SHA256 : util.SHA256 = new util.SHA256();
			var data : egret.ByteArray = util.Hex.toArray(util.Hex.fromString(_sHash));
			var _sHashValue : egret.ByteArray = _SHA256.hash(data);
			var _usableHash	:string	= util.Base64.encodeByteArray(_sHashValue);
//			console.log("base64.encode:",_usableHash);
			var _add : RegExp = /\+/g;
			var _slash : RegExp = /\//g;
			//RegExp /a/是要替换的字符，g全部有关字符串都将被替换 
			_usableHash = _usableHash.replace(_add, '-'); 
//			console.log('提示：+替换-之后的字符串为: ' + _usableHash); 
			_usableHash = _usableHash.replace(_slash, '_'); 
//			console.log('提示：\\替换_之后的字符串为: ' + _usableHash);
			this.m_sHash = _sStream+"?"+_sParameterPrefix+"endtime="+String(_uEndtime)+"&"+_sParameterPrefix+"starttime="+String(_uStarttime)+"&"+_sParameterPrefix+"hash="+_usableHash;
		}
		
		public change():void{
			
		}
		
		public refresh():void{
			
		}
		
		public setVolume( vol:Number , panning:Number = 0):void {
			if( this.m_rtmpPlayer ){
				this.m_rtmpPlayer.setVolume( vol , panning );
			}
		}
		
		public clearView():void{
			this.m_rtmpPlayer.clearVideoFull();
		}
	}
}