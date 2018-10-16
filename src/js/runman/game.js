var Stage = require('../hilo/view/Stage');
var Tween = require('../hilo/tween/Tween');
var TextureAtlas = require('../hilo/util/TextureAtlas');
var Sprite = require('../hilo/view/Sprite');
var Ticker = require('../hilo/util/Ticker');
var Bitmap = require('../hilo/view/Bitmap');
var mediator = require('./mediator');
var resource = require('./resource');
var loading = require('./loading');

/**
 * @module runman/game
 * @requires hilo/view/Stage
 * @requires hilo/util/Ticker
 * @requires hilo/view/Bitmap
 * @requires runman/mediator
 * @requires runman/resource
 * @requires runman/loading
 */

var gameWidth = 320;
var gameHeight = 400;
var stageScaleX = innerWidth / gameWidth;
var stageScaleY = innerHeight / gameHeight;

var game = {
	init: function(stageContainer) {
		this.stageContainer = stageContainer;
		this.bindEvent();
		loading.start();
		resource.load();
	},
	bindEvent: function() {
		var that = this;
		mediator.on('resource:loaded', function(event) {
			loading.loaded(event.detail.num);
		});

		mediator.on('resource:complete', function() {
			that.initGame();
		});
	},
	initGame: function() {
		this._initStage();
		this._initScene();
		mediator.fire('game:init');
	},
	// tick: function(dt) {
	// 	this.fish.x += 3;
	// 	if (this.fish.x > this.stage.width) {
	// 		this.fish.x = -this.fish.width;
	// 	}
	// },
	_initStage: function() {
		//创建舞台
		var stage = (this.stage = new Stage({
			width: gameWidth,
			height: gameHeight,
			renderType: 'canvas',
			container: this.stageContainer,
			scaleX: stageScaleX,
			scaleY: stageScaleY
		}));

		//创建TextureAtlas纹理集
		//TextureAtlas纹理集是将许多小的纹理图片整合到一起的一张大图。
		//这个类可根据一个纹理集数据读取纹理小图、精灵动画等。
		var atlas = (this.atlas = new TextureAtlas({
			image: resource.get('fish'),
			width: 174,
			height: 1512,
			frames: {
				frameWidth: 174,
				frameHeight: 126,
				numFrames: 12
			},
			sprites: {
				fish: { from: 0, to: 7 }
			}
		}));

		//创建晶振
		var ticker = (this.ticker = new Ticker(60));
		ticker.addTick(stage);
		// ticker.addTick(this);
		ticker.addTick(Tween);
		ticker.start();

		//自适应设置
		window.onresize = function() {
			stage.scaleX = innerWidth / gameWidth;
			stage.scaleY = innerHeight / gameHeight;
			stage.resize(gameWidth, gameHeight, true);
		};
	},
	_initScene: function() {
        //创建动画精灵类
        let that = this;
		var fish = (this.fish = new Sprite({
			frames: this.atlas.getSprite('fish'),
			x: 0,
			y: 100,
			interval: 6, // 精灵动画的帧间隔，如果timeBased为true，则单位为毫秒，否则为帧数。
			timeBased: false, //指定精灵动画是否是以时间为基准。默认为false，即以帧为基准。
			loop: true, //判断精灵是否可以循环播放
			onUpdate: function() {
				// console.log(that.stage.width, this.x, this.pivotX);
				if (this.x > that.stage.width - this.pivotX) {
					this.x = -100;
				} else {
					this.x += 3;
				}
			}
		}));

		// var fish = (this.fish = new Bitmap({
		// 	x: 100,
		// 	y: 100,
		// 	image: resource.get('fish'),
		// 	rect: [0, 0, 174, 126],
		// 	onUpdate: function() {
		// 		this.alpha += this.alphaSpeed;
		// 		if (this.alpha < 0) {
		// 			this.alpha = 0;
		// 			this.alphaSpeed *= -1;
		// 		} else if (this.alpha > 1) {
		// 			this.alpha = 1;
		// 			this.alphaSpeed *= -1;
		// 		}
		// 	}
		// }));
		// fish.alphaSpeed = 0.02;

        //创建背景
		var bg = (this.bg = new Bitmap({
			image: resource.get('bg')
		}));

        //将fish类，bg类添加到舞台中
		this.stage.addChild(bg, fish);
	}
};

module.exports = game;
