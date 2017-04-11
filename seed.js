'use strict'

var thueMorse = iter => recurTimes (morseStep, iter, "0")

var rabbit = iter => recurTimes (rabbitStep, iter, "0")

var rabbitStep = prev =>
	prev.split("").map(s => s == 1 ? "10" : "1").join("")

var morseStep = prev =>
	prev.split("").map(s => s == 1 ? "10" : "01").join("")

var recurTimes = (fun, times, start) =>
{
	while (times -- > 0) start = fun(start)
	return start
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
	}
}