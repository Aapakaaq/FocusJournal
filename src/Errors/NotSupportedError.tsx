/**
 * @param asserter The assertion function that threw the error. Removes stack-trace noise if provided.
 */
export class NotSupportedError extends Error {
	constructor(message: string, asserter=undefined) {
		super(message);
		Error.captureStackTrace?.(this, asserter || this.constructor);
	}
}
