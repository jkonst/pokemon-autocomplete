import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon, PokemonApiResponse, PokemonDetails, PokemonSearchService} from "../services/pokemon-search.service";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  nextUrl?: string;
  searchForm: FormGroup;
  labelName = 'Favorite Character';
  pokemonDetails: PokemonDetails | null = null;
  isItemSelected = false;
  private unsubscribe$ = new Subject<void>();
  constructor(private pokemonSearchService: PokemonSearchService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  ngOnInit() {
    this.loadInitialPokemons();
  }

  loadInitialPokemons() {
    this.pokemonSearchService.fetchInitialPokemons()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: PokemonApiResponse) => {
        this.pokemons = response.results;
        this.nextUrl = response.next;
      });
  }

  showDetails(selectedPokemon: Pokemon) {
    this.isItemSelected = true;
    this.pokemonSearchService.fetchPokemonDetails(selectedPokemon.name)
      .subscribe(details => {
        this.pokemonDetails = details;
      });
  }

  loadMore() {
    if (this.nextUrl) {
      this.pokemonSearchService.fetchMorePokemons(this.nextUrl)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((response: PokemonApiResponse) => {
          this.pokemons = [...this.pokemons, ...response.results];
          this.nextUrl = response.next;
        });
    }
  }

  pokemonFilterFn(item: Pokemon, query: string): boolean {
    return item.name.includes(query.toLowerCase());
  }

  pokemonDisplayFn(item: Pokemon): string {
    return item.name;
  }

  resetPokemons() {
    this.isItemSelected = false;
    this.pokemonDetails = null;
    this.loadInitialPokemons();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
