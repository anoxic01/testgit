module lobby.view.multi {
	export class MultiTableView extends BSprite{
		private m_mcAsset		:	MovieClip;
		private m_bmpBg			:	Bitmap;
		private m_modeList		:	MultiTableModeList;
		public record			:	MultiTableRecord;
		
		private m_list_4		:	MultiTableList;
		private m_list_8		:	MultiTableList;
		private m_list_16		:	MultiTableList;
		
		private m_transition_4	:	MovieClip;
		private m_transition_8	:	MovieClip;
		private m_transition_16	:	MovieClip;
		private m_aTransition	:	any[];
		private m_aCount		:	any[];
		
		private m_currentList	:	MultiTableList;					//当前列表
		private m_uCurrentMode	:	number;							//当前模式
		private m_spContent		:	Sprite;
		public  spChips			:	Sprite;
		
		private m_video_Enter	: 	MMovieClip;
		private m_video_Normal	: 	MMovieClip;
		private m_video_Out		:	MMovieClip;
		private m_vecBg			:	<BitmapData>;
		public dictVideoPos		:	Dictionary;
		
		public constructor() {
			super();
		//	LobbyManager.getInstance().uRenderMode=1
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "Multi_View_Asset");
			this.addChild(m_mcAsset);
			m_vecBg = new <BitmapData>(4);
			m_vecBg[0] = BitmapUtil.snapshot(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "Multitable_Bg_Asset"));
			m_bmpBg = new Bitmap();
//暂时隐藏多桌底图			
			m_mcAsset.mc_bg.addChild(m_bmpBg);
			setBg(0);
			setupBg();
			
			
			initTransition();
			
			m_modeList = new MultiTableModeList(m_mcAsset.mc_mode);
			
			record = new MultiTableRecord();
			m_mcAsset.mc_record.addChild(record);
			
			m_mcAsset.mc_chip.addChild(LobbyManager.getInstance().chipPanelLobby);
			LobbyManager.getInstance().chipPanelLobby.updateGold();
			
			m_spContent = new Sprite();
			m_mcAsset.mc_content.addChild(m_spContent);
			spChips= new Sprite();
			spChips.mouseEnabled = spChips.mouseChildren=false;
			spChips.x=-960;
			spChips.y=-540;
			this.addChild(spChips);
//			LobbyManager.getInstance().lobbyView.showLoading();
			
			onChangeLanguage();
			
			m_video_Out = new MMovieClip(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE,"Vedio_3_Asset"));
			m_mcAsset.mc_record.addChild(m_video_Out.mcAsset);
			m_video_Out.gotoAndStop(1);
			m_video_Out.addFrameScript(13,function():void{
				if(m_video_Out){
					m_video_Out.gotoAndStop(14);
				}
				if(LobbyManager.getInstance().multiTableView){
					TweenLite.to(LobbyManager.getInstance().multiTableView,Define.SPEED,{alpha:0, onComplete:function():void{
					//	destroy();
						LobbyManager.getInstance().exitMultiComplete();
					}});
				}
			});
			
			
			m_video_Normal = new MMovieClip(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE,"Vedio_2_Asset"));
			m_mcAsset.mc_record.addChild(m_video_Normal.mcAsset);
			m_video_Normal.gotoAndStop(1);
			
			if(LobbyManager.getInstance().uRenderMode==0){
				m_video_Enter = new MMovieClip(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE,"Vedio_1_Asset"));
				m_mcAsset.mc_record.addChild(m_video_Enter.mcAsset);
				m_video_Enter.addFrameScript(86,function():void{
					if(m_video_Enter){
						m_video_Enter.gotoAndStop(87);
						m_mcAsset.mc_record.removeChild(m_video_Enter.mcAsset);
						m_video_Enter = null;
					}
					
					
					if(m_video_Normal ){
						m_video_Normal.gotoAndPlay(1);
					}
				});
			}else{
				
			}
			
			
			
			
//			m_vedio_1.gotoAndStop(1);
			
		}
		
		private initTransition():void{
			m_transition_4 = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "multitable_lit_transition_4");
			m_transition_4.gotoAndStop(1);
			m_mcAsset.addChild(m_transition_4);
			m_transition_4.visible = false;
			m_transition_4.x = -162;
			m_transition_4.y = 60;
			changeLanguageTransitionTable(m_transition_4,Define.MULTI_TABLE_MODE_4);
			
			m_transition_8 = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "multitable_lit_transition_8");
			m_transition_8.gotoAndStop(1);
			m_mcAsset.addChild(m_transition_8);
			m_transition_8.visible = false;
			m_transition_8.x = -160;
			m_transition_8.y = 60;
			changeLanguageTransitionTable(m_transition_8,Define.MULTI_TABLE_MODE_8);
			
			m_transition_16 = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "multitable_lit_transition_16");
			m_transition_16.gotoAndStop(1);
			m_mcAsset.addChild(m_transition_16);
			m_transition_16.visible = false;
			m_transition_16.x = -161;
			m_transition_16.y = 70;
			changeLanguageTransitionTable(m_transition_16,Define.MULTI_TABLE_MODE_16);
			
			m_transition_4.addFrameScript(22,initList);
			m_transition_8.addFrameScript(22,initList);
			m_transition_16.addFrameScript(22,initList);
			
			m_aTransition  =	[m_transition_4,m_transition_8,m_transition_16];
			m_aCount = [4,8,16];
		}
		
	
		
		get currentList():MultiTableList
		{
			return m_currentList;
		}

		set  currentList(value:MultiTableList)
		{
			m_currentList = value;
			m_spContent.visible = true;
//			m_currentList.show();
		}
		
		private clearDictVideoPos(mode:number):void{
			var arr:any[] = dictVideoPos[mode];
			for (var j:number= 0; j < arr.length; j++) 
			{
				arr[j]=null;
			}
			dictVideoPos[mode]=null;
			arr=null;
		}
		
		 public destroy():void{
			RequestManager.instance.removeRequestCallBack(this);
			RequestManager.instance.stop();
			LobbyManager.getInstance().stopDetection();
			if(m_video_Enter){
				m_video_Enter.stop();
				if(m_video_Enter.mcAsset.parent){
					m_video_Enter.mcAsset.parent.removeChild(m_video_Enter.mcAsset);
				}
				m_video_Enter.dispose();
				m_video_Enter = null;
			}
			if(m_video_Normal){
				m_video_Normal.stop();
				if(m_video_Normal.mcAsset.parent){
					m_video_Normal.mcAsset.parent.removeChild(m_video_Normal.mcAsset);
				}
				m_video_Normal.dispose();
				m_video_Normal = null;
			}
			if(m_video_Out){
				m_video_Out.stop();
				if(m_video_Out.mcAsset.parent){
					m_video_Out.mcAsset.parent.removeChild(m_video_Out.mcAsset);
				}
				m_video_Out.dispose();
				m_video_Out = null;
			}
			
			
			if(m_bmpBg){
				if(m_bmpBg.parent){
					m_bmpBg.parent.removeChild(m_bmpBg);
				}
				m_bmpBg = null;
			}
			
			for (var i:number= 0; i < m_vecBg.length; i++) 
			{
				m_vecBg[i].dispose();
				m_vecBg[i]=null;
			}
			m_vecBg=null;
			
			clearDictVideoPos(Define.MULTI_TABLE_MODE_4);
			clearDictVideoPos(Define.MULTI_TABLE_MODE_8);
			clearDictVideoPos(Define.MULTI_TABLE_MODE_16);
			dictVideoPos=null;
			
			if(m_modeList){
				m_modeList.destroy();
				m_modeList = null;
			}
			
			if(m_currentList){
				m_currentList = null;
			}
			
			destroyList_4();
			destroyList_8();
			destroyList_16();
			
			
			if(m_aCount){
				m_aCount = null;
			}
			
			if(m_aTransition){
				m_aTransition = null;
			}
			if(m_transition_4){
				if(m_transition_4.parent){
					m_transition_4.parent.removeChild(m_transition_4);
				}
				m_transition_4 = null;
			}
			if(m_transition_8){
				if(m_transition_8.parent){
					m_transition_8.parent.removeChild(m_transition_8);
				}
				m_transition_8 = null;
			}
			if(m_transition_16){
				if(m_transition_16.parent){
					m_transition_16.parent.removeChild(m_transition_16);
				}
				m_transition_16 = null;
			}
			
			if(record){
				if(record.parent){
					record.parent.removeChild(record);
				}
				record.destroy();
				record = null;
			}
			
//			if(chipPanel){
//				if(chipPanel.parent){
//					chipPanel.parent.removeChild(chipPanel);
//				}
//				chipPanel.destroy();
//				chipPanel = null;
//			}
			
			
			if(spChips){
				while(spChips.numChildren>0){
					spChips.removeChildAt(0);
				}
				if(spChips.parent){
					spChips.parent.removeChild(spChips);
				}
				spChips=null;
			}
			
			if(m_spContent){
				if(m_spContent.parent){
					m_spContent.parent.removeChild(m_spContent);
				}
				m_spContent = null;
			}
			
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
		}
		private destroyList_4():void{
			if(m_list_4){
				if(m_list_4.parent){
					m_list_4.parent.removeChild(m_list_4);
				}
				m_list_4.destroy();
				m_list_4 = null;
			}
		}
		private destroyList_8():void{
			if(m_list_8){
				if(m_list_8.parent){
					m_list_8.parent.removeChild(m_list_8);
				}
				m_list_8.destroy();
				m_list_8 = null;
			}
		}
		private destroyList_16():void{
			if(m_list_16){
				if(m_list_16.parent){
					m_list_16.parent.removeChild(m_list_16);
				}
				m_list_16.destroy();
				m_list_16 = null;
			}
		}
		
		
		
		public onInit():void{
			m_modeList.init();
			
			RequestManager.instance.init(this.root.loaderInfo.url,3000);
			RequestManager.instance.addRequestCallBack(this,onNetWorkCheckStatus);
			//RequestManager.instance.start();
		}
		
		private initList():void{
//			m_vedio_1.gotoAndPlay(1);
			
			if(m_modeList==null){
				return;
			}
			
//			LobbyManager.getInstance().lobbyView.hideLoading();
			
			
			switch(m_uCurrentMode){
				case Define.MULTI_TABLE_MODE_4:
					if(m_transition_4){
						m_transition_4.gotoAndStop(22);
						m_transition_4.visible = false;
						stopLoading(m_transition_4,m_uCurrentMode);
					}
					destroyList_8();
					destroyList_16();
					if(m_list_4==null){
						m_list_4 = new MultiTableList( Define.MULTI_TABLE_MODE_4);
						m_list_4.x = -790;
						m_list_4.y = -558;
						m_spContent.addChild(m_list_4);
					}
					currentList = m_list_4;
				
					break;
				
				case Define.MULTI_TABLE_MODE_8:
					if(m_transition_8){
						m_transition_8.gotoAndStop(22);
						m_transition_8.visible = false;
						stopLoading(m_transition_8,m_uCurrentMode);
					}
					destroyList_4();
					destroyList_16();
					if(m_list_8==null){
						m_list_8 = new MultiTableList( Define.MULTI_TABLE_MODE_8);
						m_list_8.x = -791;
						m_list_8.y = -551;
						m_spContent.addChild(m_list_8);
					}
					currentList = m_list_8;
					currentList.clearLive();
					LobbyManager.getInstance().clearMultiTableLive();
					break;
				
				case Define.MULTI_TABLE_MODE_16:
					if(m_transition_16){
						m_transition_16.gotoAndStop(22);
						m_transition_16.visible = false;
						stopLoading(m_transition_16,m_uCurrentMode);
					}
					destroyList_4();
					destroyList_8();
					if(m_list_16==null){
						m_list_16 = new MultiTableList( Define.MULTI_TABLE_MODE_16);
						m_list_16.x = -787;
						m_list_16.y = -558;
						m_spContent.addChild(m_list_16);
					}
					currentList = m_list_16;
					currentList.clearLive();
					LobbyManager.getInstance().clearMultiTableLive();
					break;
			}
			setBg(m_uCurrentMode);
			m_modeList.enable = true;
		}
		
		
		public setBg(_mode:number=0):void
		{
			switch(_mode)
			{
				case 0:
					m_bmpBg.bitmapData=m_vecBg[0];
					break;
				case Define.MULTI_TABLE_MODE_4:
					m_bmpBg.bitmapData=m_vecBg[1];
					break;
				case Define.MULTI_TABLE_MODE_8:
					m_bmpBg.bitmapData=m_vecBg[2];
					break;
				case Define.MULTI_TABLE_MODE_16:
					m_bmpBg.bitmapData=m_vecBg[3];
					break;
				default:
					break;
			}
			m_bmpBg.smoothing = true;
			
		}
		
		public playTransition():void{
			LobbyData.getInstance().clearSubscribed();
			
			LobbyManager.getInstance().clearMultiTableLive();
			switch(m_uCurrentMode){
				case Define.MULTI_TABLE_MODE_4:
					if(m_transition_4){
						m_transition_4.visible = true;
						m_transition_4.gotoAndPlay("IN");
						playLoading(m_transition_4,m_uCurrentMode);
					}
					break;
				
				case Define.MULTI_TABLE_MODE_8:
					if(m_transition_8){
						m_transition_8.visible = true;
						m_transition_8.gotoAndPlay("IN");
						playLoading(m_transition_8,m_uCurrentMode);
					}
					break;
				
				case Define.MULTI_TABLE_MODE_16:
					if(m_transition_16){
						m_transition_16.visible = true;
						m_transition_16.gotoAndPlay("IN");
						playLoading(m_transition_16,m_uCurrentMode);
					}
					break;
			}
		}
		
		public setMultiTableMode(uMode:number):void{
			setBg(0);
			m_uCurrentMode = uMode;
			//播放过渡动画，当前模式的桌子缩小
			if(m_currentList){
				m_currentList.clearLive();
				TweenLite.to(m_spContent, 0.5,{scaleX:0.8,scaleY:0.8,alpha:0,onComplete:function():void{
					if(m_spContent){
						m_spContent.visible = false;
						m_spContent.scaleX = 1;
						m_spContent.scaleY = 1;
						m_spContent.alpha = 1;
					}
					
					playTransition();
				}});
			}else{
				playTransition();
			}
			
		}
		
		 public onChangeLanguage():void{
			
			for (var i:number= 0; i < m_aTransition.length; i++) 
			{
				changeLanguageTransitionTable(m_aTransition[i],m_aCount[i]);
			}
			
			record.onChangeLanguage();
			LobbyManager.getInstance().chipPanelLobby.onChangeLanguage();
			
			if(currentList){
				currentList.onChangeLanguage();
			}
		}
		private changeLanguageTransitionTable(_mcTransition:MovieClip, _mode:number):void{
			var bmp : Bitmap;
			var _mc : MovieClip;
			for (var j:number= 0; j < _mode; j++) 
			{
				_mc = _mcTransition.getChildByName("mc_"+String(j)) as MovieClip;
				if(_mc.numChildren==1){
					bmp = new Bitmap();
					_mc.addChildAt(bmp,0);
					_mc.mc_loading.gotoAndStop(1);
				}else{
					bmp = _mc.getChildAt(0) as Bitmap;
				}
				if(bmp){
					bmp.bitmapData = BitmapManager.getInstance().getMultiTransitionTable(_mode);
					bmp.smoothing = true;
				}else{
					console.log("多桌过渡图片获取异常...");
				}
			}
			if(_mc){
				_mc = null;
			}
			if(bmp){
				bmp = null;
			}
		}
		
		private stopLoading(_mcTransition:MovieClip, _mode:number):void{
			var _mc : MovieClip;
			for (var j:number= 0; j < _mode; j++) 
			{
				_mc = _mcTransition.getChildByName("mc_"+String(j)) as MovieClip;
				_mc.mc_loading.gotoAndStop(1);
				_mc.mc_loading.visible = false;
			}
			if(_mc){
				_mc = null;
			}
		}
		private playLoading(_mcTransition:MovieClip, _mode:number):void{
			var _mc : MovieClip;
			for (var j:number= 0; j < _mode; j++) 
			{
				_mc = _mcTransition.getChildByName("mc_"+String(j)) as MovieClip;
				_mc.mc_loading.visible = true;
				_mc.mc_loading.gotoAndPlay(1);
			}
			if(_mc){
				_mc = null;
			}
		}
		
		//寻找空桌
		public addGoodRoadStruct(_goodRoadMapStruct:GoodRoadStruct):void{
			if(currentList){
				currentList.addGoodRoadStruct(_goodRoadMapStruct);
			}
		}
		public removeGoodRoadStruct(_tableID:number):void{
			if(currentList){
				currentList.removeGoodRoadStruct(_tableID);
			}
		}
		
		
		
		public setGoodRoads():void
		{
			if(currentList){
				currentList.setData();
			}
		}
		
		/**
		 *服务器异常断线通知 
		 * 
		 */
		public offline(tableId:number):void{
			if (tableId>0){
				var tableItem:MultiTableItem = currentList.getTableItemByTableID(tableId);	
				if (tableItem){
					tableItem.gameApp.showMessage(Language.sMaintain);
				}
			}
			
		}
		
		public exit():void{
			this.mouseChildren=false;
			setBg(0);
			if(m_currentList){
				m_currentList.clearLive();
			}
			if(m_video_Enter){
				m_video_Enter.stop();
				if(m_video_Enter.mcAsset.parent){
					m_video_Enter.mcAsset.parent.removeChild(m_video_Enter.mcAsset);
				}
				m_video_Enter = null;
			}
			if(m_video_Normal){
				m_video_Normal.stop();
				if(m_video_Normal.mcAsset.parent){
					m_video_Normal.mcAsset.parent.removeChild(m_video_Normal.mcAsset);
				}
				m_video_Normal = null;
			}
			if(LobbyManager.getInstance().uRenderMode==0){
				m_video_Out.gotoAndPlay(1);
			}else{
				TweenLite.to(LobbyManager.getInstance().multiTableView,Define.SPEED,{alpha:0, onComplete:function():void{
					LobbyManager.getInstance().exitMultiComplete();
				}});
			}
			
			
	//		console.log(">>>>>>>>-----------退出多桌动画------------")
			
		}
		
		private onNetWorkCheckStatus(code:number):void
		{
			if(code!=RequestManager.REQUEST_SUCC)
			{
				RequestManager.instance.stop();/// 网络异常停止检测
				LobbyManager.getInstance().bImportant = false;
				NetWorkManager.getInstance().checkLobbyNetWork(Define.LobbyDisconnect);
				LobbyManager.getInstance().bImportant = true;
			}
		}
		
		
		public getVideoPort(mode:number,index:number):Rectangle{
			console.log(dictVideoPos[mode][index])
			return dictVideoPos[mode][index];
		}
		
		/**
		 *生成三个镂空bg，用于显示底层的stagevideo 
		 * 
		 */
		private setupBg():void{
			dictVideoPos = {};
			var bmd:BitmapData = m_vecBg[0].clone();
			var rect : Rectangle;
			var i:number=0;
			var clipX:Number;
			var clipY:Number;
			var _index:number;
			dictVideoPos[Define.MULTI_TABLE_MODE_4]=new any[](4);
			var fillSp:Sprite = new Sprite();
			fillSp.graphics.beginFill(0x999999);
			fillSp.graphics.drawRect(0, 0, 100, 100);
			fillSp.graphics.endFill()
			for (i = 0; i < 4; i++) 
			{
				fillSp.x=7;
				fillSp.y=250*i+56;
				fillSp.width=426;
				fillSp.height=240;
				bmd.draw(fillSp,fillSp.transform.matrix,null,BlendMode.ERASE);
				rect = new Rectangle(7,250*i+56,426,240);
				//bmd.fillRect(rect,0x00000000);
				dictVideoPos[Define.MULTI_TABLE_MODE_4][i]=rect;
			}
			m_vecBg[1]=bmd;
			
			bmd =  m_vecBg[0].clone();
			dictVideoPos[Define.MULTI_TABLE_MODE_8]=new any[](8);
			for (i= 0; i < 8; i++) 
			{
				clipX =  i%2==0 ? 14:817;
				clipY = 252 * int(i/2)+63;
				fillSp.x=clipX;
				fillSp.y=clipY;
				fillSp.width=426;
				fillSp.height=240;
				bmd.draw(fillSp,fillSp.transform.matrix,null,BlendMode.ERASE);
				rect = new Rectangle(clipX,clipY,426,240);
				//bmd.fillRect(rect,0x00000000);
				dictVideoPos[Define.MULTI_TABLE_MODE_8][i]=rect;
			}
			m_vecBg[2]=bmd;
			
			bmd =  m_vecBg[0].clone();
			dictVideoPos[Define.MULTI_TABLE_MODE_16]=new any[](16);
			for (i= 0; i < 16; i++) 
			{
				_index = (i%4);
				if(_index > 1){
					clipX = 399.5 * _index +14;
				}else{
					clipX = 400 * _index +14;
				}
				clipY = 252 * int(i/4)+56;
				fillSp.x=clipX;
				fillSp.y=clipY;
				//fillSp.width=226;
				fillSp.width=389;
				fillSp.height=242;
				bmd.draw(fillSp,fillSp.transform.matrix,null,BlendMode.ERASE);
				rect = new Rectangle(clipX,clipY,389,242);
			//	console.log("16桌："+rect);
			//	bmd.fillRect(rect,0x00000000);
				dictVideoPos[Define.MULTI_TABLE_MODE_16][i]=rect;
			}
			m_vecBg[3]=bmd;
			
		}
		
		public stopAllVideo():void{
			if(currentList){
				currentList.clearLive();
			}
		}
		
		public changeModeToLow():void{
			if(m_video_Normal){
				m_video_Normal.gotoAndStop(1);
			}
			
		}
		
		
		
		
		
	}
}