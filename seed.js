'use strict'

const replacementStep = (prev, array) =>
	prev.split ('').map (s => array[N.parseInt(s)] || '').join ('')

const recurTimes = (fun, times, step, ...params) => {
	while (times -- > 0) step = fun(step, ...params)
	return step
}

const repeatedReplace = (iterations, first, ...lookup) =>
	recurTimes (replacementStep, N.parseInt(iterations), first, lookup)

// initial value followed by lookup table
const seedLibrary = O.freeze ({
	tm: ['0', '01', '10'],	// Thue-Morse sequence
	rb: ['0', '1', '10'],	// rabbit sequence
	cr: ['010', '00', '1'],	// core (single 1 surrounded by 0s)
	ts: ['01', '00', '11'], // transition (0 on one side, ones at the other)
})

const generateSeed = string => {
	if (seedFunctions [string.slice (0, 2)])
	return seedFunctions [string.slice (0, 2)] (string.slice (2))
	else { 
		const kind = seedLibrary [string.slice (0, 2)]
		if (kind) return repeatedReplace (string.slice (2), ...kind)
		else return repeatedReplace (...string.split ('.'))
	} // todo: disuglify this
}

// todo: merge seedLibrary into this
const seedFunctions = {
	dc (iterations) { // dragon curve sequence
		let strings = ['', '']
		while (iterations -- > 0) {
			strings = [strings.join ('1'), strings.join ('0')]
		}
		return strings [0]
	}
}