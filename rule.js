//todo: this whole object-malarky should be avoidable by using modules 
export const rule = ({radix, neighbors, ruleNum}) =>
	Object.freeze ({
		radix, neighbors, ruleNum, __proto__:rule.prototype
	})

// todo: use TypedArrays instead of strings for speedup
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