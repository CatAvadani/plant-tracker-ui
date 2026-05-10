export function parseJwt(token: string): Record<string, unknown> {
	const base64Url = token.split(".")[1];
	if (!base64Url) {
		throw new Error("Invalid JWT token");
	}

	const base64 = base64Url
		.replace(/-/g, "+")
		.replace(/_/g, "/")
		.padEnd(Math.ceil(base64Url.length / 4) * 4, "=");
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
			.join(""),
	);

	return JSON.parse(jsonPayload);
}

export function isJwtExpired(token: string) {
	try {
		const payload = parseJwt(token);
		const expiresAt = payload.exp;

		if (typeof expiresAt !== "number" || !Number.isFinite(expiresAt)) {
			return true;
		}

		return Date.now() >= expiresAt * 1000;
	} catch {
		return true;
	}
}
