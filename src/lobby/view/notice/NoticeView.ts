module lobby.view.notice {
	export class NoticeView extends BSprite{
		private  SPACE			:	number 	= 	10;					//间隔距离
		private  SPEED			:	number 	=	1;					//滚动速度
		
		private m_spMask		:	egret.Sprite;							//遮罩容器
		private m_txtSp			:	egret.Sprite;							//文字容器
		
		private m_mcAsset		;
		
		private m_vecTextfields	:	NoticeItemView[];		//所有内容

		private m_vecPool		:	NoticeItemView[];		//对象池
		private m_vecShowList	:	model.struct.MessageStruct[];			//当前显示的数据列表
		private m_iCurIndex		:	number;							//最左边的显示的index
		
		public constructor() {
			super();
			// this.mouseChildren = false;
			// this.mouseEnabled = false;
			this.touchEnabled = false;

			this.m_vecShowList = new Array<model.struct.MessageStruct>();
			this.m_vecTextfields = new Array<NoticeItemView>();
			this.m_vecPool = new Array<NoticeItemView>();
			for (var i:number= 0; i < 3; i++) 
			{
				this.m_vecPool.push(new NoticeItemView());
			}
			
			this.toLobbyUrgentNotice();
			this.onChangeLanguage();
		}
		 public initilize():void{
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Dialog_Asset_3");
			this.addChild(this.m_mcAsset);
			
			this.m_mcAsset.tf_0.width = 0;
			this.m_mcAsset.tf_0.autoSize = "left";
			this.m_mcAsset.tf_0.wordWrap = false;
			this.m_mcAsset.tf_0.multiline = false;
			
			this.m_mcAsset.tf_0.selectable = false;
			this.m_mcAsset.tf_0.mouseEnabled = false;
			
			this.m_spMask = new egret.Sprite();
			this.m_spMask.graphics.beginFill(0xFFFFFF, 0.5);
			this.m_spMask.graphics.drawRect(0, 0, 588, 24);
			this.m_spMask.graphics.endFill();
			this.m_mcAsset.addChild(this.m_spMask);
			this.m_spMask.x = this.m_mcAsset.tf_0.x;
			this.m_spMask.y = this.m_mcAsset.tf_0.y;
			
			this.m_txtSp = new egret.Sprite();
			this.m_txtSp.x = this.m_mcAsset.tf_0.x;
			this.m_txtSp.y = this.m_mcAsset.tf_0.y;
			this.m_txtSp.touchChildren = false;
			this.m_txtSp.mask = this.m_spMask
			this.m_mcAsset.addChild(this.m_txtSp);
			this.m_txtSp.cacheAsBitmap = true;
			
			this.m_mcAsset.mc_title.gotoAndStop(1);
			this.m_mcAsset.tf_0.text = "";
		}
		 public destroy() : void
		{
			if (this.nPosition)
			{
				this.nPosition = null;
			}
			if (this.m_spMask)
			{
				this.m_spMask.parent.removeChild(this.m_spMask);
				this.m_spMask = null;
			}
			if(this.m_txtSp){
				this.m_txtSp.parent.removeChild(this.m_txtSp);
				this.m_txtSp = null;
			}
		}
		public clear():void
		{
			this.m_iCurIndex = 0;
			this.m_vecShowList.length = 0;
			while(this.m_vecTextfields.length>0)
			{
				this.shiftTf();
			}
		}
		public setData(vec:model.struct.MessageStruct[]):void
		{
			while(this.m_vecTextfields.length>0)
			{
				this.shiftTf();
			}
			if(vec==null || vec.length==0)
			{
				this.m_vecShowList.length = 0;
				return;
			}
			this.m_vecShowList = vec;
			if(this.m_iCurIndex>this.m_vecShowList.length-1)
			{
				this.m_iCurIndex = 0;
			}
			this.pushTf();
		}
		public addMessage(vo:model.struct.MessageStruct):void
		{
			if(vo==null)
				return;
			var index:number= this.m_vecShowList.indexOf(vo);
			if(index == -1)
			{
				this.m_vecShowList.push(vo);
				this.pushTf();
			}
		}
		public wantToRemove(vo:model.struct.MessageStruct):void
		{
			if(vo==null)
				return;
			this.removeShowTf(vo);
		}
		public removeMessage(vo:model.struct.MessageStruct):void
		{
			if(vo==null)
				return;
			var index:number= this.m_vecShowList.indexOf(vo);
			if(index != -1)
			{
				this.m_vecShowList.splice(index,1);
				if(index < this.m_iCurIndex)
				{
					this.m_iCurIndex--;
				}
			}
		}
		private pushTf():void
		{
			if(this.m_vecTextfields.length >= this.m_vecShowList.length)
			{
				return;
			}
			var can: boolean;
			var offsetx:number;
			if(this.m_vecTextfields.length > 0)
			{
				var last:NoticeItemView = this.m_vecTextfields[this.m_vecTextfields.length-1];
				offsetx = last.x + last.width + this.SPACE;
				if(offsetx < this.m_spMask.width)
				{
					can = true;
					offsetx = this.m_spMask.width;
				}
			}
			else
			{
				can = true;
				offsetx = this.m_spMask.width;
			}
			if(can)
			{
				var view:NoticeItemView;
				if(this.m_vecPool.length>0)
				{
					view = this.m_vecPool.pop();
				}
				else
				{
					view = new NoticeItemView();
				}
				if(this.m_iCurIndex>this.m_vecShowList.length-1)
				{
					this.m_iCurIndex = 0;
				}
				view.maData = this.m_vecShowList[this.m_iCurIndex];
				view.x = offsetx;
				this.m_txtSp.addChild(view);
				this.m_vecTextfields.push(view);
				view.onChangeLanguage();
				
				this.m_iCurIndex++;
			}
		}
		private shiftTf():model.struct.MessageStruct
		{
			if(this.m_vecTextfields.length>0)
			{
				var view:NoticeItemView = this.m_vecTextfields.shift();
				var data:model.struct.MessageStruct = view.maData;
				view.clear();
				this.m_vecPool.push(view);
				this.m_txtSp.removeChild(view);
				return data;
			}
			return null;
		}
		private removeShowTf(vo:model.struct.MessageStruct):void
		{
			var len:number= this.m_vecTextfields.length;
			if(len > 0)
			{
				var view:NoticeItemView;
				for (var i:number= 0; i < this.m_vecTextfields.length; i++) 
				{
					view = this.m_vecTextfields[i];
					if(view.maData == vo)
					{
//						this.m_vecTextfields.splice(i,1);
//						view.clear();
//						_pool.push(view);
//						this.m_txtSp.removeChild(view);
						vo.bReadyKill = true;
						break;
					}
				}
			}
		}
		get showCount():number
		{
			return this.m_vecShowList.length;
		}
		public going() : model.struct.MessageStruct
		{
			if(this.m_vecShowList.length == 0)
			{
				return null;
			}
			var data:model.struct.MessageStruct;
			if(this.m_vecTextfields.length>0)
			{
				var lastEndx:number;
				for (var i:number= 0; i < this.m_vecTextfields.length; i++) 
				{
					if(i > 1)
					{
						//测试跑马灯可能会出现部分重叠，但无法重现，所以加入矫正
						lastEndx = this.m_vecTextfields[i-1].x + this.m_vecTextfields[i-1].width+this.SPACE;
						if(this.m_vecTextfields[i].x < lastEndx)
						{
							this.m_vecTextfields[i].x = lastEndx;
						}
					}
					
					this.m_vecTextfields[i].x -= this.SPEED;
				}
				var view:NoticeItemView = this.m_vecTextfields[0];
				if(view.x + view.width < 0)
				{
					data = this.shiftTf();
				}
			}
			this.pushTf();
			
			return data;
		}
		//游戏中的定位
		public toGamgeUrgentNotice():void{
			this.x = manager.LobbyManager.getInstance().stage.stageWidth * 0.5 - 1077*0.5;
			this.y = manager.LobbyManager.getInstance().stage.stageHeight * 0.5 - 120;
		}
		//厅馆
		public toLobbyUrgentNotice():void{
			this.x = manager.LobbyManager.getInstance().stage.stageWidth * 0.5 - 1077*0.5;
			this.y = manager.LobbyManager.getInstance().stage.stageHeight * 0.5 - 100;
		}
		//多桌
		public toMultiUrgentNotice():void{
			this.x = manager.LobbyManager.getInstance().stage.stageWidth * 0.5 - 1077*0.5 - 150;
			this.y = 0;
		}
		 public onChangeLanguage():void{
			for (var i:number= 0; i < this.m_vecTextfields.length; i++) 
			{
				this.m_vecTextfields[i].onChangeLanguage();
			}
			if(this.m_vecTextfields.length>0)
			{
				var lastx:number;
				for (i = 0; i < this.m_vecTextfields.length; i++) 
				{
					if(i==0)
					{
						lastx = this.m_vecTextfields[i].x + this.m_vecTextfields[i].width + this.SPACE;
					}
					else
					{
						this.m_vecTextfields[i].x = lastx;
						lastx += this.m_vecTextfields[i].x + this.m_vecTextfields[i].width + this.SPACE;
					}
				}
			}
			this.m_mcAsset.mc_title.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
	}
}