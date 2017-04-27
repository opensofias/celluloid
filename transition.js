'use strict'

let mod = (x, y) => (x % y + y) % y

class Rule {
	constructor ({radix, neighbors, seed}) {
		this.radix = radix
		this.seed = seed
		this.neighbors = neighbors
	}

	transform (input) {
		let result = ''
		let count = 0
		while (count + this.neighbors <= input.length)
		 result += this.step (input, count ++).toString (this.radix)
		

		return result 
	}

	step (input, index) {
		return this.lookup (Number.parseInt (
			input.slice(index, index + this.neighbors),
			this.radix
	))}

	lookup (index) {
		return 0 |
		mod((this.seed / Math.pow(this.radix, index)), this.radix)
}}

var rule110 = new Rule (2, 3, 110) 