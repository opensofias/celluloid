'use strict'

var thueMorse = iter => range(1, Math.abs(iter))
.reduce(a => a.concat(a.map(x => 1 - x)), [0])
.join('');


let range = (m, n) => Array.from({
		length: Math.floor((n - m)) + 1
}, (_, i) => m + i);

var seedGen = seedString =>
{
	const seedParam = seedString.slice (2)
	switch (seedString.slice (0, 2))
	{
		case ("tm"):
			return thueMorse(Number.parseInt(seedParam))
		
	}
}