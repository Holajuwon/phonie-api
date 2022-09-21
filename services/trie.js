class TrieNode {
	constructor(params) {
		this.next = {}
		this.leaf = false
	}

	addItem(item) {
		let i = 0
		let current = this

		while (i < item.length) {
			let k = item[i]

			if (!current.next[k]) {
				let node = new TrieNode()
				current.next[k] = node
			}
			current = current.next[k]

			if (i === item.length - 1) {
				current.leaf = true
			} else {
				current.leaf = false
			}

			i += 1
		}
	}

	search(item) {
		if (this.leaf && item.length === 0) {
			return true
		}
		let first = item[0]
		let rest = item.slice(1)

		if (this.next[first]) {
			return this.next[first].search(rest)
		} else {
			return false
		}
	}

	traversal(item) {
		if (this.leaf) {
			return [item]
		}
		let values = []
		for (let i in this.next) {
			let s = item + i
			values = [...values, ...this.next[i].traversal(s)]
		}

		return values
	}
	autocomplete(item) {
		let i = 0
		let s = ''

		let current = this

		while (i < item.length) {
			let k = item[i]
			s += k
			if (current.next[k]) {
				current = current.next[k]
			} else {
				return null
			}
			i += 1
		}

		return current.traversal(s)
	}
}

export default new TrieNode()
