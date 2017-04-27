'use strict'

const repStep = (prev, array) =>
	prev.split ('').map (s => array[Number.parseInt(s)] || '').join ('')

const recurTimes = (fun, times, step, ...params) => {
	while (times -- > 0) step = fun(step, ...params)
	return step
}

const repeatedReplace = (iterations, first, ...lookup) =>
	recurTimes (repStep, Number.parseInt(iterations), first, lookup)

const seedLib = {
	tm: ['0', '01', '10'],
	rb: ['0', '1', '10'],
	cr: ['010', '00', '1'],
	ts: ['01', '00', '11'],
}

var seedGen = string => {
	const kind = seedLib [string.slice (0, 2)]
	if (kind) return repeatedReplace (param, ...string.slice (2))
	return repeatedReplace (...string.split ('.'))
}