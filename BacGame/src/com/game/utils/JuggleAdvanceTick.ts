class JuggleAdvanceTick extends egret.HashObject
{
    /**
     *每次执行的间隔 
    */		
    public juggleInterval:number = 0;
    private onTick:Function;
    private thisArg:Object;
    private time:number = 0;
    public onJuggle(value:number):void
    {
        this.time+=value;
        while(this.time>=this.juggleInterval)
        {
            this.time-=this.juggleInterval;
            if(this.onTick!=null)
            {
                this.onTick.apply(this.thisArg);
            } 
        }
    }
    public setTick(tick:Function,thisArg:any)
    {
        this.onTick = tick;
        this.thisArg = thisArg;
    }
    public setFrameRate(frameRate:number):void
    {
        if(frameRate<=0)return;
        this.juggleInterval = 1000/frameRate;
    }
    /**
     * 清除time
     */		
    public clear():void
    {
        this.time = 0;
    }
    public dispose():void
    {
        this.time = 0;
        this.juggleInterval = 0;
        this.onTick = null;
    }
}