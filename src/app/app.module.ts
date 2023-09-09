import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonSearchComponent } from './pokemon/pokemon-search/pokemon-search.component';
import { AutocompleteComponent } from './shared/autocomplete/autocomplete.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { ScrollableListComponent } from './shared/scrollable-list/scrollable-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonSearchComponent,
    AutocompleteComponent,
    ScrollableListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
