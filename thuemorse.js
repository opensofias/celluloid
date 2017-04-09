'use strict'

var thueMorse = iter => range(1, Math.abs(iter))
.reduce(a => a.concat(a.map(x => 1 - x)), [0])
.join('');

let range = (m, n) => Array.from ({
	length: Math.floor((n - m)) + 1
}, (_, i) => m + i);

var rabbit = iter => recurTimes (rabbitStep, iter, "0")

var rabbitStep = prev =>
	prev
	.split("0").join("i")
	.split("1").join("10")
	.split("i").join("1")


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