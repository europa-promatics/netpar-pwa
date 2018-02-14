import { Injectable } from '@angular/core';
import {languages,languageList} from '../staticData/languages'

@Injectable()
export class LanguageService {

  constructor() { }

   getLanguages(): Promise<languages[]> {
    return Promise.resolve(languageList);
  }

}
