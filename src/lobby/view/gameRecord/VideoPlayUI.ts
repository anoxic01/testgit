module lobby.view.gameRecord {
	export class VideoPlayUI extends panel.PanelWindow{
		private m_txtGameRecordNo:Text;					//訂單號
		private m_scaleBig:Btn;
		private m_scaleSmall:Btn;
		private m_scaleReplay:Btn;
		private m_video ;
		private m_bg	;
		
		private m_bacPoker;
		private m_sicPoker;
		private m_rouPoker;
		private m_dtfPoker;
		private m_rouResult:RouletteDeal_2;
		private m_complexGameRecordStruct;
		private m_sicTotalPoints:number;
		protected m_iDice1:number;
		protected m_iDice2:number;
		protected m_iDice3:number;		
		
		public constructor( _mcAsset) {
			super();
			this.m_mcAsset = _mcAsset;
			this.addChild( this.m_mcAsset );
			this.m_btnClose = new ui.button.SingleButtonMC( this.m_mcAsset.mc_close , function(event:MouseEvent):void {
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.GameRecordManager.getInstance().hideVideoPlayPannel();
			});
			
			this.m_txtGameRecordNo = new Text(this.m_mcAsset.tf_2 );
			
			this.m_scaleBig = new Btn(this.m_mcAsset.mc_1, function(event:MouseEvent):void {
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				
//				manager.LobbyManager.getInstance().scaleVideoPannel(true);
				if( this.m_complexGameRecordStruct == null ){
					return;
				}
				if( this.m_complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.BAC ){
//					this.m_video.zoomPt.x = 
				}
				else if( this.m_complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.DTF ){
					
					
				}
				else if( this.m_complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.SIC ){
					
					
				}
				else if( this.m_complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.ROU ){
					
					
				}
				
				this.m_video.zoomIn(function():void{
					this.m_scaleBig.enabled = false;
					this.m_scaleSmall.enabled = true;
				});
				
			} );
			
			this.m_scaleSmall = new Btn(this.m_mcAsset.mc_2, function(event:MouseEvent):void {
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				
				this.m_video.zoomOut(function():void{
					this.m_scaleBig.enabled = true;
					this.m_scaleSmall.enabled = false;
				});
								
			} );
			
			this.m_scaleReplay = new Btn(this.m_mcAsset.mc_3, function(event:MouseEvent):void {
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				
				if( this.m_video ){
					this.m_video.stop();
					this.m_video.play();
				}
			} );	
			
			this.onChangeLanguage();
			this.m_video = new lives.GameReCordLiveVideo(this.m_mcAsset.mc_pos , 854,480);
//			this.m_mcAsset.mc_pos.addChild( this.m_video.mcAsset ); 
			
			this.nAssetWidth = 902;
			this.nAssetHeight = 794;
			this.m_mcHot = this.m_mcAsset.mc_hot;
			
			this.m_bg = new BitmapScale9Grid(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Windows_Bg_Asset"), 1, 12, 24, 12, 30);
			this.m_mcAsset.addChildAt(this.m_bg,0);
			this.m_bg.setSize(897, 726);
			this.m_bg.x = -451;
			this.m_bg.y = -325;		
			this.m_rouResult = new RouletteDeal_2();
			
			this.onChangeLanguage();
		}
		public updateUI(_complexGameRecordStruct):void {
			this.m_txtGameRecordNo.text = String( _complexGameRecordStruct.BaseRecord.RecordGameNumber );
			//rtmp://125.227.81.211/vodCache/flv:originCache/Tb016/2016/03/08/TB16_S7_N10_676.flv
			console.log( "videoAddress:" + _complexGameRecordStruct.BaseRecord.PlayVideoAddress );
			console.log( "playVideoAppName:" + _complexGameRecordStruct.BaseRecord.PlayVideoAppName );
			console.log( "playVideoName:" + _complexGameRecordStruct.BaseRecord.PlayVideoName );
			var _ar:any[] = this.transVideoData( _complexGameRecordStruct );
			
			this.m_complexGameRecordStruct = _complexGameRecordStruct;
			
			this.m_video.clearVideoFull();
			this.m_video.setupServer( _ar[0] , _ar[1] );
			this.m_video.play();	//目前只有 1,2桌 有錄影
			
			
			this.clear();
			this.updatePoker(_complexGameRecordStruct);

		}
		
		public reset():void {
			
			//預設為縮小紐
			this.m_video.normal();
			this.m_scaleBig.enabled = true;
			this.m_scaleSmall.enabled = false;				
		}
		
		private clear():void
		{
			if( this.m_bacPoker ){
				if(this.m_mcAsset.contains(this.m_bacPoker )){
					this.m_mcAsset.removeChild(this.m_bacPoker);
					this.m_bacPoker = null;
				}	
			}
			if( this.m_rouPoker ){
				if(this.m_mcAsset.contains(this.m_rouPoker )){
					this.m_mcAsset.removeChild(this.m_rouPoker);
					this.m_rouPoker = null;
				}	
			}
			if( this.m_sicPoker ){
				if(this.m_mcAsset.contains(this.m_sicPoker )){
					this.m_mcAsset.removeChild(this.m_sicPoker);
					this.m_sicPoker = null;
				}	
			}	
			if( this.m_dtfPoker ){
				if(this.m_mcAsset.contains(this.m_dtfPoker )){
					this.m_mcAsset.removeChild(this.m_dtfPoker);
					this.m_dtfPoker = null;
				}	
			}	
			this.m_sicTotalPoints = 0;
		}
		
		private updatePoker(_complexGameRecordStruct):void {
			if( _complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.BAC ){
				if( !this.m_bacPoker ){
					this.m_bacPoker = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Bac_Group") ;
				}
				this.m_bacPoker.x = -156;
				this.m_bacPoker.y = 210;
				this.m_mcAsset.addChild( this.m_bacPoker );
				this.updateBacPoker( _complexGameRecordStruct.BaccaratData );
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.ROU ) {
				if(!this.m_rouPoker){
					this.m_rouPoker = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Rou_Group");
					this.m_rouPoker.mc_0.gotoAndStop(1);
					this.m_rouPoker.mc_1.gotoAndStop(1);
					this.m_rouPoker.mc_2.gotoAndStop(1);
					this.m_rouPoker.mc_3.gotoAndStop(1);
					this.m_rouPoker.mc_4.gotoAndStop(1);
				}
				this.m_rouPoker.x = -140;
				this.m_rouPoker.y = 240;
				this.m_mcAsset.addChild( this.m_rouPoker );	
				
				this.updateRouPoker(_complexGameRecordStruct.RouletteData);
				
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.SIC ) {
				if(!this.m_sicPoker ){
					this.m_sicPoker = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Sic_Group");
					this.m_sicPoker.scaleX = 0.7;
					this.m_sicPoker.scaleY = 0.7;
				}
				this.m_sicPoker.x = -95;
				this.m_sicPoker.y = 230;
				this.m_mcAsset.addChild( this.m_sicPoker );	
				this.updateSicPoker(_complexGameRecordStruct.SicboData);
				
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.DTF ) {
				if(!this.m_dtfPoker ){
					this.m_dtfPoker = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Dtf_Group");
					this.m_dtfPoker.mc_3.scaleX = this.m_dtfPoker.mc_2.scaleX = 0.6;
					this.m_dtfPoker.mc_3.scaleY = this.m_dtfPoker.mc_2.scaleY = 0.6;
				}
				
				this.m_dtfPoker.x  = -152;
				this.m_dtfPoker.y  = 210;
				this.m_mcAsset.addChild( this.m_dtfPoker );
				
				this.updateDtfPoker(_complexGameRecordStruct.DragonTigerData);
			
			}
			
			
			
		}
		
		private updateDtfPoker( _dtfGameRecordStruct):void {
			
			var itme;
			//更新牌
			if( this.checkBacPoker( _dtfGameRecordStruct.DragonCard  ) ){
				if(this.m_dtfPoker.mc_2.card==null){
					itme = new card.CardItem(_dtfGameRecordStruct.DragonCard);
					this.m_dtfPoker.mc_2.card = itme;
					this.m_dtfPoker.mc_2.addChild(itme);
				}else{
					this.m_dtfPoker.mc_2.card.setData(_dtfGameRecordStruct.DragonCard);
				}
			}
			if( this.checkBacPoker( _dtfGameRecordStruct.TigerCard  ) ){
				if(this.m_dtfPoker.mc_3.card==null){
					itme = new card.CardItem(_dtfGameRecordStruct.TigerCard); 
					this.m_dtfPoker.mc_3.card = itme;
					this.m_dtfPoker.mc_3.addChild(itme);
				}else{
					this.m_dtfPoker.mc_3.card.setData(_dtfGameRecordStruct.TigerCard);
				}
			}
			
			//更新文字
			if( this.m_dtfPoker ){
				this.m_dtfPoker.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				// this.m_dtfPoker.tf_1.autoSize = TextFieldAutoSize.LEFT;
				// this.m_dtfPoker.tf_2.autoSize = TextFieldAutoSize.LEFT;
				this.m_dtfPoker.tf_1.text = this.transDtfPoints(_dtfGameRecordStruct.DragonPoint);
				this.m_dtfPoker.tf_2.text = this.transDtfPoints(_dtfGameRecordStruct.TigerPoint);				
				//				this.m_dtfPoker.tf_1.x = this.m_dtfPoker.font_1.x + this.m_dtfPoker.font_1.width + 2;
				//				this.m_dtfPoker.tf_2.x = this.m_dtfPoker.font_2.x + this.m_dtfPoker.font_2.width + 2;				
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
		
		private updateBacPoker(_baccaratGameRecordStruct):void {
			
			for( var i:number= 1 ; i <= 3 ; i++ ){
				
				if( this.checkBacPoker(_baccaratGameRecordStruct["BankerCard"+i]) ){
					if(this.m_bacPoker["bankPoker"+i].card==null){
						var bCardItem = new card.CardItem(_baccaratGameRecordStruct["BankerCard"+i]);
						bCardItem.scaleX = 0.5;
						bCardItem.scaleY = 0.5;
						if(i==3){
							bCardItem.rotation = 90;
							bCardItem.x += bCardItem.width;
						}
						
						this.m_bacPoker["bankPoker"+i].card = bCardItem;
						this.m_bacPoker["bankPoker"+i].addChild(bCardItem);
					}else{
						this.m_bacPoker["bankPoker"+i].card.setData(_baccaratGameRecordStruct["BankerCard"+i]);
					}
					
					this.m_bacPoker["bankPoker"+i].visible = true;
				}else {
					this.m_bacPoker["bankPoker"+i].visible = false;
				}
				
				if( this.checkBacPoker(_baccaratGameRecordStruct["PlayerCard"+i]) ){
					if(this.m_bacPoker["playerPoker"+i].card==null){
						var pCardItem = new card.CardItem(_baccaratGameRecordStruct["PlayerCard"+i]);
						pCardItem.scaleX = 0.5;
						pCardItem.scaleY = 0.5;
						if(i==3){
							pCardItem.rotation = 270;
							pCardItem.y += pCardItem.height;
						}
						
						this.m_bacPoker["playerPoker"+i].card = pCardItem;
						this.m_bacPoker["playerPoker"+i].addChild(pCardItem);
					}else{
						this.m_bacPoker["playerPoker"+i].card.setData(_baccaratGameRecordStruct["PlayerCard"+i]);
					}
					
					this.m_bacPoker["playerPoker"+i].visible = true;
				}else {
					this.m_bacPoker["playerPoker"+i].visible = false;
				}
			}
			
			var _isVisible: boolean = false;
			if( !this.m_complexGameRecordStruct.BaseRecord.IsResult ){
				this.m_bacPoker.tf_1.visible = false;
				this.m_bacPoker.tf_2.visible = false;
				_isVisible = false;
			}
			else {
				this.m_bacPoker.tf_1.visible = true;
				this.m_bacPoker.tf_2.visible = true;
				_isVisible = true;
			}

			if( _isVisible && this.m_bacPoker ) {
				this.m_bacPoker.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				this.m_bacPoker.tf_1.text = String(_baccaratGameRecordStruct.BankerTotalPoint);
				this.m_bacPoker.tf_2.text = String(_baccaratGameRecordStruct.PlayerTotalPoint);				
				this.m_bacPoker.font_1.visible = true;
				this.m_bacPoker.font_2.visible = true;
				//				this.m_bacPoker.tf_1.x = this.m_bacPoker.font_1.x + this.m_bacPoker.font_1.width + 2;
				//				this.m_bacPoker.tf_2.x = this.m_bacPoker.font_2.x + this.m_bacPoker.font_2.width + 2;
				
			}else {
				this.m_bacPoker.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				this.m_bacPoker.tf_1.text = "";
				this.m_bacPoker.tf_2.text = "";						
				this.m_bacPoker.font_1.visible = false;
				this.m_bacPoker.font_2.visible = false;
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
		
		
		private updateRouPoker(_rouGameRecordStruct):void {
			
			this.m_rouResult.Reset();
			this.m_rouResult.num = _rouGameRecordStruct.RouletteNumber;
			
			//新增  0值, 部屬於任何打列,大小,紅黑
			if( this.m_rouResult.num == 0 ){
				this.m_rouPoker.mc_0.gotoAndStop(3);
				this.m_rouPoker.mc_0.visible = true;
				this.m_rouPoker.mc_1.visible = false;
				this.m_rouPoker.mc_2.visible = false;
				this.m_rouPoker.mc_3.visible = false;
				this.m_rouPoker.mc_4.visible = false;
				this.m_rouPoker.x = -53;
				this.m_rouPoker.tf.text = String( this.m_rouResult.num );
				return;
			}
			this.m_rouPoker.x = -140;
			this.m_rouPoker.mc_0.visible = true;
			this.m_rouPoker.mc_1.visible = true;
			this.m_rouPoker.mc_2.visible = true;
			this.m_rouPoker.mc_3.visible = true;
			this.m_rouPoker.mc_4.visible = true;
			///***************************************//			
			
			var _dozen:number= this.m_rouResult.dozen;
			var _small: boolean = this.m_rouResult.isSmall;
			var _big: boolean = this.m_rouResult.isBig;
			var _lang:number= manager.LobbyManager.getInstance().lobbyAuth.Lang;
			var _odd: boolean = this.m_rouResult.isOdd;
			var _even: boolean = this.m_rouResult.isEven;
			var _row:number= this.m_rouResult.column;
			var _red: boolean = this.m_rouResult.isRed;				//新增
			var _black: boolean = this.m_rouResult.isBlack;			//新增
			
			if( _dozen == 1) {
				this.m_rouPoker.mc_3.gotoAndStop(1+_lang);
			}
			else if( _dozen == 2 ){
				this.m_rouPoker.mc_3.gotoAndStop(4+_lang);
			}
			else if( _dozen == 3 ){
				this.m_rouPoker.mc_3.gotoAndStop(7+_lang);
			}
			
			if( _big ){
				this.m_rouPoker.mc_2.gotoAndStop(1+_lang);
			}
			else if( _small ){
				this.m_rouPoker.mc_2.gotoAndStop(4+_lang);
			}
			
			if( _odd ){
				this.m_rouPoker.mc_1.gotoAndStop(1+_lang);
			}
			else if( _even ){
				this.m_rouPoker.mc_1.gotoAndStop(4+_lang);
			}
			
			if( _row == 1) {
				this.m_rouPoker.mc_4.gotoAndStop(1+_lang);
			}
			else if( _row == 2 ){
				this.m_rouPoker.mc_4.gotoAndStop(4+_lang);
			}
			else if( _row == 3 ){
				this.m_rouPoker.mc_4.gotoAndStop(7+_lang);
			}
			
			//新增
			if( _red ){
				this.m_rouPoker.mc_0.gotoAndStop(1);
			}
			else if( _black ){
				this.m_rouPoker.mc_0.gotoAndStop(2);
			}
			else {
				this.m_rouPoker.mc_0.gotoAndStop(3);
			}			
						
			this.m_rouPoker.tf.text = String( this.m_rouResult.num );
				
		}		
		
		private checkSicPoker(dic:number): boolean {
			if( dic > 0 && dic <= 6 ){
				return true;
			}
			return false;
		}
		
		private updateSicPoker(_sicGameRecordStruct):void {
			//由小到大 排列
			var _ar:any[] = [_sicGameRecordStruct.Dice_1 , _sicGameRecordStruct.Dice_2 , _sicGameRecordStruct.Dice_3 ];
				_ar.sort( );	
				
				
				this.m_iDice1 = _ar[0];
				this.m_iDice2 = _ar[1];
				this.m_iDice3 = _ar[2];
				
			var _iTotalPoints:number= _sicGameRecordStruct.Dice_1 + _sicGameRecordStruct.Dice_2 + _sicGameRecordStruct.Dice_3;
			this.m_sicPoker.tf_0.text = String( _iTotalPoints );
			
			
			//單雙 或 圍骰
			this.m_sicPoker.mc_1.visible = false;
			this.m_sicPoker.mc_2.visible = false;	
			this.m_sicPoker.mc_3.visible = false;	
			if( this.m_iDice1 == this.m_iDice2 && this.m_iDice2 == this.m_iDice3 ){
				this.m_sicPoker.mc_3.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				this.m_sicPoker.mc_3.visible = true;
			}
			else {
				this.updateBig_Small( _iTotalPoints );
				this.updateOdd_Even(  _iTotalPoints );
				this.m_sicPoker.mc_1.visible = true;
				this.m_sicPoker.mc_2.visible = true;	
			}
			
			
			this.m_sicTotalPoints = _iTotalPoints;
			
			if( this.checkSicPoker(  _ar[0] ) ){
				this.m_sicPoker.mc_dice1.gotoAndStop( _ar[0] );
			}
			if( this.checkSicPoker(  _ar[1] ) ){
				this.m_sicPoker.mc_dice2.gotoAndStop( _ar[1] );
			}
			if( this.checkSicPoker(  _ar[2] ) ){
				this.m_sicPoker.mc_dice3.gotoAndStop(  _ar[2] );
			}	
		}	
		
		private updateBig_Small( _iTotalPoints:number):void {
			if( _iTotalPoints >= 11 && _iTotalPoints <= 18 ){
				this.m_sicPoker.mc_2.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			else if( _iTotalPoints >= 4 && _iTotalPoints <= 10  ) {
				this.m_sicPoker.mc_2.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+4);
			}
			else {
				console.log("updateBig_Small Error::" +_iTotalPoints)
			}
			
			
			
		}
		
		private updateOdd_Even( _iTotalPoints:number):void {
			if( _iTotalPoints % 2 != 0 ){
				this.m_sicPoker.mc_1.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			else if( _iTotalPoints != 0  && _iTotalPoints % 2 == 0 ) {
				this.m_sicPoker.mc_1.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+4);
			}
			else {
				console.log("updateOdd_Even Error::" +_iTotalPoints)
			}
			
			
		}			
		
		/**
		 * 解析視訊資料
		 */
		private transVideoData( _complexGameRecordStruct ):any[] {
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
//			if(this.m_txtGameRecordNo){
//				this.m_txtGameRecordNo = null;
//			}
//			if(this.m_scaleBig){
//				this.m_scaleBig.destroy();
//				this.m_scaleBig = null;
//			}
//			if(this.m_scaleSmall){
//				this.m_scaleSmall.destroy();
//				this.m_scaleSmall = null;
//			}
//			if(this.m_scaleReplay){
//				this.m_scaleReplay.destroy();
//				this.m_scaleReplay = null;
//			}
			if(this.m_video){
				this.m_video.stop();
				this.m_video.clearVideoFull();
			}
//			if(this.m_bg){
//				this.m_bg.dispose();
//				this.m_bg = null;
//			}
//			
//			clear();
//			
//			if(this.m_complexGameRecordStruct){
//				this.m_complexGameRecordStruct = null;
//			}
//			
//			super.destroy();
		}
		
		 public onChangeLanguage():void {
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			if( this.m_scaleReplay){
				this.m_scaleReplay.onChangeLanguage();
			}
			
			if( this.m_scaleBig ){
				this.m_scaleBig.onChangeLanguage();
			}
			
			if( this.m_scaleSmall ){
				this.m_scaleSmall.onChangeLanguage();
			}		
			
			if( this.m_video ){
				this.m_video.onChangeLanguage();
			}
			
			if( this.m_rouPoker && this.m_rouPoker.num != -1 ){
				var _dozen:number= this.m_rouResult.dozen;
				var _small: boolean = this.m_rouResult.isSmall;
				var _big: boolean = this.m_rouResult.isBig;
				var _lang:number= manager.LobbyManager.getInstance().lobbyAuth.Lang;
				var _odd: boolean = this.m_rouResult.isOdd;
				var _even: boolean = this.m_rouResult.isEven;
				var _row:number= this.m_rouResult.column;
				
				if( _dozen == 1) {
					this.m_rouPoker.mc_3.gotoAndStop(1+_lang);
				}
				else if( _dozen == 2 ){
					this.m_rouPoker.mc_3.gotoAndStop(4+_lang);
				}
				else if( _dozen == 3 ){
					this.m_rouPoker.mc_3.gotoAndStop(7+_lang);
				}
				
				if( _big ){
					this.m_rouPoker.mc_2.gotoAndStop(1+_lang);
				}
				else if( _small ){
					this.m_rouPoker.mc_2.gotoAndStop(4+_lang);
				}
				
				if( _odd ){
					this.m_rouPoker.mc_1.gotoAndStop(1+_lang);
				}
				else if( _even ){
					this.m_rouPoker.mc_1.gotoAndStop(4+_lang);
				}
				if( _row == 1) {
					this.m_rouPoker.mc_4.gotoAndStop(1+_lang);
				}
				else if( _row == 2 ){
					this.m_rouPoker.mc_4.gotoAndStop(4+_lang);
				}
				else if( _row == 3 ){
					this.m_rouPoker.mc_4.gotoAndStop(7+_lang);
				}
				
			}//end if			
			
			if( this.m_sicPoker && this.m_sicTotalPoints > 0 ){
				if( this.m_sicPoker && this.m_sicTotalPoints > 0 ){
					
					if( this.m_iDice1 == this.m_iDice2 && this.m_iDice2 == this.m_iDice3  ){
						this.m_sicPoker.mc_3.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
					}
					else {
						this.updateBig_Small( this.m_sicTotalPoints );
						this.updateOdd_Even(  this.m_sicTotalPoints );	
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
