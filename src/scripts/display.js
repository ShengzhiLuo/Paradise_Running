import Platform from "./platform";

function displayScore(context) {
    let score = 0;
    context.font = "30px Arial";
    context.fillStyle = "white";
    context.fillText("Score: " + score, 20, 50);
    
};

export default displayScore;