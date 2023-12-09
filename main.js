import { Engine, Render, Runner, World, Bodies, Body } from 'matter-js'
import { FRUITS_BASE } from './fruits'

const engine = Engine.create()
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: '#F7F4C8',
    width: 620,
    height: 850
  }
})

const world = engine.world

const leftWall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: '#e6B143' }
})

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: '#e6B143' }
})

const ground = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: '#e6B143' }
})

const topLine = Bodies.rectangle(310, 150, 620, 2, {
  isStatic: true,
  isSensor: true,
  render: { fillStyle: '#e6B143' }
})

World.add(world, [leftWall, rightWall, ground, topLine])

Render.run(render)
Runner.run(engine)

// 과일 생성하기

let currentBody = null
let currentFruit = null

function addFruits() {
  const index = Math.floor(Math.random() * 5)
  const fruit = FRUITS_BASE[index]

  const body = Bodies.circle(300, 50, fruit.radius, {
    index: index,
    isSleeping: true,
    render: {
      sprite: { texture: `${fruit.name}.png` }
    },
    restitution: 0.2 // 통통 튀는 효과
  })

  currentBody = body
  currentFruit = fruit

  World.add(world, body)
}

// 과일 움직이기 (A, S)
window.onkeydown = event => {
  switch (event.code) {
    case 'KeyA':
      Body.setPosition(currentBody, {
        x: currentBody.position.x - 10,
        y: currentBody.position.y
      })
      break
    case 'KeyD':
      Body.setPosition(currentBody, {
        x: currentBody.position.x + 10,
        y: currentBody.position.y
      })
      break
    case 'KeyS':
      currentBody.isSleeping = false

      setTimeout(() => {
        addFruits()
      }, 1000)
      break
  }
}

addFruits()
