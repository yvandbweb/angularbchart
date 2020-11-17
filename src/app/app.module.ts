import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Graph1Component } from './graph1/graph1.component';
import { Graph2Component } from './graph2/graph2.component';
import { MainComponent } from './main/main.component';
import { ElementsComponent } from './elements/elements.component';
import { BarchartComponent } from './barchart/barchart.component';
import { DatasourceService } from './datasource.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ColorSketchModule } from 'ngx-color/sketch';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    Graph1Component,
    Graph2Component,
    MainComponent,
    ElementsComponent,
    BarchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ColorSketchModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [DatasourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
