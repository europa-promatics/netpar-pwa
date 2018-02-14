export const LANGUAGE = {
	ENGLISH: "en",
	MARATHI: "ma",
}

export interface Environment 
{
	language: string;
	endPoint:string;
	thumbnail:string;
	production:boolean
}

export const DEV: Environment = {
	language:LANGUAGE.ENGLISH,
	endPoint:'https://www.netpar.in/netpar/',
	thumbnail:'http://www.ionicteam.com/netpar/uploads/content/thumbnails/',
	production:false
}

export const PROD: Environment = {
	language:LANGUAGE.MARATHI,
	endPoint:'https://www.netpar.in/netpar/',
	thumbnail:'http://www.ionicteam.com/netpar/uploads/content/thumbnails/',
	production: true
}

export const environment: Environment= PROD;

// export const environment = {
//   production: true
// };