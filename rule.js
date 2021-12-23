// todo: use TypedArrays instead of strings for speedup

export const rollout = config => seed => ruleNum => {
	let result = [seed]
	const stepFun = step (config) (buildLUT (config) (ruleNum))
	do result.push (generation (config) (stepFun) (result [result.length -1]))
	while (result [result.length -1].length >= config.neighbors)
	return result
}

const step = ({radix, neighbors}) => LUT => (past, index) => 
	LUT [positional (
		past.slice(index, index + neighbors),
		radix
	)]

const positional = (digits = [], radix) => 
	digits.reduce ((prev, cur) => prev * radix + cur, 0)

const buildLUT = ({radix, neighbors}) => ruleNum =>
	(new Uint8Array (neighbors ** radix)).map ((val, idx) => 
		(ruleNum / radix ** idx) % radix
	)

const generation = ({radix, neighbors}) => stepFun => past => {
	let result = new Uint8Array (past.length + 1 - neighbors)
	let index = 0
	while (index < result.length)
		result [index] = stepFun (past, index++).toString (radix)
	return result 
}