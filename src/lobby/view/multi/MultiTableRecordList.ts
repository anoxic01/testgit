module lobby.view.multi {
	export class MultiTableRecordList {
		private var m_uPageCount	:	uint;								//每页10条
		
		private var m_vecRecord		:	Vector.<MultiTableRecordItem>;		//记录对象
		
		public constructor(_mcAsset:MovieClip) {
			m_vecRecord = new Vector.<MultiTableRecordItem>;
			
			m_uPageCount = 10;
			
			var item : MultiTableRecordItem;
			var mc : MovieClip;
			for (var i:int = 0; i < m_uPageCount; i++) 
			{
				mc = _mcAsset.getChildByName("mc_record_"+i) as MovieClip;
				item = new MultiTableRecordItem(mc);
//				this.addChild(item);
//				item.x = 0;
//				item.y = 30*i;
				m_vecRecord.push(item);
				item.setData(null);
			}
			if(item){
				item = null;
			}
			if(mc){
				mc = null;
			}
		}
		
		override public function destroy():void
		{
			if(m_vecRecord){
				var item : MultiTableRecordItem;
				while(m_vecRecord.length>0){
					item = m_vecRecord.pop();
//					this.removeChild(item);
					item.destroy();
				}
				if(item){
					item = null;
				}
				m_vecRecord=null;
			}
		}
		
		public function setData(_vecStruct:Vector.<RecordBetStruct>,_currentPage:uint):void{
			if(_vecStruct==null){
				trace("多桌下注记录异常...");
				return;
			}
			var _count : int = _currentPage*m_uPageCount;
			var _len : int = _vecStruct.length;
			for (var i:int = 0; i < m_uPageCount; i++) 
			{
				if((i+_count)<_len){
					m_vecRecord[i].setData(_vecStruct[i+_count]);
				}else{
					m_vecRecord[i].setData(null);
				}
			}
		}
		
		override public function onChangeLanguage():void{
			for(var i:int; i<m_vecRecord.length; i++){
				m_vecRecord[i].onChangeLanguage();
			}
		}
	}
}