module lobby.model {
	export class PanoramaData {
		/**全景資料*/
		protected m_vectorPanoramaVec : struct.PanoramaStruct[];
		
		public constructor(oData) {
			this.m_vectorPanoramaVec = new Array<struct.PanoramaStruct>();
			var _arrPanoramaList = oData.PanoramaList;
			
			if ( _arrPanoramaList != null ) {
				var _uLen : number = _arrPanoramaList.length;
				var panoramaStruct : struct.PanoramaStruct;
				
				for ( var i:number = 0; i < _uLen; i++) {
					panoramaStruct = new struct.PanoramaStruct();
					panoramaStruct.PanoramaID = _arrPanoramaList[i].PanoramaID
					panoramaStruct.PanoramaName_CN = _arrPanoramaList[i].PanoramaName_CN
					panoramaStruct.PanoramaName_EN = _arrPanoramaList[i].PanoramaName_EN
					panoramaStruct.PanoramaName_TW = _arrPanoramaList[i].PanoramaName_TW
					panoramaStruct.StreamAppName = _arrPanoramaList[i].StreamAppName
					panoramaStruct.StreamName = _arrPanoramaList[i].StreamName
					panoramaStruct.StreamUrl = _arrPanoramaList[i].StreamUrl;		
					
					this.m_vectorPanoramaVec.push( panoramaStruct );
				}	
				
				panoramaStruct = null;
				_arrPanoramaList = null;
			}
		}
		public destroy():void{
			if(this.m_vectorPanoramaVec){
				this.m_vectorPanoramaVec = null;
			}
		}
	}
}