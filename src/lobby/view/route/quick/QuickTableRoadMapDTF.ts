module lobby.view.route.quick {
	export class QuickTableRoadMapDTF {
		protected m_routeView					;
		
		/**當前顯示路*/
		protected _nowRoad						:	string 				=	"";
		
		protected m_beadPlate					:	QuickBeadPlate;
		protected m_beadInfo					:	BeadInfo;
		
		public  bError							:	 boolean;														//错误状态
		
		public constructor(view) {
		
			this.m_routeView = view;
			
			this.init();
			this.setRoadInf();
		}
		
		protected  init():void 
		{
			//珠路盤
			var beadMc = this.m_routeView.getChildByName("mc_0")
			if (beadMc){
				this.m_beadPlate = new QuickBeadPlate(beadMc, QuickBeadItemDTF); //珠路盤
				beadMc = null;
			}
			if (this.m_beadPlate){
				
				this.m_beadPlate.setBeads(0,0,21,21);
				this.m_beadPlate.touchChildren = this.m_beadPlate.touchEnabled = false;
			}
			
		}
		
		protected  setRoadInf():void{
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
		public   onChangeLanguage():void{
			
			if(this.m_beadPlate){
				this.m_beadPlate.onChangeLanguage();
			}
			
			
		}
		
		public  destroy():void {
			
			if(this.m_routeView){
				this.m_routeView = null;
			}
			
			if( this.m_beadPlate ){
				this.m_beadPlate.destroy();
				this.m_beadPlate = null;
			}
			
			if( this.m_beadInfo ){
				this.m_beadInfo = null;
			}
			
		}
		
		
		/**
		 * 清掉路單
		 */
		public  clearRoad():void {
			this.bError = false;
			this._nowRoad = "";			
			this.showRoadViewInit();
			//console.log("clearRoad:" + this._nowRoad);
		}
		/** 更新路單 */
		public  addRoad(road:string):void {
			//			if ( this._nowRoad.length > Define.BEAD_NUM ) {
			//				this._nowRoad = "";
			//			}
			
			if (road == null || road == '' || road == "null") {
				
				return;
			}
			
			if ( road.indexOf( "#" ) != -1 ) {
				//路紙有錯
				console.log("路紙有錯"+road);
				this.bError = true;
				return;
			}else{
				this.bError = false;
			}
			
			if (this._nowRoad==""){
				this._nowRoad +=road;
			}else{
				this._nowRoad += "."+road;
			}
			
			//	console.log("addRoad::" + this._nowRoad );
			//this._nowRoad = road;
			if ( ( this._nowRoad != "null" ) && (this._nowRoad != null) )  {
				this.showRoadViewInit();
				this.showRoad( this._nowRoad);
			}
		}
		
		protected  showRoad(road:string, isAsk: boolean = false):void {
			//this.showRoadViewInit();
			if(this.m_beadPlate){
				this.m_beadPlate.addRoad(road);
			}
			
		}
		
		private showProbeIcon():void{
			this.drawProbeIcon("a");
			this.drawProbeIcon("e");
		}
		
		private drawProbeIcon(probe:string):void{
			var roadStrObj:RoadStringObject = BeadRoad.createRoadReanderString(this._nowRoad+probe);
			var probeArr:any[]=new Array(3);
			probeArr[0]=roadStrObj.bigEyeRoad.charAt(roadStrObj.bigEyeRoad.length-1)
			probeArr[1] = roadStrObj.smallRoad.charAt(roadStrObj.smallRoad.length-1)
			probeArr[2] = roadStrObj.roachRoad.charAt(roadStrObj.roachRoad.length-1)
			//	console.log("探路"+probe+"-----:"+probeArr);
			
			var sp;
			if (probe=="a"){
				sp=this.m_routeView.btn_AskBankerRoad
			}else{
				sp=this.m_routeView.btn_AskPlayerRoad
				
			}
			for (var i:number= 0; i < probeArr.length; i++) 
			{
				if (probeArr[i] instanceof egret.DisplayObject){
					var icon=probeArr[i];
					icon.x=i*15+10;
					icon.y=40;
					sp.addChild(icon);
				}
				
				
			}
			
			
		}
		
		/** 路單初始 */
		protected  showRoadViewInit():void {
			
			if (this.m_beadPlate){
				this.m_beadPlate.init();
				
			}
		}
		
		
		
	}
}