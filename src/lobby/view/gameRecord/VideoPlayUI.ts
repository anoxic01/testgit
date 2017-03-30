module lobby.view.gameRecord {
	export class VideoPlayUI extends PanelWindow{
		private m_txtGameRecordNo:Text;					//訂單號
		private m_scaleBig:Btn;
		private m_scaleSmall:Btn;
		private m_scaleReplay:Btn;
		private m_video :GameReCordLiveVideo;
		private m_bg	:BitmapScale9Grid;
		
		private m_bacPoker:*;
		private m_sicPoker:*;
		private m_rouPoker:*;
		private m_dtfPoker:*;
		private m_rouResult:RouletteDeal_2;
		private m_complexGameRecordStruct:ComplexGameRecordStruct;
		private m_sicTotalPoints:number;
		protected m_iDice1:number;
		protected m_iDice2:number;
		protected m_iDice3:number;		
		
		public constructor( _mcAsset:MovieClip) {
			m_mcAsset = _mcAsset;
			addChild( m_mcAsset );
			m_btnClose = new SingleButtonMC( m_mcAsset.mc_close , function(event:MouseEvent):void {
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				GameRecordManager.getInstance().hideVideoPlayPannel();
			});
			
			m_txtGameRecordNo = new Text(m_mcAsset.tf_2 );
			
			m_scaleBig = new Btn(m_mcAsset.mc_1, function(event:MouseEvent):void {
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				
//				LobbyManager.getInstance().scaleVideoPannel(true);
				if( m_complexGameRecordStruct == null ){
					return;
				}
				if( m_complexGameRecordStruct.BaseRecord.GameID == GameDefine.BAC ){
//					m_video.zoomPt.x = 
				}
				else if( m_complexGameRecordStruct.BaseRecord.GameID == GameDefine.DTF ){
					
					
				}
				else if( m_complexGameRecordStruct.BaseRecord.GameID == GameDefine.SIC ){
					
					
				}
				else if( m_complexGameRecordStruct.BaseRecord.GameID == GameDefine.ROU ){
					
					
				}
				
				m_video.zoomIn(function():void{
					m_scaleBig.enabled = false;
					m_scaleSmall.enabled = true;
				});
				
			} );
			
			m_scaleSmall = new Btn(m_mcAsset.mc_2, function(event:MouseEvent):void {
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				
				m_video.zoomOut(function():void{
					m_scaleBig.enabled = true;
					m_scaleSmall.enabled = false;
				});
								
			} );
			
			m_scaleReplay = new Btn(m_mcAsset.mc_3, function(event:MouseEvent):void {
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				
				if( m_video ){
					m_video.stop();
					m_video.play();
				}
			} );	
			
			onChangeLanguage();
			m_video = new GameReCordLiveVideo(m_mcAsset.mc_pos , 854,480);
//			m_mcAsset.mc_pos.addChild( m_video.mcAsset ); 
			
			nAssetWidth = 902;
			nAssetHeight = 794;
			m_mcHot = m_mcAsset.mc_hot;
			
			m_bg = new BitmapScale9Grid(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Windows_Bg_Asset"), 1, 12, 24, 12, 30);
			m_mcAsset.addChildAt(m_bg,0);
			m_bg.setSize(897, 726);
			m_bg.x = -451;
			m_bg.y = -325;		
			m_rouResult = new RouletteDeal_2();
			
			onChangeLanguage();
		}
		public updateUI(_complexGameRecordStruct: ComplexGameRecordStruct):void {
			m_txtGameRecordNo.text = String( _complexGameRecordStruct.BaseRecord.RecordGameNumber );
			//rtmp://125.227.81.211/vodCache/flv:originCache/Tb016/2016/03/08/TB16_S7_N10_676.flv
			console.log( "videoAddress:" + _complexGameRecordStruct.BaseRecord.PlayVideoAddress );
			console.log( "playVideoAppName:" + _complexGameRecordStruct.BaseRecord.PlayVideoAppName );
			console.log( "playVideoName:" + _complexGameRecordStruct.BaseRecord.PlayVideoName );
			var _ar:any[] = transVideoData( _complexGameRecordStruct );
			
			m_complexGameRecordStruct = _complexGameRecordStruct;
			
			m_video.clearVideoFull();
			m_video.setupServer( _ar[0] , _ar[1] );
			m_video.play();	//目前只有 1,2桌 有錄影
			
			
			clear();
			updatePoker(_complexGameRecordStruct);

		}
		
		public reset():void {
			
			//預設為縮小紐
			m_video.normal();
			m_scaleBig.enabled = true;
			m_scaleSmall.enabled = false;				
		}
		
		private clear():void
		{
			if( m_bacPoker ){
				if(m_mcAsset.contains(m_bacPoker )){
					m_mcAsset.removeChild(m_bacPoker);
					m_bacPoker = null;
				}	
			}
			if( m_rouPoker ){
				if(m_mcAsset.contains(m_rouPoker )){
					m_mcAsset.removeChild(m_rouPoker);
					m_rouPoker = null;
				}	
			}
			if( m_sicPoker ){
				if(m_mcAsset.contains(m_sicPoker )){
					m_mcAsset.removeChild(m_sicPoker);
					m_sicPoker = null;
				}	
			}	
			if( m_dtfPoker ){
				if(m_mcAsset.contains(m_dtfPoker )){
					m_mcAsset.removeChild(m_dtfPoker);
					m_dtfPoker = null;
				}	
			}	
			m_sicTotalPoints = 0;
		}
		
		private updatePoker(_complexGameRecordStruct: ComplexGameRecordStruct):void {
			if( _complexGameRecordStruct.BaseRecord.GameID == GameDefine.BAC ){
				if( !m_bacPoker ){
					m_bacPoker = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Bac_Group") ;
				}
				m_bacPoker.x = -156;
				m_bacPoker.y = 210;
				m_mcAsset.addChild( m_bacPoker );
				updateBacPoker( _complexGameRecordStruct.BaccaratData );
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == GameDefine.ROU ) {
				if(!m_rouPoker){
					m_rouPoker = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Rou_Group");
					m_rouPoker.mc_0.gotoAndStop(1);
					m_rouPoker.mc_1.gotoAndStop(1);
					m_rouPoker.mc_2.gotoAndStop(1);
					m_rouPoker.mc_3.gotoAndStop(1);
					m_rouPoker.mc_4.gotoAndStop(1);
				}
				m_rouPoker.x = -140;
				m_rouPoker.y = 240;
				m_mcAsset.addChild( m_rouPoker );	
				
				updateRouPoker(_complexGameRecordStruct.RouletteData);
				
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == GameDefine.SIC ) {
				if(!m_sicPoker ){
					m_sicPoker = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Sic_Group");
					m_sicPoker.scaleX = 0.7;
					m_sicPoker.scaleY = 0.7;
				}
				m_sicPoker.x = -95;
				m_sicPoker.y = 230;
				m_mcAsset.addChild( m_sicPoker );	
				updateSicPoker(_complexGameRecordStruct.SicboData);
				
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == GameDefine.DTF ) {
				if(!m_dtfPoker ){
					m_dtfPoker = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Dtf_Group");
					m_dtfPoker.mc_3.scaleX = m_dtfPoker.mc_2.scaleX = 0.6;
					m_dtfPoker.mc_3.scaleY = m_dtfPoker.mc_2.scaleY = 0.6;
				}
				
				m_dtfPoker.x  = -152;
				m_dtfPoker.y  = 210;
				m_mcAsset.addChild( m_dtfPoker );
				
				updateDtfPoker(_complexGameRecordStruct.DragonTigerData);
			
			}
			
			
			
		}
		
		private updateDtfPoker( _dtfGameRecordStruct:DragonTigerGameRecordStruct):void {
			
			var itme:CardItem;
			//更新牌
			if( checkBacPoker( _dtfGameRecordStruct.DragonCard  ) ){
				if(m_dtfPoker.mc_2.card==null){
					itme = new CardItem(_dtfGameRecordStruct.DragonCard);
					m_dtfPoker.mc_2.card = itme;
					m_dtfPoker.mc_2.addChild(itme);
				}else{
					m_dtfPoker.mc_2.card.setData(_dtfGameRecordStruct.DragonCard);
				}
			}
			if( checkBacPoker( _dtfGameRecordStruct.TigerCard  ) ){
				if(m_dtfPoker.mc_3.card==null){
					itme = new CardItem(_dtfGameRecordStruct.TigerCard); 
					m_dtfPoker.mc_3.card = itme;
					m_dtfPoker.mc_3.addChild(itme);
				}else{
					m_dtfPoker.mc_3.card.setData(_dtfGameRecordStruct.TigerCard);
				}
			}
			
			//更新文字
			if( m_dtfPoker ){
				m_dtfPoker.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				m_dtfPoker.tf_1.autoSize = TextFieldAutoSize.LEFT;
				m_dtfPoker.tf_2.autoSize = TextFieldAutoSize.LEFT;
				m_dtfPoker.tf_1.text = transDtfPoints(_dtfGameRecordStruct.DragonPoint);
				m_dtfPoker.tf_2.text = transDtfPoints(_dtfGameRecordStruct.TigerPoint);				
				//				m_dtfPoker.tf_1.x = m_dtfPoker.font_1.x + m_dtfPoker.font_1.width + 2;
				//				m_dtfPoker.tf_2.x = m_dtfPoker.font_2.x + m_dtfPoker.font_2.width + 2;				
			}
			

		}
		
		private transDtfPoints(_iPoint:number):String {
			var _str:String = "";
			
			if( _iPoint == 1 ){
				_str = "A";
			}
			else if( _iPoint == 11){
				_str = "J";
			}
			else if(  _iPoint == 12){
				_str = "Q";
			}
			else if(  _iPoint == 13){
				_str = "K";
			}
			else {
				_str = String(_iPoint);
			}
			
			
			return _str;
		}		
		
		private updateBacPoker(_baccaratGameRecordStruct:BaccaratGameRecordStruct):void {
			
			for( var i:number= 1 ; i <= 3 ; i++ ){
				
				if( checkBacPoker(_baccaratGameRecordStruct["BankerCard"+i]) ){
					if(m_bacPoker["bankPoker"+i].card==null){
						var bCardItem:CardItem = new CardItem(_baccaratGameRecordStruct["BankerCard"+i]);
						bCardItem.scaleX = 0.5;
						bCardItem.scaleY = 0.5;
						if(i==3){
							bCardItem.rotation = 90;
							bCardItem.x += bCardItem.width;
						}
						
						m_bacPoker["bankPoker"+i].card = bCardItem;
						m_bacPoker["bankPoker"+i].addChild(bCardItem);
					}else{
						m_bacPoker["bankPoker"+i].card.setData(_baccaratGameRecordStruct["BankerCard"+i]);
					}
					
					m_bacPoker["bankPoker"+i].visible = true;
				}else {
					m_bacPoker["bankPoker"+i].visible = false;
				}
				
				if( checkBacPoker(_baccaratGameRecordStruct["PlayerCard"+i]) ){
					if(m_bacPoker["playerPoker"+i].card==null){
						var pCardItem:CardItem = new CardItem(_baccaratGameRecordStruct["PlayerCard"+i]);
						pCardItem.scaleX = 0.5;
						pCardItem.scaleY = 0.5;
						if(i==3){
							pCardItem.rotation = 270;
							pCardItem.y += pCardItem.height;
						}
						
						m_bacPoker["playerPoker"+i].card = pCardItem;
						m_bacPoker["playerPoker"+i].addChild(pCardItem);
					}else{
						m_bacPoker["playerPoker"+i].card.setData(_baccaratGameRecordStruct["PlayerCard"+i]);
					}
					
					m_bacPoker["playerPoker"+i].visible = true;
				}else {
					m_bacPoker["playerPoker"+i].visible = false;
				}
			}
			
			var _isVisible: boolean = false;
			if( !m_complexGameRecordStruct.BaseRecord.IsResult ){
				m_bacPoker.tf_1.visible = false;
				m_bacPoker.tf_2.visible = false;
				_isVisible = false;
			}
			else {
				m_bacPoker.tf_1.visible = true;
				m_bacPoker.tf_2.visible = true;
				_isVisible = true;
			}

			if( _isVisible && m_bacPoker ) {
				m_bacPoker.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				m_bacPoker.tf_1.text = String(_baccaratGameRecordStruct.BankerTotalPoint);
				m_bacPoker.tf_2.text = String(_baccaratGameRecordStruct.PlayerTotalPoint);				
				m_bacPoker.font_1.visible = true;
				m_bacPoker.font_2.visible = true;
				//				m_bacPoker.tf_1.x = m_bacPoker.font_1.x + m_bacPoker.font_1.width + 2;
				//				m_bacPoker.tf_2.x = m_bacPoker.font_2.x + m_bacPoker.font_2.width + 2;
				
			}else {
				m_bacPoker.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				m_bacPoker.tf_1.text = "";
				m_bacPoker.tf_2.text = "";						
				m_bacPoker.font_1.visible = false;
				m_bacPoker.font_2.visible = false;
			}
			
		}	
		
		private checkBacPoker( _sPoker:String ): boolean {
			var _bCheckOK: boolean = false;
			if( _sPoker.indexOf( "s" ) != -1 ){
				_bCheckOK = true;
			}
			else if( _sPoker.indexOf( "h" ) != -1 ){
				_bCheckOK = true;
			}
			else if( _sPoker.indexOf( "d" ) != -1 ){
				_bCheckOK = true;
			}			
			else if( _sPoker.indexOf( "c" ) != -1 ){
				_bCheckOK = true;
			}
			
			return _bCheckOK;
		}		
		
		
		private updateRouPoker(_rouGameRecordStruct:RouletteGameRecordStruct):void {
			
			m_rouResult.Reset();
			m_rouResult.num = _rouGameRecordStruct.RouletteNumber;
			
			//新增  0值, 部屬於任何打列,大小,紅黑
			if( m_rouResult.num == 0 ){
				m_rouPoker.mc_0.gotoAndStop(3);
				m_rouPoker.mc_0.visible = true;
				m_rouPoker.mc_1.visible = false;
				m_rouPoker.mc_2.visible = false;
				m_rouPoker.mc_3.visible = false;
				m_rouPoker.mc_4.visible = false;
				m_rouPoker.x = -53;
				m_rouPoker.tf.text = String( m_rouResult.num );
				return;
			}
			m_rouPoker.x = -140;
			m_rouPoker.mc_0.visible = true;
			m_rouPoker.mc_1.visible = true;
			m_rouPoker.mc_2.visible = true;
			m_rouPoker.mc_3.visible = true;
			m_rouPoker.mc_4.visible = true;
			///***************************************//			
			
			var _dozen:number= m_rouResult.dozen;
			var _small: boolean = m_rouResult.isSmall;
			var _big: boolean = m_rouResult.isBig;
			var _lang:number= LobbyManager.getInstance().lobbyAuth.Lang;
			var _odd: boolean = m_rouResult.isOdd;
			var _even: boolean = m_rouResult.isEven;
			var _row:number= m_rouResult.column;
			var _red: boolean = m_rouResult.isRed;				//新增
			var _black: boolean = m_rouResult.isBlack;			//新增
			
			if( _dozen == 1) {
				m_rouPoker.mc_3.gotoAndStop(1+_lang);
			}
			else if( _dozen == 2 ){
				m_rouPoker.mc_3.gotoAndStop(4+_lang);
			}
			else if( _dozen == 3 ){
				m_rouPoker.mc_3.gotoAndStop(7+_lang);
			}
			
			if( _big ){
				m_rouPoker.mc_2.gotoAndStop(1+_lang);
			}
			else if( _small ){
				m_rouPoker.mc_2.gotoAndStop(4+_lang);
			}
			
			if( _odd ){
				m_rouPoker.mc_1.gotoAndStop(1+_lang);
			}
			else if( _even ){
				m_rouPoker.mc_1.gotoAndStop(4+_lang);
			}
			
			if( _row == 1) {
				m_rouPoker.mc_4.gotoAndStop(1+_lang);
			}
			else if( _row == 2 ){
				m_rouPoker.mc_4.gotoAndStop(4+_lang);
			}
			else if( _row == 3 ){
				m_rouPoker.mc_4.gotoAndStop(7+_lang);
			}
			
			//新增
			if( _red ){
				m_rouPoker.mc_0.gotoAndStop(1);
			}
			else if( _black ){
				m_rouPoker.mc_0.gotoAndStop(2);
			}
			else {
				m_rouPoker.mc_0.gotoAndStop(3);
			}			
						
			m_rouPoker.tf.text = String( m_rouResult.num );
				
		}		
		
		private checkSicPoker(dic:number): boolean {
			if( dic > 0 && dic <= 6 ){
				return true;
			}
			return false;
		}
		
		private updateSicPoker(_sicGameRecordStruct:SicboGameRecordStruct):void {
			//由小到大 排列
			var _ar:any[] = [_sicGameRecordStruct.Dice_1 , _sicGameRecordStruct.Dice_2 , _sicGameRecordStruct.Dice_3 ];
				_ar.sort( any[].NUMERIC );	
				
				
				m_iDice1 = _ar[0];
				m_iDice2 = _ar[1];
				m_iDice3 = _ar[2];
				
			var _iTotalPoints:number= _sicGameRecordStruct.Dice_1 + _sicGameRecordStruct.Dice_2 + _sicGameRecordStruct.Dice_3;
			m_sicPoker.tf_0.text = String( _iTotalPoints );
			
			
			//單雙 或 圍骰
			m_sicPoker.mc_1.visible = false;
			m_sicPoker.mc_2.visible = false;	
			m_sicPoker.mc_3.visible = false;	
			if( m_iDice1 == m_iDice2 && m_iDice2 == m_iDice3 ){
				m_sicPoker.mc_3.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				m_sicPoker.mc_3.visible = true;
			}
			else {
				updateBig_Small( _iTotalPoints );
				updateOdd_Even(  _iTotalPoints );
				m_sicPoker.mc_1.visible = true;
				m_sicPoker.mc_2.visible = true;	
			}
			
			
			m_sicTotalPoints = _iTotalPoints;
			
			if( checkSicPoker(  _ar[0] ) ){
				m_sicPoker.mc_dice1.gotoAndStop( _ar[0] );
			}
			if( checkSicPoker(  _ar[1] ) ){
				m_sicPoker.mc_dice2.gotoAndStop( _ar[1] );
			}
			if( checkSicPoker(  _ar[2] ) ){
				m_sicPoker.mc_dice3.gotoAndStop(  _ar[2] );
			}	
		}	
		
		private updateBig_Small( _iTotalPoints:number):void {
			if( _iTotalPoints >= 11 && _iTotalPoints <= 18 ){
				m_sicPoker.mc_2.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			else if( _iTotalPoints >= 4 && _iTotalPoints <= 10  ) {
				m_sicPoker.mc_2.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+4);
			}
			else {
				console.log("updateBig_Small Error::" +_iTotalPoints)
			}
			
			
			
		}
		
		private updateOdd_Even( _iTotalPoints:number):void {
			if( _iTotalPoints % 2 != 0 ){
				m_sicPoker.mc_1.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			else if( _iTotalPoints != 0  && _iTotalPoints % 2 == 0 ) {
				m_sicPoker.mc_1.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+4);
			}
			else {
				console.log("updateOdd_Even Error::" +_iTotalPoints)
			}
			
			
		}			
		
		/**
		 * 解析視訊資料
		 */
		private transVideoData( _complexGameRecordStruct: ComplexGameRecordStruct ):any[] {
			//"rtmp://125.227.81.211/vodCache/flv:originCache/Tb002/2016/03/11/TB2_S130_N16_17497.flv"
//			_stream::flv:originCache/Tb015/2016/03/07/TB15_S9_N35_671.flv
//			_server:rtmp://125.227.81.211/vodCache			
			var _url:String = _complexGameRecordStruct.BaseRecord.VideoUrl;	
			var _ar:any[] = _url.split("/");
			var _server:String = _ar[0]+"//" + _ar[2] + "/" + _ar[3];
			var _stream:String = "";
			for( var i:number= 4 ; i < _ar.length-1; i++ ){
				_stream += _ar[i] + "/";
			}
			_stream += _ar[_ar.length-1];
			console.log("_stream::" + _stream );
			console.log("_server:" + _server );		
			return [_server , _stream ];
		}
		
		 public destroy():void {
//			if(m_txtGameRecordNo){
//				m_txtGameRecordNo = null;
//			}
//			if(m_scaleBig){
//				m_scaleBig.destroy();
//				m_scaleBig = null;
//			}
//			if(m_scaleSmall){
//				m_scaleSmall.destroy();
//				m_scaleSmall = null;
//			}
//			if(m_scaleReplay){
//				m_scaleReplay.destroy();
//				m_scaleReplay = null;
//			}
			if(m_video){
				m_video.stop();
				m_video.clearVideoFull();
			}
//			if(m_bg){
//				m_bg.dispose();
//				m_bg = null;
//			}
//			
//			clear();
//			
//			if(m_complexGameRecordStruct){
//				m_complexGameRecordStruct = null;
//			}
//			
//			super.destroy();
		}
		
		 public onChangeLanguage():void {
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			if( m_scaleReplay){
				m_scaleReplay.onChangeLanguage();
			}
			
			if( m_scaleBig ){
				m_scaleBig.onChangeLanguage();
			}
			
			if( m_scaleSmall ){
				m_scaleSmall.onChangeLanguage();
			}		
			
			if( m_video ){
				m_video.onChangeLanguage();
			}
			
			if( m_rouPoker && m_rouPoker.num != -1 ){
				var _dozen:number= m_rouResult.dozen;
				var _small: boolean = m_rouResult.isSmall;
				var _big: boolean = m_rouResult.isBig;
				var _lang:number= LobbyManager.getInstance().lobbyAuth.Lang;
				var _odd: boolean = m_rouResult.isOdd;
				var _even: boolean = m_rouResult.isEven;
				var _row:number= m_rouResult.column;
				
				if( _dozen == 1) {
					m_rouPoker.mc_3.gotoAndStop(1+_lang);
				}
				else if( _dozen == 2 ){
					m_rouPoker.mc_3.gotoAndStop(4+_lang);
				}
				else if( _dozen == 3 ){
					m_rouPoker.mc_3.gotoAndStop(7+_lang);
				}
				
				if( _big ){
					m_rouPoker.mc_2.gotoAndStop(1+_lang);
				}
				else if( _small ){
					m_rouPoker.mc_2.gotoAndStop(4+_lang);
				}
				
				if( _odd ){
					m_rouPoker.mc_1.gotoAndStop(1+_lang);
				}
				else if( _even ){
					m_rouPoker.mc_1.gotoAndStop(4+_lang);
				}
				if( _row == 1) {
					m_rouPoker.mc_4.gotoAndStop(1+_lang);
				}
				else if( _row == 2 ){
					m_rouPoker.mc_4.gotoAndStop(4+_lang);
				}
				else if( _row == 3 ){
					m_rouPoker.mc_4.gotoAndStop(7+_lang);
				}
				
			}//end if			
			
			if( m_sicPoker && m_sicTotalPoints > 0 ){
				if( m_sicPoker && m_sicTotalPoints > 0 ){
					
					if( m_iDice1 == m_iDice2 && m_iDice2 == m_iDice3  ){
						m_sicPoker.mc_3.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
					}
					else {
						updateBig_Small( m_sicTotalPoints );
						updateOdd_Even(  m_sicTotalPoints );	
					}				
				}
			}			
			
		}
		
		 public resize(_w:number=0, _h:number=0):void {
			super.resize(_w, _h );
			//
		}
		
	}
}
import flash.display.MovieClip;

import component.button.SingleButtonMC;

import manager.LobbyManager;



class Btn extends SingleButtonMC{
	private txtLabel:MovieClip;
	public Btn(mcButton:MovieClip, $fOnClick:Function):void {
		super( mcButton , $fOnClick );
		txtLabel = mcButton.txtLabel;
	}
	
	public onChangeLanguage():void {
		txtLabel.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);	
	}
	
}