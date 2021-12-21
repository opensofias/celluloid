'use strict'

const substitute = (prev, array) =>
	prev.split ('').map (s => array[Number.parseInt(s)] || '').join ('')

const repeat = (fun, times, prev, ...params) => 
	times <= 0 ? prev :
		repeat (fun, times - 1, fun (prev, ...params), ...params)

const repeatedSubstitution = (first, ...lookup) => iter =>
	repeat (substitute, Number.parseInt(iter), first, lookup)

const generateSeed = seedCode => {
	if (seedFunctions [seedCode.slice (0, 2)])
	return seedFunctions [seedCode.slice (0, 2)] (seedCode.slice (2))
	else throw "invalid seed code: " + seedCode
}

const superDragon = (fillers = ['1', '0'], strings = []) => iter => 
	iter <= -1 ? strings [0] : superDragon (
		fillers,
		fillers.map (filler => strings.join(filler))
	) (iter - 1)

const recursiveSubstitution = (lookup, prev = '0') => iter =>
	iter <= 0 ? prev : recursiveSubstitution (
		lookup,
		prev.split ('').map (idx => lookup[Number.parseInt(idx)] || '').join ('')
	) (iter - 1)

// todo: more parameterized seeds in general would be nice
const seedFunctions = {
	tm: repeatedSubstitution ('0', '01', '10'), // Thue-Morse sequence
	rb: repeatedSubstitution ('0', '1', '10'), // rabbit sequence
	cr: repeatedSubstitution ('010', '00', '1'), // core (single 1 surrounded by 0s)
	ts: repeatedSubstitution ('01', '00', '11'), // transition (0 on one side, ones at the other)
	dc: superDragon (['1', '0']),
	kk: iter => { // kolakosky series mod 2
		const seed = [1,2]
		const length = seed.length
		let prev = seed
		while (iter -- > 0) {
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