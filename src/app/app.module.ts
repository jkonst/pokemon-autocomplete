import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {PokemonSearchComponent} from './pokemon/pokemon-search/pokemon-search.component';
import {AutocompleteComponent} from './shared/autocomplete/autocomplete.component';
import {PokemonDetailsComponent} from './pokemon/pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonSearchComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
