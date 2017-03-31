module lobby.view.gameRecord {
	export class BetResultUI extends PanelWindow{
		private m_mcAsset:MovieClip;
		
		private m_pBacPoint:Point;
		private m_pRouPoint:Point;
		private m_pSicPoint:Point;
		private m_pDtfPoint:Point;
		
		private m_btnShowVideo:Btn;
		private m_txtGameRecordNo:Text;
		private m_txtGameType:Text;
		
		private m_bacPoker:*;
		private m_sicPoker:*;
		private m_rouPoker:*;
		private m_dtfPoker:*;
		
		private m_rouResult:RouletteDeal_2;
		private m_scroll	:Scroll_3;
		private m_vecSubList:<MovieClip>;
		private m_complexGameRecordStruct:ComplexGameRecordStruct;
		private m_roultetteLang:RouletteFindName;
		private m_sicBoLang:SicBoFindName;
		private m_sicTotalPoints:number;
		protected m_iDice1:number;
		protected m_iDice2:number;
		protected m_iDice3:number;		
		
		public constructor( _mcAsset:MovieClip ) {
			m_mcAsset = _mcAsset;
			addChild( m_mcAsset );
			var _nSubX:Number = -315;
			var _nSubY:Number = -219;
			
			m_pBacPoint = new Point(11+_nSubX , 160+_nSubY);
			m_pRouPoint = new Point(46+_nSubX , 225+_nSubY);
			m_pSicPoint = new Point(30+_nSubX , 160+_nSubY);
			m_pDtfPoint = new Point(10+_nSubX , 180+_nSubY);
			
			m_btnShowVideo = new Btn( m_mcAsset.mc_1 , showVideoPannel );
			
			m_txtGameRecordNo = new Text( _mcAsset.tf_1 );
			m_txtGameType =new Text( _mcAsset.tf_2 );
			m_btnClose = new ui.button.SingleButtonMC( m_mcAsset.mc_close , function(event:MouseEvent):void {
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				GameRecordManager.getInstance().hideBetResultPannel();
			});
			m_mcHot = _mcAsset.mc_hot; 
			nAssetWidth = m_mcAsset.width + 50;
			nAssetHeight = m_mcAsset.height + 50;		
			m_rouResult = new RouletteDeal_2();
			
			m_scroll = new Scroll_3(false, new Scroll_Bar(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"ScrollHandlerAsset"), function():void{}), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_ScrollLineAsset"), true);
//			m_scroll.x = -12;
//			m_scroll.y = -2;
			m_scroll.resize( 325, 298 );
			m_mcAsset.mc_pos.addChild( m_scroll );
			
			m_vecSubList = new <MovieClip>();
			m_roultetteLang = new RouletteFindName();
			m_sicBoLang = new SicBoFindName();
			
			onChangeLanguage();
		}
		public updateUI( _complexGameRecordStruct: ComplexGameRecordStruct ):void {
			reset();
			m_txtGameRecordNo.text = String(_complexGameRecordStruct.BaseRecord.RecordGameNumber);
			m_complexGameRecordStruct = _complexGameRecordStruct;
			m_scroll.resize( 325, 305 );
			if( _complexGameRecordStruct.BaseRecord.GameID == GameDefine.BAC ) {
				if( !m_bacPoker ){
					m_bacPoker = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Bac_Group") ;
					
					m_bacPoker["playerPoker3"].x = 64;
					m_bacPoker["playerPoker3"].y = 194;
					
					m_bacPoker["bankPoker3"].x = 214;
					m_bacPoker["bankPoker3"].y = 194;
					
				}
				m_bacPoker.x = m_pBacPoint.x;
				m_bacPoker.y = m_pBacPoint.y;
				addChild( m_bacPoker );
				
				updateBacPoker( _complexGameRecordStruct.BaccaratData );
				
//				m_txtGameType.text = LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Bac);
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
				m_rouPoker.x = m_pRouPoint.x
				m_rouPoker.y = m_pRouPoint.y
				addChild( m_rouPoker );	
				
				updateRouPoker(_complexGameRecordStruct.RouletteData);
//				m_txtGameType.text = LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Rou);
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == GameDefine.SIC ) {
				if(!m_sicPoker ){
					m_sicPoker = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Sic_Group");
				}
				m_sicPoker.x = m_pSicPoint.x
				m_sicPoker.y = m_pSicPoint.y
				addChild( m_sicPoker );	
				updateSicPoker(_complexGameRecordStruct.SicboData);
//				m_txtGameType.text = LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Sic);
			}
			else if( _complexGameRecordStruct.BaseRecord.GameID == GameDefine.DTF ) {
				if(!m_dtfPoker ){
					m_dtfPoker = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Dtf_Group");
					m_dtfPoker.mc_3.width = 92;
					m_dtfPoker.mc_3.height = 128;
					
					m_dtfPoker.mc_2.width = 92;
					m_dtfPoker.mc_2.height = 128;
					
					m_dtfPoker.mc_3.scaleX = m_dtfPoker.mc_2.scaleX = 0.7;
					m_dtfPoker.mc_3.scaleY = m_dtfPoker.mc_2.scaleY = 0.7;
				}
				
				m_dtfPoker.x  = m_pDtfPoint.x;
				m_dtfPoker.y  = m_pDtfPoint.y;
				addChild( m_dtfPoker );
				
				updateDtfPoker(_complexGameRecordStruct.DragonTigerData);
//				m_txtGameType.text = LobbyManager.getInstance().getLanguageString( Language.sGame_Name_DTF);
			}
			
			var isResult: boolean = m_complexGameRecordStruct.BaseRecord.IsResult;
			if(m_bacPoker){
				m_bacPoker.visible = isResult;
			}
			if(m_sicPoker){
				m_sicPoker.visible = isResult;
			}
			if(m_rouPoker){
				m_rouPoker.visible = isResult;
			}
			if(m_dtfPoker){
				m_dtfPoker.visible = isResult;
			}
			
			onChangeLanguage();
			updateGameType();
			
		}
		
		private updateGameType():void {
			if( m_complexGameRecordStruct ){
				var _iTableID:number= m_complexGameRecordStruct.BaseRecord.TableID;
				var _iGameID:number= m_complexGameRecordStruct.BaseRecord.GameID;
				
//				m_txtGameType.txtAsset.autoSize = TextFieldAutoSize.CENTER;
				if( _iGameID == GameDefine.BAC ) {
					m_txtGameType.txtAsset.htmlText = LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Bac) + " <font size='19'>" + String(_iTableID)+"</font>";
				}
				else if( _iGameID == GameDefine.ROU ) {
					m_txtGameType.txtAsset.htmlText = LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Rou) + " <font size='19'>" + String(_iTableID)+"</font>";
				}
				else if( _iGameID == GameDefine.SIC ) {
					m_txtGameType.txtAsset.htmlText = LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Sic) + " <font size='19'>" + String(_iTableID)+"</font>";
				}
				else if( _iGameID == GameDefine.DTF ) {
					m_txtGameType.txtAsset.htmlText = LobbyManager.getInstance().getLanguageString( Language.sGame_Name_DTF) + " <font size='19'>" + String(_iTableID)+"</font>";
				}	
				
				
			}
			
		}
		
		private reset():void
		{
			if( m_bacPoker ){
				if( this.contains(m_bacPoker )){
					removeChild( m_bacPoker );
				}
			}
			
			if( m_rouPoker ){
				if( this.contains(m_rouPoker )){
					removeChild( m_rouPoker );
				}
			}
			
			if( m_sicPoker ){
				if( this.contains(m_sicPoker )){
					removeChild( m_sicPoker );
				}
			}
			
			if( m_dtfPoker ){
				if(this.contains(m_dtfPoker )){
					this.removeChild(m_dtfPoker);
				}	
			}	
			m_sicTotalPoints = 0;	
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
		
		private updateBacPoker(_baccaratGameRecordStruct:BaccaratGameRecordStruct):void {
		
			for( var i:number= 1 ; i <= 3 ; i++ ){
			
				if( checkBacPoker(_baccaratGameRecordStruct["BankerCard"+i]) ){
					if(m_bacPoker["bankPoker"+i].card==null){
						var bCardItem:CardItem = new CardItem(_baccaratGameRecordStruct["BankerCard"+i]);
						bCardItem.scaleX = 0.5;
						bCardItem.scaleY = 0.5;
						if(i==3){
							bCardItem.rotation = 90;
							bCardItem.x += bCardItem.width/2;
							bCardItem.y -= bCardItem.height/2;
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
							pCardItem.rotation = 90;
							pCardItem.x += pCardItem.width/2;
							pCardItem.y -= pCardItem.height/2;
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
			
			var _ar:any[] = [Language.sBanker ,Language.sPlayer , Language.sTie , Language.sBig , Language.sSmall , 
				Language.sBankerPair , Language.sPlayerPair];
			
			var _ar2:any[] = [_baccaratGameRecordStruct.BankerBet , _baccaratGameRecordStruct.PlayerBet , _baccaratGameRecordStruct.TieBet , 
				_baccaratGameRecordStruct.BigBet , _baccaratGameRecordStruct.SmallBet , _baccaratGameRecordStruct.BankerPairBet , 
				_baccaratGameRecordStruct.PlayerPairBet];
			
			createSubList( _ar , _ar2 );
			
			
			if( _isVisible && m_bacPoker ) {
				m_bacPoker.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				m_bacPoker.tf_1.autoSize = TextFieldAutoSize.LEFT;
				m_bacPoker.tf_2.autoSize = TextFieldAutoSize.LEFT;
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
		
		private createSubList(_ar:any[], _ar2:any[] ):void {
			for( var i:number= 0 ; i < m_vecSubList.length ; i++){
				if( m_vecSubList[i].parent ){
					m_vecSubList[i].parent.removeChild( m_vecSubList[i] );
				}
				m_vecSubList[i] = null;
			}
			
			m_vecSubList = new <MovieClip>();
			var _subList:*;
			var j:number= 0;
			for( i = 0 ; j < _ar2.length ; i++ ,j++ ){
				if(_ar2[j] == 0){
					i -- ;
					continue;
				}
				
				_subList = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Result_SubList");
				_subList.tf_0.autoSize = TextFieldAutoSize.CENTER;
				_subList.tf_0.defaultTextFormat = _subList.tf_0.getTextFormat();
				_subList.tf_0.text = LobbyManager.getInstance().getLanguageString(  _ar[j]  );
				
				_subList.tf_1.autoSize = TextFieldAutoSize.CENTER;
				_subList.tf_1.defaultTextFormat = _subList.tf_1.getTextFormat();
				_subList.tf_1.text = String(_ar2[j]);	
				_subList.x = 0;
				_subList.y = i * 30;
				_subList.bg.visible = !(i%2);
				m_scroll.add( _subList );
				m_vecSubList.push( _subList );
			}
			
			if(m_vecSubList.length < 10){
				for(j = m_vecSubList.length; j < 10; j++){
					_subList = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Result_SubList");
					_subList.tf_0.text = "";
					_subList.tf_1.text = "";
					_subList.x = 0;
					_subList.y = j * 30;
					_subList.bg.visible = !(j%2);
					m_scroll.add( _subList );
					m_vecSubList.push( _subList );
				}
			}
			m_scroll.resize( 325, 305 );
		}
		
		
		private createSubList_2( _data:Object , transObj:BaseFindName ):void {
			for( var i:number= 0 ; i < m_vecSubList.length ; i++){
				if( m_vecSubList[i].parent ){
					m_vecSubList[i].parent.removeChild( m_vecSubList[i] );
				}
				m_vecSubList[i] = null;
			}
			
			m_vecSubList = new <MovieClip>();
			var _subList:*;
			i = 0;
			for( var key:String in _data ){
				if(_data[key] == 0){
					continue;
				}
				
				_subList = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Result_SubList");
				_subList.tf_0.defaultTextFormat = _subList.tf_0.getTextFormat();			
				_subList.tf_0.text = transObj.getBetAreaName(key) ;
				_subList.tf_1.defaultTextFormat = _subList.tf_1.getTextFormat();
				_subList.tf_1.text = String(_data[key]);	
				_subList.x = 0;
				_subList.y = i * 30;
				_subList.bg.visible = !(i%2);
				m_scroll.add( _subList );
				
				m_vecSubList.push( _subList );
				i += 1;
			}
			
			if(m_vecSubList.length < 10){
				for(i =m_vecSubList.length; i < 10; i++){
					_subList = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Result_SubList");
					_subList.tf_0.text = "";
					_subList.tf_1.text = "";
					_subList.x = 0;
					_subList.y = i * 30;
					_subList.bg.visible = !(i%2);
					m_scroll.add( _subList );
					m_vecSubList.push( _subList );
				}
			}
			
			m_scroll.resize( 325, 305 );
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
				m_rouPoker.x = m_pRouPoint.x+60;
				m_rouPoker.tf.text = String( m_rouResult.num );
				createSubList_2( _rouGameRecordStruct.RouletteObjectBet , m_roultetteLang );	
				return;
			}
			
			m_rouPoker.x = m_pRouPoint.x;
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
			var _red: boolean = m_rouResult.isRed;
			var _black: boolean = m_rouResult.isBlack;
			
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
			
			
			
			
			/*var _ar:any[] = [ Language.sBig ,Language.sSmall , Language.sRed , Language.sBlack , Language.sOdd , 
							 Language.sEven  ];
			
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


			createSubList_2( _rouGameRecordStruct.RouletteObjectBet , m_roultetteLang );		
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
			
			if( checkSicPoker( _ar[0] ) ){
				m_sicPoker.mc_dice1.gotoAndStop( _ar[0] );
			}
			if( checkSicPoker( _ar[1] ) ){
				m_sicPoker.mc_dice2.gotoAndStop( _ar[1] );
			}
			if( checkSicPoker( _ar[2]) ){
				m_sicPoker.mc_dice3.gotoAndStop( _ar[2] );
			}
		
			createSubList_2( _sicGameRecordStruct.SicboObjectBet , m_sicBoLang );
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
			}
			
			//建立子項
			var _ar:any[] = [Language.sDragon ,Language.sTiger , Language.sTie ];
			
			var _ar2:any[] = [_dtfGameRecordStruct.Bet_Dragon, _dtfGameRecordStruct.Bet_Tiger ,
				_dtfGameRecordStruct.Bet_Tie  ];			
			createSubList( _ar , _ar2 );	
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
		
		private showVideoPannel(event:MouseEvent):void{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			if( m_complexGameRecordStruct ) {
				GameRecordManager.getInstance().showVideoPlayPannel( m_complexGameRecordStruct );
			}
			
		}
		
		 public onChangeLanguage():void {
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			if(m_complexGameRecordStruct){
				var isResult: boolean = m_complexGameRecordStruct.BaseRecord.IsResult;
				
				if( m_btnShowVideo ){
					m_btnShowVideo.onChangeLanguage();
					m_btnShowVideo.visible = isResult;
				}
				
				m_mcAsset.tf_3.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				m_mcAsset.tf_3.visible = !isResult;
			}
			
			if( m_bacPoker ){
				m_bacPoker.font_1.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				m_bacPoker.font_2.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
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
			
			if( m_dtfPoker ){
				m_dtfPoker.font_1.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				m_dtfPoker.font_2.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			
			if( m_sicPoker && m_sicTotalPoints > 0 ){

				if( m_iDice1 == m_iDice2 && m_iDice2 == m_iDice3  ){
					m_sicPoker.mc_3.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				}
				else {
					updateBig_Small( m_sicTotalPoints );
					updateOdd_Even(  m_sicTotalPoints );	
				}				
			}
			
			updateGameType();
			
		}//end onChangeLanguage();
		
		 public destroy():void {
//			super.destroy()
			
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
		
	}
}
import flash.display.BitmapData;
import flash.display.MovieClip;
import flash.events.MouseEvent;

import component.button.Scroll_Bar;
import component.button.ui.button.SingleButtonMC;
import component.scroll.Scroll_2;

import manager.LobbyManager;

import views.BSprite;

class SingleList extends BSprite{
	private m_singleListAsset:MovieClip;
	public SingleList(_mcAsset:MovieClip):void {
		m_singleListAsset = _mcAsset;
		addChild(m_singleListAsset);
	}
	 public destroy():void {
		if( m_singleListAsset ){
			removeChild( m_singleListAsset );
		}
	}
	
	public setPlay( _str:String ):void {
		m_singleListAsset.tf_0.text = _str;
	}
	public setGold( _str:String ):void {
		m_singleListAsset.tf_1.text = _str;
	}
}





class Btn extends ui.button.SingleButtonMC{
	private txtLabel:MovieClip;
	public sLangKey:String;
	public Btn(mcButton:MovieClip, $fOnClick:Function):void {
		super( mcButton , $fOnClick );
		txtLabel = mcButton.txtLabel;
	}
	
	public onChangeLanguage():void {
		txtLabel.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);	
	}
	
}
class Scroll_3 extends Scroll_2 {
	
	public Scroll_3(_bDrag: boolean=true, _btnHandle:Scroll_Bar=null, _bmpdLine:BitmapData=null , _bHideBackGround: boolean = false):void {
		super( _bDrag , _btnHandle , _bmpdLine , _bHideBackGround );
	}
	
	 protected onMouseWheelHandler(evt:MouseEvent):void
	{
		super.onMouseWheelHandler(evt);
		evt.stopPropagation();
		//			evt.stopPropagation();
	}
	
	 public resize(_uWidth:number, _uHeight:number):void
	{
		super.resize(_uWidth, _uHeight);
		m_recPath.x-=15;
		m_spHandle.x=m_recPath.x;
		m_spLine.x = m_recPath.x+0.5;
	}
}