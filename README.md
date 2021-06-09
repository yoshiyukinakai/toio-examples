# toio-examples

## Requirement
* Node.js and a Bluetooth adapter are required to run the examples
* See https://github.com/toio/toio.js#prerequisites for more details

## Installation
```
git clone https://github.com/yoshiyukinakai/toio-examples.git
cd toio-examples
yarn install
```

## Examples

### chase-keyboard-control
```
node chase-keyboard-control.js
```
* Combined the two example codes of 'chase' and 'keyboard-control' in https://github.com/toio/toio.js
* A toio cube chases another cube controlled with a keyboard
* Video: https://www.youtube.com/watch?v=y5AMDuXyUGQ

### chase-keyboard-control-3cubes
```
node chase-keyboard-control-3cubes.js
```
* Added the third cube to example 'chase-keyboard-control'
* The first cube is controlled with a keyboard, and the following cubes chase the cube in front of them
* Video: https://www.youtube.com/watch?v=2JyzkidPynM

### runaway
```
node runaway.js
```
* Modified several lines of example 'chase' in https://github.com/toio/toio.js
* A toio cube runs away from another cube
* Video: https://www.youtube.com/watch?v=EOJfBHP42Fg
