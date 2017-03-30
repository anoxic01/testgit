module lobby.view.gameRecord.pool {
	export class SubListPool {
		public var _vecSubBetList:<SubBetList>;
		public constructor() {
			_vecSubBetList = new <SubBetList>();
		}
		
		public function getSubList():SubBetList {
			
			var _subList:SubBetList;
			
			for( var i:number= 0 ; i < _vecSubBetList.length ; i++ ){
				if( !_vecSubBetList[i].bIsUsed ) {
					_subList = _vecSubBetList[i];
					_subList.bIsUsed = true;
				}
			}
			
			if( !_subList ){
				_subList = new SubBetList();
				_subList.bIsUsed = true;
				_vecSubBetList.push( _subList );
			}
			
			return _subList;
		}
		
		public function reset():void {
			
			for( var i:number= 0 ; i < _vecSubBetList.length ; i++ ){
				_vecSubBetList[i].bIsUsed = false;
				_vecSubBetList[i].reset();
				if( _vecSubBetList[i].parent ){
					_vecSubBetList[i].parent.removeChild( _vecSubBetList[i] );
				}
			}	
			
			
		}
		
		/**
		 * @param _gameNo : 訂單號 
		 */
		public function find( _sGameNo:string ): boolean {
			for( var i:number= 0 ; i < _vecSubBetList.length ; i++ ){
				if( _sGameNo == _vecSubBetList[i].complexGameRecordStruct.BaseRecord.RecordGameNumber ){
					return true;
				}
			}
			return false;
		}
		
	}
}