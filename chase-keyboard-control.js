/**
 * Copyright (c) 2021, Yoshiyuki Nakai
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license.
 * https://opensource.org/licenses/mit-license.php
 */

const keypress = require('keypress')
const { NearScanner } = require('@toio/scanner')

const DURATION = 700 // ms
const SPEED = {
  forward: [70, 70],
  backward: [-70, -70],
  left: [30, 70],
  right: [70, 30],
}

// calculate chasing cube's motor speed
function chase(jerryX, jerryY, tomX, tomY, tomAngle) {
  const diffX = jerryX - tomX
  const diffY = jerryY - tomY
  const distance = Math.sqrt(diffX * diffX + diffY * diffY)
  if (distance < 50) {
    return [0, 0] // stop
  }

  let relAngle = (Math.atan2(diffY, diffX) * 180) / Math.PI - tomAngle
  relAngle = relAngle % 360
  if (relAngle < -180) {
    relAngle += 360
  } else if (relAngle > 180) {
    relAngle -= 360
  }

  const ratio = 1 - Math.abs(relAngle) / 90
  let speed = 80
  if (relAngle > 0) {
    return [speed, speed * ratio]
  } else {
    return [speed * ratio, speed]
  }
}

async function main() {
  // start a scanner to find nearest two cubes
  const cubes = await new NearScanner(2).start()

  // connect two cubes (tom chases jerry)
  const jerry = await cubes[0].connect()
  const tom = await cubes[1].connect()

  // set light color and store position
  let jerryX = 0
  let jerryY = 0
  jerry.turnOnLight({ durationMs: 0, red: 255, green: 0, blue: 255 })
  jerry.on('id:position-id', data => {
    jerryX = data.x
    jerryY = data.y
  })

  // set light color and store position
  let tomX = 0
  let tomY = 0
  let tomAngle = 0
  tom.turnOnLight({ durationMs: 0, red: 0, green: 255, blue: 255 })
  tom.on('id:position-id', data => {
    tomX = data.x
    tomY = data.y
    tomAngle = data.angle
  })

  // loop
  setInterval(() => {
    tom.move(...chase(jerryX, jerryY, tomX, tomY, tomAngle), 100)
  }, 50)

  // keyboard input
  keypress(process.stdin)
  process.stdin.on('keypress', (ch, key) => {
    // ctrl+c or q -> exit process
    if ((key && key.ctrl && key.name === 'c') || (key && key.name === 'q')) {
      process.exit()
    }

    switch (key.name) {
      case 'up':
        jerry.move(...SPEED.forward, DURATION)
        break
      case 'down':
        jerry.move(...SPEED.backward, DURATION)
        break
      case 'left':
        jerry.move(...SPEED.left, DURATION)
        break
      case 'right':
        jerry.move(...SPEED.right, DURATION)
        break
    }
  })

  process.stdin.setRawMode(true)
  process.stdin.resume() 
}

main()
