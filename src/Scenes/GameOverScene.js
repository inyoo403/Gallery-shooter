export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create(data) {
        this.add.text(500, 300, 'GAME OVER!', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(500, 380, `Score: ${data.score}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(500, 430, `Phase: ${data.phase}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.add.text(500, 500, 'Press SPACE to restart', { fontSize: '24px', fill: '#ccc' }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('MainMenuScene');
        });
    }
}
