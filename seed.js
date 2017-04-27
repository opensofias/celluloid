'use strict'

var repeatedReplace = (iterations, first, ...lookup) =>
	recurTimes (repStep, Number.parseInt(iterations), first, lookup)

var repStep = (prev, array) =>
	prev.split ('').map (s => array[Number.parseInt(s)] || '').join ('')

var recurTimes = (fun, times, step, ...params) => {
	while (times -- > 0) step = fun(step, ...params)
	return step
}

const seedLib = {
	tm: ['0', '01', '10'],
	rb: ['0', '1', '10'],
	cr: ['010', '00', '1'],
	ts: ['01', '00', '11'],
}

var seedGen = string => {
	const [kind, param]
	= [seedLib[string.slice (0, 2)], string.slice (2)]
	if (kind) return repeatedReplace (param, ...kind)
	else return repeatedReplace (...param.split('.'))
}