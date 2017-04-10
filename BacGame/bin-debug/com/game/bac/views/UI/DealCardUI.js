var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DealCardUI = (function (_super) {
    __extends(DealCardUI, _super);
    function DealCardUI() {
        return _super.call(this) || this;
    }
    DealCardUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    DealCardUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.bankerCardPos = new egret.Point(320, 180);
        this.playerCardPos = new egret.Point(105, 180);
        this.dealCardPos = new egret.Point(210, 480);
        this.bankerCard = new Card();
        this.playerCard = new Card();
        this.flyCards();
    };
    DealCardUI.prototype.flyCards = function () {
        this.playerCard.x = this.dealCardPos.x;
        this.playerCard.y = this.dealCardPos.y;
        this.addChild(this.playerCard);
        this.bankerCard.x = this.dealCardPos.x;
        this.bankerCard.y = this.dealCardPos.y;
        this.addChild(this.bankerCard);
        JDelayTimer.delayTime(this.flyBankerCard, this, 10);
        JDelayTimer.delayTime(this.flyPlayerCard, this, 500);
    };
    DealCardUI.prototype.flyBankerCard = function () {
        this.dealBankerCardEffect = new HalfMoveTarget(this.bankerCard, this.dealCardPos, this.bankerCardPos, 10);
        this.dealBankerCardEffect.setComplete(this.onDealBankerCardComplete, this);
        this.dealBankerCardEffect.start();
    };
    DealCardUI.prototype.flyPlayerCard = function () {
        this.dealPlayerCardEffect = new HalfMoveTarget(this.playerCard, this.dealCardPos, this.playerCardPos, 10);
        this.dealPlayerCardEffect.setComplete(this.onDealPlayerCardComplete, this);
        this.dealPlayerCardEffect.start();
    };
    DealCardUI.prototype.onDealBankerCardComplete = function () {
        this.dealBankerCardEffect = null;
        this.bankerCard.turnCard();
    };
    DealCardUI.prototype.onDealPlayerCardComplete = function () {
        this.dealPlayerCardEffect = null;
        this.playerCard.turnCard();
    };
    return DealCardUI;
}(BaseComponent));
__reflect(DealCardUI.prototype, "DealCardUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=DealCardUI.js.map