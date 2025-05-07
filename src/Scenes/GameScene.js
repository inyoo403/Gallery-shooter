class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    
    preload() {
        this.load.image('black', 'assets/images/black.png');
        this.load.image('player', 'assets/images/player.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('drone', 'assets/images/drone.png');
        this.load.image('fighter', 'assets/images/fighter.png');
        this.load.image('boss', 'assets/images/boss.png');
        this.load.image('enemyBullet', 'assets/images/enemy_bullet.png');
        this.load.image('boss_guided', 'assets/images/boss_guided.png');
        this.load.image('damage3', 'assets/images/damage3.png');
        this.load.image('damage2', 'assets/images/damage2.png');
        this.load.image('damage1', 'assets/images/damage1.png');
        this.load.image('life', 'assets/images/life.png');
        this.load.audio('sfx_twoTone', 'assets/audio/sfx_twoTone.ogg');
        for (let i = 0; i <= 9; i++) {
            this.load.image(`numeral${i}`, `assets/images/numeral${i}.png`);
        }
        this.load.image('boss_homing', 'assets/images/boss_homing.png');
    }

    /*create() {
        this.bulletLevel = 1;
        this.enemyConfig = {
            drone:   { scale: 0.5, hp: 1, score: 20 },
            fighter: { scale: 0.5, hp: 1, score: 5 },
            boss:    { scale: 1.0, hp: 50, score: 0 }
        };

        this.sfx_twoTone = this.sound.add('sfx_twoTone');
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'black').setOrigin(0);
        this.player = this.add.sprite(500, 700, 'player').setScale(0.5);

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.fireCooldown = 0;
        this.fireRate = 150;

        this.bullets = [];
        this.enemyBullets = [];
        this.drones = [];
        this.fighters = [];
        this.boss = null;

        this.playerHealth = 5;
        this.lifeIcons = [];
        for (let i = 0; i < this.playerHealth; i++) {
            const icon = this.add.image(this.scale.width - 30 - i * 34, 20, 'life').setScale(0.7).setOrigin(1, 0);
            this.lifeIcons.push(icon);
        }

        this.bossBullets = this.physics.add.group({
            defaultKey: 'boss_guided', maxSize: 300, enableBody: true
        });

        this.phase = 1;
        this.phaseCleared = false;
        this.phaseReady = false;
        this.isBossPhase = false;
        this.score = 0;
        this.scoreSprites = [];
        this.updateScoreDisplay();

        this.phaseText = this.add.text(500, 400, '', {
            fontSize: '40px', fill: '#ffffff'
        }).setOrigin(0.5).setDepth(10).setVisible(false);

        if (!this.anims.exists('enemy-destroy')) {
            this.anims.create({
                key: 'enemy-destroy',
                frames: [
                    { key: 'damage3' },
                    { key: 'damage2' },
                    { key: 'damage1' }
                ],
                frameRate: 8,
                repeat: 0
            });
        }

        this.spawnPhase(this.phase);
        window.setPhase = (phaseNum) => {
            this.phase = phaseNum;
            this.spawnPhase(this.phase);
            console.log(`⏩ Forced to Phase ${phaseNum}`);
        };

        this.shopGroup = this.add.group(); // 상점 요소 그룹
        this.shopVisible = false;
        this.gameOverTriggered = false;
    }*/

    create() {
        if (!GameScene.animsInitialized) {
            this.anims.create({
                key: 'enemy-destroy',
                frames: [
                    { key: 'damage3' },
                    { key: 'damage2' },
                    { key: 'damage1' }
                ],
                frameRate: 8,
                repeat: 0
            });
            GameScene.animsInitialized = true;
        }

        this.init_game(); 
    }

    init_game() {
        this.bulletLevel = 1;
        this.enemyConfig = {
            drone:   { scale: 0.5, hp: 1, score: 20 },
            fighter: { scale: 0.5, hp: 1, score: 5 },
            boss:    { scale: 1.0, hp: 50, score: 0 }
        };

        this.sfx_twoTone = this.sound.add('sfx_twoTone');
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'black').setOrigin(0);
        this.player = this.add.sprite(500, 700, 'player').setScale(0.5);

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.fireCooldown = 0;
        this.fireRate = 150;

        this.bullets = [];
        this.enemyBullets = [];
        this.drones = [];
        this.fighters = [];
        this.boss = null;

        this.playerHealth = 5;
        this.lifeIcons = [];
        for (let i = 0; i < this.playerHealth; i++) {
            const icon = this.add.image(this.scale.width - 30 - i * 34, 20, 'life').setScale(0.7).setOrigin(1, 0);
            this.lifeIcons.push(icon);
        }

        this.bossBullets = this.physics.add.group({
            defaultKey: 'boss_guided', maxSize: 300, enableBody: true
        });

        this.phase = 1;
        this.phaseCleared = false;
        this.phaseReady = false;
        this.isBossPhase = false;
        this.score = 0;
        this.scoreSprites = [];
        this.updateScoreDisplay();

        this.phaseText = this.add.text(500, 400, '', {
            fontSize: '40px', fill: '#ffffff'
        }).setOrigin(0.5).setDepth(10).setVisible(false);

        this.spawnPhase(this.phase);

        window.setPhase = (phaseNum) => {
            this.phase = phaseNum;
            this.spawnPhase(this.phase);
            console.log(`⏩ Forced to Phase ${phaseNum}`);
        };

        this.shopGroup = this.add.group();
        this.shopVisible = false;
        this.gameOverTriggered = false;
    }

    spawnPhase(phase) {
        this.phaseCleared = false;
        this.phaseReady = false;
        this.isBossPhase = phase % 5 === 0;
        this.phaseText.setText(`PHASE ${phase}`).setVisible(true);
    
        this.time.delayedCall(1000, () => {
            this.phaseText.setVisible(false);
    
            if (this.isBossPhase) {
                this.spawnBoss();
            } else {
                let dronePaths = [];
                if (phase === 1) {
                    dronePaths = this.generateDroneFormation1();
                    this.delayedDroneSpawn(dronePaths);
                } else if (phase === 2) {
                    const paths1 = this.generateDroneFormation1();
                    const paths2 = this.generateDroneFormation2();
                    this.delayedDroneSpawn(paths1);
                    this.delayedDroneSpawn(paths2);

                    this.time.delayedCall(5000, () => {
                        this.launchKamikazeFromFormation();
                    });
                } else if (phase === 3) {
                    dronePaths = this.generateDroneFormation3();
                    this.delayedDroneSpawn(dronePaths);
                    this.time.delayedCall(3000, () => {
                        this.applyFormationChange3();
                    });
                } else if (phase === 4) {
                    const dronePaths = this.generateDroneFormation4();
                    this.delayedDroneSpawn(dronePaths);
                }
                this.spawnFighters(Math.min(4 + Math.floor(phase * 0.5), 12));
            }
    
            this.phaseReady = true;
        });
    }
    

    update() {
        this.updatePlayer();
        this.updateBullets();
        this.updateDrones();
        this.updateFighters();
        this.updateBoss();
        this.updateEnemyBullets();
        this.checkPhaseClear();
        if (this.playerHealth <= 0 && !this.gameOverTriggered) {
            this.gameOverTriggered = true;  
            this.time.delayedCall(500, () => {
                this.scene.start('GameOverScene', {
                    score: this.score,
                    phase: this.phase
                });
            });
        }
    }

    updateDrones() {
        for (let i = this.drones.length - 1; i >= 0; i--) {
            const drone = this.drones[i];
    
            if (drone.kamikaze) {
                drone.x += drone.vx;
                drone.y += drone.vy;
            }
            else if (drone.path && drone.pathIndex < drone.path.length) {
                const [tx, ty] = drone.path[drone.pathIndex];
                const dx = tx - drone.x;
                const dy = ty - drone.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const speed = 2;
                if (dist < speed) {
                    drone.x = tx;
                    drone.y = ty;
                    drone.pathIndex++;
                } else {
                    drone.x += (dx / dist) * speed;
                    drone.y += (dy / dist) * speed;
                }
            }
            else {
                drone.setVelocity?.(0, 0);
                if (drone.leaderPath) {
                    const index = (drone.pathIndex + drone.leaderOffset) % drone.leaderPath.length;
                    const [tx, ty] = drone.leaderPath[index];
                    drone.x = tx;
                    drone.y = ty;
                    drone.pathIndex = (drone.pathIndex + 1) % drone.leaderPath.length;
                }
            }

            for (let j = this.bullets.length - 1; j >= 0; j--) {
                const bullet = this.bullets[j];
                if (Phaser.Geom.Intersects.RectangleToRectangle(drone.getBounds(), bullet.getBounds())) {
                    this.destroyEnemy(drone, this.drones);
                    bullet.destroy();
                    this.bullets.splice(j, 1);
                    break;
                }
            }
    
            if (Phaser.Geom.Intersects.RectangleToRectangle(drone.getBounds(), this.player.getBounds())) {
                this.playerHealth--;
                this.updateLifeIcons();
                this.destroyEnemy(drone, this.drones);
                continue;
            }

            if (drone.y > this.scale.height + 50) {
                drone.destroy();
                this.drones.splice(i, 1);
                continue;
            }


        }
    }
    
    
    updateFighters() {
        for (let i = this.fighters.length - 1; i >= 0; i--) {
            const fighter = this.fighters[i];
    
            fighter.fireCooldown++;
            if (fighter.fireCooldown > fighter.fireCooldownMax) {
                const bullet = this.add.sprite(fighter.x, fighter.y + 20, 'enemyBullet').setScale(0.75);
                bullet.vx = 0;
                bullet.vy = 4 + this.phase * 0.1;
                this.enemyBullets.push(bullet);
                fighter.fireCooldown = 0;
            }
    
            for (let j = this.bullets.length - 1; j >= 0; j--) {
                const bullet = this.bullets[j];
                if (Phaser.Geom.Intersects.RectangleToRectangle(fighter.getBounds(), bullet.getBounds())) {
                    this.destroyEnemy(fighter, this.fighters);
                    bullet.destroy();
                    this.bullets.splice(j, 1);
                    break;
                }
            }
    
            if (Phaser.Geom.Intersects.RectangleToRectangle(fighter.getBounds(), this.player.getBounds())) {
                this.playerHealth--;
                this.updateLifeIcons();
                this.destroyEnemy(fighter, this.fighters);
            }
    
            if (fighter.y > this.scale.height + 50) {
                this.destroyEnemy(fighter, this.fighters);
            }
        }
    }
    
    updateBoss() {
        if (!this.boss || !this.boss.active) return;
    
        const boss = this.boss;
    
        if (boss.entry) {
            boss.y += 2;
            if (boss.y >= 150) {
                boss.entry = false;
            }
            return;
        }
    
        boss.bulletTimer++;
        if (boss.bulletTimer > 180) {
            this.fireBossBulletPattern();
            boss.bulletTimer = 0;
        }
        
        boss.homingCooldown = boss.homingCooldown ?? 0;
        boss.homingCooldown++;
        if (boss.homingCooldown > 240) {  
            this.fireBossHomingBullets();
            boss.homingCooldown = 0;
        }       

        boss.chargeCooldown++;
        if (boss.chargeCooldown > 240) {
            this.tweens.add({
                targets: boss,
                x: this.player.x,
                duration: 500,
                ease: 'Power2'
            });
            boss.chargeCooldown = 0;
        }
        
        for (let j = this.bullets.length - 1; j >= 0; j--) {
            const bullet = this.bullets[j];
            if (Phaser.Geom.Intersects.RectangleToRectangle(boss.getBounds(), bullet.getBounds())) {
                boss.hp--;
                bullet.destroy();
                this.bullets.splice(j, 1);
                if (boss.hp <= 0) {
                    this.destroyEnemy(boss, [boss]);
                    this.boss = null;
        
                    if (this.phase === 5) {
                        this.time.delayedCall(1000, () => {
                            this.scene.start('MissionCompleteScene', {
                                score: this.score,
                                phase: this.phase
                            });
                        });
                    }
                }
            }
        }

        if (boss.y > this.scale.height + 100) {
            this.boss = null;
            boss.destroy();
        }
    }
    
    fireBossBulletPattern() {
        const boss = this.boss;
        if (!boss || !boss.active) return;
    
        const bulletCount = 24;
        const angleStep = (Math.PI * 2) / bulletCount;
    
        for (let i = 0; i < bulletCount; i++) {
            const angle = angleStep * i;
            const vx = Math.cos(angle) * 2.5;
            const vy = Math.sin(angle) * 2.5;
    
            const bullet = this.add.sprite(boss.x, boss.y, 'boss_guided').setScale(0.6);
            bullet.vx = vx;
            bullet.vy = vy;
            bullet.isHoming = false;
            this.enemyBullets.push(bullet);
        }
    }
    

    fireBossHomingBullets() {
        const boss = this.boss;
        if (!boss || !boss.active) return;
    
        const burstCount = 3; 
        const delayGap = 300; 
    
        for (let i = 0; i < burstCount; i++) {
            this.time.delayedCall(i * delayGap, () => {
                const bullet = this.add.sprite(boss.x, boss.y + 20, 'boss_homing').setScale(0.6);
    
                const dx = this.player.x - boss.x;
                const dy = this.player.y - boss.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const speed = 2.5;
    
                bullet.vx = (dx / dist) * speed;
                bullet.vy = (dy / dist) * speed;
                bullet.isHoming = true;
                bullet.homingDuration = 60;
                bullet.homingCounter = 0;
    
                this.enemyBullets.push(bullet);
            });
        }
    }
     
    
    spawnDrones(paths) {
        for (let i = 0; i < paths.length; i++) {
            const data = paths[i];
    
            const isLegacyPath = Array.isArray(data); 
    
            const path = isLegacyPath ? data : data.path;
            const offset = isLegacyPath ? 0 : data.offset;
    
            const drone = this.add.sprite(path[0][0], path[0][1], 'drone').setScale(this.enemyConfig.drone.scale);
            drone.type = 'drone';
    
            if (isLegacyPath) {
                drone.path = path;
                drone.pathIndex = 0;
            } else {
                drone.leaderPath = path;
                drone.leaderOffset = offset;
                drone.pathIndex = 0;
            }
    
            drone.hp = this.enemyConfig.drone.hp;
            this.drones.push(drone);
        }
    }

    delayedDroneSpawn(paths) {
        for (let i = 0; i < paths.length; i++) {
            this.time.delayedCall(i * 250, () => {
                this.spawnDrones([paths[i]]);
            });
        }
    }

    generateDroneFormation1() {
        const paths = [];
        const formationCols = 4;
        const formationRows = 3;
        const spacingX = 70;
        const spacingY = 60;
        const formationStartX = 700; 
        const formationStartY = 200;
    
        const startX = 950;  
        const startY = 600;
        const meetingX = 200; 
        const meetingY = 400;
    
        for (let i = 0; i < formationCols * formationRows; i++) {
            const col = i % formationCols;
            const row = Math.floor(i / formationCols);
    
            const tx = formationStartX + col * spacingX;
            const ty = formationStartY + row * spacingY;
    
            paths.push([
                [startX, startY],       
                [meetingX, meetingY],     
                [tx, ty]                  
            ]);
        }
    
        return paths;
    }
    
    generateDroneFormation2() {
            const paths = [];
            const formationCols = 4;
            const formationRows = 3;
            const spacingX = 70;
            const spacingY = 60;
            const formationStartX = 100;  
            const formationStartY = 200;
        
            const startX = 50;   
            const startY = 600;
            const meetingX = 800; 
            const meetingY = 400;
        
            for (let i = 0; i < formationCols * formationRows; i++) {
                const col = i % formationCols;
                const row = Math.floor(i / formationCols);
        
                const tx = formationStartX + col * spacingX;
                const ty = formationStartY + row * spacingY;
        
                paths.push([
                    [startX, startY],
                    [meetingX, meetingY],
                    [tx, ty]
                ]);
            }
        
            return paths;
    }
    
    generateDroneFormation3() {
        const paths = [];

        
        const centerX = 500;
        const centerY = 300;
        const radius = 100;

       
        const leaderPath = [];
        for (let t = 0; t < Math.PI * 2 * 3; t += 0.01) {
            const a = 250;  
            const b = 120;  

            const x = centerX + Math.sin(t) * a;
            const y = centerY + Math.sin(t * 2) * b;
            leaderPath.push([x, y]);
        }

        
        for (let i = 0; i < 24; i++) {
            paths.push({
                path: leaderPath,
                offset: i * 60  
            });
        }
        return paths;
    }
    
    generateDroneFormation4() {
        const paths = [];
        const totalDrones = 52;
        const spacingX = 52; 
        const startY = -50;
        const targetY = 1000;
        const minX = 50;
        const maxX = 950;
    
        for (let i = 0; i < totalDrones; i++) {
            const wrappedIndex = i % Math.floor((maxX - minX) / spacingX);
            const loop = Math.floor(i / Math.floor((maxX - minX) / spacingX));
            const direction = loop % 2 === 0 ? 1 : -1;
            const x = direction === 1
                ? minX + wrappedIndex * spacingX
                : maxX - wrappedIndex * spacingX;
    
            paths.push([
                [x, startY],
                [x, targetY]
            ]);
        }
    
        return paths;
    }
    
    applyFormationChange3() {
        const centerLeft = { x: 300, y: 300 };
        const centerRight = { x: 700, y: 300 };
    
        for (let i = 0; i < this.drones.length; i++) {
            const drone = this.drones[i];
            const angleOffset = (Math.PI * 2 / this.drones.length) * i;
    
            const center = i < this.drones.length / 2 ? centerLeft : centerRight;
            const direction = i < this.drones.length / 2 ? 1 : -1;
    
            drone.orbit = {
                center,
                angle: angleOffset,
                radius: Phaser.Math.Distance.Between(drone.x, drone.y, center.x, center.y),
                direction
            };
        }
    }

    launchKamikazeFromFormation() {
        const left = this.drones.filter(d => d.x < this.scale.width / 2);
        const right = this.drones.filter(d => d.x >= this.scale.width / 2);
    
        const interval = 1000; 
        const maxCount = Math.min(left.length, right.length); 
    
        for (let i = 0; i < maxCount; i++) {
            this.time.delayedCall(i * interval, () => {
                const l = left[i];
                const r = right[i];
                if (l) this.setKamikazeDrone(l);
                if (r) this.setKamikazeDrone(r);
            });
        }
    }
    
    setKamikazeDrone(drone) {
        drone.kamikaze = true;
        const dx = this.player.x - drone.x;
        const dy = this.player.y - drone.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = 3;
        drone.vx = (dx / dist) * speed;
        drone.vy = (dy / dist) * speed;
    }
    
    spawnFighters(count) {
        const cols = Math.min(count, 6);
        const rows = Math.ceil(count / cols);
        const spacingX = 100;
        const spacingY = 60;
        const offsetX = (this.scale.width - (cols - 1) * spacingX) / 2;
    
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const idx = r * cols + c;
                if (idx >= count) break;
    
                const x = offsetX + c * spacingX;
                const y = 100 + r * spacingY;
                const fighter = this.add.sprite(x, y, 'fighter').setScale(this.enemyConfig.fighter.scale);
                fighter.type = 'fighter';
                fighter.hp = this.enemyConfig.fighter.hp;
                fighter.fireCooldown = Phaser.Math.Between(0, 60);
                fighter.fireCooldownMax = Phaser.Math.Between(90, 150);
                this.fighters.push(fighter);
            }
        }
    }

    spawnBoss() {
        this.boss = this.add.sprite(this.scale.width / 2, -100, 'boss').setScale(this.enemyConfig.boss.scale);
        this.boss.type = 'boss';
        this.boss.hp = this.enemyConfig.boss.hp;
        this.boss.entry = true;
        this.boss.bulletTimer = 0;
        this.boss.chargeCooldown = 0;
    }    

    destroyEnemy(enemy, groupArray) {
        const config = this.enemyConfig[enemy.type];
        if (config?.score) {
            this.score += config.score;
            this.updateScoreDisplay();
            this.flashScore();
        }
        const anim = this.add.sprite(enemy.x, enemy.y, 'damage3').setScale(0.75).play('enemy-destroy');
        anim.on('animationcomplete', () => anim.destroy());
        if (this.sfx_twoTone) this.sfx_twoTone.play();
        enemy.destroy();
        const idx = groupArray.indexOf(enemy);
        if (idx !== -1) groupArray.splice(idx, 1);
    }

    checkPhaseClear() {
        if (
            this.phaseReady &&
            !this.phaseCleared &&
            this.drones.length === 0 &&
            this.fighters.length === 0 &&
            this.boss === null &&
            this.enemyBullets.length === 0
        ) {
            this.phaseCleared = true;
            
            if (this.phase === 3) {
                this.showShop();
            } else {
                this.time.delayedCall(1000, () => {
                    this.phase++;
                    this.spawnPhase(this.phase);
                });
            }
        }
    }

    showShop() {
        this.shopVisible = true;
    
        this.shopBg = this.add.rectangle(500, 400, 400, 300, 0x000000).setAlpha(0.8);
        this.shopText = this.add.text(500, 320, 'SHOP: Choose Upgrade', { fontSize: '24px', color: '#ffffff' }).setOrigin(0.5);
    
        this.upgradeBulletBtn = this.add.text(500, 380, 'Upgrade Bullet', { fontSize: '20px', color: '#00ff00' }).setOrigin(0.5).setInteractive();
        this.healBtn = this.add.text(500, 430, 'Restore Life', { fontSize: '20px', color: '#00ccff' }).setOrigin(0.5).setInteractive();
    
        this.upgradeBulletBtn.on('pointerdown', () => {
            this.bulletLevel = Math.min(this.bulletLevel + 1, 3);
            this.hideShop();
        });
    
        this.healBtn.on('pointerdown', () => {
            this.playerHealth = Math.min(this.playerHealth + 1, 5);
            this.updateLifeIcons();
            this.hideShop();
        });
    }
    
    hideShop() {
        this.shopVisible = false;
    
        this.shopBg.destroy();
        this.shopText.destroy();
        this.upgradeBulletBtn.destroy();
        this.healBtn.destroy();
    
        this.phase++;
        this.spawnPhase(this.phase);
    }
    
    

    updatePlayer() {
        this.bg.tilePositionY -= 1;
        if (this.aKey.isDown) this.player.x -= 5;
        if (this.dKey.isDown) this.player.x += 5;
        this.player.x = Phaser.Math.Clamp(this.player.x, this.player.displayWidth / 2, this.scale.width - this.player.displayWidth / 2);

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            const spread = 10 * (this.bulletLevel - 1);
            for (let i = 0; i < this.bulletLevel; i++) {
                const offset = -spread / 2 + (spread / (this.bulletLevel - 1 || 1)) * i;
                const bullet = this.add.sprite(this.player.x + offset, this.player.y - 20, 'bullet').setScale(0.75);
                this.bullets.push(bullet);
            }
        }

        if (this.spaceKey.isDown) {
            const now = this.time.now;
            if (now - this.fireCooldown > this.fireRate) {
                this.fireCooldown = now;
                const spread = 10 * (this.bulletLevel - 1);
                for (let i = 0; i < this.bulletLevel; i++) {
                    const offset = -spread / 2 + (spread / (this.bulletLevel - 1 || 1)) * i;
                    const bullet = this.add.sprite(this.player.x + offset, this.player.y - 20, 'bullet').setScale(0.75);
                    this.bullets.push(bullet);
                }
            }
        }
    }

    updateBullets() {
        this.bullets.forEach((b, i) => {
            b.y -= 7;
            if (b.y < -32) {
                b.destroy();
                this.bullets.splice(i, 1);
            }
        });
    }

    updateEnemyBullets() {
        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            const b = this.enemyBullets[i];
        
            if (b.isHoming && b.homingCounter < b.homingDuration) {
                const dx = this.player.x - b.x;
                const dy = this.player.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const speed = 2.5;
                b.vx = (dx / dist) * speed;
                b.vy = (dy / dist) * speed;
                b.homingCounter++;
            }
        
            b.x += b.vx || 0;
            b.y += b.vy || 0;
        
            if (
                b.y > this.scale.height + 10 ||
                b.y < -10 ||
                b.x < -10 ||
                b.x > this.scale.width + 10
            ) {
                b.destroy();
                this.enemyBullets.splice(i, 1);
                continue;
            }
        
            if (Phaser.Geom.Intersects.RectangleToRectangle(b.getBounds(), this.player.getBounds())) {
                b.destroy();
                this.enemyBullets.splice(i, 1);
                this.playerHealth--;
                this.updateLifeIcons();
            }
        }
    }
    
    

    updateLifeIcons() {
        this.lifeIcons.forEach((icon, i) => {
            icon.setVisible(i < this.playerHealth);
        });
    }

    updateScoreDisplay() {
        this.scoreSprites.forEach(sprite => sprite.destroy());
        this.scoreSprites = [];
        const startX = 20, startY = 20, spacing = 28;
        const scoreStr = this.score.toString().padStart(4, '0');
        for (let i = 0; i < scoreStr.length; i++) {
            const digit = scoreStr[i];
            const sprite = this.add.image(startX + spacing * i, startY, `numeral${digit}`)
                .setOrigin(0, 0).setScale(1.2);
            this.scoreSprites.push(sprite);
        }
    }

    flashScore() {
        this.tweens.add({
            targets: this.scoreSprites,
            alpha: 0,
            duration: 100,
            yoyo: true,
            repeat: 3
        });
    }

    flashPlayer() {
        this.tweens.add({
            targets: this.player,
            alpha: 0,
            ease: 'Linear',
            duration: 100,
            yoyo: true,
            repeat: 3  
        });
    }    
}

export default GameScene;
