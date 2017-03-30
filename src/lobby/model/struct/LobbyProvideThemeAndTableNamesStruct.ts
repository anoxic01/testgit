module lobby.model.struct {
	export class LobbyProvideThemeAndTableNamesStruct {
		public constructor(oData) {
			var lenTheme : number = oData.ThemeNameList.length;
			lobby.model.LobbyData.getInstance().ThemeNameList = new Array<ThemeNameStruct>();
			for (var i:number= 0; i < lenTheme; i++) 
			{
				var structTheme : ThemeNameStruct = new ThemeNameStruct();
				structTheme.ThemeID = oData.ThemeNameList[i].ThemeID;
				structTheme.CN = oData.ThemeNameList[i].CN;
				structTheme.TW = oData.ThemeNameList[i].TW;
				structTheme.EN = oData.ThemeNameList[i].EN;
				lobby.model.LobbyData.getInstance().ThemeNameList.push(structTheme);
			}
			
			var lenTable : number = oData.TableNameList.length;
			lobby.model.LobbyData.getInstance().TableNameList = new Array<TableNameStruct>();
			for (var j:number= 0; j < lenTable; j++) 
			{
				var structTable : TableNameStruct = new TableNameStruct();
				structTable.TableID = oData.TableNameList[j].TableID;
				structTable.CN = oData.TableNameList[j].CN;
				structTable.TW = oData.TableNameList[j].TW;
				structTable.EN = oData.TableNameList[j].EN;
				lobby.model.LobbyData.getInstance().TableNameList.push(structTable);
			}
		}
	}
}