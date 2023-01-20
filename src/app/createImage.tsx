'use client'
import { type grid } from './page'

const createImage = (
  pixels: grid[],
  size: number = 10,
  multiplier: number = 1
) => {
  if (!pixels || pixels.length < 1) {
    return null
  }
  //Converts pixels to 2d array
  let twoDArray = []
  for (let i = 0; i < pixels.length; i += size) {
    let chunk = pixels.slice(i, i + size)
    twoDArray.push(chunk)
  }
  //Duplicates each pixel in x-dirextion by multiplier
  for (let i = 0; i < twoDArray.length; i++) {
    twoDArray[i] = twoDArray[i].flatMap((el) => Array(multiplier).fill(el))
  }
  //Duplicates each row in y direction by multiplier
  const temp = twoDArray.flatMap((el) => Array(multiplier).fill(el))
  let scaledArray = temp.flat()
  //Allows for 4 values(r,g,b,a) per pixel
  const buffer = new Array(scaledArray.length * 4)
  for (let i = 0; i < scaledArray.length; i++) {
    let pos = i * 4
    buffer[pos] = scaledArray[i].red
    buffer[pos + 1] = scaledArray[i].green
    buffer[pos + 2] = scaledArray[i].blue
    buffer[pos + 3] = 255
  }
  //Creates a canvas, adds the pixel data then gets dataURI from it
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const newSize = size * multiplier
  canvas.height = newSize
  canvas.width = newSize
  const iData = ctx?.createImageData(newSize, newSize)
  iData?.data.set(buffer)
  ctx?.putImageData(iData as ImageData, 0, 0)
  const dataUri = canvas.toDataURL()
  return dataUri
}
export default createImage
