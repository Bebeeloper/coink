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
  sortSpecie: boolean = false;
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
      // console.log(this.charactersArray);
    });
  }

  sortByName(){
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

  sortBySpecies(){
    if (this.sortSpecie == false) {
      this.charactersArray.sort((a: any, b: any) => a.species.localeCompare(b.species));
      this.filterCharactersList.sort((a: any, b: any) => a.species.localeCompare(b.species));
      this.sortSpecie = !this.sortSpecie;
    }else{
      this.charactersArray.sort().reverse();
      this.filterCharactersList.sort().reverse();
      this.sortSpecie = !this.sortSpecie;
    }
  }

  filters(){
    this.filtersBtn = true;
    this.thereAreFilters = true;
    const filterNameList: Result[] = this.searchByName(this.charactersArray, this.filterName);
    const filterTypeList: Result[] = this.searchByType(this.charactersArray, this.filterType);
    const filterNameTypeList: Result[] = this.searchByNameAndType(this.charactersArray, this.filterName, this.filterType);

    // Empty search
    if ((this.filterName == '' && this.filterType == '')) {
      this.thereAreFilters = false;
    }

    // Search by name or type validatios
    if (this.filterName != '' && this.filterType == '') {
      if (filterNameList.length > 0) {
        this.thereAreFilters = true;
        this.filterCharactersList = filterNameList;
      }else{
        this.thereAreFilters = false;
        this.filterCharactersList = [];
      }
    }else if (this.filterType && !this.filterName) {
      if (filterTypeList.length > 0) {
        this.thereAreFilters = true;
        this.filterCharactersList = filterTypeList;
      }else{
        this.thereAreFilters = false;
        this.filterCharactersList = [];
      }
    }

    // Search by name and type
    if ((this.filterName != '' && this.filterType != '')) {
      if (filterNameTypeList.length > 0) {
        this.thereAreFilters = true;
        this.filterCharactersList = filterNameTypeList;
      }else{
        this.thereAreFilters = false;
        this.filterCharactersList = [];
      }
    }

  }

  searchByName(characterArray: Result[], input: string){
    const filterArray: Result[] = characterArray.filter(character => character.name.toLowerCase().includes(input.toLowerCase())); //after item is a compare statement
    return filterArray;
  }

  searchByType(characterArray: Result[], input: string){
    const filterArray = characterArray.filter(character => character.type.toLowerCase().includes(input.toLowerCase())); //after item is a compare statement
    return filterArray;
  }

  searchByNameAndType(characterArray: Result[], inputName: string, inputType: string){
    const filterArray = characterArray.filter(character => character.name.toLowerCase().includes(inputName.toLowerCase()) && character.type.toLowerCase().includes(inputType.toLowerCase()));
    return filterArray;
  }

  cleanFilters(){
    this.filterName = '';
    this.filterType = '';
    this.filterCharactersList = [];
    this.filtersBtn = false;
    this.thereAreFilters = true;
  }

}
