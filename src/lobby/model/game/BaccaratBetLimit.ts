module lobby.model.game {
	export class BaccaratBetLimit extends GameBetLimitBase {
		
        private singleBetUpperLimit:number;


        private singleBetUnderLimit:number;


        private tieBetUpperLimit:number


        private tieBetUnderLimit:number


        private pairBetUpperLimit:number


        private pairBetUnderLimit:number



        private bigBetUpperLimit:number;



        private bigBetUnderLimit :number



        private smallBetUpperLimit :number


        private smallBetUnderLimit :number
		/**
		 * @private
		 */
		public constructor() {
			super();
		}

		/**
		 * 庄/閒 押注上限
		 */
		get SingleBetUpperLimit():number 
		{
			return this.singleBetUpperLimit;
		}
		/**
		 * 庄/閒 押注上限
		 */
		set  SingleBetUpperLimit(value:number) 
		{
			this.singleBetUpperLimit = value;
		}
        /**
         * 庄/閒 押注下限
         */
		get SingleBetUnderLimit():number 
		{
			return this.singleBetUnderLimit;
		}
        /**
         * 庄/閒 押注下限
         */
		set  SingleBetUnderLimit(value:number) 
		{
			this.singleBetUnderLimit = value;
		}
       /**
         * 和 押注上限
         */
		get TieBetUpperLimit():number 
		{
			return this.tieBetUpperLimit;
		}
		/**
         * 和 押注上限
         */
		set  TieBetUpperLimit(value:number) 
		{
			this.tieBetUpperLimit = value;
		}
        /**
         * 和 押注下限
         */
		get TieBetUnderLimit():number 
		{
			return this.tieBetUnderLimit;
		}
        /**
         * 和 押注下限
         */
		set  TieBetUnderLimit(value:number) 
		{
			this.tieBetUnderLimit = value;
		}
        /**
         * 庄/閒對 押注上限
         */
		get PairBetUpperLimit():number 
		{
			return this.pairBetUpperLimit;
		}
        /**
         * 庄/閒對 押注上限
         */
		set  PairBetUpperLimit(value:number) 
		{
			this.pairBetUpperLimit = value;
		}
        /**
         * 庄/閒對 押注下限
         */
		get PairBetUnderLimit():number 
		{
			return this.pairBetUnderLimit;
		}
        /**
         * 庄/閒對 押注下限
         */
		set  PairBetUnderLimit(value:number) 
		{
			this.pairBetUnderLimit = value;
		}
        /**
         * 大 押注上限
         */
		get BigBetUpperLimit():number 
		{
			return this.bigBetUpperLimit;
		}
        /**
         * 大 押注上限
         */
		set  BigBetUpperLimit(value:number) 
		{
			this.bigBetUpperLimit = value;
		}
       /**
        * 大押注下限
        */
		get BigBetUnderLimit():number 
		{
			return this.bigBetUnderLimit;
		}
	    /**
        * 大押注下限
        */
		set  BigBetUnderLimit(value:number) 
		{
			this.bigBetUnderLimit = value;
		}
		/**
		 * 小 押注上限
		 */
		get SmallBetUpperLimit():number 
		{
			return this.smallBetUpperLimit;
		}
		/**
		 * 小 押注上限
		 */
		set  SmallBetUpperLimit(value:number) 
		{
			this.smallBetUpperLimit = value;
		}

        /**
         *  小 押注下限
         */
		get SmallBetUnderLimit():number 
		{
			return this.smallBetUnderLimit;
		}

        /**
         *  小 押注下限
         */
		set  SmallBetUnderLimit(value:number) 
		{
			this.smallBetUnderLimit = value;
		}
		



		
		
		
	}
}