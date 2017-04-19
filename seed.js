'use strict'

var thueMorse = iter => recurTimes (morseStep, iter, "0")

var rabbit = iter => recurTimes (rabbitStep, iter, "0")

var repeatedReplace = (iterations, first, ...lookup) =>
	recurTimes (repStep, Number.parseInt(iterations), first, lookup)

var rabbitStep = prev =>
	prev.split ("").map (s => s == 1 ? "10" : "1").join ("")

var morseStep = prev =>
	prev.split ("").map (s => s == 1 ? "10" : "01").join ("")

var repStep = (prev, array) =>
	prev.split ("").map (s => array[Number.parseInt(s)] || "").join ("")

var recurTimes = (fun, times, step, ...params) =>
{
	while (times -- > 0) step = fun(step, ...params)
	return step
}
var seedGen = seedString =>
{
	const seedParam = seedString.slice (2)
	switch (seedString.slice (0, 2))
	{
		case ("tm"):
			return thueMorse (Number.parseInt(seedParam))
		case ("rb"):
			return rabbit (Number.parseInt(seedParam))
		case ("rr"):
			return repeatedReplace (...seedParam.split("."))
	}
}