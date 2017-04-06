module lobby.view.multi {
	export class MultiTableView extends BSprite{
		private m_mcAsset		;
		private m_bmpBg			;
		private m_modeList		:	MultiTableModeList;
		public record			:	MultiTableRecord;
		
		private m_list_4		:	MultiTableList;
		private m_list_8		:	MultiTableList;
		private m_list_16		:	MultiTableList;
		
		private m_transition_4	;
		private m_transition_8	;
		private m_transition_16	;
		private m_aTransition	;
		private m_aCount		;
		
		private m_currentList	:	MultiTableList;					//当前列表
		private m_uCurrentMode	:	number;							//当前模式
		private m_spContent		;
		public  spChips			;
		
		private m_video_Enter	;
		private m_video_Normal	;
		private m_video_Out		;
		private m_vecBg			:	egret.BitmapData[];
		public dictVideoPos		;
		
		public constructor() {
			super();
		//	manager.LobbyManager.getInstance().uRenderMode=1
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE, "Multi_View_Asset");
			this.addChild(this.m_mcAsset);
			this.m_vecBg = new Array<egret.BitmapData>(4);
			this.m_vecBg[0] = util.bitmap.util.bitmap.BitmapUtil.snapshot(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE, "Multitable_Bg_Asset"));
			this.m_bmpBg = new egret.Bitmap();
//暂时隐藏多桌底图			
			this.m_mcAsset.mc_bg.addChild(this.m_bmpBg);
			this.setBg(0);
			this.setupBg();
			
			
			this.initTransition();
			
			this.m_modeList = new MultiTableModeList(this.m_mcAsset.mc_mode);
			
			this.record = new MultiTableRecord();
			this.m_mcAsset.mc_record.addChild(this.record);
			
			this.m_mcAsset.mc_chip.addChild(manager.LobbyManager.getInstance().chipPanelLobby);
			manager.LobbyManager.getInstance().chipPanelLobby.updateGold();
			
			this.m_spContent = new egret.Sprite();
			this.m_mcAsset.mc_content.addChild(this.m_spContent);
			this.spChips= new egret.Sprite();
			this.spChips.mouseEnabled = this.spChips.mouseChildren=false;
			this.spChips.x=-960;
			this.spChips.y=-540;
			this.addChild(this.spChips);
//			manager.LobbyManager.getInstance().lobbyView.showLoading();
			
			this.onChangeLanguage();
			
			this.m_video_Out = new egret.MovieClip(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE,"Vedio_3_Asset"));
			this.m_mcAsset.mc_record.addChild(this.m_video_Out.mcAsset);
			this.m_video_Out.gotoAndStop(1);
			this.m_video_Out.addFrameScript(13,function():void{
				if(this.m_video_Out){
					this.m_video_Out.gotoAndStop(14);
				}
				if(manager.LobbyManager.getInstance().multiTableView){
					egret.Tween.get(manager.LobbyManager.getInstance().multiTableView).to({alpha:0}, define.Define.SPEED).call(function():void{
					//	destroy();
						manager.LobbyManager.getInstance().exitMultiComplete();
					});
				}
			});
			
			
			this.m_video_Normal = new egret.MovieClip(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE,"Vedio_2_Asset"));
			this.m_mcAsset.mc_record.addChild(this.m_video_Normal.mcAsset);
			this.m_video_Normal.gotoAndStop(1);
			
			if(manager.LobbyManager.getInstance().uRenderMode==0){
				this.m_video_Enter = new egret.MovieClip(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE,"Vedio_1_Asset"));
				this.m_mcAsset.mc_record.addChild(this.m_video_Enter.mcAsset);
				this.m_video_Enter.addFrameScript(86,function():void{
					if(this.m_video_Enter){
						this.m_video_Enter.gotoAndStop(87);
						this.m_mcAsset.mc_record.removeChild(this.m_video_Enter.mcAsset);
						this.m_video_Enter = null;
					}
					
					
					if(this.m_video_Normal ){
						this.m_video_Normal.gotoAndPlay(1);
					}
				});
			}else{
				
			}
			
			
			
			
//			m_vedio_1.gotoAndStop(1);
			
		}
		
		private initTransition():void{
			this.m_transition_4 = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE, "multitable_lit_transition_4");
			this.m_transition_4.gotoAndStop(1);
			this.m_mcAsset.addChild(this.m_transition_4);
			this.m_transition_4.visible = false;
			this.m_transition_4.x = -162;
			this.m_transition_4.y = 60;
			this.changeLanguageTransitionTable(this.m_transition_4,define.Define.MULTI_TABLE_MODE_4);
			
			this.m_transition_8 = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE, "multitable_lit_transition_8");
			this.m_transition_8.gotoAndStop(1);
			this.m_mcAsset.addChild(this.m_transition_8);
			this.m_transition_8.visible = false;
			this.m_transition_8.x = -160;
			this.m_transition_8.y = 60;
			this.changeLanguageTransitionTable(this.m_transition_8,define.Define.MULTI_TABLE_MODE_8);
			
			this.m_transition_16 = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE, "multitable_lit_transition_16");
			this.m_transition_16.gotoAndStop(1);
			this.m_mcAsset.addChild(this.m_transition_16);
			this.m_transition_16.visible = false;
			this.m_transition_16.x = -161;
			this.m_transition_16.y = 70;
			this.changeLanguageTransitionTable(this.m_transition_16,define.Define.MULTI_TABLE_MODE_16);
			
			this.m_transition_4.addFrameScript(22,this.initList);
			this.m_transition_8.addFrameScript(22,this.initList);
			this.m_transition_16.addFrameScript(22,this.initList);
			
			this.m_aTransition  =	[this.m_transition_4,this.m_transition_8,this.m_transition_16];
			this.m_aCount = [4,8,16];
		}
		
	
		
		get currentList():MultiTableList
		{
			return this.m_currentList;
		}

		set  currentList(value:MultiTableList)
		{
			this.m_currentList = value;
			this.m_spContent.visible = true;
//			this.m_currentList.show();
		}
		
		private clearDictVideoPos(mode:number):void{
			var arr:any[] = this.dictVideoPos[mode];
			for (var j:number= 0; j < arr.length; j++) 
			{
				arr[j]=null;
			}
			this.dictVideoPos[mode]=null;
			arr=null;
		}
		
		 public destroy():void{
			manager.RequestManager.instance.removeRequestCallBack(this);
			manager.RequestManager.instance.stop();
			manager.LobbyManager.getInstance().stopDetection();
			if(this.m_video_Enter){
				this.m_video_Enter.stop();
				if(this.m_video_Enter.mcAsset.parent){
					this.m_video_Enter.mcAsset.parent.removeChild(this.m_video_Enter.mcAsset);
				}
				this.m_video_Enter.dispose();
				this.m_video_Enter = null;
			}
			if(this.m_video_Normal){
				this.m_video_Normal.stop();
				if(this.m_video_Normal.mcAsset.parent){
					this.m_video_Normal.mcAsset.parent.removeChild(this.m_video_Normal.mcAsset);
				}
				this.m_video_Normal.dispose();
				this.m_video_Normal = null;
			}
			if(this.m_video_Out){
				this.m_video_Out.stop();
				if(this.m_video_Out.mcAsset.parent){
					this.m_video_Out.mcAsset.parent.removeChild(this.m_video_Out.mcAsset);
				}
				this.m_video_Out.dispose();
				this.m_video_Out = null;
			}
			
			
			if(this.m_bmpBg){
				if(this.m_bmpBg.parent){
					this.m_bmpBg.parent.removeChild(this.m_bmpBg);
				}
				this.m_bmpBg = null;
			}
			
			for (var i:number= 0; i < this.m_vecBg.length; i++) 
			{
				this.m_vecBg[i].dispose();
				this.m_vecBg[i]=null;
			}
			this.m_vecBg=null;
			
			this.clearDictVideoPos(define.Define.MULTI_TABLE_MODE_4);
			this.clearDictVideoPos(define.Define.MULTI_TABLE_MODE_8);
			this.clearDictVideoPos(define.Define.MULTI_TABLE_MODE_16);
			this.dictVideoPos=null;
			
			if(this.m_modeList){
				this.m_modeList.destroy();
				this.m_modeList = null;
			}
			
			if(this.m_currentList){
				this.m_currentList = null;
			}
			
			this.destroyList_4();
			this.destroyList_8();
			this.destroyList_16();
			
			
			if(this.m_aCount){
				this.m_aCount = null;
			}
			
			if(this.m_aTransition){
				this.m_aTransition = null;
			}
			if(this.m_transition_4){
				if(this.m_transition_4.parent){
					this.m_transition_4.parent.removeChild(this.m_transition_4);
				}
				this.m_transition_4 = null;
			}
			if(this.m_transition_8){
				if(this.m_transition_8.parent){
					this.m_transition_8.parent.removeChild(this.m_transition_8);
				}
				this.m_transition_8 = null;
			}
			if(this.m_transition_16){
				if(this.m_transition_16.parent){
					this.m_transition_16.parent.removeChild(this.m_transition_16);
				}
				this.m_transition_16 = null;
			}
			
			if(this.record){
				if(this.record.parent){
					this.record.parent.removeChild(this.record);
				}
				this.record.destroy();
				this.record = null;
			}
			
//			if(chipPanel){
//				if(chipPanel.parent){
//					chipPanel.parent.removeChild(chipPanel);
//				}
//				chipPanel.destroy();
//				chipPanel = null;
//			}
			
			
			if(this.spChips){
				while(this.spChips.numChildren>0){
					this.spChips.removeChildAt(0);
				}
				if(this.spChips.parent){
					this.spChips.parent.removeChild(this.spChips);
				}
				this.spChips=null;
			}
			
			if(this.m_spContent){
				if(this.m_spContent.parent){
					this.m_spContent.parent.removeChild(this.m_spContent);
				}
				this.m_spContent = null;
			}
			
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
		}
		private destroyList_4():void{
			if(this.m_list_4){
				if(this.m_list_4.parent){
					this.m_list_4.parent.removeChild(this.m_list_4);
				}
				this.m_list_4.destroy();
				this.m_list_4 = null;
			}
		}
		private destroyList_8():void{
			if(this.m_list_8){
				if(this.m_list_8.parent){
					this.m_list_8.parent.removeChild(this.m_list_8);
				}
				this.m_list_8.destroy();
				this.m_list_8 = null;
			}
		}
		private destroyList_16():void{
			if(this.m_list_16){
				if(this.m_list_16.parent){
					this.m_list_16.parent.removeChild(this.m_list_16);
				}
				this.m_list_16.destroy();
				this.m_list_16 = null;
			}
		}
		
		
		
		public onInit():void{
			this.m_modeList.init();
			
			manager.RequestManager.instance.init(root.loaderInfo.url,3000);
			manager.RequestManager.instance.addRequestCallBack(this, this.onNetWorkCheckStatus);
			//manager.RequestManager.instance.start();
		}
		
		private initList():void{
//			m_vedio_1.gotoAndPlay(1);
			
			if(this.m_modeList==null){
				return;
			}
			
//			manager.LobbyManager.getInstance().lobbyView.hideLoading();
			
			
			switch(this.m_uCurrentMode){
				case define.Define.MULTI_TABLE_MODE_4:
					if(this.m_transition_4){
						this.m_transition_4.gotoAndStop(22);
						this.m_transition_4.visible = false;
						this.stopLoading(this.m_transition_4,this.m_uCurrentMode);
					}
					this.destroyList_8();
					this.destroyList_16();
					if(this.m_list_4==null){
						this.m_list_4 = new MultiTableList( define.Define.MULTI_TABLE_MODE_4);
						this.m_list_4.x = -790;
						this.m_list_4.y = -558;
						this.m_spContent.addChild(this.m_list_4);
					}
					this.currentList = this.m_list_4;
				
					break;
				
				case define.Define.MULTI_TABLE_MODE_8:
					if(this.m_transition_8){
						this.m_transition_8.gotoAndStop(22);
						this.m_transition_8.visible = false;
						this.stopLoading(this.m_transition_8,this.m_uCurrentMode);
					}
					this.destroyList_4();
					this.destroyList_16();
					if(this.m_list_8==null){
						this.m_list_8 = new MultiTableList( define.Define.MULTI_TABLE_MODE_8);
						this.m_list_8.x = -791;
						this.m_list_8.y = -551;
						this.m_spContent.addChild(this.m_list_8);
					}
					this.currentList = this.m_list_8;
					this.currentList.clearLive();
					manager.LobbyManager.getInstance().clearMultiTableLive();
					break;
				
				case define.Define.MULTI_TABLE_MODE_16:
					if(this.m_transition_16){
						this.m_transition_16.gotoAndStop(22);
						this.m_transition_16.visible = false;
						this.stopLoading(this.m_transition_16,this.m_uCurrentMode);
					}
					this.destroyList_4();
					this.destroyList_8();
					if(this.m_list_16==null){
						this.m_list_16 = new MultiTableList( define.Define.MULTI_TABLE_MODE_16);
						this.m_list_16.x = -787;
						this.m_list_16.y = -558;
						this.m_spContent.addChild(this.m_list_16);
					}
					this.currentList = this.m_list_16;
					this.currentList.clearLive();
					manager.LobbyManager.getInstance().clearMultiTableLive();
					break;
			}
			this.setBg(this.m_uCurrentMode);
			this.m_modeList.enable = true;
		}
		
		
		public setBg(_mode:number=0):void
		{
			switch(_mode)
			{
				case 0:
					this.m_bmpBg.bitmapData=this.m_vecBg[0];
					break;
				case define.Define.MULTI_TABLE_MODE_4:
					this.m_bmpBg.bitmapData=this.m_vecBg[1];
					break;
				case define.Define.MULTI_TABLE_MODE_8:
					this.m_bmpBg.bitmapData=this.m_vecBg[2];
					break;
				case define.Define.MULTI_TABLE_MODE_16:
					this.m_bmpBg.bitmapData=this.m_vecBg[3];
					break;
				default:
					break;
			}
			this.m_bmpBg.smoothing = true;
			
		}
		
		public playTransition():void{
			model.LobbyData.getInstance().clearSubscribed();
			
			manager.LobbyManager.getInstance().clearMultiTableLive();
			switch(this.m_uCurrentMode){
				case define.Define.MULTI_TABLE_MODE_4:
					if(this.m_transition_4){
						this.m_transition_4.visible = true;
						this.m_transition_4.gotoAndPlay("IN");
						this.playLoading(this.m_transition_4,this.m_uCurrentMode);
					}
					break;
				
				case define.Define.MULTI_TABLE_MODE_8:
					if(this.m_transition_8){
						this.m_transition_8.visible = true;
						this.m_transition_8.gotoAndPlay("IN");
						this.playLoading(this.m_transition_8,this.m_uCurrentMode);
					}
					break;
				
				case define.Define.MULTI_TABLE_MODE_16:
					if(this.m_transition_16){
						this.m_transition_16.visible = true;
						this.m_transition_16.gotoAndPlay("IN");
						this.playLoading(this.m_transition_16,this.m_uCurrentMode);
					}
					break;
			}
		}
		
		public setMultiTableMode(uMode:number):void{
			this.setBg(0);
			this.m_uCurrentMode = uMode;
			//播放过渡动画，当前模式的桌子缩小
			if(this.m_currentList){
				this.m_currentList.clearLive();
				egret.Tween.get(this.m_spContent).to({scaleX:0.8, scaleY:0.8, alpha:0}, 0.5).call(function():void{
					if(this.m_spContent){
						this.m_spContent.visible = false;
						this.m_spContent.scaleX = 1;
						this.m_spContent.scaleY = 1;
						this.m_spContent.alpha = 1;
					}
					this.playTransition();
				});
			}else{
				this.playTransition();
			}
			
		}
		
		 public onChangeLanguage():void{
			
			for (var i:number= 0; i < this.m_aTransition.length; i++) 
			{
				this.changeLanguageTransitionTable(this.m_aTransition[i],this.m_aCount[i]);
			}
			
			this.record.onChangeLanguage();
			manager.LobbyManager.getInstance().chipPanelLobby.onChangeLanguage();
			
			if(this.currentList){
				this.currentList.onChangeLanguage();
			}
		}
		private changeLanguageTransitionTable(_mcTransition, _mode:number):void{
			var bmp ;
			var _mc ;
			for (var j:number= 0; j < _mode; j++) 
			{
				_mc = _mcTransition.getChildByName("mc_"+String(j));
				if(_mc.numChildren==1){
					bmp = new egret.Bitmap();
					_mc.addChildAt(bmp,0);
					_mc.mc_loading.gotoAndStop(1);
				}else{
					bmp = _mc.getChildAt(0);
				}
				if(bmp){
					bmp.bitmapData = manager.BitmapManager.getInstance().getMultiTransitionTable(_mode);
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
		
		private stopLoading(_mcTransition, _mode:number):void{
			var _mc ;
			for (var j:number= 0; j < _mode; j++) 
			{
				_mc = _mcTransition.getChildByName("mc_"+String(j));
				_mc.mc_loading.gotoAndStop(1);
				_mc.mc_loading.visible = false;
			}
			if(_mc){
				_mc = null;
			}
		}
		private playLoading(_mcTransition, _mode:number):void{
			var _mc ;
			for (var j:number= 0; j < _mode; j++) 
			{
				_mc = _mcTransition.getChildByName("mc_"+String(j));
				_mc.mc_loading.visible = true;
				_mc.mc_loading.gotoAndPlay(1);
			}
			if(_mc){
				_mc = null;
			}
		}
		
		//寻找空桌
		public addGoodRoadStruct(_goodRoadMapStruct):void{
			if(this.currentList){
				this.currentList.addGoodRoadStruct(_goodRoadMapStruct);
			}
		}
		public removeGoodRoadStruct(_tableID:number):void{
			if(this.currentList){
				this.currentList.removeGoodRoadStruct(_tableID);
			}
		}
		
		
		
		public setGoodRoads():void
		{
			if(this.currentList){
				this.currentList.setData();
			}
		}
		
		/**
		 *服务器异常断线通知 
		 * 
		 */
		public offline(tableId:number):void{
			if (tableId>0){
				var tableItem:MultiTableItem = this.currentList.getTableItemByTableID(tableId);	
				if (tableItem){
					tableItem.gameApp.showMessage(language.Language.sMaintain);
				}
			}
			
		}
		
		public exit():void{
			this.touchChildren=false;
			this.setBg(0);
			if(this.m_currentList){
				this.m_currentList.clearLive();
			}
			if(this.m_video_Enter){
				this.m_video_Enter.stop();
				if(this.m_video_Enter.mcAsset.parent){
					this.m_video_Enter.mcAsset.parent.removeChild(this.m_video_Enter.mcAsset);
				}
				this.m_video_Enter = null;
			}
			if(this.m_video_Normal){
				this.m_video_Normal.stop();
				if(this.m_video_Normal.mcAsset.parent){
					this.m_video_Normal.mcAsset.parent.removeChild(this.m_video_Normal.mcAsset);
				}
				this.m_video_Normal = null;
			}
			if(manager.LobbyManager.getInstance().uRenderMode==0){
				this.m_video_Out.gotoAndPlay(1);
			}else{
				egret.Tween.get(manager.LobbyManager.getInstance().multiTableView).to({alpha:0}, define.Define.SPEED).call(function():void{
					manager.LobbyManager.getInstance().exitMultiComplete();
				});
			}
			
			
	//		console.log(">>>>>>>>-----------退出多桌动画------------")
			
		}
		
		private onNetWorkCheckStatus(code:number):void
		{
			if(code!=manager.RequestManager.REQUEST_SUCC)
			{
				manager.RequestManager.instance.stop();/// 网络异常停止检测
				manager.LobbyManager.getInstance().bImportant = false;
				manager.NetWorkManager.getInstance().checkLobbyNetWork(define.Define.LobbyDisconnect);
				manager.LobbyManager.getInstance().bImportant = true;
			}
		}
		
		
		public getVideoPort(mode:number,index:number):egret.Rectangle{
			console.log(this.dictVideoPos[mode][index])
			return this.dictVideoPos[mode][index];
		}
		
		/**
		 *生成三个镂空bg，用于显示底层的stagevideo 
		 * 
		 */
		private setupBg():void{
			this.dictVideoPos = {};
			var bmd = this.m_vecBg[0].clone();
			var rect ;
			var i:number=0;
			var clipX:number;
			var clipY:number;
			var _index:number;
			this.dictVideoPos[define.Define.MULTI_TABLE_MODE_4]=[];
			var fillSp = new egret.Sprite();
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
				rect = new egret.Rectangle(7,250*i+56,426,240);
				//bmd.fillRect(rect,0x00000000);
				this.dictVideoPos[define.Define.MULTI_TABLE_MODE_4][i]=rect;
			}
			this.m_vecBg[1]=bmd;
			
			bmd =  this.m_vecBg[0].clone();
			this.dictVideoPos[define.Define.MULTI_TABLE_MODE_8]=[];
			for (i= 0; i < 8; i++) 
			{
				clipX =  i%2==0 ? 14:817;
				clipY = 252 * (i/2)+63;
				fillSp.x=clipX;
				fillSp.y=clipY;
				fillSp.width=426;
				fillSp.height=240;
				bmd.draw(fillSp,fillSp.transform.matrix,null,BlendMode.ERASE);
				rect = new egret.Rectangle(clipX,clipY,426,240);
				//bmd.fillRect(rect,0x00000000);
				this.dictVideoPos[define.Define.MULTI_TABLE_MODE_8][i]=rect;
			}
			this.m_vecBg[2]=bmd;
			
			bmd =  this.m_vecBg[0].clone();
			this.dictVideoPos[define.Define.MULTI_TABLE_MODE_16]=[];
			for (i= 0; i < 16; i++) 
			{
				_index = (i%4);
				if(_index > 1){
					clipX = 399.5 * _index +14;
				}else{
					clipX = 400 * _index +14;
				}
				clipY = 252 * (i/4)+56;
				fillSp.x=clipX;
				fillSp.y=clipY;
				//fillSp.width=226;
				fillSp.width=389;
				fillSp.height=242;
				bmd.draw(fillSp,fillSp.transform.matrix,null,BlendMode.ERASE);
				rect = new egret.Rectangle(clipX,clipY,389,242);
			//	console.log("16桌："+rect);
			//	bmd.fillRect(rect,0x00000000);
				this.dictVideoPos[define.Define.MULTI_TABLE_MODE_16][i]=rect;
			}
			this.m_vecBg[3]=bmd;
			
		}
		
		public stopAllVideo():void{
			if(this.currentList){
				this.currentList.clearLive();
			}
		}
		
		public changeModeToLow():void{
			if(this.m_video_Normal){
				this.m_video_Normal.gotoAndStop(1);
			}
			
		}
		
		
		
		
		
	}
}