module lobby.view.gameRecord.sub {
	export class SubBetList extends BSprite{
		public txtListNumber	;		//訂單號
		public txtBetTime		;		//下注時間
		public txtGameType		;		//遊戲類型
		public txtTableID		;		//桌號
		public txtResult		;		//結果
		public txtTotalBet		;		//總投注
		public txtPayOut		;		//派彩
		public txtAvailableBet	;		//有效投注
		public txtState			;		//狀態
		public mcAsset			;
		
		public bIsUsed			:	 boolean;
		public btnPlayVideo		:	ui.button.SingleButtonMC; //
		public complexGameRecordStruct	: model.struct.ComplexGameRecordStruct;	//單筆 下注紀錄資料
		public fMouseOver		:	Function;
		public fMouseOut		:	Function;
		public fClick			:	Function;
		
		
		public constructor() {
			super();

			var _mc = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Single_BetData");
			this.addChild(_mc);
			
			this.mcAsset = _mc;
			this.txtListNumber = this.mcAsset.tf_0;
			this.txtBetTime = this.mcAsset.tf_1;
			this.txtGameType = this.mcAsset.tf_2;
			this.txtTableID = this.mcAsset.tf_3;
			this.txtResult = this.mcAsset.tf_4;
			this.txtTotalBet = this.mcAsset.tf_5;
			this.txtPayOut = this.mcAsset.tf_6;
			this.txtAvailableBet = this.mcAsset.tf_7;
			this.txtState = this.mcAsset.tf_8;	
			this.btnPlayVideo = new ui.button.SingleButtonMC( this.mcAsset.mc_playVideo , this.showVideoPlayPannel );
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP , this.showResultPlayPannel, this );
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER , this.mouseHandler, this );
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT , this.mouseHandler, this  );
		}
		
		protected showResultPlayPannel(event:MouseEvent):void{
			manager.GameRecordManager.getInstance().showBetResultPannel(this.complexGameRecordStruct);
			this.fClick(this);
			event.stopImmediatePropagation();
		}
		
		private mouseHandler(event:egret.Event ):void {
			if( event.type == mouse.MouseEvent.MOUSE_OVER ){
				if( this.fMouseOver != null ){
					this.fMouseOver(event);
				}
			}else if( event.type == mouse.MouseEvent.MOUSE_OUT ){
				if( this.fMouseOut != null ){
					this.fMouseOut(event);
				}	
			}
		}
		
		protected showResultUI(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			
		}
		
		private showVideoPlayPannel(event:MouseEvent):void{
			manager.GameRecordManager.getInstance().showVideoPlayPannel(this.complexGameRecordStruct);
			this.fClick(this);
			event.stopImmediatePropagation();
		}
		
		public updateUI(_sListNumber:string , _sBetTime:string , _sGameType:string ,
								 _sTableID:string , _sResult:string , _sTotalBet:string , _sPayOut:string ,
								 _sAvailableBet:string, _sState:string, _isResult: boolean  ):void {
			if( !this.txtListNumber ){
				return;
			}
			
			this.txtListNumber.text = _sListNumber;
			this.txtBetTime.text = _sBetTime;
			this.txtGameType.text = _sGameType;
			this.txtTableID.text = _sTableID;
			this.txtResult.text = _isResult?_sResult:_sState;
			this.txtTotalBet.text = _sTotalBet;
			this.txtPayOut.text = _sPayOut;
			this.txtAvailableBet.text = _sAvailableBet;
			this.txtState.text = _sState;
			
			this.btnPlayVideo.visible = _isResult;
		}
		
		 public destroy():void {
			if( this.txtListNumber ){
				this.txtListNumber = null;
			}
			if( this.txtBetTime ){
				this.txtBetTime = null;
			}	
			
			if( this.txtGameType ){
				this.txtGameType = null;
			}
			if( this.txtTableID ){
				this.txtTableID = null;
			}
			if( this.txtResult ){
				this.txtResult = null;
			}
			if( this.txtTotalBet ){
				this.txtTotalBet = null;
			}
			
			if( this.txtPayOut ){
				this.txtPayOut = null;
			}
			
			if( this.txtAvailableBet ){
				this.txtAvailableBet = null;
			}
			if( this.txtState ){
				this.txtState = null;
			}
			if( this.btnPlayVideo ){
				this.btnPlayVideo.destroy();
				this.btnPlayVideo = null;
			}
		}
		
		public reset():void {
			this.txtListNumber.text = "";
			this.txtBetTime.text = "";
			this.txtGameType.text = "";
			this.txtTableID.text = "";
			this.txtResult.text = "";
			this.txtTotalBet.text = "";
			this.txtPayOut.text = "";
			this.txtAvailableBet.text = "";
			this.txtState.text = "";
		}
		
		
	}
}