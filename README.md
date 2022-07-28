# Paradise Running

[Paradise Running](https://shengzhiluo.github.io/Paradise_Running/) is a single player platform game interactive demo that play around the clouds with jumping and running.
Integrates an object-oriented Javascript game structure with the smooth rendering of HTML5 canvas to create an unusual and curious experience.


## MVP
  1. Players will be able to click the screen to start.
  2. Players will be able to press up-arrow and right-arrow to jump and run
  3. Game will be finished if player's character fail to jump on to the platforms.
  4. There are gonna be random platforms that players can jump on to.
  
## Wirefame
![Wireframe](./media/wireframe.png "Title")

## Technologies 
  * Javascript
  * HTML/CSS
  * Canvas


## Implementation

### Basic Rendering

A `animate` function renders the game, using a `requestAnimationFrame` loop to maintain a constant 60fps refresh rate.
The `animate` delegates rendering tasks to the `handleplatforms` function, which handles all of the srcolling platforms in the game. The `handleplatforms` further delegates rendering of individual objects (`Player`, `Platform`s and `displayScore`) to the objects themselves, each of which have their own `#draw` and `#update` method.

The game canvas sizes itself based on `window.canvas.Width` and `window.canvas.Height`. 

### Displaying platforms and backgound
Players see platforms as `Platforms`. To be realistic, platfroms must fade away to the left,  and represent the objects that produce them.

### Movement
Once moving, platforms move relative to the player's location, computed as a unit vector.



