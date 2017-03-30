module lobby.view.route.quick {
	export class QuickTableRoadMapBac {
		protected var m_routeView					:	MovieClip;
				
		/**當前顯示路*/
		public var nowRoad							:	string 				=	"";
		
		protected var m_beadPlate					:	QuickBeadPlate;
		protected var m_beadInfo					:	BeadInfo;
		
		public var bError							:	 boolean;														//错误状态
		
		public constructor(view:MovieClip) {
		
			this.m_routeView = view;
			
			this.init();
			setRoadInf();
		}
		
		protected function init():void 
		{
			//珠路盤
			var beadMc:MovieClip =m_routeView.getChildByName("mc_0") as MovieClip
			if (beadMc){
				this.m_beadPlate = new QuickBeadPlate(beadMc, QuickBeadItemBaccarat); //珠路盤
				beadMc = null;
			}
			if (m_beadPlate){
				
				m_beadPlate.setBeads(0,0,21,21);
				this.m_beadPlate.mouseChildren = this.m_beadPlate.mouseEnabled = false;
			}
		}
		
		protected function setRoadInf():void{
			//路紙參數均在此設定
			this.m_beadInfo = new BeadInfo();
			this.m_beadInfo.gridWidth = 21;
			this.m_beadInfo.gridHeight = 6;
			
			//this._beadInfo.bigRoad_OfftenWidth =  1.125;
			this.m_beadInfo.bigRoad_OfftenWidth =  6.8;
			//this._beadInfo.bigRoad_OfftenHeight =  1.155;
			this.m_beadInfo.bigRoad_OfftenHeight =  5.9;
			this.m_beadInfo.bigRoad_OfftenX =  0.4;
			//this._beadInfo.bigRoad_OfftenY =  1.125;
			this.m_beadInfo.bigRoad_OfftenY =  0;
			this.m_beadInfo.beadW =  9.5;				//設定大路元件大小
			this.m_beadInfo.beadH =  9.5;
			
			//this._beadInfo.bigEyeRoad_OfftenWidth = 0.5;
			this.m_beadInfo.bigEyeRoad_OfftenWidth = 1.58;
			this.m_beadInfo.bigEyeRoad_OfftenHeight = 0.5;
			this.m_beadInfo.bigEyeRoad_OfftenX = 0.25;
			this.m_beadInfo.bigEyeRoad_OfftenY = 0.25;
			
			//this._beadInfo.smallRoad_OfftenWidth = 0.5;
			this.m_beadInfo.smallRoad_OfftenWidth = 1.58;
			//this._beadInfo.smallRoad_OfftenHeight = 0.5;
			this.m_beadInfo.smallRoad_OfftenHeight = 0.35;
			this.m_beadInfo.smallRoad_OfftenX = 0;
			this.m_beadInfo.smallRoad_OfftenY = 0;
			
			//this._beadInfo.roachRoad_OfftenWidth = 0.025;
			this.m_beadInfo.roachRoad_OfftenWidth = 1.08;
			this.m_beadInfo.roachRoad_OfftenHeight = 0.5;
			this.m_beadInfo.roachRoad_OfftenX = 0;
			this.m_beadInfo.roachRoad_OfftenY =  0.25;
			
		}
		
		/**
		 * 變更語系
		 * @param	lang
		 */
		public function  onChangeLanguage():void{
			
			if(m_beadPlate){
				m_beadPlate.onChangeLanguage();
			}
			
			
		}
		
		public function destroy():void {
			
			if(m_routeView){
				m_routeView = null;
			}
			
			if( m_beadPlate ){
				m_beadPlate.destroy();
				m_beadPlate = null;
			}
			
			if( m_beadInfo ){
				m_beadInfo = null;
			}
			
		}
		
		
		/**
		 * 清掉路單
		 */
		public function clearRoad():void {
			bError = false;
			this.nowRoad = "";			
			this.showRoadViewInit();
			//console.log("clearRoad:" + this._nowRoad);
		}
		/** 更新路單 */
		public function addRoad(road:string):void {
			//			if ( this._nowRoad.length > Define.BEAD_NUM ) {
			//				this._nowRoad = "";
			//			}
			
			if (road == null || road == '' || road == "null") {
				
				return;
			}
			
			if ( road.indexOf( "#" ) != -1 ) {
				//路紙有錯
				console.log("路紙有錯"+road);
				bError = true
				return;
			}else{
				bError = false;
			}
			
			if (nowRoad==""){
				this.nowRoad +=road;
			}else{
				this.nowRoad += "."+road;
			}
			
			//	console.log("addRoad::" + this._nowRoad );
			//this._nowRoad = road;
			if ( ( this.nowRoad != "null" ) && (this.nowRoad != null) )  {
				this.showRoadViewInit();
				this.showRoad( this.nowRoad);
			}
		}
		
		protected function showRoad(road:string, isAsk: boolean = false):void {
			//this.showRoadViewInit();
			if(m_beadPlate){
				this.m_beadPlate.addRoad(road);
			}
			
		}
		
		private function showProbeIcon():void{
			drawProbeIcon("a");
			drawProbeIcon("e");
		}
		
		private function drawProbeIcon(probe:string):void{
			var roadStrObj:RoadstringObject = BeadRoad.createRoadReanderstring(nowRoad+probe);
			var probeArr:any[]=new Array(3);
			probeArr[0]=roadStrObj.bigEyeRoad.charAt(roadStrObj.bigEyeRoad.length-1)
			probeArr[1] = roadStrObj.smallRoad.charAt(roadStrObj.smallRoad.length-1)
			probeArr[2] = roadStrObj.roachRoad.charAt(roadStrObj.roachRoad.length-1)
			//	console.log("探路"+probe+"-----:"+probeArr);
			
			var sp:Sprite;
			if (probe=="a"){
				sp=this.m_routeView.btn_AskBankerRoad
			}else{
				sp=this.m_routeView.btn_AskPlayerRoad
				
			}
			for (var i:number= 0; i < probeArr.length; i++) 
			{
				if (probeArr[i] is DisplayObject){
					var icon:Sprite=probeArr[i];
					icon.x=i*15+10;
					icon.y=40;
					sp.addChild(icon);
				}
				
				
			}
			
			
		}
		
		/** 路單初始 */
		protected function showRoadViewInit():void {
			
			if (m_beadPlate){
				this.m_beadPlate.init();
				
			}
		}
		
		
		
	}
}