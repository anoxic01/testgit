module lobby.view.chip {
	export class ChipPanel extends PanelPage{
		protected var m_mcAsset				:	MovieClip;					//美术资源
		
		protected var m_btnLeft				:	SingleButtonMC;				//翻页按钮
		protected var m_btnRight			:	SingleButtonMC;				//翻页按钮
		public var btnReBet					:	SingleButtonMC;				//重复下注
//		protected var btnReBet_cn			:	SingleButtonMC;				//
//		protected var btnReBet_tw			:	SingleButtonMC;				//
//		protected var btnReBet_en			:	SingleButtonMC;				//
		public var btnSetting				:	SingleButtonMC;				//自订筹码
		protected var m_btnRecharge			:	SingleButtonMC;				//充值按钮
		
		protected var m_pageNumberList		:	PageNumberListChip;			//页码列表
		
		protected var m_spChipList			:	Sprite;						//列表容器
		//protected var m_bmpGold				:	Bitmap;
		protected var goldNum:JNumber;
		
		protected var m_iCurrentPage		:	int;						//当前页面
		protected var m_iTotalPage			:	int;						//页面数量
		protected var m_uWidth				:	uint;						//筹码宽度
		
		protected var m_aChipValues			:	Array;						//筹码数值	临时数据
		protected var m_vectorChipList		:	Vector.<ChipList>;			//筹码列表
		
		protected var m_mcWin				:	MovieClip;					//收钱动画
		
		protected var m_nValue				:	Number;
		
		
		public function get fReBet():Function
		{
			return m_fReBet;
		}

		public function set fReBet(value:Function):void
		{
			m_fReBet = value;
		}

		public function get currentChipItem():ChipItem
		{
			return m_currentChipItem;
		}

		public function set currentChipItem(value:ChipItem):void
		{
			m_currentChipItem = value;
			
			if (LobbyManager.getInstance().lobbyView){
				
				if(m_currentChipItem==null){
					m_currentChipItem = getDefault();
				}
				
				if(Player.getInstance().nCoin<m_currentChipItem.uValue){
					showHint();
				}else{
					hideHint();
				}
				
				LobbyManager.getInstance().lobbyView.mouseFollow.bitmapdata = BitmapManager.getInstance().getBmpdGameChip(m_currentChipItem.uValue);
			}
		}

		protected var m_fReBet				:	Function;					//回调函数
		
		protected var m_currentChipItem		:	ChipItem;					//当前筹码
		
		public constructor(_mcAsset:MovieClip=null) {
			m_mcWin = _mcAsset.mc_win;
			m_mcWin.addFrameScript(24,function():void{
				m_mcWin.gotoAndStop(25);
				m_mcWin.visible = false;
			});
			m_mcWin.gotoAndStop(1);
			m_mcWin.visible = false;
			super();
		}
		
		override public function destroy():void{
			
			if(m_btnLeft){
				m_btnLeft.destroy();
				m_btnLeft = null;
			}
			if(m_btnRight){
				m_btnRight.destroy();
				m_btnRight = null;
			}
			if(btnReBet){
				btnReBet.destroy();
				btnReBet = null;
			}
			if(btnSetting){
				btnSetting.destroy();
				btnSetting = null;
			}
			if(m_btnRecharge){
				m_btnRecharge.destroy();
				m_btnRecharge = null;
			}
			
			if(m_pageNumberList){
				m_pageNumberList.destroy();
				m_pageNumberList = null;
			}
			
			if(m_spChipList){
				if(m_spChipList.parent){
					m_spChipList.parent.removeChild(m_spChipList);
				}
				m_spChipList = null;
			}
			if(goldNum)
			{
				goldNum.dispose();
				goldNum = null;
			}
			if(m_aChipValues){
				m_aChipValues = null;
			}
			if(m_vectorChipList){
				var _len : int = m_vectorChipList.length;
				var list : ChipList;
				for (var i:int = 0; i < _len; i++) 
				{
					list = m_vectorChipList.pop();
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
				m_vectorChipList = null;
			}
			
			
			if(m_mcAsset){
				if(m_mcAsset.parent){
					m_mcAsset.parent.removeChild(m_mcAsset);
				}
				m_mcAsset = null;
			}
		}
		
		public function getChip(uValue:uint):ChipItem{
			if(m_vectorChipList){
				var _len : int;
				var _page : int = m_vectorChipList.length-1;
				for (var i:int = 0; i < _page; i++) 
				{
					_len = m_vectorChipList[i].aChipItems.length;
					for (var j:int = 0; j < _len; j++) 
					{
						if((m_vectorChipList[i].aChipItems[j] as ChipItem).uValue == uValue){
							return m_vectorChipList[i].aChipItems[j] as ChipItem;
						}
					}
				}
			}
			
			return null;
		}
		
		//设置相关筹码的选中状态
		public function setChipSelect(uValue:uint):void{
			if(m_vectorChipList){
				var _len : int;
				var _page : int = m_vectorChipList.length;
				for (var i:int = 0; i < _page; i++) 
				{
					_len = m_vectorChipList[i].aChipItems.length;
					for (var j:int = 0; j < _len; j++) 
					{
						if((m_vectorChipList[i].aChipItems[j] as ChipItem).uValue == uValue){
							(m_vectorChipList[i].aChipItems[j] as ChipItem).selectStatus(true);
						}
					}
				}
			}
		}
		
		public function get iCurrentPage():int
		{
			return m_iCurrentPage;
		}
		
		override public function set iCurrentPage(value:int):void
		{
			m_iCurrentPage = value;
			if(m_iCurrentPage<0){
				m_iCurrentPage = 0;
			}
			if(m_iCurrentPage>m_iTotalPage){
				m_iCurrentPage = m_iTotalPage;
			}
			m_pageNumberList.setCurrentPageNumberByIndex(m_iCurrentPage);
			judgeArrow();
			turning();
		}
		
		public function turning():void{
			TweenLite.to(m_spChipList, Define.SPEED, {x:-m_iCurrentPage*600});
//			TweenUtil.moveToX(m_spChipList,50,50,10,-m_iCurrentPage*600,0.7);
		}
		
		public function judgeArrow():void{
			if(m_iCurrentPage >= (m_iTotalPage-1)){
				m_btnRight.enabled = false;
				m_btnLeft.enabled = true;
			}else if(m_iCurrentPage == 0){
				m_btnLeft.enabled = false;
				m_btnRight.enabled = true;
			}else{
				m_btnRight.enabled = true;
				m_btnLeft.enabled = true;
			}
		}
		
		
		public function updateGold():void{
			if(m_nValue != Player.getInstance().nCoin)
			{
				if(Player.getInstance().nCoin>m_nValue)
				{
					if(goldNum!=null)goldNum.addjust(Player.getInstance().nCoin,30,1800);
				}else
				{
					goldNum.number = Player.getInstance().nCoin;
				}
				m_nValue = Player.getInstance().nCoin;
			}
		}
		
		public function addCustomChip( _uIndex:uint, _uValue:uint):void{
			if(_uIndex>=0 && _uIndex<5){
				m_aChipValues[3][_uIndex] = _uValue;
				m_vectorChipList[3].addChip(_uIndex,_uValue);
				
			}else{
				trace("添加非法自订筹码...");
			}
		}
		public function clearCustomChip():void{
			if(m_vectorChipList==null){
				Log.getInstance().log(this,"筹码面板清空异常...");
			}
			m_vectorChipList[3].clearChip();
		}
		public function removeCustomChip(_uIndex:uint):void{
			if(_uIndex>=0 && _uIndex<5){
				m_vectorChipList[3].removeChip(_uIndex);
			}else{
				trace("删除不存在的筹码...");
			}
		}
		
		/** 自选页面 **/
		public function goCustomPage():void{
			iCurrentPage = m_iTotalPage-1;
		}
		
		/** 自选筹码 **/
		public function getCustom():Array{
			return m_aChipValues[3];
		}
		
		public function getDefault():ChipItem{
			return null;
		}
		
		public function showHint():void{
			if(m_mcAsset && m_mcAsset.mc_hint){
				(m_mcAsset.mc_hint as MovieClip).visible = true;
			}
		}
		
		public function hideHint():void{
			if(m_mcAsset && m_mcAsset.mc_hint){
				(m_mcAsset.mc_hint as MovieClip).visible = false;
			}
		}
		
		public function unselect():void{
			if(m_vectorChipList){
				var _chipLen : int;
				var _listLen : int = m_vectorChipList.length;
				for (var i:int = 0; i < _listLen; i++) 
				{
					if(m_vectorChipList[i]){
						m_vectorChipList[i].unselect();
					}
				}
				
			}
		}
		
		public function win():void{
			if(m_mcWin && LobbyManager.getInstance().uRenderMode==0){
				m_mcWin.visible = true;
				m_mcWin.gotoAndPlay(1);
			}
		}
		
	}
}