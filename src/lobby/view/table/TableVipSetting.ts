module lobby.view.table {
	export class TableVipSetting extends BSprite{
		private m_csetting ;
//		private m_btnOk		:	;
//		private m_btnCancel	:	;
		
		public constructor(_struct) {
		
			super();
			
			this.m_csetting = new model.struct.CharterSettingStruct();
			this.m_csetting.CType = define.GameDefine.SINGLE;//需要用户选择，一共三种
			
			var obj  = {joinPwd:"",setting:this.m_csetting};
			
			if (_struct.joinTableType>=4 && _struct.joinTableType<=6){
				_struct.joinTbPwd =	obj.joinPwd;
				_struct.CharterSettingInfo = obj.setting;
			}	
		}
		
		 public destroy():void{
			
		}
		
		
	}
}