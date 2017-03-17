module lobby.view.table {
	export class TableVipSetting extends BSprite{
		private var m_csetting : CharterSettingStruct;
//		private var m_btnOk		:	;
//		private var m_btnCancel	:	;
		
		public constructor(_struct:TableStruct) {
		
			super();
			
			m_csetting = new CharterSettingStruct();
			m_csetting.CType = GameDefine.SINGLE;//需要用户选择，一共三种
			
			var obj : Object = {joinPwd:"",setting:m_csetting};
			
			if (_struct.joinTableType>=4 && _struct.joinTableType<=6){
				_struct.joinTbPwd =	obj.joinPwd;
				_struct.CharterSettingInfo = obj.setting;
			}	
		}
		
		override public function destroy():void{
			
		}
		
		
	}
}