import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

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

  fetchPokemons(url?: string): Observable<PokemonApiResponse> {
    const apiUrl = url || this.apiBaseUrl + '?&limit=151';
    return this.http.get<PokemonApiResponse>(apiUrl);
  }

  fetchPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiBaseUrl}/${name}`);
  }

}
