import Platform from "./platform";



function handlePlatforms() {
    let platforms = [];
    let x = 1100;
    let y = 550;
    for (let i = 0; i < 4; i++) {
        x += 300;
        y -= 100;
        let platform = new Platform(x, y);
        platforms.push(platform);
        
    }
    y = 150;
    for (let j = 0; j < 2; j++) {
        x += 300;
        y += 100;
        let platform = new Platform(x, y);
        platforms.push(platform);
    }

    platforms.forEach(platform => {
        platform.draw(ctx);
        platform.update();
    });

    return platforms;

};

export default handlePlatforms;