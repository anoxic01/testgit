module lobby.view.multi {
	export class MultiTableRecord extends BSprite{
		private m_mcAsset		;
		
		private m_recordList	:	MultiTableRecordList;
		
		private m_btnFirst		:	ui.button.SingleButtonMC;
		private m_btnLeft		:	ui.button.SingleButtonMC;
		private m_btnNext		:	ui.button.SingleButtonMC;
		private m_btnLast		:	ui.button.SingleButtonMC;
		private m_btnSetting	:	ui.button.SingleButtonMC;
		
		private m_uTotalPage	:	number	=	10;					//最多10页
		private m_uTotalCount	:	number	=	100;				//最高100条记录，超过覆盖旧记录
		private m_uCurrent		:	number	=	1;					//当前页数
		private m_vecRecordData	:	model.struct.RecordBetStruct[];		//所有记录
		
		public constructor() {
			super();

			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE, "Multi_Record_Asset");
			this.m_mcAsset.cacheAsBitmap=true;
			this.addChild(this.m_mcAsset);
			this.m_btnSetting = new ui.button.SingleButtonMC(this.m_mcAsset.mc_setting, function(evt:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
//				manager.LobbyManager.getInstance().showDialog("暂未开放！");
				manager.LobbyManager.getInstance().showGoodRoadSetting();
			});
			this.m_btnSetting.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_GoodRood_Setting),manager.TipManager.RIGHT,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_setting.x-5,this.m_mcAsset.mc_setting.y+15)));
			};
			this.m_btnSetting.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			this.m_btnFirst = new ui.button.SingleButtonMC(this.m_mcAsset.mc_0, function(evt:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.uCurrent = 1;
			});
			this.m_btnLeft = new ui.button.SingleButtonMC(this.m_mcAsset.mc_1, function(evt:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_uCurrent--;
				if(this.m_uCurrent<1){
					this.uCurrent = 1;
				}else{
					this.uCurrent = this.m_uCurrent;
				}
			});
			this.m_btnNext = new ui.button.SingleButtonMC(this.m_mcAsset.mc_2, function(evt:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_uCurrent++;
				if(this.m_uCurrent>this.m_uTotalPage){
					this.uCurrent = this.m_uTotalPage;
				}else{
					this.uCurrent = this.m_uCurrent;
				}
				
			});
			this.m_btnLast = new ui.button.SingleButtonMC(this.m_mcAsset.mc_3, function(evt:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.uCurrent = this.m_uTotalPage;
			});
			
			this.m_vecRecordData = new Array<model.struct.RecordBetStruct>();
			
			this.m_recordList = new MultiTableRecordList(this.m_mcAsset);
			this.m_mcAsset.addChild(this.m_recordList);
			
			this.m_uTotalPage = 1;
			this.uCurrent = 1;
			
			this.judgeBtn();
			this.onChangeLanguage();
			
			//虚拟数据——测试
//			var vec : <RecordBetStruct> = new <RecordBetStruct>();
//			for (var i:number= 0; i < 32; i++) 
//			{
//				var struct : RecordBetStruct = new RecordBetStruct();
//				struct.Amt = 100;
//				struct.BetPos = "B1";
//				struct.Payout = 189;
//				struct.TableID = 10;
//				vec.push(struct);
//			}
//			
//			addRecord(vec);
		}
		
		 public destroy():void
		{
			if(this.m_btnSetting){
				this.m_btnSetting.destroy();
				this.m_btnSetting = null;
			}
			if(this.m_btnFirst){
				this.m_btnFirst.destroy();
				this.m_btnFirst = null;
			}
			if(this.m_btnLeft){
				this.m_btnLeft.destroy();
				this.m_btnLeft = null;
			}
			if(this.m_btnNext){
				this.m_btnNext.destroy();
				this.m_btnNext = null;
			}
			if(this.m_btnLast){
				this.m_btnLast.destroy();
				this.m_btnLast = null;
			}
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			
			if(this.m_vecRecordData){
				this.m_vecRecordData = null;
			}
			
			if(this.m_recordList){
				this.m_recordList.destroy();
				this.m_recordList=null;
			}
		}
		
		public addRecord(_vecStruct:model.struct.RecordBetStruct[]):void{
			var _len : number = _vecStruct.length
			for (var i:number= 0; i < _len; i++) 
			{
				this.m_vecRecordData.unshift(_vecStruct[i]);
			}
			while(this.m_vecRecordData.length>=100){
				this.m_vecRecordData.pop();
			}
			this.m_recordList.setData(this.m_vecRecordData,this.m_uCurrent-1);
			this.m_uTotalPage = Math.ceil(this.m_vecRecordData.length/10);
			
			this.m_mcAsset.tf_page.text = String(this.m_uCurrent) + "/" + String(this.m_uTotalPage);
			this.judgeBtn();
		}
		
		 public onChangeLanguage():void{
//			this.m_mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_title.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			if(this.m_recordList){
				this.m_recordList.onChangeLanguage();
			}
			
//			this.m_mcAsset.tf_0.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sMulti_Table_ID);
//			this.m_mcAsset.tf_1.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sMulti_Table_Bet);
//			this.m_mcAsset.tf_2.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sMulti_Table_Payout);
		}
				
		private judgeBtn():void{
			if(this.m_uTotalPage==1){
				this.m_btnFirst.enabled = false;
				this.m_btnLeft.enabled = false;
				this.m_btnNext.enabled = false;
				this.m_btnLast.enabled = false;
			}else{
				if(this.m_uCurrent==1){
					this.m_btnFirst.enabled = false;
					this.m_btnLeft.enabled = false;
					this.m_btnNext.enabled = true;
					this.m_btnLast.enabled = true;
				}else if(this.m_uCurrent==this.m_uTotalPage){
					this.m_btnFirst.enabled = true;
					this.m_btnLeft.enabled = true;
					this.m_btnNext.enabled = false;
					this.m_btnLast.enabled = false;
				}else{
					this.m_btnFirst.enabled = true;
					this.m_btnLeft.enabled = true;
					this.m_btnNext.enabled = true;
					this.m_btnLast.enabled = true;
				}
			}
			
		}
		set  uCurrent(_uValue:number){
			this.m_uCurrent = _uValue;
			this.judgeBtn();
			this.m_recordList.setData(this.m_vecRecordData,this.m_uCurrent-1);
			
			this.m_mcAsset.tf_page.text = String(this.m_uCurrent) + "/" + String(this.m_uTotalPage);
		}
	}
}