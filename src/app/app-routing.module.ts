import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Graph1Component } from './graph1/graph1.component';
import { Graph2Component } from './graph2/graph2.component';


const routes: Routes = [
  { path: '', component: Graph1Component },
  { path: 'graph2', component: Graph2Component }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
