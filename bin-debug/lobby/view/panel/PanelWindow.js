var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var panel;
        (function (panel) {
            var PanelWindow = (function (_super) {
                __extends(PanelWindow, _super);
                function PanelWindow($bShake) {
                    if ($bShake === void 0) { $bShake = false; }
                    var _this = _super.call(this) || this;
                    _this.m_bShake = $bShake;
                    return _this;
                }
                PanelWindow.prototype.initilize = function () {
                    this.addEventListener("addedToStage", this.addStage, this);
                    //            m_mcHot = m_mcAsset.getChildByName("mc_hot") as MovieClip;
                };
                PanelWindow.prototype.destroy = function () {
                    this.removeEventListener("click", this.toTop, true);
                    if (this.m_mcHot) {
                        this.m_mcHot.removeEventListener("mouseDown", this.onDown, this);
                        this.m_mcHot = null;
                    }
                    if (this.m_rectangle) {
                        this.m_rectangle = null;
                    }
                    // if (this.m_btnClose)
                    // {
                    //     this.m_btnClose.destroy();
                    //     this.m_btnClose = null;
                    // }
                    if (this.m_mcAsset) {
                        if (this.m_mcAsset.parent) {
                            this.m_mcAsset.parent.removeChild(this.m_mcAsset);
                        }
                        this.m_mcAsset = null;
                    }
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                    if (manager.LobbyManager.getInstance().lobbyView) {
                        if (manager.LobbyManager.getInstance().lobbyView.spWindowLayer.numChildren <= 0) {
                            manager.LobbyManager.getInstance().lobbyView.spTableLayer.touchChildren = true;
                            manager.LobbyManager.getInstance().lobbyView.spGameLayer.touchChildren = true;
                        }
                    }
                };
                PanelWindow.prototype.removeEvent = function () {
                    if (this.stage.hasEventListener("mouseUp")) {
                        this.stage.removeEventListener("mouseUp", this.onUp, this);
                    }
                    //            if (stage.hasEventListener("click"))
                    //            {
                    //                stage.removeEventListener("click", onClick, true);
                    //            }
                };
                PanelWindow.prototype.resize = function (_w, _h) {
                    if (_w === void 0) { _w = 0; }
                    if (_h === void 0) { _h = 0; }
                    var _iX = this.nAssetWidth * 0.5 + this.iLeftSpace;
                    var _iY = this.nAssetHeight * 0.5 + this.iTopSpace + 46;
                    var _iW = manager.LobbyManager.getInstance().stageW - this.nAssetWidth - this.iLeftSpace * 2;
                    var _iH = manager.LobbyManager.getInstance().stageH - this.nAssetHeight - this.iBottomSpace - 46;
                    this.m_rectangle = new egret.Rectangle(0, 0, _iW, _iH);
                    this.m_rectangle.x = _iX;
                    this.m_rectangle.y = _iY;
                    if (this.x < _iX) {
                        this.x = _iX;
                    }
                    else if (this.x > _iX + _iW) {
                        this.x = _iX + _iW;
                    }
                    if (this.y < _iY) {
                        this.y = _iY;
                    }
                    else if (this.y > _iY + _iH) {
                        this.y = _iY + _iH;
                    }
                };
                PanelWindow.prototype.addStage = function (event) {
                    this.removeEventListener("addedToStage", this.addStage, this);
                    this.resize();
                    this.addEvent();
                };
                PanelWindow.prototype.addEvent = function () {
                    this.addEventListener("click", this.toTop, this);
                    if (!this.m_mcHot.hasEventListener("mouseDown")) {
                        this.m_mcHot.addEventListener("mouseDown", this.onDown, this);
                    }
                    //            if (m_bShake)
                    //            {
                    //                stage.addEventListener("click", onClick, true);
                    //            }
                    // this.m_mcHot.buttonMode = true;
                };
                Object.defineProperty(PanelWindow.prototype, "bShake", {
                    set: function (bValue) {
                        if (this.m_bShake != bValue) {
                            this.m_bShake = bValue;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                PanelWindow.prototype.toTop = function (event) {
                    if (this.parent) {
                        this.parent.setChildIndex(this, this.parent.numChildren - 1);
                    }
                };
                PanelWindow.prototype.onDown = function (e) {
                    this.stage.addEventListener("mouseUp", this.onUp, this);
                    if (this.parent) {
                        this.parent.setChildIndex(this, this.parent.numChildren - 1);
                    }
                    // this.startDrag(false, this.m_rectangle);
                    e.stopImmediatePropagation();
                };
                PanelWindow.prototype.onUp = function (e) {
                    // this.nPosition.x = this.x / this.parent.stage.stageWidth;
                    // this.nPosition.y = this.y / this.parent.stage.stageHeight;
                    // this.stopDrag();
                    this.stage.removeEventListener("mouseUp", this.onUp, this);
                    e.stopImmediatePropagation();
                };
                PanelWindow.prototype.activate = function () {
                };
                //        protected function onClick(e:MouseEvent) : void
                //        {
                ////            if (this.sName != "Dialog")
                ////            {
                ////                if (LobbyManager.getInstance().spLobbyView.spWarn.numChildren > 0)
                ////                {
                ////                    return;
                ////                }
                ////            }
                //            if (e.target == m_mcAsset || e.target.parent == m_mcAsset || e.target.parent.parent == m_mcAsset || e.target.parent.parent.parent == m_mcAsset || e.target.parent.parent.parent.parent == m_mcAsset)
                //            {
                //                return;
                //            }
                //            if (m_timer && !m_timer.running)
                //            {
                //                m_bMove = false;
                //                m_timer.reset();
                //                m_timer.start();
                //            }
                //			
                //        }
                //
                //        protected function onTimer() : void
                //        {
                //            if (m_bMove)
                //            {
                //                this.scaleX = 1.01;
                //                this.scaleY = 1.01;
                //            }
                //            else
                //            {
                //                this.scaleX = 1;
                //                this.scaleY = 1;
                //            }
                //            m_bMove = !m_bMove;
                //            
                //        }
                //
                //        protected function onComplete() : void
                //        {
                //            m_timer.stop();
                //            this.scaleX = 1;
                //            this.scaleY = 1;
                //            
                //        }
                PanelWindow.prototype.updateDealerName = function (dis, str, width) {
                    dis.text = str;
                    if (dis.textWidth > width) {
                        str = str.slice(0, 2) + "..." + str.slice(str.length - 2, str.length);
                        dis.text = str;
                    }
                };
                return PanelWindow;
            }(view.BSprite));
            panel.PanelWindow = PanelWindow;
            __reflect(PanelWindow.prototype, "lobby.view.panel.PanelWindow");
        })(panel = view.panel || (view.panel = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=PanelWindow.js.map