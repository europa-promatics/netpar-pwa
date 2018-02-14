import {Injectable} from "@angular/core";


import {Current} from "../models/current";

@Injectable()
export class AppProvider {
    current: Current;
    constructor( ) {
        this.current = new Current('all');
    }

}