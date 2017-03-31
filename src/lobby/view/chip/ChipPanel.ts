module lobby.view.chip {
	export class ChipPanel extends panel.PanelPage{
		protected m_mcAsset				;					//美术资源
		
		protected m_btnLeft				:	ui.button.SingleButtonMC;				//翻页按钮
		protected m_btnRight			:	ui.button.SingleButtonMC;				//翻页按钮
		public btnReBet					:	ui.button.SingleButtonMC;				//重复下注
//		protected this.btnReBet_cn			:	ui.button.SingleButtonMC;				//
//		protected this.btnReBet_tw			:	ui.button.SingleButtonMC;				//
//		protected this.btnReBet_en			:	ui.button.SingleButtonMC;				//
		public btnSetting				:	ui.button.SingleButtonMC;				//自订筹码
		protected m_btnRecharge			:	ui.button.SingleButtonMC;				//充值按钮
		
		protected m_pageNumberList		:	other.PageNumberListChip;			//页码列表
		
		protected m_spChipList			;						//列表容器
		//protected m_bmpGold				:	Bitmap;
		protected goldNum:JNumber;
		
		protected m_iCurrentPage		:	number;						//当前页面
		protected m_iTotalPage			:	number;						//页面数量
		protected m_uWidth				:	number;						//筹码宽度
		
		protected m_aChipValues			:	any[];						//筹码数值	临时数据
		protected m_vectorChipList		:	ChipList[];			//筹码列表
		
		protected m_mcWin				;					//收钱动画
		
		protected m_nValue				:	Number;
		
		
		get fReBet():Function
		{
			return this.m_fReBet;
		}

		set  fReBet(value:Function)
		{
			this.m_fReBet = value;
		}

		get currentChipItem():ChipItem
		{
			return this.m_currentChipItem;
		}

		set  currentChipItem(value:ChipItem)
		{
			this.m_currentChipItem = value;
			
			if (manager.LobbyManager.getInstance().lobbyView){
				
				if(this.m_currentChipItem==null){
					this.m_currentChipItem = this.getDefault();
				}
				
				if(Player.getInstance().nCoin<this.m_currentChipItem.uValue){
					this.showHint();
				}else{
					this.hideHint();
				}
				
				manager.LobbyManager.getInstance().lobbyView.mouseFollow.bitmapdata = manager.BitmapManager.getInstance().getBmpdGameChip(this.m_currentChipItem.uValue);
			}
		}

		protected m_fReBet				:	Function;					//回调函数
		
		protected m_currentChipItem		:	ChipItem;					//当前筹码
		
		public constructor(_mcAsset=null) {
			super();

			this.m_mcWin = _mcAsset.mc_win;
			this.m_mcWin.addFrameScript(24,function():void{
				this.m_mcWin.gotoAndStop(25);
				this.m_mcWin.visible = false;
			});
			this.m_mcWin.gotoAndStop(1);
			this.m_mcWin.visible = false;
		}
		
		 public destroy():void{
			
			if(this.m_btnLeft){
				this.m_btnLeft.destroy();
				this.m_btnLeft = null;
			}
			if(this.m_btnRight){
				this.m_btnRight.destroy();
				this.m_btnRight = null;
			}
			if(this.btnReBet){
				this.btnReBet.destroy();
				this.btnReBet = null;
			}
			if(this.btnSetting){
				this.btnSetting.destroy();
				this.btnSetting = null;
			}
			if(this.m_btnRecharge){
				this.m_btnRecharge.destroy();
				this.m_btnRecharge = null;
			}
			
			if(this.m_pageNumberList){
				this.m_pageNumberList.destroy();
				this.m_pageNumberList = null;
			}
			
			if(this.m_spChipList){
				if(this.m_spChipList.parent){
					this.m_spChipList.parent.removeChild(this.m_spChipList);
				}
				this.m_spChipList = null;
			}
			if(this.goldNum)
			{
				this.goldNum.dispose();
				this.goldNum = null;
			}
			if(this.m_aChipValues){
				this.m_aChipValues = null;
			}
			if(this.m_vectorChipList){
				var _len : number = this.m_vectorChipList.length;
				var list : ChipList;
				for (var i:number= 0; i < _len; i++) 
				{
					list = this.m_vectorChipList.pop();
					if(list){
						if(list.parent){
							list.parent.removeChild(list);
						}
						list.destroy();
					}
				}
				if(list){
					list = null;
				}
				this.m_vectorChipList = null;
			}
			
			
			if(this.m_mcAsset){
				if(this.m_mcAsset.parent){
					this.m_mcAsset.parent.removeChild(this.m_mcAsset);
				}
				this.m_mcAsset = null;
			}
		}
		
		public getChip(uValue:number):ChipItem{
			if(this.m_vectorChipList){
				var _len : number;
				var _page : number = this.m_vectorChipList.length-1;
				for (var i:number= 0; i < _page; i++) 
				{
					_len = this.m_vectorChipList[i].aChipItems.length;
					for (var j:number= 0; j < _len; j++) 
					{
						if((this.m_vectorChipList[i].aChipItems[j] as ChipItem).uValue == uValue){
							return this.m_vectorChipList[i].aChipItems[j] as ChipItem;
						}
					}
				}
			}
			
			return null;
		}
		
		//设置相关筹码的选中状态
		public setChipSelect(uValue:number):void{
			if(this.m_vectorChipList){
				var _len : number;
				var _page : number = this.m_vectorChipList.length;
				for (var i:number= 0; i < _page; i++) 
				{
					_len = this.m_vectorChipList[i].aChipItems.length;
					for (var j:number= 0; j < _len; j++) 
					{
						if((this.m_vectorChipList[i].aChipItems[j] as ChipItem).uValue == uValue){
							(this.m_vectorChipList[i].aChipItems[j] as ChipItem).selectStatus(true);
						}
					}
				}
			}
		}
		
		get iCurrentPage():number
		{
			return this.m_iCurrentPage;
		}
		
		 set  iCurrentPage(value:number)
		{
			this.m_iCurrentPage = value;
			if(this.m_iCurrentPage<0){
				this.m_iCurrentPage = 0;
			}
			if(this.m_iCurrentPage>this.m_iTotalPage){
				this.m_iCurrentPage = this.m_iTotalPage;
			}
			this.m_pageNumberList.setCurrentPageNumberByIndex(this.m_iCurrentPage);
			this.judgeArrow();
			this.turning();
		}
		
		public turning():void{
			TweenLite.to(this.m_spChipList, define.Define.SPEED, {x:-this.m_iCurrentPage*600});
//			TweenUtil.moveToX(this.m_spChipList,50,50,10,-m_iCurrentPage*600,0.7);
		}
		
		public judgeArrow():void{
			if(this.m_iCurrentPage >= (this.m_iTotalPage-1)){
				this.m_btnRight.enabled = false;
				this.m_btnLeft.enabled = true;
			}else if(this.m_iCurrentPage == 0){
				this.m_btnLeft.enabled = false;
				this.m_btnRight.enabled = true;
			}else{
				this.m_btnRight.enabled = true;
				this.m_btnLeft.enabled = true;
			}
		}
		
		
		public updateGold():void{
			if(this.m_nValue != Player.getInstance().nCoin)
			{
				if(Player.getInstance().nCoin>this.m_nValue)
				{
					if(this.goldNum!=null)this.goldNum.addjust(Player.getInstance().nCoin,30,1800);
				}else
				{
					this.goldNum.number = Player.getInstance().nCoin;
				}
				this.m_nValue = Player.getInstance().nCoin;
			}
		}
		
		public addCustomChip( _uIndex:number, _uValue:number):void{
			if(_uIndex>=0 && _uIndex<5){
				this.m_aChipValues[3][_uIndex] = _uValue;
				this.m_vectorChipList[3].addChip(_uIndex,_uValue);
				
			}else{
				console.log("添加非法自订筹码...");
			}
		}
		public clearCustomChip():void{
			if(this.m_vectorChipList==null){
				console.log(this,"筹码面板清空异常...");
			}
			this.m_vectorChipList[3].clearChip();
		}
		public removeCustomChip(_uIndex:number):void{
			if(_uIndex>=0 && _uIndex<5){
				this.m_vectorChipList[3].removeChip(_uIndex);
			}else{
				console.log("删除不存在的筹码...");
			}
		}
		
		/** 自选页面 **/
		public goCustomPage():void{
			iCurrentPage = m_iTotalPage-1;
		}
		
		/** 自选筹码 **/
		public getCustom():any[]{
			return this.m_aChipValues[3];
		}
		
		public getDefault():ChipItem{
			return null;
		}
		
		public showHint():void{
			if(this.m_mcAsset && this.m_mcAsset.mc_hint){
				(this.m_mcAsset.mc_hint).visible = true;
			}
		}
		
		public hideHint():void{
			if(this.m_mcAsset && this.m_mcAsset.mc_hint){
				(this.m_mcAsset.mc_hint).visible = false;
			}
		}
		
		public unselect():void{
			if(this.m_vectorChipList){
				var _chipLen : number;
				var _listLen : number = this.m_vectorChipList.length;
				for (var i:number= 0; i < _listLen; i++) 
				{
					if(this.m_vectorChipList[i]){
						this.m_vectorChipList[i].unselect();
					}
				}
				
			}
		}
		
		public win():void{
			if(this.m_mcWin && manager.LobbyManager.getInstance().uRenderMode==0){
				this.m_mcWin.visible = true;
				this.m_mcWin.gotoAndPlay(1);
			}
		}
		
	}
}