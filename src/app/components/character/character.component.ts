import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { Characters } from 'src/app/models/character.model';
import { Result } from 'src/app/models/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  filterName: string = '';
  filterType: string = '';

  charactersArray: Result[] = [];
  filterCharactersList: Result[] = [];

  charactersFilter: any = [];
  sortName: boolean = false;
  sortType: boolean = false;

  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.charactersService.getAllCharacters()
    .subscribe((data: Characters) => {
      for (let character of data.results) {
        this.charactersArray.push(character);
      }
      console.log(this.charactersArray);
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

  filters(){
    const filterArray = this.charactersArray.filter(character => character.name = this.filterName);
    console.log(filterArray);

    // const filterArray = this.charactersArray.includes(this.filterName);
  }

}
