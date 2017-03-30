module lobby.model.struct {
	export class VideoReloadStruct {
		public constructor(oData) {
			//更新频道
			var vecCDNList : VideoCDNStruct[] = model.LobbyData.getInstance().lobbyInfo.vecCDNList;
			model.LobbyData.getInstance().lobbyInfo.vecCDNList = new Array<VideoCDNStruct>();
			for (var k:number= 0; k < oData.CDNList.length; k++) 
			{
				model.LobbyData.getInstance().lobbyInfo.vecCDNList.push(new VideoCDNStruct(oData.CDNList[k]));
			}
			if(manager.SharedObjectManager.getCDNList()!=null){
				model.LobbyData.getInstance().lobbyInfo.currentCDN = model.LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(manager.SharedObjectManager.getCDNList().ChannelNo);
			}
			
			//更新解析度
			model.LobbyData.getInstance().lobbyInfo.vecResolutionList = new Array<ResolutionStruct>();
			if(oData.ResolutionList && oData.ResolutionList.length==3){
				for (var i2:number= 0; i2 < oData.ResolutionList.length; i2++) 
				{
					model.LobbyData.getInstance().lobbyInfo.vecResolutionList.push(new ResolutionStruct(oData.ResolutionList[i2]));
					if(manager.SharedObjectManager.getResolution()==null){
						if(model.LobbyData.getInstance().lobbyInfo.vecResolutionList[i2].IsDef){
							model.LobbyData.getInstance().lobbyInfo.currentResolution = model.LobbyData.getInstance().lobbyInfo.vecResolutionList[i2];
						}
					}
				}
			}
			if(manager.SharedObjectManager.getResolution()!=null){
				model.LobbyData.getInstance().lobbyInfo.currentResolution = model.LobbyData.getInstance().lobbyInfo.getResolutionByIndex(manager.SharedObjectManager.getResolution().PriorityNo);
			}
			
			//更新赌桌
			var tableStruct	: TableStruct;
			var tableList : any[] = [];
			if(oData.TableVideoStreamList){
				for (var i:number= 0; i < oData.TableVideoStreamList.length; i++) 
				{
					tableStruct = model.LobbyData.getInstance().getTableStructByTableID(oData.TableVideoStreamList[i].TableID);
					if(tableStruct){
						tableStruct.DefCDNID = oData.TableVideoStreamList[i].DefCDNID;
						tableStruct.StreamAppName = oData.TableVideoStreamList[i].AppName;
						tableStruct.StreamName = oData.TableVideoStreamList[i].StreamName;
						tableList.push(oData.TableVideoStreamList[i].TableID);
						if(manager.SharedObjectManager.getCDNList()==null){
							if(manager.LobbyManager.getInstance().getGameTableID()==oData.TableVideoStreamList[i].TableID){
								model.LobbyData.getInstance().lobbyInfo.currentCDN = model.LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(tableStruct.DefCDNID);
							}
						}
					}
				}
			}
			if(tableStruct){
				tableStruct = null;
			}
			
			if(manager.LobbyManager.getInstance().channel){
				manager.LobbyManager.getInstance().channel.upDate();
			}
			
			if(manager.LobbyManager.getInstance().multiTableView && manager.LobbyManager.getInstance().multiTableView.currentList){
				manager.LobbyManager.getInstance().multiTableView.currentList.updateVideoData(oData.TableVideoStreamList);
			}
			
			manager.LobbyManager.getInstance().lobbyView.toolView.changeResolution();
			
			//执行重连行为
			manager.LobbyManager.getInstance().liveReplay(tableList);
		}
	}
}