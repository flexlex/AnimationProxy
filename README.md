AniProx (aka Animation Proxy)
===
####This library is lightweight, but far from complete.
**This small script provides a friendly way to create animations with javascript. You can animate things while remaining full in control of what is happening**

##index
- Mission (why)
- features
- usage and examples
 - complex
 - quickmode

###Mission (why)
I see people using JQuery just for animations. Everytime i see that my heart breaks... so much overhead... and all animations are concatenated... it's so sad :(
Fortunately i came up with a idea to create easily (very, very, easily) custom animations.

###Features
- [X] Optimized for animation using `RequestAnimationFrame`
- A lot of animable things
 - [X] sizes in `px` unit
 - [X] ratiovalues (like opacity)
 - [X] scroll using `scrollTop` property
 - [ ] properties with more values (like margin, padding, border-radius)
- [X] Animate multiple properties at once
- [ ] Concatenate animations (like JQuery)
- [X] Quick syntax (shown below)
- [X] Functions to create own animations
- [X] Lag save (animation progress based on time)

###Usage and examples

####Complex
The complex mode does not focus on creating animation, but to have a function that speeds up the creation of an animation.
Usage:
```js
aniprox(duration,fx)
```
*duration: *in ms
*fx:* a function that has a param (float) rapresenting the ratio of the animation progress (from 0 - 1)

Example:
```js
aniprox(1000,function(ratio){
    var timing = function(r)
    {
    return Math.sin(r*Math.PI/2);
    }
    var v = timing(ratio);
    document.body.scrollTop=v*200;
})
```
Equals (in quickmode)
```js
document.body.aniprox(1000,"sin").scrollTop=200```

As you may have noticed, complex mode allows you to create all sorts of animation, since the timing and the properties to animate have to be defined by you.

####Quickmode (protocol extention)
**Quickmode is used like the DOMElement.style property, but instead of `style` you will use `aniprox(duration,timing_fx)`**
*duration:* is the duration of time the animation will need (in ms)
*timingFX:* can be a string like "linear", "default", "sin", "pow", "sqrt, "cool", "cool-i"

    *cool:* a combination of sin and pow
    *cool-i:* cool TimingFX but inverted

#####Example
```js
document.body.aniprox(200,"cool").scrollTop="bottom";
```
```js
document.body.aniprox(200).height="200px";
```
*You can save the aniprox to change multiple values at once*

```js
var apx = document.body.aniprox(200,"pow");
apx.height="200px";
apx.opacity=1;
apx.width="200px";
apx.scrollTop="top";
```