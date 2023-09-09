import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Pokemon, PokemonApiResponse, PokemonDetails, PokemonSearchService} from "../services/pokemon-search.service";

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
  private unsubscribe$ = new Subject<void>();
  private pokemonSearchService = inject(PokemonSearchService);
  constructor(private formBuilder: FormBuilder) {
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
    this.pokemonDetails = null;
    this.loadInitialPokemons();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
