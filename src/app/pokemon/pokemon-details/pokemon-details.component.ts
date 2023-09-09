import {Component, Input} from '@angular/core';
import {PokemonDetails} from '../services/pokemon-search.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {
  @Input() pokemonDetails: PokemonDetails | null = null;

}
