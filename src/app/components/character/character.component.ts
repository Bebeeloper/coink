import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  charactersArray: any = [];
  charactersFilter: any = [];
  sortName: boolean = false;
  sortType: boolean = false;

  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.charactersService.getAllCharacters()
    .subscribe((data: any) => {
      for (let index = 0; index < data.results.length; index++) {
        this.charactersArray.push({
            name: data.results[index].name,
            species: data.results[index].species
          }
        );
      }
      console.log('array: ' + this.charactersArray[5].species);
    });
  }

  sortByName(){
    console.log(this.sortName);
    if (this.sortName == false) {
      this.charactersArray.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.sortName = !this.sortName;
    }else{
      this.charactersArray.sort().reverse();
      this.sortName = !this.sortName;
    }
  }

  sortByType(){
    console.log(this.sortType);
    if (this.sortType == false) {
      this.charactersArray.sort((a: any, b: any) => a.species.localeCompare(b.species));
      this.sortType = !this.sortType;
    }else{
      this.charactersArray.sort().reverse();
      this.sortType = !this.sortType;
    }
  }

}
