module lobby.view {
	export class LobbyInformation extends BSprite {
		
		private  SPACE			:	number			=	2;		//间隔距离
		
		private m_mcAsset		;						//个人资讯
		private m_bmpFace		:	egret.Bitmap;					//玩家头像
//		private m_bmpGold		:	egret.Bitmap;					//玩家金币
		private m_btnRecharge	:	ui.button.SingleButtonMC;			//充值按钮
		private m_btnRegist		:	ui.button.SingleButtonMC;			//注册按钮
//		private m_mcMarquee		:	egret.MovieClip;				//滚动消息
//		public marquee			:	MarqueeList;			//滚动消息
		
		public constructor( _mcParent ) {
			
			super();
			this.m_mcAsset		=	 manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"InfomationAsset");
			_mcParent.addChild(this.m_mcAsset);
			this.m_mcAsset.x = 0;
			this.m_mcAsset.y = 5;
			
			// TextUtils.setEmbedFont(this.m_mcAsset.tf_1,"微软雅黑 Bold");
			// TextUtils.setEmbedFont(this.m_mcAsset.tf_2,"微软雅黑 Bold");
//			m_mcMarquee 	=	m_mcAsset.getChildByName("mc_marquee");
			
			this.m_bmpFace		=	new egret.Bitmap();
			this.m_mcAsset.mc_0.addChild(this.m_bmpFace);
			
//			m_bmpGold		=	new egret.Bitmap();
//			m_mcAsset.mc_2.addChild(m_bmpGold);
			
			this.m_btnRecharge	=	new ui.button.SingleButtonMC(this.m_mcAsset.mc_3, function(event:MouseEvent):void{
				 manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				 manager.TipManager.getInstance().hide();
				 manager.LobbyManager.getInstance().hideAllPanel();
//				 manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				 manager.LobbyManager.getInstance().recharge();
			});
			this.m_btnRecharge.fOnOver = function():void{
				 manager.TipManager.getInstance().show( manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_recharge), manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_3.x+18,this.m_mcAsset.mc_3.y+34)),1);
			};
			this.m_btnRecharge.fOnOut = function():void{
				 manager.TipManager.getInstance().hide();
			};
			
			this.m_btnRegist = new ui.button.SingleButtonMC(this.m_mcAsset.mc_regist, function(event:MouseEvent):void{
				 manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				 manager.TipManager.getInstance().hide();
				 manager.LobbyManager.getInstance().hideAllPanel();
				
				 manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString(language.Language.sHit_Leave_To_Regist),function():void{
					 manager.LobbyManager.getInstance().bRegist = true;
					 manager.LobbyManager.getInstance().sendLobbyLogout();
				},function():void{
					 manager.LobbyManager.getInstance().bRegist = false;
				},true);
			});
			this.m_btnRegist.fOnOver = function():void{
				 manager.TipManager.getInstance().show( manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Regist), manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_regist.x+43,this.m_mcAsset.mc_regist.y+34)),1);
			};
			this.m_btnRegist.fOnOut = function():void{
				 manager.TipManager.getInstance().hide();
			};
			
			if( manager.LobbyManager.getInstance().lobbyAuth.Identity==2){
				this.m_btnRegist.visible = true;
			}else{
				this.m_btnRegist.visible = false;
			}
			
//			marquee = new MarqueeList( 500,22 );
//			m_mcMarquee.addChild( marquee );
			
//			setData();
			this.onChangeLanguage();
		}

		public destroy():void
		{
//			if(m_bmpGold){
//				if(m_bmpGold.parent){
//					m_bmpGold.parent.removeChild(m_bmpGold);
//				}
//				m_bmpGold = null;
//			}
//			if(marquee){
//				if(marquee.parent){
//					marquee.parent.removeChild(marquee);
//				}
//				marquee.destroy();
//				marquee = null;
//			}
			
			if(this.m_bmpFace){
				if(this.m_bmpFace.parent){
					this.m_bmpFace.parent.removeChild(this.m_bmpFace);
				}
				this.m_bmpFace = null;
			}
			
//			if(m_mcMarquee){
//				m_mcMarquee = null;
//			}
			
		}
		
		public setData():void{
//			setFace(model.Player.getInstance().iFaceID);
			this.m_mcAsset.tf_0.text = manager.TextManager.getInstance().filter(model.Player.getInstance().sNickName,this.m_mcAsset.tf_0);
			
			this.m_mcAsset.mc_1.gotoAndStop(model.Player.getInstance().uCurrency);
//			m_mcAsset.mc_1.x = m_mcAsset.tf_0.x + int(m_mcAsset.tf_0.width) + SPACE;
//			m_bmpGold.bitmapData = BitmapManager.getInstance().numberChip.conversion(model.Player.getInstance().balance.nGCoin);
			this.m_mcAsset.tf_1.text = String(model.Player.getInstance().nCoin);
//			m_mcAsset.mc_2.x = m_mcAsset.mc_1.x + int(m_mcAsset.mc_1.width) + SPACE;
//			m_mcAsset.mc_3.x = m_mcAsset.mc_2.x + int(m_mcAsset.mc_2.width);
//			m_mcAsset.tf_1.text =  manager.LobbyManager.getInstance().getLanguageString(Language.sOnlinemPlayers) + " |";
			// this.m_mcAsset.tf_1.autoSize = TextFieldAutoSize.LEFT;
			(this.m_mcAsset.tf_1).touchEnabled = false;
			(this.m_mcAsset.tf_1).selectable = false;
			this.updateOnline();
//			m_mcAsset.tf_2.x = m_mcAsset.tf_1.x + m_mcAsset.tf_1.textWidth + 10;
			
//			marquee.setData();
		}
		
		public updateBalance():void{
			if(this.m_mcAsset){
				this.m_mcAsset.tf_1.text = String(model.Player.getInstance().nCoin);
			}
		}
		public updateOnline():void{
			this.m_mcAsset.tf_2.text = model.LobbyData.getInstance().lobbyInfo.OnlinePlayers.toString();
		}
				
		public setFace( _uFaceID:number ):void{
			this.m_bmpFace.bitmapData =  manager.FaceManager.getInstance().getFaceByID(_uFaceID);
		}
		
		onChangeLanguage():void{
//			marquee.onChangeLanguage();
			if(this.m_btnRegist){
				(this.m_btnRegist.mcAsset.mc_label).gotoAndStop( manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		
		public playMarquee():void{
//			if(marquee){
//				marquee.start();
//			}
		}
		public stopMarquee():void{
//			if(marquee){
//				marquee.stop();
//			}
		}
		
		set visible(bValue:boolean) {
			this.m_mcAsset.visible = bValue;
		}
		get visible():boolean {
			return this.m_mcAsset.visible;
		}		
		
	}
}