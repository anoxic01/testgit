module lobby.view.multi {
	export class MultiTableList extends panel.PanelPage{
		public static COUNT			:	number	=	16;							//桌子数量
		
		private m_vecList			:	MultiTableItem[];				//桌子数组
		private m_vecSpList			:	egret.Sprite[];						//分页列表
		private m_iTotalPage		:	number;									//分页数量
		private m_iCurrentPage		:	number;									//当前页数
//		private m_iCurrentIndex		:	number;									//当前序号
		private m_uMode				:	number;									//多桌模式
		private m_spCurrentPage		;									//当前页面
		private m_spContent			;									//桌子容器
		
		private m_pageNumberList	;				//页码列表
		private m_pageNumX			:	number;
		public bCheckDetection		:	boolean = false;			//检测 高低配置切换
		get currentPage():number{
			return this.m_iCurrentPage;
		}
		
		public constructor(_uMode:number) {
			super();

			var date = egret.getTimer();
			
			this.m_uMode = _uMode;
			
			this.m_spContent = new egret.Sprite();
			this.addChild(this.m_spContent);
			
			this.m_iTotalPage = Math.ceil(MultiTableList.COUNT/this.m_uMode);
			
			this.m_vecSpList = new Array<egret.Sprite>();
			var _sp;
			this.m_vecList = new Array<MultiTableItem>();
			var _item : MultiTableItem;
			var _index : number;
			for (var j:number= 0; j < this.m_iTotalPage; j++) 
			{
				_sp = new egret.Sprite();
				this.m_spContent.addChild(_sp);
				_sp.x = j*1908;
				_sp.visible = false;
				this.m_vecSpList.push(_sp);
			
				for (var i:number= 0; i < this.m_uMode; i++) 
				{
					_item = new MultiTableItem(this.m_uMode, this, j);
					_item.index=i;
					_sp.addChild(_item);
//					_item.cacheAsBitmap = true;   会造成发牌闲家牌可能看不到
//					this.m_spCurrentPage.addChild(_item);
					this.m_vecList.push(_item);
					
					
					switch(this.m_uMode){
						case define.Define.MULTI_TABLE_MODE_4:
							_item.x = -10;
							_item.y = 250 * i;
							break;
						
						case define.Define.MULTI_TABLE_MODE_8:
							_item.x = 803 * (i%2);
							_item.y = 252 * (i/2);
							break;
						
						case define.Define.MULTI_TABLE_MODE_16:
							_index = (i%4);
							if(_index > 1){
								_item.x = 399.5 * _index - 5;
							}else{
								_item.x = 400 * _index - 5;
							}
							_item.y = 252 * (i/4);
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
			
			this.m_spCurrentPage = this.m_vecSpList[0];
			this.m_spCurrentPage.visible = true;
			
			this.m_pageNumberList = new other.PageNumberListMultitable(this, this.m_iTotalPage);
			this.addChild(this.m_pageNumberList);
			this.m_pageNumberList.x = (1600-this.m_pageNumberList.width);
			this.m_pageNumberList.y = -45;
			this.m_pageNumberList.touchChildren=false;
			console.log("多桌列表初始化需要时间: ",egret.getTimer()-date,"**************");
			
			setTimeout(function() {
				this.setData();
			}, this, 1);
			//setData();
		}
		 public destroy():void{
			if(this.m_vecList){
				var item : MultiTableItem;
				var _len :number= this.m_vecList.length;
				for (var i:number= 0; i < _len; i++) 
				{
					item = this.m_vecList.pop() as MultiTableItem;
					if(item.parent){
						item.parent.removeChild(item);
					}
					item.destroy();
				}
				if(item){
					item = null;
				}
				
				this.m_vecList = null;
			}
			
			if(this.m_spCurrentPage){
				if(this.m_spCurrentPage.parent){
					this.m_spCurrentPage.parent.removeChild(this.m_spCurrentPage);
				}
				this.m_spCurrentPage = null;
			}
			
			if(this.m_pageNumberList){
				this.removeChild(this.m_pageNumberList);
				this.m_pageNumberList.destroy();
				this.m_pageNumberList = null;
			}
			
			if(this.m_spContent){
				this.removeChild(this.m_spContent);
				this.m_spContent = null;
			}
		}
		
		 set  iCurrentPage(_iPage:number){
			
//			if(!bTurn()){
//				return;
//			}
			
			this.hide();
			
			this.m_iCurrentPage = _iPage;
			if(this.m_iCurrentPage<0){
				this.m_iCurrentPage = 0;
			}
			if(this.m_iCurrentPage>this.m_iTotalPage){
				this.m_iCurrentPage = this.m_iTotalPage;
			}
			
			this.m_pageNumberList.setCurrentPageNumberByIndex(this.m_iCurrentPage);
			
			this.turning();
			manager.SoundManager.getInstance().play(sound.SoundPackage.sChangePage);
		}
		
		public setData():void{
			model.LobbyData.getInstance().resetGoodRoadTemp();
			var _goodRoadStruct  = model.LobbyData.getInstance().getGoodRoadByIndex(this.m_iCurrentPage*this.m_uMode);
			if(_goodRoadStruct){
				this.setMultitableItemStruct(_goodRoadStruct);
			}
			if(this.m_pageNumberList){
				this.m_pageNumberList.touchChildren=true;
			}
			
			if(this.bCheckDetection==false){
				manager.LobbyManager.getInstance().startDetection(6);
				this.bCheckDetection=true;
			}
			
		}
		
		public setMultitableItemStruct(_goodRoadStruct):void{
			
			var _item : MultiTableItem = this.getEmptyMultitableItem();
			if(_item){
				_item.setData(_goodRoadStruct);
			}else{
				console.log("多桌页面 >> setMultitableItemStruct() 没有空桌");
			}
			
		}
		
		
		public turning():void{
			this.m_vecSpList[this.m_iCurrentPage].visible = true;
			this.m_pageNumberList.touchChildren=false;
			
			
			var _len  = this.m_vecList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(this.m_vecList[i].gameApp){
					this.m_vecList[i].gameApp.setCacheBitmap(false);
				}
				
			}
			
			
			if(this.m_uMode==define.Define.MULTI_TABLE_MODE_8){
				manager.LobbyManager.getInstance().clearMultiTableLive();
				this.clearLive();
			}
			manager.LobbyManager.getInstance().multiTableView.setBg(0);
			egret.Tween.get(this.m_spContent).to({x:-this.m_iCurrentPage*1908}, define.Define.SPEED).call(function():void{
				console.log("==============翻页===================="+this.m_iCurrentPage)
				if(this.m_spCurrentPage){
					this.m_spCurrentPage.visible = false;
				}
				this.m_spCurrentPage = this.m_vecSpList[this.m_iCurrentPage];
				if(this.m_spCurrentPage){
					this.m_spCurrentPage.visible = true;
				}
				//开启视频
				if(this.m_uMode==define.Define.MULTI_TABLE_MODE_4){
					this.PlayAllVideo();
				}
				manager.LobbyManager.getInstance().multiTableView.setBg(this.m_uMode);
				//设置好路
				this.setData();
				for (var i:number= 0; i < _len; i++) 
				{
					if(this.m_vecList[i].gameApp){
						this.m_vecList[i].gameApp.setCacheBitmap(true);
					}
					
				}
			});
		}
		
//		public show():void{
//			if(this.m_spCurrentPage){
//				//开启视讯
//				var item : MultiTableItem;
//				for (var i:number= 0; i < this.m_spCurrentPage.numChildren; i++) 
//				{
//					item = this.m_spCurrentPage.getChildAt(i) as MultiTableItem;
//					item.gameApp.playVideo();
//				}
//				if(item){
//					item = null;
//				}
//				
//				this.m_spContent.addChild(this.m_spCurrentPage);
//				
//			}
//		}
		
		public hide():void{
			if(this.m_spCurrentPage){
				//关闭视讯
				var item : MultiTableItem;
				for (var i:number= 0; i < this.m_spCurrentPage.numChildren; i++) 
				{
					item = this.m_spCurrentPage.getChildAt(i) as MultiTableItem;
					item.gameApp.stopVideo();
				}
				if(item){
					item = null;
				}
				
				this.m_spCurrentPage.visible = false;
			}
			
		}
		public updateVideoData(aData:any[]):void{
			if(this.m_spCurrentPage){
				var item : MultiTableItem;
				for (var i:number= 0; i < this.m_spCurrentPage.numChildren; i++) 
				{
					item = this.m_spCurrentPage.getChildAt(i) as MultiTableItem;
					if(item && item.gameApp){
						item.gameApp.setDefCDN(aData);
					}
				}
				if(item){
					item = null;
				}
				
			}
		}
		
		public PlayAllVideo():void{
			if(this.m_spCurrentPage){
				//关闭视讯
				var item : MultiTableItem;
				for (var i:number= 0; i < this.m_spCurrentPage.numChildren; i++) 
				{
					item = this.m_spCurrentPage.getChildAt(i) as MultiTableItem;
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
		public addGoodRoadStruct( _goodRoadMapStruct ):void{
			if(this.m_spCurrentPage){
				var item : MultiTableItem;
				for (var i:number= 0; i < this.m_spCurrentPage.numChildren; i++) 
				{
					item = this.m_spCurrentPage.getChildAt(i) as MultiTableItem;
					if(item.isEmptyTable()){
						item.setDataOnAddGoodRoad(_goodRoadMapStruct);
						return;
					}
				}
			}
		}
		/** 移除好路 **/
		public removeGoodRoadStruct(_tableID:number):void{
			if(this.m_spCurrentPage){
				var _item : MultiTableItem = this.getTableItemByTableID(_tableID);
				if(_item){
					_item.setDataOnAddGoodRoad(null);
				}
			}
		}
		 public onChangeLanguage():void{
			var _len  = this.m_vecList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(this.m_vecList[i]){
					this.m_vecList[i].onChangeLanguage();
				}
			}
		}
		
		public getTableItemByTableID(_iTableID:number):MultiTableItem{
			if(this.m_vecList){
				var _len  = this.m_vecList.length;
				for (var i:number= 0; i < _len; i++) 
				{
					if(this.m_vecList[i].goodRoadStruct && this.m_vecList[i].goodRoadStruct.TableID == _iTableID){
						return this.m_vecList[i];
					}
				}
			}
			
			return null;
		}
		
		public clearLive():void{
			var _len  = this.m_vecList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(this.m_vecList[i].gameApp){
					this.m_vecList[i].gameApp.stopVideo();
				}
				
			}
		}
		
		public clearTableList():void{
			var _len  = this.m_vecList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				this.m_vecList[i].clearTable();
			}
		}
		
		public bTurn(): boolean{
			var _len  = this.m_vecList.length;
			var bStatus :  boolean;
			for (var i:number= 0; i < _len; i++) 
			{
				bStatus = this.m_vecList[i].gameApp.bCanExit;
				if(bStatus == false){
					manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sBet_Wait));
					return false;
				}
			}
			return true;
		}
		
		private getEmptyMultitableItem():MultiTableItem{
			if(this.m_vecList==null){
				return null;
			}
			var _len  = this.m_vecList.length;
			var _item : MultiTableItem;
			var _bStatus :  boolean;		//是否存在于好路类型列表中
			for (var i:number= this.m_iCurrentPage*this.m_uMode; i < _len; i++) 
			{
				if(i<this.m_iCurrentPage*this.m_uMode+this.m_uMode){
					if(this.m_vecList[i].isEmptyTable()){
						_item =  this.m_vecList[i];
						break;
					}
//					else{
//						if(this.m_vecList[i].goodRoadStruct && this.m_vecList[i].goodRoadStruct.MatchList){
//							_bStatus = false;
//							for (var j:number= 0; j < this.m_vecList[i].goodRoadStruct.MatchList.length; j++) 
//							{
//								if(LobbyData.getInstance().judgeGoodRoadType(this.m_vecList[i].goodRoadStruct.MatchList[j])){
//									break;
//								}else{
//									if(!_item){
//										_item =  this.m_vecList[i];
//									}
//									_bStatus = true;
//									break;
//								}
//							}
//							if(_bStatus){
//								this.m_vecList[i].setDataOnAddGoodRoad(null);
//							}
//						}else{
//							//翻页，不是空桌时，开启视讯
//							if(this.m_uMode==define.Define.MULTI_TABLE_MODE_4){
//								this.m_vecList[i].gameApp.playVideo();
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