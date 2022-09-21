import Helpers from "../utils/index.js";

export default class Middlewares {
	static numberValidator(req, res, next) {
		let { phoneNumber } = req.query;

		if (!phoneNumber) {
			return Helpers.errorResponse(
				res,
				{ message: "phoneNumber is required", location: "query" },
				400
			);
		}
		phoneNumber = phoneNumber.replaceAll(/\s|-/g, "");

		if (typeof phoneNumber !== "string") {
			return Helpers.errorResponse(res, "phoneNumber must be a string", 400);
		}

		if (phoneNumber.length < 10) {
			return Helpers.errorResponse(res, "phoneNumber is invalid", 400);
		}

		if (phoneNumber.length > 11) {
			if (phoneNumber.startsWith("+2340")) {
				req.phoneNumber = phoneNumber.slice(4);
				return next();
			}

			if (phoneNumber.startsWith("+234")) {
				req.phoneNumber = phoneNumber.slice(4);
				return next();
			}

			if (phoneNumber.startsWith("234")) {
				req.phoneNumber = phoneNumber.slice(3);
				return next();
			}
		}
		req.phoneNumber = phoneNumber;
		next();
	}

	static verifier(req, phoneNumber, regex, telco) {
		const test = phoneNumber.match(regex);
		req.result = {
			match: test,
			phoneNumber,
			telco: !!test ? telco : undefined,
		};
	}

	static mtnValidator(req, res, next) {
		if (req?.result?.match) return next();
		Middlewares.verifier(
			req,
			req.phoneNumber,
			/(^(0|)(7(03|06)|8(03|06|10|13|14|16)|9(03|06))[0-9]{0,8}$)/,
			"MTN"
		);
		next();
	}

	static gloValidator(req, res, next) {
		if (req?.result?.match) return next();
		Middlewares.verifier(
			req,
			req.phoneNumber,
			/(^(0|)(7(05)|8(05|07|11|15)|9(05))[0-9]{0,8}$)/,
			"GLO"
		);
		next();
	}

	static airtelValidator(req, res, next) {
		if (req?.result?.match) return next();
		Middlewares.verifier(
			req,
			req.phoneNumber,
			/(^(0|)(7(01|04|08)|8(02|08|12)|9(01|02|04))[0-9]{0,8}$)/,
			"AIRTEL"
		);
		next();
	}

	static nMobileValidator(req, res, next) {
		if (req?.result?.match) return next();
		Middlewares.verifier(
			req,
			req.phoneNumber,
			/(^(0|)(8(09|17|18)|9(08|09))[0-9]{0,8}$)/,
			"9MOBILE"
		);
		next();
	}
}
