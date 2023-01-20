'use client'
import React, { useEffect, useState } from 'react'
import ColorPicker from './colorPicker'
import CreateImage from './createImage'
import './globals.css'
export interface grid {
  red: number
  green: number
  blue: number
}

const Grid2: React.FC = () => {
  const [tempSize, setTempSize] = useState(10)
  const [size, setSize] = useState(10)
  const [grid, setGrid] = useState<grid[]>(
    Array(size * size).fill({ red: 0, green: 0, blue: 0 })
  )
  const [selectedColor, setSelectedColor] = useState<grid>({
    red: 0,
    green: 0,
    blue: 0,
  })
  const [showGrid, setShowGrid] = useState(true)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const handleClick = (iIndex: number) => {
    const newState = [...grid]
    newState[iIndex] = selectedColor
    setGrid(newState)
  }
  const handleSizeChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // let tempSize = parseInt(e.target.value);
    if (tempSize < 1) {
      setSize(1)
      setGrid(Array(1).fill({ red: 0, green: 0, blue: 0 }))
      return
    }
    setSize(tempSize)
    setGrid(Array(tempSize * tempSize).fill({ red: 0, green: 0, blue: 0 }))
  }
  const handleMouseDown = () => {
    setIsMouseDown(true)
  }
  const handleMouseUp = () => {
    setIsMouseDown(false)
  }
  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  return (
    <main className='m-auto mt-20 flex w-3/4 gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <ColorPicker setSelectedColor={setSelectedColor} />
        <button
          onClick={() => setGrid(Array(size * size).fill(selectedColor))}
          className=' mt-2 h-fit w-fit rounded-md bg-orange-400 p-2 hover:bg-orange-500'
        >
          Fill With Selected Color
        </button>
      </div>
      {/* Canvas */}
      <div className='flex flex-col items-center justify-center gap-4'>
        <div
          className={`inline-grid h-[500px] w-[500px] gap-0`}
          style={{ gridTemplateColumns: `repeat(${size},minmax(0,1fr))` }}
        >
          {grid.map((i, iIndex: number) => (
            <div
              key={iIndex}
              onMouseDown={() => {
                handleClick(iIndex)
              }}
              onMouseEnter={() => {
                if (isMouseDown) {
                  handleClick(iIndex)
                }
              }}
              style={{ background: `rgb(${i.red},${i.green},${i.blue})` }}
              className={` ${showGrid && 'border border-white/50'}`}
            />
          ))}
        </div>
        <form className='submit' onSubmit={(e) => handleSizeChange(e)}>
          <input
            type='number'
            value={tempSize}
            onChange={(e) => setTempSize(parseInt(e.target.value))}
            min={1}
            max={20}
            className='h-full rounded-l-md p-1'
          />
          <button className='rounded-r-md bg-orange-400 p-1 hover:bg-orange-500'>
            Set Size
          </button>
        </form>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className='text-orange-400'
        >
          {showGrid ? 'Hide Grid' : 'Show Grid'}
        </button>
      </div>
      <Download size={size} grid={grid} />
    </main>
  )
}

const Download = ({ size, grid }: { size: number; grid: grid[] }) => {
  const [filename, setFilename] = useState('')
  const [multiplier, setMultiplier] = useState(1)
  function downloadURI(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const dataUri = CreateImage(grid, size, multiplier)
    if (!dataUri) {
      return
    }
    const name = filename
    var link = document.createElement('a')
    link.download = name
    link.href = dataUri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return link
  }
  return (
    <div className='h-fit w-[270px] rounded-md border border-orange-400 bg-black/30 p-2 text-orange-400'>
      <form
        action='submit'
        className='flex flex-col'
        onSubmit={(e) => downloadURI(e)}
      >
        <label htmlFor='name'>File Name:</label>
        <input
          type='text'
          id='name'
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className='text-black'
        />
        <div className='flex justify-between'>
          <label htmlFor='multiplier' className=''>
            Multiplier (Max {Math.floor(1000 / size)}):
          </label>
          <div className='group relative'>
            <QuestionMark />
            <p className='absolute hidden w-[180px] rounded-md bg-gray-600 p-2 group-hover:block'>
              Scales the image size up to a maximum of 1000x1000px. For example,
              a size 10 grid with a multiplier of 50 will become a 500x500 pixel
              image.
            </p>
          </div>
        </div>
        <input
          type='number'
          id='multiplier'
          min={1}
          max={Math.floor(1000 / size)}
          value={multiplier}
          onChange={(e) => setMultiplier(parseInt(e.target.value))}
          className=' text-black'
        />
        <button
          type='submit'
          className='mt-3 rounded-md bg-orange-400 text-black hover:bg-orange-500'
        >
          Download PNG
        </button>
      </form>
    </div>
  )
}

function QuestionMark() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='h-6 w-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
      />
    </svg>
  )
}

export default Grid2
