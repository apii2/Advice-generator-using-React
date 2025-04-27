import './App.css'
import {useEffect} from 'react'
import DividerDesktop from './assets/pattern-divider-desktop.svg'
import DividerMobile from './assets/pattern-divider-mobile.svg'
import Dice from './assets/icon-dice.svg'
import { useState } from 'react'

export default function App() {
  function isMobile(){
    return window.innerWidth <= 768;
  }

  const [advice, setAdvice] = useState({
    loading: true,
    toggle: true,
    data:{}
  })

  useEffect(()=>{
    setAdvice(prev => ({...prev, loading:true}))
    fetch('https://api.adviceslip.com/advice').then(res=>res.json()).then(data=>{
      setAdvice(prev=> ({...prev, loading: false, data: data.slip}))
    })
  }, [advice.toggle])

  function handleClick(){
    setAdvice(prev=> ({...prev, toggle: !prev.toggle}))
  }

  return (
    <main className='min-h-dvh bg-blue-950 flex items-center justify-center px-4 md:px-0'>
      {advice.loading ? 
      <svg className="animate-spin size-5 text-green-300" viewBox="0 0 24 24" fill="none">
        <circle
          className="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor" strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>

      : <section className='bg-blue-900 flex flex-col items-center justify-center px-10 md:px-12 pt-10 pb-2 rounded-xl w-md'>
        <header className='text-green-300 text-xs tracking-[0.3rem] uppercase mb-6'>Advice #{advice.data.id}</header>
        <p className='text-white text-2xl mb-8 text-center'>"{advice.data.advice}"</p>
        <img src={isMobile()? DividerMobile : DividerDesktop} alt='Divider icon' className=''/>
        <button onClick={handleClick}
          className='bg-green-300 p-4 translate-y-8 rounded-full cursor-pointer hover:shadow-[0px_0px_25px_var(--color-green-300)]'>
          <img src={Dice} alt='Dice icon' className='w-5 h-5'/>
        </button>
      </section>}
    </main>
  )
}