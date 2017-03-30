module lobby.view.multi {
	export class MultiTableRecord extends BSprite{
		private m_mcAsset		:	*;
		
		private m_recordList	:	MultiTableRecordList;
		
		private m_btnFirst		:	SingleButtonMC;
		private m_btnLeft		:	SingleButtonMC;
		private m_btnNext		:	SingleButtonMC;
		private m_btnLast		:	SingleButtonMC;
		private m_btnSetting	:	SingleButtonMC;
		
		private m_uTotalPage	:	number	=	10;					//最多10页
		private m_uTotalCount	:	number	=	100;				//最高100条记录，超过覆盖旧记录
		private m_uCurrent		:	number	=	1;					//当前页数
		private m_vecRecordData	:	<RecordBetStruct>;		//所有记录
		
		public constructor() {
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "Multi_Record_Asset");
			m_mcAsset.cacheAsBitmap=true;
			this.addChild(m_mcAsset);
			m_btnSetting = new SingleButtonMC(m_mcAsset.mc_setting, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
//				LobbyManager.getInstance().showDialog("暂未开放！");
				LobbyManager.getInstance().showGoodRoadSetting();
			});
			m_btnSetting.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_GoodRood_Setting),TipManager.RIGHT,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_setting.x-5,m_mcAsset.mc_setting.y+15)));
			};
			m_btnSetting.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			m_btnFirst = new SingleButtonMC(m_mcAsset.mc_0, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				uCurrent = 1;
			});
			m_btnLeft = new SingleButtonMC(m_mcAsset.mc_1, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_uCurrent--;
				if(m_uCurrent<1){
					uCurrent = 1;
				}else{
					uCurrent = m_uCurrent;
				}
			});
			m_btnNext = new SingleButtonMC(m_mcAsset.mc_2, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_uCurrent++;
				if(m_uCurrent>m_uTotalPage){
					uCurrent = m_uTotalPage;
				}else{
					uCurrent = m_uCurrent;
				}
				
			});
			m_btnLast = new SingleButtonMC(m_mcAsset.mc_3, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				uCurrent = m_uTotalPage;
			});
			
			m_vecRecordData = new <RecordBetStruct>();
			
			m_recordList = new MultiTableRecordList(m_mcAsset);
			m_mcAsset.addChild(m_recordList);
			
			m_uTotalPage = 1;
			uCurrent = 1;
			
			judgeBtn();
			onChangeLanguage();
			
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
			if(m_btnSetting){
				m_btnSetting.destroy();
				m_btnSetting = null;
			}
			if(m_btnFirst){
				m_btnFirst.destroy();
				m_btnFirst = null;
			}
			if(m_btnLeft){
				m_btnLeft.destroy();
				m_btnLeft = null;
			}
			if(m_btnNext){
				m_btnNext.destroy();
				m_btnNext = null;
			}
			if(m_btnLast){
				m_btnLast.destroy();
				m_btnLast = null;
			}
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			
			if(m_vecRecordData){
				m_vecRecordData = null;
			}
			
			if(m_recordList){
				m_recordList.destroy();
				m_recordList=null;
			}
		}
		
		public addRecord(_vecStruct:<RecordBetStruct>):void{
			var _len : int = _vecStruct.length
			for (var i:number= 0; i < _len; i++) 
			{
				m_vecRecordData.unshift(_vecStruct[i]);
			}
			while(m_vecRecordData.length>=100){
				m_vecRecordData.pop();
			}
			m_recordList.setData(m_vecRecordData,m_uCurrent-1);
			m_uTotalPage = Math.ceil(m_vecRecordData.length/10);
			
			m_mcAsset.tf_page.text = String(m_uCurrent) + "/" + String(m_uTotalPage);
			judgeBtn();
		}
		
		 public onChangeLanguage():void{
//			m_mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_title.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			if(m_recordList){
				m_recordList.onChangeLanguage();
			}
			
//			m_mcAsset.tf_0.text = LobbyManager.getInstance().getLanguageString(Language.sMulti_Table_ID);
//			m_mcAsset.tf_1.text = LobbyManager.getInstance().getLanguageString(Language.sMulti_Table_Bet);
//			m_mcAsset.tf_2.text = LobbyManager.getInstance().getLanguageString(Language.sMulti_Table_Payout);
		}
				
		private judgeBtn():void{
			if(m_uTotalPage==1){
				m_btnFirst.enabled = false;
				m_btnLeft.enabled = false;
				m_btnNext.enabled = false;
				m_btnLast.enabled = false;
			}else{
				if(m_uCurrent==1){
					m_btnFirst.enabled = false;
					m_btnLeft.enabled = false;
					m_btnNext.enabled = true;
					m_btnLast.enabled = true;
				}else if(m_uCurrent==m_uTotalPage){
					m_btnFirst.enabled = true;
					m_btnLeft.enabled = true;
					m_btnNext.enabled = false;
					m_btnLast.enabled = false;
				}else{
					m_btnFirst.enabled = true;
					m_btnLeft.enabled = true;
					m_btnNext.enabled = true;
					m_btnLast.enabled = true;
				}
			}
			
		}
		set  uCurrent(_uValue:number){
			m_uCurrent = _uValue;
			judgeBtn();
			m_recordList.setData(m_vecRecordData,m_uCurrent-1);
			
			m_mcAsset.tf_page.text = String(m_uCurrent) + "/" + String(m_uTotalPage);
		}
	}
}