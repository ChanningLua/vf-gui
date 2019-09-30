import UIBase from "../UIBase";
import { _getSourcePath } from "../Utils";
/**
 * UI 序列图动画
 *
 * @class
 * @extends PIXI.UI.UIBase
 * @memberof PIXI.UI
 */
export default class AnimatedSprite extends UIBase {
    constructor() {
        super();
        this._animationName = "";
        /**
         * 是否自动播放
         */
        this.autoPlay = false;
        /**
         * 播放速度
        */
        this._animationSpeed = 1;
        /**
         * 是否循环
         */
        this._loop = true;
    }
    get animationName() {
        return this._animationName;
    }
    set animationName(value) {
        this._animationName = value;
        this.update();
    }
    get source() {
        return this._source;
    }
    set source(value) {
        if (_getSourcePath) {
            value = _getSourcePath(value, AnimatedSprite);
        }
        this._source = value;
        this.update();
    }
    get animationSpeed() {
        return this._animationSpeed;
    }
    set animationSpeed(value) {
        this._animationSpeed = value;
        this.dalayDraw = true;
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
        this.dalayDraw = true;
    }
    /** 跳转到第N帧并播放 */
    gotoAndPlay(frameNumber) {
        if (this._curAnimation)
            this._curAnimation.sp.gotoAndPlay(frameNumber);
    }
    /** 跳转到第N帧并停止 */
    gotoAndStop(frameNumber) {
        if (this._curAnimation)
            this._curAnimation.sp.gotoAndStop(frameNumber);
    }
    /** 停止 */
    stop() {
        if (this._curAnimation)
            this._curAnimation.sp.stop();
    }
    /** 播放 */
    play() {
        if (this._curAnimation)
            this._curAnimation.sp.play();
    }
    update() {
        let { _source, _animationName, _animatedSprites, _curAnimation } = this;
        if (_source === undefined) {
            return;
        }
        if (_animationName === "") {
            return;
        }
        if (_animatedSprites === undefined || _animatedSprites.size == 0) {
            _animatedSprites = new Map();
            for (let key in _source.animations) {
                _animatedSprites.set(key, new PIXI.AnimatedSprite(_source.animations[key]));
            }
            if (_animatedSprites.size) {
                let sp = _animatedSprites.get(_animationName);
                if (sp) {
                    this.container.addChild(sp);
                    if (this.autoPlay) {
                        sp.play();
                    }
                    _curAnimation = { name: _animationName, sp: sp };
                }
            }
        }
        if (_curAnimation) {
            if (_curAnimation.name !== _animationName) {
                _curAnimation.sp.stop();
                this.container.removeChild(_curAnimation.sp);
                let sp = _animatedSprites.get(_animationName);
                if (sp) {
                    this.container.addChild(sp);
                    _curAnimation.name = _animationName;
                    _curAnimation.sp = sp;
                    if (this.autoPlay) {
                        sp.play();
                    }
                }
            }
            _curAnimation.sp.loop = this._loop;
            _curAnimation.sp.animationSpeed = this._animationSpeed;
        }
        this._curAnimation = _curAnimation;
        this._animatedSprites = _animatedSprites;
    }
}
//# sourceMappingURL=AnimatedSprite.js.map