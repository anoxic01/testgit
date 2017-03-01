var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card = (function (_super) {
    __extends(Card, _super);
    function Card() {
        var _this = _super.call(this) || this;
        _this._isHorizontal = false;
        _this.cardProgress = 0;
        _this.turnCardSpeed = 0.2;
        _this.initView();
        return _this;
    }
    /**
     * 初始化纸牌元素
     */
    Card.prototype.initView = function () {
        this.cardContainer = this.addChild(new egret.Sprite());
        this.cardImage = this.cardContainer.addChild(new CardImage());
        this.cardImage.setCardRes(Card.CARD_BACKGROUND_RES); // 设置背景
        this.cardWidth = this.cardImage.width;
        this.cardHeight = this.cardImage.height;
        this.turnCardFramer = JFramer.getFramer();
        this.turnCardFramer.addFramerCallback(this.onTurnCardFrame, this);
        this.autoSetCardView();
    };
    Card.prototype.onTurnCardFrame = function () {
        this.setCardProgress(this.cardProgress + this.turnCardSpeed);
        if (this.cardProgress >= 1)
            this.stopTurnCard();
    };
    Card.prototype.stopTurnCard = function () {
        this.turnCardFramer.stop();
    };
    Card.prototype.startTurnCard = function () {
        this.turnCardFramer.start();
    };
    Card.prototype.updateCardView = function () {
        var res = this.cardProgress <= 0.5 ? Card.CARD_BACKGROUND_RES : CardUtils.getCardRes(this.cardValue);
        if (this.cardImage.getCardRes() != res) {
            this.cardImage.setCardRes(res);
            if (res != null)
                this.setCardCenterPosition();
        }
        var tempScale = (0.5 - this.cardProgress) / 0.5;
        var tempSkew = this.cardProgress <= 0.5 ? (this.cardProgress / 0.5 * (this.cardHeight * 0.3)) : -((1 - this.cardProgress) * (this.cardHeight * 0.3));
        if (tempScale < 0)
            tempScale = -tempScale;
        if (this.isHorizontal) {
            this.cardContainer.scaleY = tempScale;
            this.cardContainer.skewX = tempSkew;
        }
        else {
            this.cardContainer.scaleX = tempScale;
            this.cardContainer.skewY = tempSkew;
        }
    };
    /**自动设置牌的位置和 */
    Card.prototype.autoSetCardView = function () {
        if (this.isHorizontal) {
            this.cardWidth = this.cardImage.height;
            this.cardHeight = this.cardImage.width;
            this.cardImage.rotation = 90;
            this.cardImage.x = this.cardWidth * 0.5;
        }
        else {
            this.cardWidth = this.cardImage.width;
            this.cardHeight = this.cardImage.height;
            this.cardImage.rotation = 0;
            this.cardImage.x = -this.cardWidth * 0.5;
        }
        this.cardImage.y = -this.cardHeight * 0.5;
        this.setCardCenterPosition();
        this.drawCardBackground();
    };
    /**
     * 画牌背景
     */
    Card.prototype.drawCardBackground = function () {
        this.cardContainer.graphics.clear();
        this.cardContainer.graphics.beginFill(0xeff0f2);
        this.cardContainer.graphics.lineStyle(1, 0x999999);
        this.cardContainer.graphics.drawRoundRect(-this.cardWidth * 0.5, -this.cardHeight * 0.5, this.cardWidth - 1, this.cardHeight - 1, 10, 10);
        this.cardContainer.graphics.endFill();
    };
    /**
     * 设置牌剧中显示
     */
    Card.prototype.setCardCenterPosition = function () {
        if (this.isHorizontal) {
            this.cardImage.x = this.cardWidth * 0.5 - (this.cardWidth - this.cardImage.height) * 0.5;
            this.cardImage.y = -this.cardHeight * 0.5 + (this.cardHeight - this.cardImage.width) * 0.5;
        }
        else {
            this.cardImage.x = -this.cardWidth * 0.5 + (this.cardWidth - this.cardImage.width) * 0.5;
            this.cardImage.y = -this.cardHeight * 0.5 + (this.cardHeight - this.cardImage.height) * 0.5;
        }
    };
    /**当前的翻牌进度 */
    Card.prototype.setCardProgress = function (v) {
        if (v <= 0)
            v = 0; // 限制最小值为0
        if (v >= 1)
            v = 1; // 限制最大值为1
        if (this.cardProgress == v)
            return;
        this.cardProgress = v;
        JDelayFramer.delayFrame(this.updateCardView, this);
    };
    Object.defineProperty(Card.prototype, "isHorizontal", {
        /**是否为横向牌 */
        get: function () { return this._isHorizontal; },
        set: function (v) {
            if (this._isHorizontal == v)
                return;
            this._isHorizontal = v;
            this.autoSetCardView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "cardValue", {
        /**当前的牌面值 */
        get: function () { return this._cardValue; },
        set: function (v) {
            if (this._cardValue == v)
                return;
            this._cardValue = v;
            if (this.cardProgress == 1) {
                if (v == null)
                    this.cardImage.setCardRes(null);
                else
                    JDelayFramer.delayFrame(this.updateCardView, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Card.prototype.turnCard = function () {
        this.startTurnCard();
    };
    Object.defineProperty(Card.prototype, "isTurnedCard", {
        /**当前的牌是否已经处于翻过来的状态 */
        get: function () { return this.cardProgress != 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * 重置
     */
    Card.prototype.reset = function () {
        this.cardValue = null;
        this.setCardProgress(0);
        this.isHorizontal = false;
        this.stopTurnCard();
    };
    Card.prototype.dispose = function () {
        this.turnCardFramer.dispose();
        this.turnCardFramer = null;
        _super.prototype.dispose.call(this);
    };
    return Card;
}(BaseView));
/**
 * 卡牌背面的素材资源名称
 */
Card.CARD_BACKGROUND_RES = "card_bg_png";
__reflect(Card.prototype, "Card");
//# sourceMappingURL=Card.js.map