import './style.css'
import {Effect} from './components/effect'

const effect = new Effect({id: 'canvas', scale: {x: 30, y: 30}, debug: true})

effect.init()

console.log(effect)
