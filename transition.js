'use strict'

class Rule {
	constructor ({radix, neighbors, ruleNum}) {
		this.radix = radix
		this.ruleNum = ruleNum
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
		return this.lookup (N.parseInt (
			input.slice(index, index + this.neighbors),
			this.radix
	))}

	lookup (index) {
		return 0 |
		mod((this.ruleNum / Math.pow(this.radix, index)), this.radix)
}}

var rule110 = new Rule (2, 3, 110) 