module manager {
	export class FaceManager {
		
		private static m_instance	:	FaceManager;
		
		public static getInstance():FaceManager{
			
			if(FaceManager.m_instance == null){
				
				FaceManager.m_instance = new FaceManager();
				
			}
			return FaceManager.m_instance;
		}
		
		public constructor() {
		}
		
		public getFaceByID( _uID ):egret.BitmapData{
			return null;
		}
	}
}