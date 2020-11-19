import { Component, OnInit, Input } from '@angular/core';
import { DatasourceService } from './../datasource.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers:  [ DatasourceService ]
})
export class MainComponent implements OnInit {
    @Input() graphnumber;
    maindata;
    maindataele;
    options;
    id;
    optionssave;
    datasave;
    isLoading;

    constructor(private DatasourceService: DatasourceService) { 

    }

    ngOnInit(): void {
      this.loaddata();
    }

    loaddata(){   
       
       this.id=this.graphnumber;
       this.optionssave="options"+this.id;
       this.datasave="datasave"+this.id;
       this.isLoading=true;
       if (localStorage.getItem(this.optionssave)==undefined){
            this.DatasourceService.getData(this.graphnumber).subscribe((res : any[])=>{
                localStorage.setItem(this.optionssave, JSON.stringify(res["options"]));
                localStorage.setItem(this.datasave, JSON.stringify(res["data"])); 
                this.setData();
                this.isLoading=false;
            }); 
            
        }else{
            this.setData();
            this.isLoading=false;
        }

    }

    setData(){
        this.maindata=JSON.parse(localStorage.getItem(this.datasave));
        this.maindataele=this.maindata;
        this.options=JSON.parse(localStorage.getItem(this.optionssave));
    }

    handleChangeElementName(data){     
       this.maindata=data;   
       this.maindataele=data;
       this.setLocal();
    }

    handleChangeElements(data){
       this.maindata=data;
       this.setLocal();
    }

    handleChangeOptions(options){
        this.options=options;
        this.setLocal();
          
    }

    resetChangeElements(){
        localStorage.removeItem(this.datasave);
        localStorage.removeItem(this.optionssave); 
        
        this.loaddata();
    }

    handleChangeElementsData(data){
       this.maindata=data;  
       this.maindataele=data;
       this.setLocal();
       this.loaddata();
    }

    setLocal(){
        localStorage.setItem(this.datasave, JSON.stringify(this.maindata));
        localStorage.setItem(this.optionssave, JSON.stringify(this.options));
    }
}
