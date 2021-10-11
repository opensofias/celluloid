'use strict'

const replacementStep = (prev, array) =>
	prev.split ('').map (s => array[Number.parseInt(s)] || '').join ('')

const recurTimes = (fun, times, step, ...params) => {
	while (times -- > 0) step = fun(step, ...params)
	return step
}

const repeatedReplace = (first, ...lookup) => iterations =>
	recurTimes (replacementStep, Number.parseInt(iterations), first, lookup)

const generateSeed = seedCode => {
	if (seedFunctions [seedCode.slice (0, 2)])
	return seedFunctions [seedCode.slice (0, 2)] (seedCode.slice (2))
	else throw "invalid seed code: " + seedCode
}

// todo: reintroduce custom repeatedReplace functions, more parameterized seeds in general would be nice
const seedFunctions = {
	tm: repeatedReplace ('0', '01', '10'), // Thue-Morse sequence
	rb: repeatedReplace ('0', '1', '10'), // rabbit sequence
	cr: repeatedReplace ('010', '00', '1'), // core (single 1 surrounded by 0s)
	ts: repeatedReplace ('01', '00', '11'), // transition (0 on one side, ones at the other)
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