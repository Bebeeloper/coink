import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Characters } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCharacters(){
    return this.http.get<Characters>('https://rickandmortyapi.com/api/character');
  }

}
