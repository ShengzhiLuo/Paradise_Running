
export default class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', a => {
            if (a.key === "ArrowUp" && this.keys.indexOf(a.key) === -1) {
                this.keys.push(a.key);
            }
            console.log(a.key, this.keys);
        });
        window.addEventListener('keyup', a => {
            if (a.key === "ArrowUp") {
                this.keys.splice(this.keys.indexOf(a.key), 1);
            }
            console.log(a.key, this.keys);
        });
        window.addEventListener('keydown', a => {
            if (a.key === "ArrowRight" && this.keys.indexOf(a.key) === -1) {
                this.keys.push(a.key);
            }
            console.log(a.key, this.keys);
        });
        window.addEventListener('keyup', a => {
            if (a.key === "ArrowRight") {
                this.keys.splice(this.keys.indexOf(a.key), 1);
            }
            console.log(a.key, this.keys);
        });
    }
};
