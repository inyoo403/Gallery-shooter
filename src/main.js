"use strict";

var my = {sprite: {}};

import GameScene from './Scenes/GameScene.js';
import GameOverScene from './Scenes/GameOverScene.js';
import MissionCompleteScene from './Scenes/MissionCompleteScene.js';
import MainMenuScene from './Scenes/MainMenuScene.js';
import LeaderboardScene from './Scenes/LeaderboardScene.js';

let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    width: 1000,
    height: 800,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [MainMenuScene, LeaderboardScene, GameScene, GameOverScene, MissionCompleteScene]
};

const game = new Phaser.Game(config);
