module iface {
	export interface IData {
		parse( type:uint , o:Object ):*;  //解析資料
		getData( type:uint ):*;			//要資料
		getUrl( type:String ):String ;    //網址
		getDataList():Array;				//產生已存放的資料列表
		originDataList():void;				//還原資料列表
	}
}