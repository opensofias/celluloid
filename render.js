import { elem } from "./tools.js"

const hexColor = lightness => '#' +
	[-.25, 0, -.5] // offsets
	.map (chan => (chan + lightness) * 512) // use offsets
	.map (chan => Math.max (0, Math.min (chan, 255))) // clamp
	.map (chan => (chan | 0).toString(16).padStart (2, '0')) // convert to hex
	.join ('')

const svgContext = svgElem => ({
	el: svgElem, fillStyle: undefined,
	fillRect (x, y, width, height) {
		this.el.appendChild(
			elem ({
				tag: 'rect',
				attr: {
					x, y, width, height,
					fill: this.fillStyle
				},
				svg: true
}))}})

export const render = (history, config) => {
	const {radix, svg, ruleNum, zoom} = config

	const el = elem ({
		tag: svg ? 'svg' : 'canvas',
		attr: {
			height: (history.length) * zoom,
			width: (history [0].length) * zoom,
			[svg ? 'xmlns' : 'title']:
				svg ? 'http://www.w3.org/2000/svg' : ruleNum
		}, svg
	})

	const ctx = svg ? svgContext(el) : el.getContext('2d')

	el.addEventListener ('click',
		function () {
			open (svg ?
				'data:image/svg+xml;charset=utf8,<?xml version="1.0"?>' + this.outerHTML :
				this.toDataURL ()
	)})

	const paintRect = (symbol, ...rect) => (
		ctx.fillStyle = hexColor (symbol / (radix - 1)),
		ctx.fillRect (...(rect.map (x => x * zoom)))
	)

	history.forEach ((row, rIndex) => {
		const shift = (history [0].length - row.length) / 2

		paintRect (0, shift, rIndex, row.length, 1)

		let prevSymbol = row [0]; let streak = 0

		row.forEach ((symbol, cIndex) => 
			symbol == prevSymbol ? streak ++ :
				prevSymbol && paintRect (prevSymbol, 
					(shift + cIndex - streak), rIndex, streak, 1
				) || ([prevSymbol, streak] = [symbol, 1])
		)

		prevSymbol && paintRect (prevSymbol, 
			(row.length + shift - streak), rIndex, streak, 1
		)
	})
	return el
}
