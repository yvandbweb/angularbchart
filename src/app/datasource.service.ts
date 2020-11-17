import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {
   private data; 
   private options;
  constructor() { 

  }

  getData(wich) {
    console.log(wich);
    this.options=
      { fontcolor: "#3336DC" ,
       linecolor: "#000000",
       backgroundcolor: "#EBEAEA",
       yaxis:"yes",
       baraxis:"yes",
       sizeheight:"40",
barwidth:30,
interval:10,
       legendType:'right'}
    ;  
    this.data=[
      { name: 'Group A', value: 10 , color : "#5C2E2E" },
      { name: 'Group B', value: 30 , color : "#417505"},
      { name: 'Group C', value: 50 , color : "#34437E"},
      { name: 'Group D', value: 20 , color : "#5B8853"},
      { name: 'Group A', value: 10 , color : "#8C4040"},
      { name: 'Group B', value: 30 , color : "#242782"},
      { name: 'Group C', value: 50 , color : "#A48D58"},
      { name: 'Group D', value: 20 , color : "#887070"},
      { name: 'Group A', value: 10 , color : "#963E3E"},
      { name: 'Group B', value: 30 , color : "#568F58"},
      { name: 'Group C', value: 50 , color : "#FCDB5B"},
      { name: 'Group D', value: 20 , color : "#354B34"},


    ];  
    return {options:this.options,data:this.data};
  }
}
