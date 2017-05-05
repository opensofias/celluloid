'use strict'

const [O, A, N] = [Object, Array, Number].map(x => Object.freeze(x))

let currentConfig

self.onmessage = ({data}) =>
	typeof data == 'object' ?
		(currentConfig = data) :
		self.postMessage (
			rollout (currentConfig.sequence, rule (
				O.assign(O.create(
					currentConfig), {ruleNum : data}
		))))

const rollout = (sequence, rule) => {
	let result = [sequence]
	do {
		sequence = rule.transform(sequence)
		result.push (sequence)
	} while (sequence.length >= rule.neighbors)
	return result
}

const rule = ({radix, neighbors, ruleNum}) =>
	O.freeze (O.assign (
		O.create (rule.prototype),
		{radix, neighbors, ruleNum}
	))

rule.prototype = O.freeze ({
	transform (input) {
		let result = ''
		let count = 0
		while (count + this.neighbors <= input.length)
		result += this.step (input, count ++).toString (this.radix)
		
		return result 
	},

	step (input, index) {
		return this.lookup (N.parseInt (
			input.slice(index, index + this.neighbors),
			this.radix
	))},

	lookup (index) {
		return 0 |
		mod((this.ruleNum / Math.pow(this.radix, index)), this.radix)
}})

O.freeze (rule)