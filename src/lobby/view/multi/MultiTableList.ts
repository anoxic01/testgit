module lobby.view.multi {
	export class MultiTableList extends PanelPage{
		public static const COUNT		:	uint	=	16;							//桌子数量
		
		private var m_vecList			:	Vector.<MultiTableItem>;				//桌子数组
		private var m_vecSpList			:	Vector.<Sprite>;						//分页列表
		private var m_iTotalPage		:	int;									//分页数量
		private var m_iCurrentPage		:	int;									//当前页数
//		private var m_iCurrentIndex		:	int;									//当前序号
		private var m_uMode				:	uint;									//多桌模式
		private var m_spCurrentPage		:	Sprite;									//当前页面
		private var m_spContent			:	Sprite;									//桌子容器
		
		private var m_pageNumberList	:	PageNumberListMultitable;				//页码列表
		private var m_pageNumX			:	int;
		public var bCheckDetection	:	Boolean = false;			//检测 高低配置切换
		public function get currentPage():int{
			return m_iCurrentPage;
		}
		
		public constructor(_uMode:uint) {
			var date : Number = getTimer();
			super();
			m_uMode = _uMode;
			
			m_spContent = new Sprite();
			this.addChild(m_spContent);
			
			m_iTotalPage = Math.ceil(COUNT/m_uMode);
			
			m_vecSpList = new Vector.<Sprite>;
			var _sp	:	Sprite;
			m_vecList = new Vector.<MultiTableItem>;
			var _item : MultiTableItem;
			var _index : int;
			for (var j:int = 0; j < m_iTotalPage; j++) 
			{
				_sp = new Sprite();
				m_spContent.addChild(_sp);
				_sp.x = j*1908;
				_sp.visible = false;
				m_vecSpList.push(_sp);
			
				for (var i:int = 0; i < m_uMode; i++) 
				{
					_item = new MultiTableItem(m_uMode, this, j);
					_item.index=i;
					_sp.addChild(_item);
//					_item.cacheAsBitmap = true;   会造成发牌闲家牌可能看不到
//					m_spCurrentPage.addChild(_item);
					m_vecList.push(_item);
					
					
					switch(m_uMode){
						case Define.MULTI_TABLE_MODE_4:
							_item.x = -10;
							_item.y = 250 * i;
							break;
						
						case Define.MULTI_TABLE_MODE_8:
							_item.x = 803 * (i%2);
							_item.y = 252 * int(i/2);
							break;
						
						case Define.MULTI_TABLE_MODE_16:
							_index = (i%4);
							if(_index > 1){
								_item.x = 399.5 * _index - 5;
							}else{
								_item.x = 400 * _index - 5;
							}
							_item.y = 252 * int(i/4);
							break;
					}
				}
			}
			if(_sp){
				_sp = null;
			}
			if(_item){
				_item = null;
			}
			
			m_spCurrentPage = m_vecSpList[0];
			m_spCurrentPage.visible = true;
			
			m_pageNumberList = new PageNumberListMultitable(this, m_iTotalPage);
			this.addChild(m_pageNumberList);
			m_pageNumberList.x = int(1600-m_pageNumberList.width);
			m_pageNumberList.y = -45;
			m_pageNumberList.mouseChildren=false;
			trace("多桌列表初始化需要时间: ",getTimer()-date,"**************");
			TweenLite.delayedCall(1,setData);
			//setData();
		}
		override public function destroy():void{
			TweenLite.killDelayedCallsTo(setData);
			if(m_vecList){
				var item : MultiTableItem;
				var _len :int = m_vecList.length;
				for (var i:int = 0; i < _len; i++) 
				{
					item = m_vecList.pop() as MultiTableItem;
					if(item.parent){
						item.parent.removeChild(item);
					}
					item.destroy();
				}
				if(item){
					item = null;
				}
				
				m_vecList = null;
			}
			
			if(m_spCurrentPage){
				if(m_spCurrentPage.parent){
					m_spCurrentPage.parent.removeChild(m_spCurrentPage);
				}
				m_spCurrentPage = null;
			}
			
			if(m_pageNumberList){
				this.removeChild(m_pageNumberList);
				m_pageNumberList.destroy();
				m_pageNumberList = null;
			}
			
			if(m_spContent){
				TweenLite.killTweensOf(m_spContent);
				this.removeChild(m_spContent);
				m_spContent = null;
			}
		}
		
		override public function set iCurrentPage(_iPage:int):void{
			
//			if(!bTurn()){
//				return;
//			}
			
			hide();
			
			m_iCurrentPage = _iPage;
			if(m_iCurrentPage<0){
				m_iCurrentPage = 0;
			}
			if(m_iCurrentPage>m_iTotalPage){
				m_iCurrentPage = m_iTotalPage;
			}
			
			m_pageNumberList.setCurrentPageNumberByIndex(m_iCurrentPage);
			
			turning();
			SoundManager.getInstance().play(SoundPackage.sChangePage);
		}
		
		public function setData():void{
			LobbyData.getInstance().resetGoodRoadTemp();
			var _goodRoadStruct : GoodRoadStruct = LobbyData.getInstance().getGoodRoadByIndex(m_iCurrentPage*m_uMode) as GoodRoadStruct;
			if(_goodRoadStruct){
				setMultitableItemStruct(_goodRoadStruct);
			}
			if(m_pageNumberList){
				m_pageNumberList.mouseChildren=true;
			}
			
			if(bCheckDetection==false){
				LobbyManager.getInstance().startDetection(6);
				bCheckDetection=true;
			}
			
		}
		
		public function setMultitableItemStruct(_goodRoadStruct:GoodRoadStruct):void{
			
			var _item : MultiTableItem = getEmptyMultitableItem();
			if(_item){
				_item.setData(_goodRoadStruct);
			}else{
				trace("多桌页面 >> setMultitableItemStruct() 没有空桌");
			}
			
		}
		
		
		public function turning():void{
			m_vecSpList[m_iCurrentPage].visible = true;
			m_pageNumberList.mouseChildren=false;
			
			
			var _len : int = m_vecList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecList[i].gameApp){
					m_vecList[i].gameApp.setCacheBitmap(false);
				}
				
			}
			
			
			if(m_uMode==Define.MULTI_TABLE_MODE_8){
				LobbyManager.getInstance().clearMultiTableLive();
				clearLive();
			}
			LobbyManager.getInstance().multiTableView.setBg(0);
			TweenLite.to(m_spContent, Define.SPEED,{x:-m_iCurrentPage*1908, onComplete:function():void{
				trace("==============翻页===================="+m_iCurrentPage)
				if(m_spCurrentPage){
					m_spCurrentPage.visible = false;
				}
				m_spCurrentPage = m_vecSpList[m_iCurrentPage];
				if(m_spCurrentPage){
					m_spCurrentPage.visible = true;
				}
				//开启视频
				if(m_uMode==Define.MULTI_TABLE_MODE_4){
					PlayAllVideo();
				}
				LobbyManager.getInstance().multiTableView.setBg(m_uMode);
				//设置好路
				setData();
				for (var i:int = 0; i < _len; i++) 
				{
					if(m_vecList[i].gameApp){
						m_vecList[i].gameApp.setCacheBitmap(true);
					}
					
				}
			}});
			
		}
		
//		public function show():void{
//			if(m_spCurrentPage){
//				//开启视讯
//				var item : MultiTableItem;
//				for (var i:int = 0; i < m_spCurrentPage.numChildren; i++) 
//				{
//					item = m_spCurrentPage.getChildAt(i) as MultiTableItem;
//					item.gameApp.playVideo();
//				}
//				if(item){
//					item = null;
//				}
//				
//				m_spContent.addChild(m_spCurrentPage);
//				
//			}
//		}
		
		public function hide():void{
			if(m_spCurrentPage){
				//关闭视讯
				var item : MultiTableItem;
				for (var i:int = 0; i < m_spCurrentPage.numChildren; i++) 
				{
					item = m_spCurrentPage.getChildAt(i) as MultiTableItem;
					item.gameApp.stopVideo();
				}
				if(item){
					item = null;
				}
				
				m_spCurrentPage.visible = false;
			}
			
		}
		public function updateVideoData(aData:Array):void{
			if(m_spCurrentPage){
				var item : MultiTableItem;
				for (var i:int = 0; i < m_spCurrentPage.numChildren; i++) 
				{
					item = m_spCurrentPage.getChildAt(i) as MultiTableItem;
					if(item && item.gameApp){
						item.gameApp.setDefCDN(aData);
					}
				}
				if(item){
					item = null;
				}
				
			}
		}
		
		public function PlayAllVideo():void{
			if(m_spCurrentPage){
				//关闭视讯
				var item : MultiTableItem;
				for (var i:int = 0; i < m_spCurrentPage.numChildren; i++) 
				{
					item = m_spCurrentPage.getChildAt(i) as MultiTableItem;
					if(item && item.gameApp){
						item.gameApp.playVideo();
					}
				}
				if(item){
					item = null;
				}
				
			}
		}
		
		/** 添加好路 **/
		public function addGoodRoadStruct( _goodRoadMapStruct:GoodRoadStruct ):void{
			if(m_spCurrentPage){
				var item : MultiTableItem;
				for (var i:int = 0; i < m_spCurrentPage.numChildren; i++) 
				{
					item = m_spCurrentPage.getChildAt(i) as MultiTableItem;
					if(item.isEmptyTable()){
						item.setDataOnAddGoodRoad(_goodRoadMapStruct);
						return;
					}
				}
			}
		}
		/** 移除好路 **/
		public function removeGoodRoadStruct(_tableID:int):void{
			if(m_spCurrentPage){
				var _item : MultiTableItem = getTableItemByTableID(_tableID);
				if(_item){
					_item.setDataOnAddGoodRoad(null);
				}
			}
		}
		override public function onChangeLanguage():void{
			var _len : int = m_vecList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecList[i]){
					m_vecList[i].onChangeLanguage();
				}
			}
		}
		
		public function getTableItemByTableID(_iTableID:int):MultiTableItem{
			if(m_vecList){
				var _len : int = m_vecList.length;
				for (var i:int = 0; i < _len; i++) 
				{
					if(m_vecList[i].goodRoadStruct && m_vecList[i].goodRoadStruct.TableID == _iTableID){
						return m_vecList[i];
					}
				}
			}
			
			return null;
		}
		
		public function clearLive():void{
			var _len : int = m_vecList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecList[i].gameApp){
					m_vecList[i].gameApp.stopVideo();
				}
				
			}
		}
		
		public function clearTableList():void{
			var _len : int = m_vecList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				m_vecList[i].clearTable();
			}
		}
		
		public function bTurn():Boolean{
			var _len : int = m_vecList.length;
			var bStatus : Boolean;
			for (var i:int = 0; i < _len; i++) 
			{
				bStatus = m_vecList[i].gameApp.bCanExit;
				if(bStatus == false){
					LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sBet_Wait));
					return false;
				}
			}
			return true;
		}
		
		private function getEmptyMultitableItem():MultiTableItem{
			if(m_vecList==null){
				return null;
			}
			var _len : int = m_vecList.length;
			var _item : MultiTableItem;
			var _bStatus : Boolean;		//是否存在于好路类型列表中
			for (var i:int = m_iCurrentPage*m_uMode; i < _len; i++) 
			{
				if(i<m_iCurrentPage*m_uMode+m_uMode){
					if(m_vecList[i].isEmptyTable()){
						_item =  m_vecList[i];
						break;
					}
//					else{
//						if(m_vecList[i].goodRoadStruct && m_vecList[i].goodRoadStruct.MatchList){
//							_bStatus = false;
//							for (var j:int = 0; j < m_vecList[i].goodRoadStruct.MatchList.length; j++) 
//							{
//								if(LobbyData.getInstance().judgeGoodRoadType(m_vecList[i].goodRoadStruct.MatchList[j])){
//									break;
//								}else{
//									if(!_item){
//										_item =  m_vecList[i];
//									}
//									_bStatus = true;
//									break;
//								}
//							}
//							if(_bStatus){
//								m_vecList[i].setDataOnAddGoodRoad(null);
//							}
//						}else{
//							//翻页，不是空桌时，开启视讯
//							if(m_uMode==Define.MULTI_TABLE_MODE_4){
//								m_vecList[i].gameApp.playVideo();
//							}
//						}
//					}
					
				}else{
					break;
				}
				
			}
			return _item;
		}
		
		
	}
}