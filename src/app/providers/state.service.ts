import { Injectable } from '@angular/core';
import {stateList,state} from '../staticData/states'

@Injectable()
export class StateService {

  constructor() { }

   getStates(): Promise<state[]> {
    return Promise.resolve(stateList);
  }
  

}
