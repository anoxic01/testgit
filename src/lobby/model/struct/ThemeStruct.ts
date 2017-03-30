module lobby.model.struct {
	export class ThemeStruct {

		public TableCnt			:	number;						//桌子数量
		public ThemeID			:	number;						//厅馆序号
		
		public ThemeName_TW		:	string;						//厅馆名称
        public ThemeName_CN		:	string;						//厅馆名称
        public ThemeName_EN		:	string;						//厅馆名称
		
		public TableList		:	TableStruct[];				//桌子信息
		
		public IsTelBet			:	boolean 	=	false;		//是否电投
		public IsMaintaining	:	boolean;					//维护状态
		public SN				:	number;						//排列序号

		public constructor(oTableList) {
			this.TableList	= new Array<TableStruct>();
			if(oTableList==null){
				return;
			}
			this.TableCnt = oTableList.TableCnt;
			this.ThemeID = oTableList.ThemeID;
			this.ThemeName_TW = oTableList.ThemeName_TW;
			this.ThemeName_CN = oTableList.ThemeName_CN;
			this.ThemeName_EN = oTableList.ThemeName_EN;
			this.IsTelBet = oTableList.IsTelBet;
			this.IsMaintaining = oTableList.IsMaintaining;
			this.SN = oTableList.SN;
			
			var _arrTableList = oTableList.TableList;
			var _uLen : number = _arrTableList.length;
			var _tableStruct : TableStruct;
			for (var i:number = 0; i < _uLen; i++) 
			{
				_tableStruct = new TableStruct(_arrTableList[i]?_arrTableList[i]:null);
				this.TableList.push(_tableStruct);
				
//				trace("厅馆名称：",ThemeName_CN," GameID:",_tableStruct.GameID,"TableType",_tableStruct.TableType, " 桌子ID：",_tableStruct.TableID, "桌子名称:",_tableStruct.TableName_CN);
			}
			_arrTableList = null;
			_tableStruct = null;
			
		}
		
		public updateTableList(_TableList):void{
			var len_local :number = this.TableList.length;
			var len :number = _TableList.length;
			if(len_local <= len){
				for (var i:number = 0; i < len; i++) 
				{
					this.addTableStruct(_TableList[i]);
				}
			}else{
				var isHave : Boolean;	//是否存在
				for (var j:number = 0; j < this.TableList.length; j++) 
				{
					isHave = false;
					for (var k:number = 0; k < len; k++) 
					{
						if(this.TableList[j].TableID==_TableList[k].TableID){
							isHave = true;
							break;
						}
					}
					if(isHave==false){
						if(this.removeTableStruct(this.TableList[j].TableID)){
							j--;
						}
					}
				}
			}
		}
		
		public updateTableStruct(_oData):boolean{
			var len :number = this.TableList.length;
			for (var i:number = 0; i < len; i++) 
			{
				if(this.TableList[i].TableID==_oData.TableID){
					this.TableList[i].update(_oData);
					return true;
				}
			}
			return false;
		}
		
		public addTableStruct(_oData:Object):void{
			if(!this.updateTableStruct(_oData)){
				this.TableList.push(new TableStruct(_oData));
			}
		}
		
		public removeTableStruct(_tableID:number):boolean{
			var len :number = this.TableList.length;
			for (var i:number = 0; i < len; i++) 
			{
				if(this.TableList[i].TableID==_tableID){
					this.TableList.splice(i,1);
					return true;
				}
			}
			return false;
		}
		
		public findTableStruct(_iTableID:number):TableStruct{
			var iLen :number = this.TableList.length;
			for (var i:number = 0; i < iLen; i++) 
			{
				if(this.TableList[i].TableID == _iTableID ){
					return this.TableList[i];
				}
				
			}
			return null;
		}
		
	}
}