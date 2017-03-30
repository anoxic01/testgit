module util {
	export class Utils {
		public constructor() {
		}
		
		public static DumpBinary(preString:string, buf:egret.ByteArray, off:number, len:number):void
		{
			var i:number;
			var j:number;
			var str:string;
			
			
			for ( i = off; i < off + len; i += 16 )
			{
				str = "";
				
				if ( preString )
					str += preString;
					
				for ( j = 0 ; j < 16 ; j++ )
				{
					if ( (i + j) < off + len )
					{
						if ( buf[i + j] >= 0x00 && buf[i + j] <= 0x0F )
							str += "0x0" + Number(buf[i + j]).toString(16).toUpperCase() + " ";
						else
							str += "0x" + Number(buf[i + j]).toString(16).toUpperCase() + " ";
					}
					else
						str += "     ";
				} /* end for */
				
				str += "|";
				for ( j = 0 ; j < 16 ; j++ )
				{
					if ( (i + j) < off + len )
					{
						if ( (buf[i + j] < 32) || (buf[i+j] > 128) )
							str += ".";
						else
							str += String.fromCharCode(buf[i + j]);
					}
					else
						break;
				} /* end for */
				
//				trace(str);
			} /* end for */
//			trace("");
		} /* end DumpBinary */
		
		public static DumpPktHeader(buf:egret.ByteArray):void
		{
			this.DumpBinary("\t", buf, 0, 4);
		}
		
		public static Dump(buf:egret.ByteArray):void
		{
			this.DumpBinary("\t", buf, 0, buf.length);
		}
		
		
		/**
		 *复制数据到对象 
		 * @param copyObj
		 * @param targetObj
		 * @param ingoreAr
		 * 
		 */
		public static DumpObj( copyObj:Object , targetObj:Object  , ingoreAr = null ):void {
			if ( copyObj == null ) return;
			if ( targetObj == null ) return;
			if ( ingoreAr == null ) ingoreAr = [];
			
			
			var idx:number;
			
			for (var key in targetObj )  {
				idx = ingoreAr.indexOf( key );  //查找要忽略的屬性
				
				//要找到這個屬性才賦值
				if ( idx == -1 ) {
					copyObj[key] = targetObj[key];
				}	
				//trace("key"+ key+ ",  targetObj[key] :::" + targetObj[key]  );
			}
			
		}
		
	}
}