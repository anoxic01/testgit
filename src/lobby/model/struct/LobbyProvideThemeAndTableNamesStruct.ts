module lobby.model.struct {
	export class LobbyProvideThemeAndTableNamesStruct {
		public constructor(oData:Object) {
			var lenTheme : int = oData.ThemeNameList.length;
			LobbyData.getInstance().ThemeNameList = new Vector.<ThemeNameStruct>();
			for (var i:int = 0; i < lenTheme; i++) 
			{
				var structTheme : ThemeNameStruct = new ThemeNameStruct();
				structTheme.ThemeID = oData.ThemeNameList[i].ThemeID;
				structTheme.CN = oData.ThemeNameList[i].CN;
				structTheme.TW = oData.ThemeNameList[i].TW;
				structTheme.EN = oData.ThemeNameList[i].EN;
				LobbyData.getInstance().ThemeNameList.push(structTheme);
			}
			
			var lenTable : int = oData.TableNameList.length;
			LobbyData.getInstance().TableNameList = new Vector.<TableNameStruct>();
			for (var j:int = 0; j < lenTable; j++) 
			{
				var structTable : TableNameStruct = new TableNameStruct();
				structTable.TableID = oData.TableNameList[j].TableID;
				structTable.CN = oData.TableNameList[j].CN;
				structTable.TW = oData.TableNameList[j].TW;
				structTable.EN = oData.TableNameList[j].EN;
				LobbyData.getInstance().TableNameList.push(structTable);
			}
		}
	}
}