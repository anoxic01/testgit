module lobby.view.multi {
	export class MultiTableRecordList {
		private m_uPageCount	:	number;								//每页10条
		
		private m_vecRecord		:	MultiTableRecordItem[];		//记录对象
		
		public constructor(_mcAsset) {
			this.m_vecRecord = new Array<MultiTableRecordItem>();
			
			this.m_uPageCount = 10;
			
			var item : MultiTableRecordItem;
			var mc ;
			for (var i:number= 0; i < this.m_uPageCount; i++) 
			{
				mc = _mcAsset.getChildByName("mc_record_"+i) ;
				item = new MultiTableRecordItem(mc);
//				this.addChild(item);
//				item.x = 0;
//				item.y = 30*i;
				this.m_vecRecord.push(item);
				item.setData(null);
			}
			if(item){
				item = null;
			}
			if(mc){
				mc = null;
			}
		}
		
		 public destroy():void
		{
			if(this.m_vecRecord){
				var item : MultiTableRecordItem;
				while(this.m_vecRecord.length>0){
					item = this.m_vecRecord.pop();
//					this.removeChild(item);
					item.destroy();
				}
				if(item){
					item = null;
				}
				this.m_vecRecord=null;
			}
		}
		
		public setData(_vecStruct,_currentPage:number):void{
			if(_vecStruct==null){
				console.log("多桌下注记录异常...");
				return;
			}
			var _count  = _currentPage*this.m_uPageCount;
			var _len  = _vecStruct.length;
			for (var i:number= 0; i < this.m_uPageCount; i++) 
			{
				if((i+_count)<_len){
					this.m_vecRecord[i].setData(_vecStruct[i+_count]);
				}else{
					this.m_vecRecord[i].setData(null);
				}
			}
		}
		
		 public onChangeLanguage():void{
			for(var i:number; i<this.m_vecRecord.length; i++){
				this.m_vecRecord[i].onChangeLanguage();
			}
		}
	}
}