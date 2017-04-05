module packet.lobby {
	export class S_MultiTable_Entry_Pkt implements IProtocolStruct{
		public EntryTableInfo	:	TableStruct;			//入口桌资料
		
		public constructor() {
		}
		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
			EntryTableInfo = new TableStruct(oData.EntryTableInfo);		
//			console.log("###测试入口卓###")//正式代碼
//EntryTableInfo = LobbyData.getInstance().lobbyInfo.findTableStructGT( GameDefine.BAC , 13);			//測試代碼 
			if (EntryTableInfo.TableID<=0){
				NetWorkManager.getInstance().checkGameNetWork(Define.GameMultiTableFailed);	
			}else{
				console.log(this,"收到多桌入口桌："+String(EntryTableInfo.TableID));
				//登陆多桌
				LobbyManager.getInstance().connectMultiTable(EntryTableInfo);
			}
			
		}
	}
}