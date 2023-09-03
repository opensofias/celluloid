export const UpdateBus = class {
	constructor (targets = []) {
		this.targets = []
		targets.forEach (x => this.addTarget (x))
	}
	update (data, origin) {
		this.targets.forEach (target => 
				target != origin && Object.assign (target, data)
			)
		return data
	}
	addTarget (target) {
		this.targets.push (target)
		target.bus = this
		return target
	}
}