import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {
    @Output() handleChangeElementName = new EventEmitter<any>();
    @Output() handleChangeElements = new EventEmitter<any>();
    @Output() resetChangeElements = new EventEmitter<any>();
    @Input() maindata;
    maindataele;
    maindataelesplit;
    lng=[];
    totlength=0;
    steps=0;
    colorshow=-1;
    valueshow=-1;
    selectedValue=-1;
    selectedColor=-1;
    topaddelement=-1;
    elementinput:string;
    totalsteps=0;
    topsaveelement;
    constructor() {this.maindataele=this.maindata;console.log("b"); }


    @Input()
      set setMain(maindataele: any) {
      this.maindataele=maindataele;
      this.steps=4;
      this.totalsteps=this.steps*3;
      this.maindataelesplit=new Array();
      this.maindataelesplit[0]=this.maindataele.slice(0, this.steps);
      this.maindataelesplit[1]=this.maindataele.slice(this.steps, this.steps*2);
      this.maindataelesplit[2]=this.maindataele.slice(this.steps*2, this.steps*4);
      this.lng[0]=0;
      this.lng[1]=this.steps;
      this.lng[2]=this.steps*2;
      this.totlength=this.maindataele.length;
      this.colorshow=-1;
      this.valueshow=-1;
      this.selectedValue=-1;
      this.elementinput="";
      this.topsaveelement=-1;
    }

    showElementForm(){
        this.topaddelement=1;
        this.topsaveelement=1;
    }

    hideElementForm(){
        this.topaddelement=-1;
    }

    saveElementForm(){
        const tmp4 = this.maindataele.map(l => Object.assign({}, l)); 
        const randomcolor='#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        tmp4[tmp4.length]={name:this.elementinput,value:60,color:randomcolor}
        this.maindataele=tmp4;
        this.sendToMaster();      
        this.topsaveelement=-1;
        this.topaddelement=-1;
    }

    showcolor(i){
        this.colorshow=i;
        this.selectedColor=-1;
    }

    hidecolor(i){
        this.colorshow=-1;
        this.selectedColor=-1;
        this.sendToMaster(); 
    }

    showvalue(i,val){
        this.selectedValue=val;
        this.valueshow=i;
    }
    hidevalue(i){
        this.selectedValue=-1;
        this.valueshow=-1;
    }


    ngOnInit(): void {

    }

    setValue(event,i){
       const tmp = this.maindataele.map(l => Object.assign({}, l)); 
       tmp[i].name=event.target.value;  
       this.maindataele=tmp;        
       this.sendToMasterText();     
    }


    handleChangeElementArrowUp(event){
       const i=event;
       const tmp = this.maindataele.map(l => Object.assign({}, l));
       const up = tmp[i-1];
       tmp[i-1]=tmp[i];
       tmp[i]=up;
       this.maindataele=tmp;
       this.sendToMaster();     

    }

    colorCancel(){
        this.colorshow=-1;
        this.selectedColor=-1;
        this.sendToMasterText();
    }

    DeleteElement(event){
       const i=event;

       const tmp = this.maindataele.map(l => Object.assign({}, l));
       const newdata=[];
       let countindex=0;

       {this.maindataele.map((value, index) => {
               if (index!=i){
                 newdata[countindex]=tmp[index]; 
                 countindex++;
               }                          
       })}

       this.maindataele=newdata;

       this.sendToMaster();  

    } 

    handleChangeComplete(event,i){
       this.selectedColor=event.color.hex;             
    }

    handleChangeCompleteSaveColor(i){
       this.colorshow=-1;
       if (this.selectedColor!=-1){
        const tmp = this.maindataele.map(l => Object.assign({}, l)); 
        tmp[i].color=this.selectedColor;  
        this.maindataele=tmp;  
       }
       this.sendToMaster();
    }

    onSliderChange(event,i){
       this.selectedValue=event.value;
    }

    onSliderChangeSetValue(i){
       const tmp = this.maindataele.map(l => Object.assign({}, l)); 
       tmp[i].value=this.selectedValue;  
       this.maindataele=tmp;
       this.sendToMaster();
    }

    downloadimage(){
        var canvas = <HTMLCanvasElement> document.getElementById("canvas");
        let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "my-bar-chart.png";
        link.href = image;
        link.click();
    }

    sendToMaster(){
        this.handleChangeElementName.emit(this.maindataele);
    }

    sendToMasterText(){
        this.handleChangeElements.emit(this.maindataele);
    }

    resetAll(){
        this.resetChangeElements.emit(this.maindataele);
    }

}
