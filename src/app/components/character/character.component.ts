import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { Characters } from 'src/app/models/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  charactersArray: any = [];

  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.charactersService.getAllCharacters()
    .subscribe((data: any) => {
      for (let index = 0; index < data.results.length; index++) {
        this.charactersArray.push(data.results[index]);
      }
    });
  }

}
