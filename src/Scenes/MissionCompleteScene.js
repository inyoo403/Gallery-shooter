export default class MissionCompleteScene extends Phaser.Scene {
    constructor() {
        super('MissionCompleteScene');
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        this.add.text(500, 200, '🎉 Mission Complete!', {
            fontSize: '40px',
            color: '#00ff00'
        }).setOrigin(0.5);

        this.add.text(500, 260, `Score: ${this.finalScore}`, {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(500, 320, 'Enter your initials:', {
            fontSize: '24px',
            color: '#cccccc'
        }).setOrigin(0.5);

        this.initials = '';
        this.initialsText = this.add.text(500, 360, '', {
            fontSize: '32px',
            color: '#ffff00'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown', (event) => {
            if (/^[A-Z]$/i.test(event.key) && this.initials.length < 3) {
                this.initials += event.key.toUpperCase();
            } else if (event.key === 'Backspace') {
                this.initials = this.initials.slice(0, -1);
            } else if (event.key === 'Enter' || event.key === ' ') {
                if (this.initials.length > 0) {
                    this.saveScoreAndGo();
                }
            }
            this.initialsText.setText(this.initials);
        });
    }

    saveScoreAndGo() {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push({ initials: this.initials, score: this.finalScore });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        this.scene.start('LeaderboardScene');
    }
}
