export const generateSeed = seedCode => {
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
	tm: recursiveSubstitution (['01', '10']), // Thue-Morse sequence
	rb: recursiveSubstitution (['1', '10']), // rabbit sequence (aka fibonacci word)
	cr: recursiveSubstitution (['00', '1'], '010'), // core (single 1 surrounded by 0s)
	ts: recursiveSubstitution (['00', '11'], '01'), // transition (0 on one side, ones at the other)
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