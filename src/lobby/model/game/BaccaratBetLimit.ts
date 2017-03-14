module lobby.model.game {
	export class BaccaratBetLimit extends GameBetLimitBase {
		
        private var singleBetUpperLimit:Number;


        private var singleBetUnderLimit:Number;


        private var tieBetUpperLimit:Number


        private var tieBetUnderLimit:Number


        private var pairBetUpperLimit:Number


        private var pairBetUnderLimit:Number



        private var bigBetUpperLimit:Number;



        private var bigBetUnderLimit :Number



        private var smallBetUpperLimit :Number


        private var smallBetUnderLimit :Number
		/**
		 * @private
		 */
		public constructor() {
			super();
		}

		/**
		 * 庄/閒 押注上限
		 */
		public function get SingleBetUpperLimit():Number 
		{
			return singleBetUpperLimit;
		}
		/**
		 * 庄/閒 押注上限
		 */
		public function set SingleBetUpperLimit(value:Number):void 
		{
			singleBetUpperLimit = value;
		}
        /**
         * 庄/閒 押注下限
         */
		public function get SingleBetUnderLimit():Number 
		{
			return singleBetUnderLimit;
		}
        /**
         * 庄/閒 押注下限
         */
		public function set SingleBetUnderLimit(value:Number):void 
		{
			singleBetUnderLimit = value;
		}
       /**
         * 和 押注上限
         */
		public function get TieBetUpperLimit():Number 
		{
			return tieBetUpperLimit;
		}
		/**
         * 和 押注上限
         */
		public function set TieBetUpperLimit(value:Number):void 
		{
			tieBetUpperLimit = value;
		}
        /**
         * 和 押注下限
         */
		public function get TieBetUnderLimit():Number 
		{
			return tieBetUnderLimit;
		}
        /**
         * 和 押注下限
         */
		public function set TieBetUnderLimit(value:Number):void 
		{
			tieBetUnderLimit = value;
		}
        /**
         * 庄/閒對 押注上限
         */
		public function get PairBetUpperLimit():Number 
		{
			return pairBetUpperLimit;
		}
        /**
         * 庄/閒對 押注上限
         */
		public function set PairBetUpperLimit(value:Number):void 
		{
			pairBetUpperLimit = value;
		}
        /**
         * 庄/閒對 押注下限
         */
		public function get PairBetUnderLimit():Number 
		{
			return pairBetUnderLimit;
		}
        /**
         * 庄/閒對 押注下限
         */
		public function set PairBetUnderLimit(value:Number):void 
		{
			pairBetUnderLimit = value;
		}
        /**
         * 大 押注上限
         */
		public function get BigBetUpperLimit():Number 
		{
			return bigBetUpperLimit;
		}
        /**
         * 大 押注上限
         */
		public function set BigBetUpperLimit(value:Number):void 
		{
			bigBetUpperLimit = value;
		}
       /**
        * 大押注下限
        */
		public function get BigBetUnderLimit():Number 
		{
			return bigBetUnderLimit;
		}
	    /**
        * 大押注下限
        */
		public function set BigBetUnderLimit(value:Number):void 
		{
			bigBetUnderLimit = value;
		}
		/**
		 * 小 押注上限
		 */
		public function get SmallBetUpperLimit():Number 
		{
			return smallBetUpperLimit;
		}
		/**
		 * 小 押注上限
		 */
		public function set SmallBetUpperLimit(value:Number):void 
		{
			smallBetUpperLimit = value;
		}

        /**
         *  小 押注下限
         */
		public function get SmallBetUnderLimit():Number 
		{
			return smallBetUnderLimit;
		}

        /**
         *  小 押注下限
         */
		public function set SmallBetUnderLimit(value:Number):void 
		{
			smallBetUnderLimit = value;
		}
		



		
		
		
	}
}