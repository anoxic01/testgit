module lobby.model.struct {
	export class ComplexGameRecordStruct {
		public BaseRecord		:BaseRecordStruct;
		public BaccaratData		:BaccaratGameRecordStruct;
		public SicboData		:SicboGameRecordStruct;
		public RouletteData		:RouletteGameRecordStruct;
		public DragonTigerData	:DragonTigerGameRecordStruct;
		
		public constructor() {
		}
		
		public init(_oData):void {
			this.updateBaseRecord( _oData.BaseRecord );
			
			if( _oData.BaseRecord.GameID == define.GameDefine.BAC ){
				this.updateBac(_oData.BaccaratData);
			}
			else if( _oData.BaseRecord.GameID == define.GameDefine.SIC ){
				this.updateSic( _oData.SicboData );
			}
			else if( _oData.BaseRecord.GameID == define.GameDefine.ROU ){
				this.updateRou( _oData.RouletteData );
			}	
			else if( _oData.BaseRecord.GameID == define.GameDefine.DTF ){
				this.updateDtf( _oData.DragonTigerData );
			}
			
		}
		
		
		public updateBaseRecord(_oData):void {
			this.BaseRecord = new BaseRecordStruct();
			this.BaseRecord.GameID = _oData.GameID;
			
			this.BaseRecord.BetJsonString = _oData.BetJsonString;
			this.BaseRecord.WinJsonString = _oData.WinJsonString;
			
			this.BaseRecord.GoldCoinBet = _oData.GoldCoinBet;
			
			this.BaseRecord.TotalWin = _oData.TotalWin;
			
			this.BaseRecord.RakeAmount = _oData.RakeAmount;
			this.BaseRecord.RakeResult = _oData.RakeResult;
			
			this.BaseRecord.ResultAmount = _oData.ResultAmount;
			this.BaseRecord.GCoinBudget = _oData.GCoinBudget;
			this.BaseRecord.TotalCredit = _oData.TotalCredit;
			
	
			this.BaseRecord.BetCreateDateTime = _oData.BetCreateDateTime;
			this.BaseRecord.RecordGameNumber = _oData.RecordGameNumber;
			
			this.BaseRecord.TableID = _oData.TableID;			
			this.BaseRecord.GameNumber = _oData.GameNumber;	
			this.BaseRecord.ShoeNumber = _oData.ShoeNumber;	
			
			
			this.BaseRecord.IsResult = _oData.IsResult;				
			this.BaseRecord.GameCreateDateTime = _oData.GameCreateDateTime;	
			
			this.BaseRecord.SimpleGameResultString = _oData.SimpleGameResultString;				
			this.BaseRecord.Display_GameRecord = _oData.Display_GameRecord;	
	
			this.BaseRecord.PlayVideoAddress = _oData.PlayVideoAddress;				
			this.BaseRecord.PlayVideoName = _oData.PlayVideoName;	
			this.BaseRecord.PlayVideoAppName = _oData.PlayVideoAppName;
			
			this.BaseRecord.VideoUrl = _oData.VideoUrl;		//組好的url

		}
		
		public updateBac(_oData):void {
			this.BaccaratData = new BaccaratGameRecordStruct();
			this.BaccaratData.BankerCard1 =_oData.BankerCard1;
			this.BaccaratData.BankerCard2 =_oData.BankerCard2;
			this.BaccaratData.BankerCard3 =_oData.BankerCard3;
			this.BaccaratData.PlayerCard1 =_oData.PlayerCard1;
			this.BaccaratData.PlayerCard2 =_oData.PlayerCard2;
			this.BaccaratData.PlayerCard3 =_oData.PlayerCard3;
			
			this.BaccaratData.BankerTotalPoint =_oData.BankerTotalPoint;
			this.BaccaratData.PlayerTotalPoint =_oData.PlayerTotalPoint;
			
			this.BaccaratData.BaccaratObjectBet =_oData.BaccaratObjectBet;
			this.BaccaratData.BaccaratObjectWin =_oData.BaccaratObjectWin;
			
			
			this.BaccaratData.BankerBet =_oData.BankerBet;
			this.BaccaratData.PlayerBet =_oData.PlayerBet;
			this.BaccaratData.TieBet =_oData.TieBet;
			this.BaccaratData.BankerPairBet =_oData.BankerPairBet;
			this.BaccaratData.PlayerPairBet =_oData.PlayerPairBet;
			this.BaccaratData.SmallBet =_oData.SmallBet;
			this.BaccaratData.BigBet =_oData.BigBet;
			
			
			this.BaccaratData.BankerWin =_oData.BankerWin;
			this.BaccaratData.PlayerWin =_oData.PlayerWin;
			this.BaccaratData.TieWin =_oData.TieWin;
			this.BaccaratData.BankerPairWin =_oData.BankerPairWin;
			this.BaccaratData.PlayerPairWin =_oData.PlayerPairWin;
			this.BaccaratData.SmallWin =_oData.SmallWin;
			this.BaccaratData.BigWin =_oData.BigWin;
			
		}
		public updateSic( _oData ):void {
			this.SicboData = new SicboGameRecordStruct();
			this.SicboData.Dice_1 = _oData.Dice_1;
			this.SicboData.Dice_2 = _oData.Dice_2;
			this.SicboData.Dice_3 = _oData.Dice_3;
			
			this.SicboData.Bet_Big = _oData.Bet_Big;
			this.SicboData.Bet_Small = _oData.Bet_Small;
			this.SicboData.Bet_Odd = _oData.Bet_Odd;
			this.SicboData.Bet_Even = _oData.Bet_Even;
			
			this.SicboData.Win_Big = _oData.Win_Big;
			this.SicboData.Win_Small = _oData.Win_Small;
			this.SicboData.Win_Odd = _oData.Win_Odd;
			this.SicboData.Win_Even = _oData.Win_Even;				
			
			this.SicboData.SicboObjectBet = _oData.SicboObjectBet;
			this.SicboData.SicboObjectWin = _oData.SicboObjectWin;
		
			
		}
		public updateRou( _oData  ):void {
			this.RouletteData = new RouletteGameRecordStruct();
			
			this.RouletteData.RouletteNumber = _oData.RouletteNumber;

			this.RouletteData.Bet_Red = _oData.Bet_Red;
			this.RouletteData.Bet_Black = _oData.Bet_Black;
			this.RouletteData.Bet_Big = _oData.Bet_Big;
			this.RouletteData.Bet_Small = _oData.Bet_Small;
			this.RouletteData.Bet_Odd = _oData.Bet_Odd;
			this.RouletteData.Bet_Even = _oData.Bet_Even;
	
			this.RouletteData.Win_Red = _oData.Win_Red;
			this.RouletteData.Win_Black = _oData.Win_Black;
			this.RouletteData.Win_Big = _oData.Win_Big;
			this.RouletteData.Win_Small = _oData.Win_Small;
			this.RouletteData.Win_Odd = _oData.Win_Odd;
			this.RouletteData.Win_Even = _oData.Win_Even;	
			
			this.RouletteData.RouletteObjectBet = _oData.RouletteObjectBet;
			this.RouletteData.RouletteObjectWin = _oData.RouletteObjectWin;
		
		}
		public updateDtf( _oData ):void {
			this.DragonTigerData = new DragonTigerGameRecordStruct();
			this.DragonTigerData.DragonCard = _oData.DragonCard;
			this.DragonTigerData.TigerCard = _oData.TigerCard;
			this.DragonTigerData.DragonPoint = _oData.DragonPoint;
			this.DragonTigerData.TigerPoint = _oData.TigerPoint;
			
			this.DragonTigerData.Bet_Dragon = _oData.Bet_Dragon;
			this.DragonTigerData.Bet_Tiger = _oData.Bet_Tiger;
			this.DragonTigerData.Bet_Tie = _oData.Bet_Tie;
			
			this.DragonTigerData.Win_Dragon = _oData.Win_Dragon;
			this.DragonTigerData.Win_Tiger = _oData.Win_Tiger;
			this.DragonTigerData.Win_Tie = _oData.Win_Tie;
			
			this.DragonTigerData.DragonTigerObjectBet = _oData.DragonTigerObjectBet;
			this.DragonTigerData.DragonTigerObjectWin = _oData.DragonTigerObjectWin;

		}		
		
		
	}
}