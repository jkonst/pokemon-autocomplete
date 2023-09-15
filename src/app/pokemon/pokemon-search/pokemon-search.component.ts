import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {capitalizeFirst} from "../../shared/utils";
import {Pokemon, PokemonApiResponse, PokemonDetails, PokemonSearchService} from "../services/pokemon-search.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {
  pokemons: Pokemon[] = [];
  nextUrl?: string;
  searchForm: FormGroup;
  labelName = 'Favorite Character';
  pokemonDetails: PokemonDetails | null = null;
  isLoadingMore = false;
  isLoadingDetails = false;
  destroyRef = inject(DestroyRef)
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: PokemonApiResponse) => {
        this.pokemons = response.results;
        this.nextUrl = response.next;
      });
  }

  showDetails(selectedPokemon: Pokemon) {
    this.isLoadingDetails = true;
    this.pokemonSearchService.fetchPokemonDetails(selectedPokemon.name)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(details => {
        this.pokemonDetails = {...details, name: capitalizeFirst(details.name)};
        this.isLoadingDetails = false;
      });
  }

  loadMore() {
    if (this.nextUrl && !this.isLoadingMore) {
      this.isLoadingMore = true;
      this.pokemonSearchService.fetchMorePokemons(this.nextUrl)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((response: PokemonApiResponse) => {
          this.pokemons = [...this.pokemons, ...response.results];
          this.nextUrl = response.next;
          this.isLoadingMore = false;
        });
    }
  }

  pokemonFilterFn(item: Pokemon, query: string): boolean {
    return item.name.includes(query.toLowerCase());
  }

  pokemonDisplayFn(item: Pokemon): string {
    return capitalizeFirst(item.name);
  }

  resetPokemons() {
    this.pokemonDetails = null;
    this.loadInitialPokemons();
  }
}
