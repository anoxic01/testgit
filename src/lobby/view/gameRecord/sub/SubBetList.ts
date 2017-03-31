module lobby.view.gameRecord.sub {
	export class SubBetList extends BSprite{
		public var txtListNumber	:	TextField;		//訂單號
		public var txtBetTime		:	TextField;		//下注時間
		public var txtGameType		:	TextField;		//遊戲類型
		public var txtTableID		:	TextField;		//桌號
		public var txtResult		:	TextField;		//結果
		public var txtTotalBet		:	TextField;		//總投注
		public var txtPayOut		:	TextField;		//派彩
		public var txtAvailableBet	:	TextField;		//有效投注
		public var txtState			:	TextField;		//狀態
		public var mcAsset			:	MovieClip;
		
		public var bIsUsed			:	 boolean;
		public var btnPlayVideo		:	ui.button.SingleButtonMC; //
		public var complexGameRecordStruct: ComplexGameRecordStruct;	//單筆 下注紀錄資料
		public var fMouseOver		:	Function;
		public var fMouseOut		:	Function;
		public var fClick			:	Function;
		
		
		public constructor() {
			var _mc:* = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Single_BetData");
			addChild(_mc);
			
			mcAsset = _mc;
			txtListNumber = mcAsset.tf_0;
			txtBetTime = mcAsset.tf_1;
			txtGameType = mcAsset.tf_2;
			txtTableID = mcAsset.tf_3;
			txtResult = mcAsset.tf_4;
			txtTotalBet = mcAsset.tf_5;
			txtPayOut = mcAsset.tf_6;
			txtAvailableBet = mcAsset.tf_7;
			txtState = mcAsset.tf_8;	
			btnPlayVideo = new ui.button.SingleButtonMC( mcAsset.mc_playVideo , showVideoPlayPannel );
			this.buttonMode = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP , showResultPlayPannel );
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER , mouseHandler );
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT , mouseHandler  );
		}
		
		protected function showResultPlayPannel(event:MouseEvent):void{
			GameRecordManager.getInstance().showBetResultPannel(complexGameRecordStruct);
			fClick(this);
			event.stopImmediatePropagation();
		}
		
		private function mouseHandler(event:MouseEvent ):void {
			if( event.type == MouseEvent.MOUSE_OVER ){
				if( fMouseOver != null ){
					fMouseOver(event);
				}
			}else if( event.type == MouseEvent.MOUSE_OUT ){
				if( fMouseOut != null ){
					fMouseOut(event);
				}	
			}
		}
		
		protected function showResultUI(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			
		}
		
		private function showVideoPlayPannel(event:MouseEvent):void{
			GameRecordManager.getInstance().showVideoPlayPannel(complexGameRecordStruct);
			fClick(this);
			event.stopImmediatePropagation();
		}
		
		public function updateUI(_sListNumber:string , _sBetTime:string , _sGameType:string ,
								 _sTableID:string , _sResult:string , _sTotalBet:string , _sPayOut:string ,
								 _sAvailableBet:string, _sState:string, _isResult: boolean  ):void {
			if( !txtListNumber ){
				return;
			}
			
			txtListNumber.text = _sListNumber;
			txtBetTime.text = _sBetTime;
			txtGameType.text = _sGameType;
			txtTableID.text = _sTableID;
			txtResult.text = _isResult?_sResult:_sState;
			txtTotalBet.text = _sTotalBet;
			txtPayOut.text = _sPayOut;
			txtAvailableBet.text = _sAvailableBet;
			txtState.text = _sState;
			
			btnPlayVideo.visible = _isResult;
		}
		
		 public function destroy():void {
			if( txtListNumber ){
				txtListNumber = null;
			}
			if( txtBetTime ){
				txtBetTime = null;
			}	
			
			if( txtGameType ){
				txtGameType = null;
			}
			if( txtTableID ){
				txtTableID = null;
			}
			if( txtResult ){
				txtResult = null;
			}
			if( txtTotalBet ){
				txtTotalBet = null;
			}
			
			if( txtPayOut ){
				txtPayOut = null;
			}
			
			if( txtAvailableBet ){
				txtAvailableBet = null;
			}
			if( txtState ){
				txtState = null;
			}
			if( btnPlayVideo ){
				btnPlayVideo.destroy();
				btnPlayVideo = null;
			}
		}
		
		public function reset():void {
			txtListNumber.text = "";
			txtBetTime.text = "";
			txtGameType.text = "";
			txtTableID.text = "";
			txtResult.text = "";
			txtTotalBet.text = "";
			txtPayOut.text = "";
			txtAvailableBet.text = "";
			txtState.text = "";
		}
		
		
	}
}