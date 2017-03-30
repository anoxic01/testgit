module lobby.model.game {
	export class BaccaratBetLimit extends GameBetLimitBase {
		
        private singleBetUpperLimit:Number;


        private singleBetUnderLimit:Number;


        private tieBetUpperLimit:Number


        private tieBetUnderLimit:Number


        private pairBetUpperLimit:Number


        private pairBetUnderLimit:Number



        private bigBetUpperLimit:Number;



        private bigBetUnderLimit :Number



        private smallBetUpperLimit :Number


        private smallBetUnderLimit :Number
		/**
		 * @private
		 */
		public constructor() {
			super();
		}

		/**
		 * 庄/閒 押注上限
		 */
		get SingleBetUpperLimit():Number 
		{
			return this.singleBetUpperLimit;
		}
		/**
		 * 庄/閒 押注上限
		 */
		set  SingleBetUpperLimit(value:Number) 
		{
			this.singleBetUpperLimit = value;
		}
        /**
         * 庄/閒 押注下限
         */
		get SingleBetUnderLimit():Number 
		{
			return this.singleBetUnderLimit;
		}
        /**
         * 庄/閒 押注下限
         */
		set  SingleBetUnderLimit(value:Number) 
		{
			this.singleBetUnderLimit = value;
		}
       /**
         * 和 押注上限
         */
		get TieBetUpperLimit():Number 
		{
			return this.tieBetUpperLimit;
		}
		/**
         * 和 押注上限
         */
		set  TieBetUpperLimit(value:Number) 
		{
			this.tieBetUpperLimit = value;
		}
        /**
         * 和 押注下限
         */
		get TieBetUnderLimit():Number 
		{
			return this.tieBetUnderLimit;
		}
        /**
         * 和 押注下限
         */
		set  TieBetUnderLimit(value:Number) 
		{
			this.tieBetUnderLimit = value;
		}
        /**
         * 庄/閒對 押注上限
         */
		get PairBetUpperLimit():Number 
		{
			return this.pairBetUpperLimit;
		}
        /**
         * 庄/閒對 押注上限
         */
		set  PairBetUpperLimit(value:Number) 
		{
			this.pairBetUpperLimit = value;
		}
        /**
         * 庄/閒對 押注下限
         */
		get PairBetUnderLimit():Number 
		{
			return this.pairBetUnderLimit;
		}
        /**
         * 庄/閒對 押注下限
         */
		set  PairBetUnderLimit(value:Number) 
		{
			this.pairBetUnderLimit = value;
		}
        /**
         * 大 押注上限
         */
		get BigBetUpperLimit():Number 
		{
			return this.bigBetUpperLimit;
		}
        /**
         * 大 押注上限
         */
		set  BigBetUpperLimit(value:Number) 
		{
			this.bigBetUpperLimit = value;
		}
       /**
        * 大押注下限
        */
		get BigBetUnderLimit():Number 
		{
			return this.bigBetUnderLimit;
		}
	    /**
        * 大押注下限
        */
		set  BigBetUnderLimit(value:Number) 
		{
			this.bigBetUnderLimit = value;
		}
		/**
		 * 小 押注上限
		 */
		get SmallBetUpperLimit():Number 
		{
			return this.smallBetUpperLimit;
		}
		/**
		 * 小 押注上限
		 */
		set  SmallBetUpperLimit(value:Number) 
		{
			this.smallBetUpperLimit = value;
		}

        /**
         *  小 押注下限
         */
		get SmallBetUnderLimit():Number 
		{
			return this.smallBetUnderLimit;
		}

        /**
         *  小 押注下限
         */
		set  SmallBetUnderLimit(value:Number) 
		{
			this.smallBetUnderLimit = value;
		}
		



		
		
		
	}
}