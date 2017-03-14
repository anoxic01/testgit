module lobby.model.struct {
	export class VideoReloadStruct {
		public constructor(oData:Object) {
			//更新频道
			var vecCDNList : Vector.<VideoCDNStruct> = LobbyData.getInstance().lobbyInfo.vecCDNList;
			LobbyData.getInstance().lobbyInfo.vecCDNList = new Vector.<VideoCDNStruct>;
			for (var k:int = 0; k < oData.CDNList.length; k++) 
			{
				LobbyData.getInstance().lobbyInfo.vecCDNList.push(new VideoCDNStruct(oData.CDNList[k]));
			}
			if(SharedObjectManager.getCDNList()!=null){
				LobbyData.getInstance().lobbyInfo.currentCDN = LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(SharedObjectManager.getCDNList().ChannelNo);
			}
			
			//更新解析度
			LobbyData.getInstance().lobbyInfo.vecResolutionList = new Vector.<ResolutionStruct>;
			if(oData.ResolutionList && oData.ResolutionList.length==3){
				for (var i2:int = 0; i2 < oData.ResolutionList.length; i2++) 
				{
					LobbyData.getInstance().lobbyInfo.vecResolutionList.push(new ResolutionStruct(oData.ResolutionList[i2]));
					if(SharedObjectManager.getResolution()==null){
						if(LobbyData.getInstance().lobbyInfo.vecResolutionList[i2].IsDef){
							LobbyData.getInstance().lobbyInfo.currentResolution = LobbyData.getInstance().lobbyInfo.vecResolutionList[i2];
						}
					}
				}
			}
			if(SharedObjectManager.getResolution()!=null){
				LobbyData.getInstance().lobbyInfo.currentResolution = LobbyData.getInstance().lobbyInfo.getResolutionByIndex(SharedObjectManager.getResolution().PriorityNo);
			}
			
			//更新赌桌
			var tableStruct	: TableStruct;
			var tableList : Array = [];
			if(oData.TableVideoStreamList){
				for (var i:int = 0; i < oData.TableVideoStreamList.length; i++) 
				{
					tableStruct = LobbyData.getInstance().getTableStructByTableID(oData.TableVideoStreamList[i].TableID);
					if(tableStruct){
						tableStruct.DefCDNID = oData.TableVideoStreamList[i].DefCDNID;
						tableStruct.StreamAppName = oData.TableVideoStreamList[i].AppName;
						tableStruct.StreamName = oData.TableVideoStreamList[i].StreamName;
						tableList.push(oData.TableVideoStreamList[i].TableID);
						if(SharedObjectManager.getCDNList()==null){
							if(LobbyManager.getInstance().getGameTableID()==oData.TableVideoStreamList[i].TableID){
								LobbyData.getInstance().lobbyInfo.currentCDN = LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(tableStruct.DefCDNID);
							}
						}
					}
				}
			}
			if(tableStruct){
				tableStruct = null;
			}
			
			if(LobbyManager.getInstance().channel){
				LobbyManager.getInstance().channel.upDate();
			}
			
			if(LobbyManager.getInstance().multiTableView && LobbyManager.getInstance().multiTableView.currentList){
				LobbyManager.getInstance().multiTableView.currentList.updateVideoData(oData.TableVideoStreamList);
			}
			
			LobbyManager.getInstance().lobbyView.toolView.changeResolution();
			
			//执行重连行为
			LobbyManager.getInstance().liveReplay(tableList);
		}
	}
}