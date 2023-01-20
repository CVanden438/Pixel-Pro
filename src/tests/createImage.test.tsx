import createImage from '../app/createImage'

test('createImage returns a valid data URI when given valid input', () => {
  const pixels = [
    { red: 255, green: 0, blue: 0 },
    { red: 0, green: 255, blue: 0 },
    { red: 0, green: 0, blue: 255 },
    { red: 255, green: 255, blue: 0 },
    { red: 0, green: 255, blue: 255 },
    { red: 255, green: 0, blue: 255 },
    { red: 255, green: 255, blue: 255 },
    { red: 0, green: 0, blue: 0 },
    { red: 0, green: 0, blue: 0 },
  ]
  const size = 3
  const multiplier = 2
  const dataUri = createImage(pixels, size, multiplier) as string
  expect(typeof dataUri).toBe('string')
  expect(dataUri.slice(0, 21)).toBe('data:image/png;base64')
})

test('createImage returns null if invalid pixel array sent', () => {
  const pixels: any = []
  const size = 2
  const multiplier = 2
  const dataUri = createImage(pixels, size, multiplier)
  expect(dataUri).toBe(null)
})
