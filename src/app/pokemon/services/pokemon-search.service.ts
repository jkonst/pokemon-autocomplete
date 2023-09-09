import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonApiResponse {
  results: Pokemon[];
  next: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PokemonSearchService {
  private readonly apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  fetchInitialPokemons(): Observable<PokemonApiResponse> {
    const initialUrl = this.apiBaseUrl + '?&limit=151';
    return this.http.get<PokemonApiResponse>(initialUrl);
  }

  fetchMorePokemons(url: string): Observable<PokemonApiResponse> {
    return this.http.get<PokemonApiResponse>(url).pipe(
      delay(1000) // Delay for 1 second for visual effect
    );
  }

  fetchPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiBaseUrl}/${name}`);
  }

}
