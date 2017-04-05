module lobby.view.gameRecord.pool {
	export class SubListPool {

		public _vecSubBetList:sub.SubBetList[];

		public constructor() {
			this._vecSubBetList = new Array<sub.SubBetList>();
		}
		
		public getSubList():sub.SubBetList {
			
			var _subList;
			
			for( var i:number= 0 ; i < this._vecSubBetList.length ; i++ ){
				if( !this._vecSubBetList[i].bIsUsed ) {
					_subList = this._vecSubBetList[i];
					_subList.bIsUsed = true;
				}
			}
			
			if( !_subList ){
				_subList = new sub.SubBetList();
				_subList.bIsUsed = true;
				this._vecSubBetList.push( _subList );
			}
			
			return _subList;
		}
		
		public reset():void {
			
			for( var i:number= 0 ; i < this._vecSubBetList.length ; i++ ){
				this._vecSubBetList[i].bIsUsed = false;
				this._vecSubBetList[i].reset();
				if( this._vecSubBetList[i].parent ){
					this._vecSubBetList[i].parent.removeChild( this._vecSubBetList[i] );
				}
			}	
			
			
		}
		
		/**
		 * @param _gameNo : 訂單號 
		 */
		public find( _sGameNo:string ): boolean {
			for( var i:number= 0 ; i < this._vecSubBetList.length ; i++ ){
				if( _sGameNo == this._vecSubBetList[i].complexGameRecordStruct.BaseRecord.RecordGameNumber ){
					return true;
				}
			}
			return false;
		}
		
	}
}