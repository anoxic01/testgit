module lobby.view.gameRecord {
	export class BetResultUI extends panel.PanelWindow{
		
		private m_pBacPoint;
		private m_pRouPoint;
		private m_pSicPoint;
		private m_pDtfPoint;
		
		private m_btnShowVideo:Btn;
		private m_txtGameRecordNo:Text;
		private m_txtGameType:Text;
		
		private m_bacPoker;
		private m_sicPoker;
		private m_rouPoker;
		private m_dtfPoker;
		
		private m_rouResult:RouletteDeal_2;
		private m_scroll	:Scroll_3;
		private m_vecSubList;
		private m_complexGameRecordStruct;
		private m_roultetteLang;
		private m_sicBoLang;
		private m_sicTotalPoints:number;
		protected m_iDice1:number;
		protected m_iDice2:number;
		protected m_iDice3:number;		
		
		public constructor( _mcAsset ) {
			super();

			this.m_mcAsset = _mcAsset;
			this.addChild( this.m_mcAsset );
			var _nSubX:number = -315;
			var _nSubY:number = -219;
			
			this.m_pBacPoint = new egret.Point(11+_nSubX , 160+_nSubY);
			this.m_pRouPoint = new egret.Point(46+_nSubX , 225+_nSubY);
			this.m_pSicPoint = new egret.Point(30+_nSubX , 160+_nSubY);
			this.m_pDtfPoint = new egret.Point(10+_nSubX , 180+_nSubY);
			
			this.m_btnShowVideo = new Btn( this.m_mcAsset.mc_1 , this.showVideoPannel );
			
			this.m_txtGameRecordNo = new Text( _mcAsset.tf_1 );
			this.m_txtGameType =new Text( _mcAsset.tf_2 );
			this.m_btnClose = new ui.button.SingleButtonMC( this.m_mcAsset.mc_close , function(event:MouseEvent):void {
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.GameRecordManager.getInstance().hideBetResultPannel();
			});
			this.m_mcHot = _mcAsset.mc_hot; 
			this.nAssetWidth = this.m_mcAsset.width + 50;
			this.nAssetHeight = this.m_mcAsset.height + 50;		
			this.m_rouResult = new RouletteDeal_2();
			
			this.m_scroll = new Scroll_3(false, new ui.button.Scroll_Bar(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"ScrollHandlerAsset"), function():void{}), manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_ScrollLineAsset"), true);
//			this.m_scroll.x = -12;
//			this.m_scroll.y = -2;
			this.m_scroll.resize( 325, 298 );
			this.m_mcAsset.mc_pos.addChild( this.m_scroll );
			
			this.m_vecSubList = new Array<egret.MovieClip>();
			this.m_roultetteLang = new lang.RouletteFindName();
			this.m_sicBoLang = new lang.SicBoFindName();
			
			this.onChangeLanguage();
		}
		public updateUI( _complexGameRecordStruct ):void {
			this.reset();
			this.m_txtGameRecordNo.text = String(_complexGameRecordStruct.BaseRecord.RecordGameNumber);
			this.m_complexGameRecordStruct = _complexGameRecordStruct;
			this.m_scroll.resize( 325, 305 );
			if( _complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.BAC ) {
				if( !this.m_bacPoker ){
					this.m_bacPoker = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Bac_Group") ;
					
					this.m_bacPoker["playerPoker3"].x = 64;
					this.m_bacPoker["playerPoker3"].y = 194;
					
					this.m_bacPoker["bankPoker3"].x = 214;
					this.m_bacPoker["bankPoker3"].y = 194;
					
				}
				this.m_bacPoker.x = this.m_pBacPoint.x;
				this.m_bacPoker.y = this.m_pBacPoint.y;
				this.addChild( this.m_bacPoker );
				
				this.updateBacPoker( _complexGameRecordStruct.BaccaratData );
				
//				this.m_txtGameType.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_Bac);
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
				this.m_rouPoker.x = this.m_pRouPoint.x
				this.m_rouPoker.y = this.m_pRouPoint.y
				this.addChild( this.m_rouPoker );	
				
				this.updateRouPoker(_complexGameRecordStruct.RouletteData);
//				this.m_txtGameType.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_Rou);
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.SIC ) {
				if(!this.m_sicPoker ){
					this.m_sicPoker = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Sic_Group");
				}
				this.m_sicPoker.x = this.m_pSicPoint.x
				this.m_sicPoker.y = this.m_pSicPoint.y
				this.addChild( this.m_sicPoker );	
				this.updateSicPoker(_complexGameRecordStruct.SicboData);
//				this.m_txtGameType.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_Sic);
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == define.GameDefine.DTF ) {
				if(!this.m_dtfPoker ){
					this.m_dtfPoker = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Dtf_Group");
					this.m_dtfPoker.mc_3.width = 92;
					this.m_dtfPoker.mc_3.height = 128;
					
					this.m_dtfPoker.mc_2.width = 92;
					this.m_dtfPoker.mc_2.height = 128;
					
					this.m_dtfPoker.mc_3.scaleX = this.m_dtfPoker.mc_2.scaleX = 0.7;
					this.m_dtfPoker.mc_3.scaleY = this.m_dtfPoker.mc_2.scaleY = 0.7;
				}
				
				this.m_dtfPoker.x  = this.m_pDtfPoint.x;
				this.m_dtfPoker.y  = this.m_pDtfPoint.y;
				this.addChild( this.m_dtfPoker );
				
				this.updateDtfPoker(_complexGameRecordStruct.DragonTigerData);
//				this.m_txtGameType.text = manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_DTF);
			}
			
			var isResult: boolean = this.m_complexGameRecordStruct.BaseRecord.IsResult;
			if(this.m_bacPoker){
				this.m_bacPoker.visible = isResult;
			}
			if(this.m_sicPoker){
				this.m_sicPoker.visible = isResult;
			}
			if(this.m_rouPoker){
				this.m_rouPoker.visible = isResult;
			}
			if(this.m_dtfPoker){
				this.m_dtfPoker.visible = isResult;
			}
			
			this.onChangeLanguage();
			this.updateGameType();
			
		}
		
		private updateGameType():void {
			if( this.m_complexGameRecordStruct ){
				var _iTableID:number= this.m_complexGameRecordStruct.BaseRecord.TableID;
				var _iGameID:number= this.m_complexGameRecordStruct.BaseRecord.GameID;
				
//				this.m_txtGameType.txtAsset.autoSize = TextFieldAutoSize.CENTER;
				if( _iGameID == define.GameDefine.BAC ) {
					this.m_txtGameType.txtAsset.htmlText = manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_Bac) + " <font size='19'>" + String(_iTableID)+"</font>";
				}
				else if( _iGameID == define.GameDefine.ROU ) {
					this.m_txtGameType.txtAsset.htmlText = manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_Rou) + " <font size='19'>" + String(_iTableID)+"</font>";
				}
				else if( _iGameID == define.GameDefine.SIC ) {
					this.m_txtGameType.txtAsset.htmlText = manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_Sic) + " <font size='19'>" + String(_iTableID)+"</font>";
				}
				else if( _iGameID == define.GameDefine.DTF ) {
					this.m_txtGameType.txtAsset.htmlText = manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_DTF) + " <font size='19'>" + String(_iTableID)+"</font>";
				}	
				
				
			}
			
		}
		
		private reset():void
		{
			if( this.m_bacPoker ){
				if( this.contains(this.m_bacPoker )){
					this.removeChild( this.m_bacPoker );
				}
			}
			
			if( this.m_rouPoker ){
				if( this.contains(this.m_rouPoker )){
					this.removeChild( this.m_rouPoker );
				}
			}
			
			if( this.m_sicPoker ){
				if( this.contains(this.m_sicPoker )){
					this.removeChild( this.m_sicPoker );
				}
			}
			
			if( this.m_dtfPoker ){
				if(this.contains(this.m_dtfPoker )){
					this.removeChild(this.m_dtfPoker);
				}	
			}	
			this.m_sicTotalPoints = 0;	
		}
		
		private checkBacPoker( _sPoker:string ): boolean {
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
		
		private updateBacPoker(_baccaratGameRecordStruct):void {
		
			for( var i:number= 1 ; i <= 3 ; i++ ){
			
				if( this.checkBacPoker(_baccaratGameRecordStruct["BankerCard"+i]) ){
					if(this.m_bacPoker["bankPoker"+i].card==null){
						var bCardItem = new card.CardItem(_baccaratGameRecordStruct["BankerCard"+i]);
						bCardItem.scaleX = 0.5;
						bCardItem.scaleY = 0.5;
						if(i==3){
							bCardItem.rotation = 90;
							bCardItem.x += bCardItem.width/2;
							bCardItem.y -= bCardItem.height/2;
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
							pCardItem.rotation = 90;
							pCardItem.x += pCardItem.width/2;
							pCardItem.y -= pCardItem.height/2;
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
			
			var _ar:any[] = [language.Language.sBanker ,language.Language.sPlayer , language.Language.sTie , language.Language.sBig , language.Language.sSmall , 
				language.Language.sBankerPair , language.Language.sPlayerPair];
			
			var _ar2:any[] = [_baccaratGameRecordStruct.BankerBet , _baccaratGameRecordStruct.PlayerBet , _baccaratGameRecordStruct.TieBet , 
				_baccaratGameRecordStruct.BigBet , _baccaratGameRecordStruct.SmallBet , _baccaratGameRecordStruct.BankerPairBet , 
				_baccaratGameRecordStruct.PlayerPairBet];
			
			this.createSubList( _ar , _ar2 );
			
			
			if( _isVisible && this.m_bacPoker ) {
				this.m_bacPoker.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				// this.m_bacPoker.tf_1.autoSize = TextFieldAutoSize.LEFT;
				// this.m_bacPoker.tf_2.autoSize = TextFieldAutoSize.LEFT;
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
		
		private createSubList(_ar:any[], _ar2:any[] ):void {
			for( var i:number= 0 ; i < this.m_vecSubList.length ; i++){
				if( this.m_vecSubList[i].parent ){
					this.m_vecSubList[i].parent.removeChild( this.m_vecSubList[i] );
				}
				this.m_vecSubList[i] = null;
			}
			
			this.m_vecSubList = new Array<egret.MovieClip>();
			var _subList;
			var j:number= 0;
			for( i = 0 ; j < _ar2.length ; i++ ,j++ ){
				if(_ar2[j] == 0){
					i -- ;
					continue;
				}
				
				_subList = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Result_SubList");
				// _subList.tf_0.autoSize = TextFieldAutoSize.CENTER;
				_subList.tf_0.defaultTextFormat = _subList.tf_0.getTextFormat();
				_subList.tf_0.text = manager.LobbyManager.getInstance().getLanguageString(  _ar[j]  );
				
				// _subList.tf_1.autoSize = TextFieldAutoSize.CENTER;
				_subList.tf_1.defaultTextFormat = _subList.tf_1.getTextFormat();
				_subList.tf_1.text = String(_ar2[j]);	
				_subList.x = 0;
				_subList.y = i * 30;
				_subList.bg.visible = !(i%2);
				this.m_scroll.add( _subList );
				this.m_vecSubList.push( _subList );
			}
			
			if(this.m_vecSubList.length < 10){
				for(j = this.m_vecSubList.length; j < 10; j++){
					_subList = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Result_SubList");
					_subList.tf_0.text = "";
					_subList.tf_1.text = "";
					_subList.x = 0;
					_subList.y = j * 30;
					_subList.bg.visible = !(j%2);
					this.m_scroll.add( _subList );
					this.m_vecSubList.push( _subList );
				}
			}
			this.m_scroll.resize( 325, 305 );
		}
		
		
		private createSubList_2( _data , transObj ):void {
			for( var i:number= 0 ; i < this.m_vecSubList.length ; i++){
				if( this.m_vecSubList[i].parent ){
					this.m_vecSubList[i].parent.removeChild( this.m_vecSubList[i] );
				}
				this.m_vecSubList[i] = null;
			}
			
			this.m_vecSubList = new Array<egret.MovieClip>();
			var _subList;
			i = 0;
			for( var key in _data ){
				if(_data[key] == 0){
					continue;
				}
				
				_subList = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Result_SubList");
				_subList.tf_0.defaultTextFormat = _subList.tf_0.getTextFormat();			
				_subList.tf_0.text = transObj.getBetAreaName(key) ;
				_subList.tf_1.defaultTextFormat = _subList.tf_1.getTextFormat();
				_subList.tf_1.text = String(_data[key]);	
				_subList.x = 0;
				_subList.y = i * 30;
				_subList.bg.visible = !(i%2);
				this.m_scroll.add( _subList );
				
				this.m_vecSubList.push( _subList );
				i += 1;
			}
			
			if(this.m_vecSubList.length < 10){
				for(i =this.m_vecSubList.length; i < 10; i++){
					_subList = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Result_SubList");
					_subList.tf_0.text = "";
					_subList.tf_1.text = "";
					_subList.x = 0;
					_subList.y = i * 30;
					_subList.bg.visible = !(i%2);
					this.m_scroll.add( _subList );
					this.m_vecSubList.push( _subList );
				}
			}
			
			this.m_scroll.resize( 325, 305 );
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
				this.m_rouPoker.x = this.m_pRouPoint.x+60;
				this.m_rouPoker.tf.text = String( this.m_rouResult.num );
				this.createSubList_2( _rouGameRecordStruct.RouletteObjectBet , this.m_roultetteLang );	
				return;
			}
			
			this.m_rouPoker.x = this.m_pRouPoint.x;
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
			var _red: boolean = this.m_rouResult.isRed;
			var _black: boolean = this.m_rouResult.isBlack;
			
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
			
			
			
			
			/*var _ar:any[] = [ language.Language.sBig ,language.Language.sSmall , language.Language.sRed , language.Language.sBlack , language.Language.sOdd , 
							 language.Language.sEven  ];
			
			var _ar2:any[] = [_rouGameRecordStruct.Bet_Big, _rouGameRecordStruct.Bet_Small , _rouGameRecordStruct.Bet_Red , _rouGameRecordStruct.Bet_Black ,
							  _rouGameRecordStruct.Bet_Odd, _rouGameRecordStruct.Bet_Even ];*/
			
			/*RouletteObjectBet	
			E1	500 [0x1f4]	
			W0	500 [0x1f4]	
			W1	500 [0x1f4]	
			W2	500 [0x1f4]	
			RouletteObjectWin	
			E1	1000 [0x3e8]	
			W2	1500 [0x5dc]	*/


			this.createSubList_2( _rouGameRecordStruct.RouletteObjectBet , this.m_roultetteLang );		
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
			_ar.sort(  );		
			
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
			
			if( this.checkSicPoker( _ar[0] ) ){
				this.m_sicPoker.mc_dice1.gotoAndStop( _ar[0] );
			}
			if( this.checkSicPoker( _ar[1] ) ){
				this.m_sicPoker.mc_dice2.gotoAndStop( _ar[1] );
			}
			if( this.checkSicPoker( _ar[2]) ){
				this.m_sicPoker.mc_dice3.gotoAndStop( _ar[2] );
			}
		
			this.createSubList_2( _sicGameRecordStruct.SicboObjectBet , this.m_sicBoLang );
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
			}
			
			//建立子項
			var _ar:any[] = [language.Language.sDragon ,language.Language.sTiger , language.Language.sTie ];
			
			var _ar2:any[] = [_dtfGameRecordStruct.Bet_Dragon, _dtfGameRecordStruct.Bet_Tiger ,
				_dtfGameRecordStruct.Bet_Tie  ];			
			this.createSubList( _ar , _ar2 );	
		}
		
		private transDtfPoints(_iPoint:number):string {
			var _str:string = "";
			
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
		
		private showVideoPannel(event:MouseEvent):void{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			if( this.m_complexGameRecordStruct ) {
				manager.GameRecordManager.getInstance().showVideoPlayPannel( this.m_complexGameRecordStruct );
			}
			
		}
		
		 public onChangeLanguage():void {
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			if(this.m_complexGameRecordStruct){
				var isResult: boolean = this.m_complexGameRecordStruct.BaseRecord.IsResult;
				
				if( this.m_btnShowVideo ){
					this.m_btnShowVideo.onChangeLanguage();
					this.m_btnShowVideo.visible = isResult;
				}
				
				this.m_mcAsset.tf_3.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				this.m_mcAsset.tf_3.visible = !isResult;
			}
			
			if( this.m_bacPoker ){
				this.m_bacPoker.font_1.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				this.m_bacPoker.font_2.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
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
			
			if( this.m_dtfPoker ){
				this.m_dtfPoker.font_1.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				this.m_dtfPoker.font_2.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			
			if( this.m_sicPoker && this.m_sicTotalPoints > 0 ){

				if( this.m_iDice1 == this.m_iDice2 && this.m_iDice2 == this.m_iDice3  ){
					this.m_sicPoker.mc_3.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				}
				else {
					this.updateBig_Small( this.m_sicTotalPoints );
					this.updateOdd_Even(  this.m_sicTotalPoints );	
				}				
			}
			
			this.updateGameType();
			
		}//end onChangeLanguage();
		
		 public destroy():void {
//			super.destroy()
			
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
		
	}
}
