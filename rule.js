import { mod } from "./tools.js"

// todo: use TypedArrays instead of strings for speedup

export const rollout = config => seed => ruleNum => {
	let result = [seed]
	const stepFun = step (config) (buildLUT (config) (ruleNum))
	do result.push (generation (config) (stepFun) (result [result.length -1]))
	while (result [result.length -1].length >= config.neighbors)
	return result
}

const step = ({radix, neighbors}) => LUT => (past, index) => 
	LUT [Number.parseInt (
		past.slice(index, index + neighbors),
		radix
	)]

const buildLUT = ({radix, neighbors}) => ruleNum =>
	(new Uint8Array (neighbors ** radix)).map ((val, idx) => 
		(ruleNum / Math.pow(radix, idx)) % radix
	)

const generation = ({radix, neighbors}) => stepFun => past => {
	let result = ''
	let index = 0
	while (index + neighbors <= past.length)
		result += stepFun (past, index++).toString (radix)
	return result 
}