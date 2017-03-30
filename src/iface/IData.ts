module iface {
	export interface IData {
		parse( type:number , o:Object ):any;  //解析資料
		getData( type:number ):any;			//要資料
		getUrl( type:string ):string ;    //網址
		getDataList():any[];				//產生已存放的資料列表
		originDataList():void;				//還原資料列表
	}
}