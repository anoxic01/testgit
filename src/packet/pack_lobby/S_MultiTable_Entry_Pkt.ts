module packet.pack_lobby {
	export class S_MultiTable_Entry_Pkt implements iface.IProtocolStruct{
		public EntryTableInfo	;			//入口桌资料
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.EntryTableInfo = new lobby.model.struct.TableStruct(oData.EntryTableInfo);		
//			console.log("###测试入口卓###")//正式代碼
//EntryTableInfo = LobbyData.getInstance().lobbyInfo.findTableStructGT( GameDefine.BAC , 13);			//測試代碼 
			if (this.EntryTableInfo.TableID<=0){
				manager.NetWorkManager.getInstance().checkGameNetWork(define.Define.GameMultiTableFailed);	
			}else{
				console.log(this,"收到多桌入口桌："+String(this.EntryTableInfo.TableID));
				//登陆多桌
				manager.LobbyManager.getInstance().connectMultiTable(this.EntryTableInfo);
			}
			
		}
	}
}