import { useEffect, useRef, useState } from 'react'
import './App.css'
import Snowfall from 'react-snowfall'
import SlotCounter from 'react-slot-counter'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'
import autoAnimate from '@formkit/auto-animate'

const symbols = ['👁', '💎', '⌚', '📱', '💻', '👜', '🚗', '🏍️', '🏠', '📷']
const spins = [
  ['💎', '⌚', '📱'],
  ['🚗', '🚗', '🏠'],
  ['👜', '👜', '🏍️'],
  ['👁️', '👁️', '👁️'],
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const awDangIt = new Audio('https://www.myinstants.com/media/sounds/aww-dang-it.mp3')
awDangIt.volume = 0.5
const yippie = new Audio(
  'https://us-tuna-sounds-files.voicemod.net/2775b48a-9d29-4627-b0fb-9237feb947e0-1701717543374.mp3',
)
yippie.volume = 0.5

const Result = () => (
  <div className="flex max-w-[500px] flex-col items-center gap-2 rounded-3xl bg-stone-200 p-8 font-caveat text-stone-600 shadow-2xl">
    <h1 className="mb-4 text-7xl">🎄 ✨ 🎁</h1>
    <h1 className="mb-2 rounded-2xl bg-stone-100 p-4 font-caveat text-3xl font-bold">
      Сертификат на ф<span className="text-sm">👁️</span>т<span className="text-sm">👁️</span> глаз
    </h1>
    <ol className="list-inside list-decimal *:text-2xl">
      <li>
        Свяжись с{' '}
        <a className="font-bold underline" href="https://www.instagram.com/iris.armenia/">
          iris.armenia
        </a>{' '}
        и договорись о времени.{' '}
        <p className="text-stone-400">
          Сертификат привязан к твоему имени. <br /> Они сказали, что работают с 4 января.{' '}
        </p>
      </li>
      <li>
        Дойди до их{' '}
        <a
          className="font-bold underline"
          href="https://yandex.com/maps/10262/yerevan/house/YE0YcwZlS0IAQFpqfX15cXhhYg==/?indoorLevel=1&ll=44.515278%2C40.180426&z=17.17"
        >
          студии на Абовяна 8
        </a>
        .
      </li>
      <li>
        Мне сказали, что суммы сертификата хватит на зрачковую ювелирку или на два цифровых фото.
        <p className="text-stone-400">В общем, думаю, разберётесь.</p>
      </li>
      <br />
    </ol>
    <p className="self-start text-2xl">С Новым годом с:</p>
  </div>
)
function App() {
  const [spin, setSpin] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [jackpot, setJackpot] = useState(false)
  const [result, setResult] = useState(false)
  const fireworksRef = useRef<FireworksHandlers>()

  const animateRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (animateRef.current) {
      autoAnimate(animateRef.current)
    }
  }, [animateRef])

  const onStartSpinning = () => {
    setSpin((prevSpin) => prevSpin + 1)
    setDisabled(true)
    if (spin === spins.length - 2) {
      setTimeout(() => {
        yippie.play()
      }, 2900)
      return
    }

    setTimeout(() => {
      awDangIt.play()
      setDisabled(false)
    }, 2900)
  }
  useEffect(() => {
    const completed = spin === spins.length - 1
    if (!completed) return
    ;(async () => {
      await delay(3000)
      setDisabled(true)
      setJackpot(true)
      await delay(3000)
      setResult(true)
      await delay(5000)
      setJackpot(false)
    })()
  }, [spin])

  return (
    <div
      ref={animateRef}
      className="flex h-full flex-col items-center justify-center gap-4 bg-slate-800 p-4"
    >
      <Snowfall />
      {jackpot && (
        <Fireworks
          ref={fireworksRef as any}
          options={{ opacity: 1, intensity: 50, sound: { enabled: true } }}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
            background: 'transparent',
            pointerEvents: 'none',
          }}
        />
      )}

      {result ? (
        <Result />
      ) : (
        <>
          <h1 className="mb-4 text-7xl">🎄</h1>
          <SlotCounter
            startValue={spins[0]}
            startValueOnce={true}
            direction="top-down"
            duration={3}
            value={spins[spin]}
            dummyCharacters={symbols}
            containerClassName="bg-slate-600 p-4 rounded-lg [box-shadow:5px_5px_rgb(15_23_42)]"
            charClassName="w-[6rem] text-7xl select-none"
          />
          <button
            className="group relative inline-flex h-12 w-full max-w-[320px] items-center justify-center overflow-hidden rounded-md bg-green-500 px-6 font-medium text-white transition-all duration-100 [box-shadow:5px_5px_rgb(12_82_12)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)] disabled:bg-green-800 disabled:text-green-950"
            type="button"
            disabled={disabled}
            onClick={() => onStartSpinning()}
          >
            {jackpot ? 'Ура, ты победила! 🎉' : `Крутить (осталось ${3 - spin} попытки)`}
          </button>
        </>
      )}
    </div>
  )
}

export default App
