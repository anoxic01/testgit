module lobby.model.struct {
	export class ComplexGameRecordStruct {
		public var BaseRecord		:BaseRecordStruct;
		public var BaccaratData		:BaccaratGameRecordStruct;
		public var SicboData		:SicboGameRecordStruct;
		public var RouletteData		:RouletteGameRecordStruct;
		public var DragonTigerData	:DragonTigerGameRecordStruct;
		
		public constructor() {
		}
		
		public function init(_oData:Object):void {
			updateBaseRecord( _oData.BaseRecord );
			
			if( _oData.BaseRecord.GameID == GameDefine.BAC ){
				updateBac(_oData.BaccaratData);
			}
			else if( _oData.BaseRecord.GameID == GameDefine.SIC ){
				updateSic( _oData.SicboData );
			}
			else if( _oData.BaseRecord.GameID == GameDefine.ROU ){
				updateRou( _oData.RouletteData );
			}	
			else if( _oData.BaseRecord.GameID == GameDefine.DTF ){
				updateDtf( _oData.DragonTigerData );
			}
			
		}
		
		
		public function updateBaseRecord(_oData:Object):void {
			BaseRecord = new BaseRecordStruct();
			BaseRecord.GameID = _oData.GameID;
			
			BaseRecord.BetJsonString = _oData.BetJsonString;
			BaseRecord.WinJsonString = _oData.WinJsonString;
			
			BaseRecord.GoldCoinBet = _oData.GoldCoinBet;
			
			BaseRecord.TotalWin = _oData.TotalWin;
			
			BaseRecord.RakeAmount = _oData.RakeAmount;
			BaseRecord.RakeResult = _oData.RakeResult;
			
			BaseRecord.ResultAmount = _oData.ResultAmount;
			BaseRecord.GCoinBudget = _oData.GCoinBudget;
			BaseRecord.TotalCredit = _oData.TotalCredit;
			
	
			BaseRecord.BetCreateDateTime = _oData.BetCreateDateTime;
			BaseRecord.RecordGameNumber = _oData.RecordGameNumber;
			
			BaseRecord.TableID = _oData.TableID;			
			BaseRecord.GameNumber = _oData.GameNumber;	
			BaseRecord.ShoeNumber = _oData.ShoeNumber;	
			
			
			BaseRecord.IsResult = _oData.IsResult;				
			BaseRecord.GameCreateDateTime = _oData.GameCreateDateTime;	
			
			BaseRecord.SimpleGameResultString = _oData.SimpleGameResultString;				
			BaseRecord.Display_GameRecord = _oData.Display_GameRecord;	
	
			BaseRecord.PlayVideoAddress = _oData.PlayVideoAddress;				
			BaseRecord.PlayVideoName = _oData.PlayVideoName;	
			BaseRecord.PlayVideoAppName = _oData.PlayVideoAppName;
			
			BaseRecord.VideoUrl = _oData.VideoUrl;		//組好的url

		}
		
		public function updateBac(_oData:Object):void {
			BaccaratData = new BaccaratGameRecordStruct();
			BaccaratData.BankerCard1 =_oData.BankerCard1;
			BaccaratData.BankerCard2 =_oData.BankerCard2;
			BaccaratData.BankerCard3 =_oData.BankerCard3;
			BaccaratData.PlayerCard1 =_oData.PlayerCard1;
			BaccaratData.PlayerCard2 =_oData.PlayerCard2;
			BaccaratData.PlayerCard3 =_oData.PlayerCard3;
			
			BaccaratData.BankerTotalPoint =_oData.BankerTotalPoint;
			BaccaratData.PlayerTotalPoint =_oData.PlayerTotalPoint;
			
			BaccaratData.BaccaratObjectBet =_oData.BaccaratObjectBet;
			BaccaratData.BaccaratObjectWin =_oData.BaccaratObjectWin;
			
			
			BaccaratData.BankerBet =_oData.BankerBet;
			BaccaratData.PlayerBet =_oData.PlayerBet;
			BaccaratData.TieBet =_oData.TieBet;
			BaccaratData.BankerPairBet =_oData.BankerPairBet;
			BaccaratData.PlayerPairBet =_oData.PlayerPairBet;
			BaccaratData.SmallBet =_oData.SmallBet;
			BaccaratData.BigBet =_oData.BigBet;
			
			
			BaccaratData.BankerWin =_oData.BankerWin;
			BaccaratData.PlayerWin =_oData.PlayerWin;
			BaccaratData.TieWin =_oData.TieWin;
			BaccaratData.BankerPairWin =_oData.BankerPairWin;
			BaccaratData.PlayerPairWin =_oData.PlayerPairWin;
			BaccaratData.SmallWin =_oData.SmallWin;
			BaccaratData.BigWin =_oData.BigWin;
			
		}
		public function updateSic( _oData:Object ):void {
			SicboData = new SicboGameRecordStruct();
			SicboData.Dice_1 = _oData.Dice_1;
			SicboData.Dice_2 = _oData.Dice_2;
			SicboData.Dice_3 = _oData.Dice_3;
			
			SicboData.Bet_Big = _oData.Bet_Big;
			SicboData.Bet_Small = _oData.Bet_Small;
			SicboData.Bet_Odd = _oData.Bet_Odd;
			SicboData.Bet_Even = _oData.Bet_Even;
			
			SicboData.Win_Big = _oData.Win_Big;
			SicboData.Win_Small = _oData.Win_Small;
			SicboData.Win_Odd = _oData.Win_Odd;
			SicboData.Win_Even = _oData.Win_Even;				
			
			SicboData.SicboObjectBet = _oData.SicboObjectBet;
			SicboData.SicboObjectWin = _oData.SicboObjectWin;
		
			
		}
		public function updateRou( _oData:Object  ):void {
			RouletteData = new RouletteGameRecordStruct();
			
			RouletteData.RouletteNumber = _oData.RouletteNumber;

			RouletteData.Bet_Red = _oData.Bet_Red;
			RouletteData.Bet_Black = _oData.Bet_Black;
			RouletteData.Bet_Big = _oData.Bet_Big;
			RouletteData.Bet_Small = _oData.Bet_Small;
			RouletteData.Bet_Odd = _oData.Bet_Odd;
			RouletteData.Bet_Even = _oData.Bet_Even;
	
			RouletteData.Win_Red = _oData.Win_Red;
			RouletteData.Win_Black = _oData.Win_Black;
			RouletteData.Win_Big = _oData.Win_Big;
			RouletteData.Win_Small = _oData.Win_Small;
			RouletteData.Win_Odd = _oData.Win_Odd;
			RouletteData.Win_Even = _oData.Win_Even;	
			
			RouletteData.RouletteObjectBet = _oData.RouletteObjectBet;
			RouletteData.RouletteObjectWin = _oData.RouletteObjectWin;
		
		}
		public function updateDtf( _oData:Object ):void {
			DragonTigerData = new DragonTigerGameRecordStruct();
			DragonTigerData.DragonCard = _oData.DragonCard;
			DragonTigerData.TigerCard = _oData.TigerCard;
			DragonTigerData.DragonPoint = _oData.DragonPoint;
			DragonTigerData.TigerPoint = _oData.TigerPoint;
			
			DragonTigerData.Bet_Dragon = _oData.Bet_Dragon;
			DragonTigerData.Bet_Tiger = _oData.Bet_Tiger;
			DragonTigerData.Bet_Tie = _oData.Bet_Tie;
			
			DragonTigerData.Win_Dragon = _oData.Win_Dragon;
			DragonTigerData.Win_Tiger = _oData.Win_Tiger;
			DragonTigerData.Win_Tie = _oData.Win_Tie;
			
			DragonTigerData.DragonTigerObjectBet = _oData.DragonTigerObjectBet;
			DragonTigerData.DragonTigerObjectWin = _oData.DragonTigerObjectWin;

		}		
		
		
	}
}