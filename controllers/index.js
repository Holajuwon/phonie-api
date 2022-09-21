import TrieNode from '../services/trie.js'
import Helpers from '../utils/index.js'

export default class Controllers {
	static whichTelco(req, res) {
		const { match, ...data } = req.result
		if (!!match) {
			TrieNode.addItem(data.phoneNumber)
			Helpers.successResponse(res, 'Phone number verified successfully', data, 200)
		} else {
			Helpers.errorResponse(res, "Phone Number doesn't match any telco", 400)
		}
	}

	static autoComplete(req, res) {
		const { phoneNumber } = req.query
		if (phoneNumber) {
			const result = TrieNode.autocomplete(phoneNumber)
			Helpers.successResponse(res, 'autocomplete successful', result, 200)
		} else {
			Helpers.errorResponse(res, 'Phone Number is required', 400)
		}
	}
}
