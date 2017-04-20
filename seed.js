'use strict'

var repeatedReplace = (iterations, first, ...lookup) =>
	recurTimes (repStep, Number.parseInt(iterations), first, lookup)

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
		case ("tm"): // Thue-Morse sequence
			return repeatedReplace (seedParam, "0", "01", "10")
		case ("rb"): // Fibonacci rabbit sequence
			return repeatedReplace (seedParam, "0", "1", "10")
		case ("cr"): // single core
			return repeatedReplace (seedParam, "010", "00", "1")
		case ("ts"): // transition
			return repeatedReplace (seedParam, "01", "00", "11")
		case ("rr"):
			return repeatedReplace (...seedParam.split("."))
	}
}