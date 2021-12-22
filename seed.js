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

const superKolakosky = (seed = [1, 2], prev) => iter =>
	iter <= 0 ? prev || seed : superKolakosky (
		seed,
		runAlong (seed, prev || seed)
	) (iter - 1)

const runAlong = (seed, prev = []) =>
	prev.map ((repCount, idx) =>
		new Array (repCount).fill (seed [idx % seed.length])
	).flat ()

const recurSubst = (lookup, prev = '0') => iter =>
	iter <= 0 ? prev : recurSubst (
		lookup,
		prev.split ('').map (idx => lookup[Number.parseInt(idx)] || '').join ('')
	) (iter - 1)

const randomDigits = (threshold = .5) => lengthLog2 =>
	new Array (Math.ceil (2 ** Number.parseFloat (lengthLog2)))
	.fill (0)
	.map (() => Math.random () > threshold ? 1 : 0)
	.join ()

	// todo: more parameterized seeds in general would be nice
const seedFunctions = {
	tm: recurSubst (['01', '10']), // Thue-Morse sequence
	rb: recurSubst (['1', '10']), // rabbit sequence (aka fibonacci word)
	cr: recurSubst (['00', '1'], '010'), // core (single 1 surrounded by 0s)
	ts: recurSubst (['00', '11'], '01'), // transition (0 on one side, ones at the other)
	dc: superDragon (['1', '0']),
	kk: iter => superKolakosky ([1, 2]) (iter).map (x => x -1).join (''),
	rd: randomDigits (.5)
}