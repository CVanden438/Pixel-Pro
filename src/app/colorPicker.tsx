'use client'
import React, { useState } from 'react'
interface rgb {
  red: number
  green: number
  blue: number
}
interface props {
  setSelectedColor: React.Dispatch<React.SetStateAction<rgb>>
}
type selected = 'default' | 'rgb'
const defaultColours: rgb[] = [
  { red: 0, green: 0, blue: 0 },
  { red: 255, green: 255, blue: 255 },
  { red: 130, green: 130, blue: 130 },
  { red: 255, green: 0, blue: 0 },
  { red: 0, green: 255, blue: 0 },
  { red: 0, green: 0, blue: 255 },
  { red: 255, green: 255, blue: 0 },
  { red: 0, green: 255, blue: 255 },
  { red: 255, green: 0, blue: 255 },
]
const ColorPicker: React.FC<props> = ({ setSelectedColor }) => {
  const [rgb, setRgb] = useState<rgb>({ red: 0, green: 0, blue: 0 })
  const [selectedDefault, setSelectedDefault] = useState({
    red: 0,
    green: 0,
    blue: 0,
  })
  const [selectedType, setSelectedType] = useState<selected>('default')
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRgb({ ...rgb, [e.target.name]: e.target.value })
    if (selectedType === 'rgb') {
      setSelectedColor(rgb)
    }
  }
  const handleDefault = (color: rgb) => {
    setSelectedDefault(color)
    if (selectedType === 'default') {
      setSelectedColor(color)
    }
  }
  const handleSelect = (type: selected) => {
    if (type === 'default') {
      setSelectedType('default')
      setSelectedColor(selectedDefault)
    } else {
      setSelectedType('rgb')
      setSelectedColor(rgb)
    }
  }
  return (
    <div className='flex gap-4'>
      {/* Default Color Selector */}
      <section className='flex h-[350px] flex-col items-center justify-between gap-4 rounded-lg border border-orange-400 bg-black/30 p-2'>
        <p className='text-orange-400'>Default Colors:</p>
        <div className=' inline-grid grid-cols-2 gap-2'>
          {defaultColours.map((color, i) => {
            return (
              <div
                key={i}
                className='h-6 w-6'
                style={{
                  background: `rgb(${color.red},${color.green},${color.blue})`,
                }}
                onClick={() => handleDefault(color)}
              />
            )
          })}
        </div>
        <button
          className={`${
            selectedType === 'default'
              ? 'border border-orange-400 text-orange-400'
              : 'border border-gray-500 text-gray-500'
          } flex flex-col items-center justify-center rounded-md p-2`}
          onClick={() => handleSelect('default')}
        >
          <div
            className='h-12 w-12'
            style={{
              background: `rgb(${selectedDefault.red},${selectedDefault.green},${selectedDefault.blue})`,
            }}
          />
          Select
        </button>
      </section>
      {/* Slider Selectors */}
      <section className='flex h-[350px] flex-col items-center justify-between gap-1 rounded-lg border border-orange-400 bg-black/30 p-2'>
        <p className='text-red-600'>Red</p>
        <div className='flex gap-2'>
          <input
            type='range'
            min={0}
            max={255}
            value={rgb.red}
            name='red'
            onChange={(e) => handleSlider(e)}
            className='w-[120px]'
          />
          <input
            type='number'
            value={rgb.red}
            name='red'
            onChange={(e) => handleSlider(e)}
            className='w-7'
            min={0}
            max={255}
          />
        </div>
        <p className='text-green-600'>Green</p>
        <div className='flex gap-2'>
          <input
            type='range'
            min={0}
            max={255}
            value={rgb.green}
            name='green'
            onChange={(e) => handleSlider(e)}
            className='w-[120px]'
          />
          <input
            type='number'
            name='green'
            value={rgb.green}
            onChange={(e) => handleSlider(e)}
            className='w-7'
            min={0}
            max={255}
          />
        </div>
        <p className='text-blue-600'>Blue</p>
        <div className='flex gap-2'>
          <input
            type='range'
            min={0}
            max={255}
            value={rgb.blue}
            name='blue'
            onChange={(e) => handleSlider(e)}
            className='w-[120px]'
          />
          <input
            type='number'
            name='blue'
            value={rgb.blue}
            onChange={(e) => handleSlider(e)}
            className='w-7'
            min={0}
            max={255}
          />
        </div>
        {/* <p>{`rgb(${rgb.red},${rgb.green},${rgb.blue})`}</p> */}
        <button
          className={`${
            selectedType === 'rgb'
              ? 'border border-orange-400 text-orange-400'
              : 'border border-gray-500 text-gray-500'
          } flex flex-col items-center justify-center rounded-md p-2`}
          onClick={() => handleSelect('rgb')}
        >
          <div
            className='h-12 w-12'
            style={{
              background: `rgb(${rgb.red},${rgb.green},${rgb.blue})`,
            }}
          />
          Select
        </button>
      </section>
      {/* Type of selection to use */}
    </div>
  )
}

export default ColorPicker
