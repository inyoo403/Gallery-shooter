export default class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super('LeaderboardScene');
    }

    create() {
        this.add.text(500, 100, 'Leaderboard', {
            fontSize: '40px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const data = JSON.parse(localStorage.getItem('leaderboard')) || [];

        data.sort((a, b) => b.score - a.score);

        data.slice(0, 5).forEach((entry, index) => {
            this.add.text(500, 180 + index * 40, `${index + 1}. ${entry.initials} - ${entry.score}`, {
                fontSize: '28px',
                color: '#ffffaa'
            }).setOrigin(0.5);
        });

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(500, 450, 'Press SPACE to return', {
            fontSize: '20px',
            color: '#888'
        }).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start('MainMenuScene');
        }
    }
}
