module lobby.view.notice {
	export class NoticeView extends BSprite{
		private const SPACE			:	uint 	= 	10;					//间隔距离
		private const SPEED			:	Number 	=	1;					//滚动速度
		
		private var m_spMask		:	Sprite;							//遮罩容器
		private var m_txtSp			:	Sprite;							//文字容器
		
		private var m_mcAsset		:	MovieClip;
		
		private var m_vecTextfields	:	Vector.<NoticeItemView>;		//所有内容

		private var m_vecPool		:	Vector.<NoticeItemView>;		//对象池
		private var m_vecShowList	:	Vector.<MessageStruct>;			//当前显示的数据列表
		private var m_iCurIndex		:	int;							//最左边的显示的index
		
		public constructor() {
			super();
			this.mouseChildren = false;
			this.mouseEnabled = false;
			
			m_vecShowList = new Vector.<MessageStruct>();
			m_vecTextfields = new Vector.<NoticeItemView>();
			m_vecPool = new Vector.<NoticeItemView>();
			for (var i:int = 0; i < 3; i++) 
			{
				m_vecPool.push(new NoticeItemView());
			}
			
			toLobbyUrgentNotice();
			onChangeLanguage();
		}
		override public function initilize():void{
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Dialog_Asset_3");
			this.addChild(m_mcAsset);
			
			m_mcAsset.tf_0.width = 0;
			m_mcAsset.tf_0.autoSize = "left";
			m_mcAsset.tf_0.wordWrap = false;
			m_mcAsset.tf_0.multiline = false;
			
			m_mcAsset.tf_0.selectable = false;
			m_mcAsset.tf_0.mouseEnabled = false;
			
			m_spMask = new Sprite();
			m_spMask.graphics.beginFill(0xFFFFFF, 0.5);
			m_spMask.graphics.drawRect(0, 0, 588, 24);
			m_spMask.graphics.endFill();
			m_mcAsset.addChild(m_spMask);
			m_spMask.x = m_mcAsset.tf_0.x;
			m_spMask.y = m_mcAsset.tf_0.y;
			
			m_txtSp = new Sprite();
			m_txtSp.x = m_mcAsset.tf_0.x;
			m_txtSp.y = m_mcAsset.tf_0.y;
			m_txtSp.mouseChildren = false;
			m_txtSp.mask = m_spMask
			m_mcAsset.addChild(m_txtSp);
			m_txtSp.cacheAsBitmap = true;
			
			m_mcAsset.mc_title.gotoAndStop(1);
			m_mcAsset.tf_0.text = "";
		}
		override public function destroy() : void
		{
			if (nPosition)
			{
				nPosition = null;
			}
			if (m_spMask)
			{
				m_spMask.parent.removeChild(m_spMask);
				m_spMask = null;
			}
			if(m_txtSp){
				m_txtSp.parent.removeChild(m_txtSp);
				m_txtSp = null;
			}
		}
		public function clear():void
		{
			m_iCurIndex = 0;
			m_vecShowList.length = 0;
			while(m_vecTextfields.length>0)
			{
				shiftTf();
			}
		}
		public function setData(vec:Vector.<MessageStruct>):void
		{
			while(m_vecTextfields.length>0)
			{
				shiftTf();
			}
			if(vec==null || vec.length==0)
			{
				m_vecShowList.length = 0;
				return;
			}
			m_vecShowList = vec;
			if(m_iCurIndex>m_vecShowList.length-1)
			{
				m_iCurIndex = 0;
			}
			pushTf();
		}
		public function addMessage(vo:MessageStruct):void
		{
			if(vo==null)
				return;
			var index:int = m_vecShowList.indexOf(vo);
			if(index == -1)
			{
				m_vecShowList.push(vo);
				pushTf();
			}
		}
		public function wantToRemove(vo:MessageStruct):void
		{
			if(vo==null)
				return;
			removeShowTf(vo);
		}
		public function removeMessage(vo:MessageStruct):void
		{
			if(vo==null)
				return;
			var index:int = m_vecShowList.indexOf(vo);
			if(index != -1)
			{
				m_vecShowList.splice(index,1);
				if(index < m_iCurIndex)
				{
					m_iCurIndex--;
				}
			}
		}
		private function pushTf():void
		{
			if(m_vecTextfields.length >= m_vecShowList.length)
			{
				return;
			}
			var can:Boolean;
			var offsetx:int;
			if(m_vecTextfields.length > 0)
			{
				var last:NoticeItemView = m_vecTextfields[m_vecTextfields.length-1];
				offsetx = last.x + last.width + SPACE;
				if(offsetx < m_spMask.width)
				{
					can = true;
					offsetx = m_spMask.width;
				}
			}
			else
			{
				can = true;
				offsetx = m_spMask.width;
			}
			if(can)
			{
				var view:NoticeItemView;
				if(m_vecPool.length>0)
				{
					view = m_vecPool.pop();
				}
				else
				{
					view = new NoticeItemView();
				}
				if(m_iCurIndex>m_vecShowList.length-1)
				{
					m_iCurIndex = 0;
				}
				view.maData = m_vecShowList[m_iCurIndex];
				view.x = offsetx;
				m_txtSp.addChild(view);
				m_vecTextfields.push(view);
				view.onChangeLanguage();
				
				m_iCurIndex++;
			}
		}
		private function shiftTf():MessageStruct
		{
			if(m_vecTextfields.length>0)
			{
				var view:NoticeItemView = m_vecTextfields.shift();
				var data:MessageStruct = view.maData;
				view.clear();
				m_vecPool.push(view);
				m_txtSp.removeChild(view);
				return data;
			}
			return null;
		}
		private function removeShowTf(vo:MessageStruct):void
		{
			var len:int = m_vecTextfields.length;
			if(len > 0)
			{
				var view:NoticeItemView;
				for (var i:int = 0; i < m_vecTextfields.length; i++) 
				{
					view = m_vecTextfields[i];
					if(view.maData == vo)
					{
//						m_vecTextfields.splice(i,1);
//						view.clear();
//						_pool.push(view);
//						m_txtSp.removeChild(view);
						vo.bReadyKill = true;
						break;
					}
				}
			}
		}
		public function get showCount():int
		{
			return m_vecShowList.length;
		}
		public function going() : MessageStruct
		{
			if(m_vecShowList.length == 0)
			{
				return null;
			}
			var data:MessageStruct;
			if(m_vecTextfields.length>0)
			{
				var lastEndx:int;
				for (var i:int = 0; i < m_vecTextfields.length; i++) 
				{
					if(i > 1)
					{
						//测试跑马灯可能会出现部分重叠，但无法重现，所以加入矫正
						lastEndx = m_vecTextfields[i-1].x + m_vecTextfields[i-1].width+SPACE;
						if(m_vecTextfields[i].x < lastEndx)
						{
							m_vecTextfields[i].x = lastEndx;
						}
					}
					
					m_vecTextfields[i].x -= SPEED;
				}
				var view:NoticeItemView = m_vecTextfields[0];
				if(view.x + view.width < 0)
				{
					data = shiftTf();
				}
			}
			pushTf();
			
			return data;
		}
		//游戏中的定位
		public function toGamgeUrgentNotice():void{
			this.x = LobbyManager.getInstance().stage.stageWidth * 0.5 - 1077*0.5;
			this.y = LobbyManager.getInstance().stage.stageHeight * 0.5 - 120;
		}
		//厅馆
		public function toLobbyUrgentNotice():void{
			this.x = LobbyManager.getInstance().stage.stageWidth * 0.5 - 1077*0.5;
			this.y = LobbyManager.getInstance().stage.stageHeight * 0.5 - 100;
		}
		//多桌
		public function toMultiUrgentNotice():void{
			this.x = LobbyManager.getInstance().stage.stageWidth * 0.5 - 1077*0.5 - 150;
			this.y = 0;
		}
		override public function onChangeLanguage():void{
			for (var i:int = 0; i < m_vecTextfields.length; i++) 
			{
				m_vecTextfields[i].onChangeLanguage();
			}
			if(m_vecTextfields.length>0)
			{
				var lastx:int;
				for (i = 0; i < m_vecTextfields.length; i++) 
				{
					if(i==0)
					{
						lastx = m_vecTextfields[i].x + m_vecTextfields[i].width + SPACE;
					}
					else
					{
						m_vecTextfields[i].x = lastx;
						lastx += m_vecTextfields[i].x + m_vecTextfields[i].width + SPACE;
					}
				}
			}
			m_mcAsset.mc_title.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
	}
}