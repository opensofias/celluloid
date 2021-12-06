'use strict'

const substitute = (prev, array) =>
	prev.split ('').map (s => array[Number.parseInt(s)] || '').join ('')

const repeat = (fun, times, prev, ...params) => 
	times <= 0 ? prev :
		repeat (fun, times - 1, fun (prev, ...params), ...params)

const repeatedSubstitution = (first, ...lookup) => iterations =>
	repeat (substitute, Number.parseInt(iterations), first, lookup)

const generateSeed = seedCode => {
	if (seedFunctions [seedCode.slice (0, 2)])
	return seedFunctions [seedCode.slice (0, 2)] (seedCode.slice (2))
	else throw "invalid seed code: " + seedCode
}

// todo: more parameterized seeds in general would be nice
const seedFunctions = {
	tm: repeatedSubstitution ('0', '01', '10'), // Thue-Morse sequence
	rb: repeatedSubstitution ('0', '1', '10'), // rabbit sequence
	cr: repeatedSubstitution ('010', '00', '1'), // core (single 1 surrounded by 0s)
	ts: repeatedSubstitution ('01', '00', '11'), // transition (0 on one side, ones at the other)
	dc (iterations) { // dragon curve sequence
		let strings = ['', '']
		while (iterations -- > 0) {
			strings = [strings.join ('1'), strings.join ('0')]
		}
		return strings [0]
	},
	kk (iterations) { // kolakosky series mod 2
		const seed = [1,2]
		const length = seed.length
		let prev = seed
		while (iterations -- > 0) {
			let next = []
			prev.forEach((repetitions, idx) => {
				while (repetitions -- > 0) {
					next = [...next, seed [idx % length]]
				}
			})
			prev = next
		}
		return prev.map(x => x % 2).join('')
	}
}