'use strict'

const rule = ({radix, neighbors, ruleNum}) =>
	Object.freeze (Object.assign (
		Object.create (rule.prototype),
		{radix, neighbors, ruleNum}
	))

rule.prototype = Object.freeze ({
	transform (input) {
		let result = ''
		let count = 0
		while (count + this.neighbors <= input.length)
		result += this.step (input, count ++).toString (this.radix)
		
		return result 
	},

	step (input, index) {
		return this.lookup (Number.parseInt (
			input.slice(index, index + this.neighbors),
			this.radix
	))},

	lookup (index) {
		return 0 |
		mod((this.ruleNum / Math.pow(this.radix, index)), this.radix)
}})

Object.freeze (rule)