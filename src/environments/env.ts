export const LANGUAGE = {
	ENGLISH: "en",
	MARATHI: "ma",
}

export interface Environment 
{
	language: string;
	endPoint:string;
	thumbnail:string;
}

export const DEV: Environment = {
	language:LANGUAGE.ENGLISH,
	endPoint:'https://www.netpar.in/netpar/',
	thumbnail:'https://www.netpar.in/netpar/uploads/content/thumbnails/'
}

export const PROD: Environment = {
	language:LANGUAGE.MARATHI,
	endPoint:'https://www.netpar.in/netpar/',
	thumbnail:'https://www.netpar.in/netpar/uploads/content/thumbnails/'
}

export const environment: Environment= PROD;