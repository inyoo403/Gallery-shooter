export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }


    preload() {
        this.load.image('black', 'assets/images/black.png');
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'black').setOrigin(0);

        this.options = ['Start Game', 'Leaderboard'];
        this.currentSelection = 0;

        this.optionTexts = this.options.map((option, index) => {
            return this.add.text(500, 400 + index * 40, option, {
                fontSize: '32px',
                fill: '#ffffff',
                fontFamily: 'Courier'
            }).setOrigin(0.5);
        });

        this.arrow = this.add.text(
            this.optionTexts[0].x - this.optionTexts[0].displayWidth / 2 - 30,
            this.optionTexts[0].y,
            '▶',
            {
                fontSize: '15px',
                fill: '#ffffff',
                fontFamily: 'Courier'
            }
        ).setOrigin(0.5);

        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.blinkArrow();
    }

    update() {
        this.bg.tilePositionY -= 0.5;

        if (Phaser.Input.Keyboard.JustDown(this.wKey)) {
            this.currentSelection = (this.currentSelection - 1 + this.options.length) % this.options.length;
            this.blinkArrow();
        }
        if (Phaser.Input.Keyboard.JustDown(this.sKey)) {
            this.currentSelection = (this.currentSelection + 1) % this.options.length;
            this.blinkArrow();
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            const selected = this.options[this.currentSelection];
            if (selected === 'Start Game') {
                this.scene.start('GameScene');
            } else if (selected === 'Leaderboard') {
                this.scene.start('LeaderboardScene');
            }
        }

        const targetText = this.optionTexts[this.currentSelection];
        this.arrow.x = targetText.x - targetText.displayWidth / 2 - 30;
        this.arrow.y = targetText.y;
    }

    blinkArrow() {
        this.tweens.add({
            targets: this.arrow,
            alpha: 0,
            duration: 200,
            yoyo: true,
            repeat: 1,
            hold: 100
        });
    }
}
