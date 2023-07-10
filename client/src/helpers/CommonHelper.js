import AppConfig from "../config/AppConfig";

export function prepareFormDataFromObject(obj) {
    let formdata = new FormData();
	for (let key in obj) {
		formdata.append(key, obj[key]);
	}

	return formdata;
}

export function prepareJsonBody(data) {
	return JSON.stringify(data);
}

export async function sendPostRequest(url, obj) {
    let response = await fetch(url, {
        method: "POST",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
		},
		body: prepareJsonBody(obj)
    });

	let data = await response.json();

	if( !response.ok ) {
		throw new ValidationError(data.message, data.errors);
	}

	return data;
}

export async function sendGetRequest(url, params={}) {

	if( Object.keys(params).length != 0 ) {
		let queryString = new URLSearchParams(params);
		url += '?'+ queryString.toString();
	}
	
	let response = await fetch(url, {
        method: "GET",
		cache: "no-cache"
    });

	let data = await response.json();

	if( !response.ok ) {
		throw new ValidationError(data.message, data.errors);
	}

	return data;
}

export async function sendAuthorizeGetRequest(url, params={}) {
	let token = localStorage.getItem('access_token');

	if( Object.keys(params).length != 0 ) {
		let queryString = new URLSearchParams(params);
		url += '?'+ queryString.toString();
	}

	let response = await fetch(url, {
        method: "GET",
		cache: "no-cache",
		headers: {
			'Authorization' : `Bearer ${token}`
		}

    });
	// console.log(await response.text())
	// return;

	let data = await response.json();

	if( !response.ok ) {
		throw new ValidationError(data.message, data.errors);
	}

	return data;
}

export async function sendAuthorizePostRequest(url, obj) {
	let token = localStorage.getItem('access_token');

	let response = await fetch(url, {
        method: "POST",
		body: prepareJsonBody(obj),
		headers: {
			"Content-Type": "application/json",
			'Authorization' : `Bearer ${token}`
		}
    });

	let data = await response.json();

	if( !response.ok ) {
		throw new ValidationError(data.message, data.errors);
	}

	return data;
}

export async function sendAuthorizePostFormData(url, obj) {
	let token = localStorage.getItem('access_token');

	let response = await fetch(url, {
        method: "POST",
		body: prepareFormDataFromObject(obj),
		headers: {
			'Authorization' : `Bearer ${token}`
		}
    });

	let data = await response.json();

	if( !response.ok ) {
		throw new ValidationError(data.message, data.errors);
	}

	return data;
}

export function isObjectEmpty(obj) {
	return Object.keys(obj).length === 0;
}

export class ValidationError extends Error {
	constructor(message, errors={}) {
		super(message);
		this.name = "ValidationError";
		this.errors = errors;
	}
}


export async function sendGetCMSRequest(params) {

	if( Object.keys(params).length != 0 ) {
		let queryString = new URLSearchParams(params);
		url += '?'+ queryString.toString();
	}
	const url = AppConfig.CMS_URL + `slug=${params}`
	let response = await fetch(url, {
        method: "GET",
		cache: "no-cache"
    });

	let data = await response.json();

	if( !response.ok ) {
		throw new ValidationError(data.message, data.errors);
	}

	return data;
}