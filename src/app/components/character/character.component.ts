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
  filtersBtn: boolean = false;
  thereAreFilters: boolean = true;

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
      this.filterCharactersList.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.sortName = !this.sortName;
    }else{
      this.charactersArray.sort().reverse();
      this.filterCharactersList.sort().reverse();
      this.sortName = !this.sortName;
    }
  }

  sortByType(){
    console.log(this.sortType);
    if (this.sortType == false) {
      this.charactersArray.sort((a: any, b: any) => a.type.localeCompare(b.type));
      this.filterCharactersList.sort((a: any, b: any) => a.type.localeCompare(b.type));
      this.sortType = !this.sortType;
    }else{
      this.charactersArray.sort().reverse();
      this.filterCharactersList.sort().reverse();
      this.sortType = !this.sortType;
    }
  }

  filters(){
    this.filtersBtn = true;
    this.thereAreFilters = true;

    // Search by name or type validatios
    if (this.filterName != '' && this.filterType == '') {
      if (this.filterCharactersList.length == 0) {
        this.thereAreFilters = false;
      }else{
        this.thereAreFilters = true;
        this.searchByName(this.charactersArray, this.filterName);
      }
    }else if (this.filterType && !this.filterName) {
      if (this.filterCharactersList.length == 0) {
        this.thereAreFilters = false;
      }else{
        this.thereAreFilters = true;
        this.searchByType(this.charactersArray, this.filterType);
      }
    }

    // Empty search
    if ((this.filterName == '' && this.filterType == '')) {
      this.thereAreFilters = false;
    }
  }

  searchByName(characterArray: Result[], input: string){
    const filterArray = characterArray.filter(character => character.name.toLowerCase().includes(input.toLowerCase())); //after item is a compare statement

    if (filterArray) {
      this.filterCharactersList =  filterArray;
    }else{
      this.filterCharactersList = [];
    }
  }

  searchByType(characterArray: Result[], input: string){
    const filterArray = characterArray.filter(character => character.type.toLowerCase().includes(input.toLowerCase())); //after item is a compare statement

    if (filterArray) {
      this.filterCharactersList =  filterArray;
    }else{
      this.filterCharactersList = [];
    }
  }

  cleanFilters(){
    this.filterName = '';
    this.filterType = '';
    this.filterCharactersList = [];
    this.filtersBtn = false;
    this.thereAreFilters = true;
  }

  // returnArrayFiltered(cha) {

  //   const filterArray = this.charactersArray.filter(character => character.name.includes(this.filterName)); //after item is a compare statement

  // }

}
