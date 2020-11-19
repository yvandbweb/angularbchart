import { ElementRef, ViewChild, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;  
    @Output() handleChangeOptions = new EventEmitter<any>();
    @Output() handleChangeElementsData = new EventEmitter<any>();

    private ctx: CanvasRenderingContext2D;
    interval;
    widthbox;
    heightbox;
    maindata;
    canheight;
    canwidth;
    colorshow;
    widths;
    selectedColor;  
    widthplus;  
    intervalplus;
    @Input() options;
    @Input() 
    set setMain(data: any) {        
        this.maindata=data;
        this.draw();

    }

    ngOnInit(): void {
               
    }


    constructor() {    

    }

    sortUp(){
        this.maindata.sort(function(a, b){return a.value - b.value});
        this.sendToMasterText();
        this.draw();
    }

    sortDown(){
        this.maindata.sort(function(a, b){return b.value - a.value});
        this.sendToMasterText();
        this.draw();
    }

    showcolor(i){
        this.colorshow=i;
        this.selectedColor=-1;
    }

    hidecolor(i){
        this.colorshow=-1;
        this.selectedColor=-1;
    }

    colorCancel(){
        this.colorshow=-1;
        this.selectedColor=-1;
    }

    changeYaxis(yaxis){
        this.options.yaxis=yaxis;     
        this.sendToMasterOptions();
        this.draw();
    }

    changeBaraxis(baraxis){
        this.options.baraxis=baraxis;     
        this.sendToMasterOptions();
        this.draw();
    }

    handleChangeCompleteSaveColor(col){
        const tmp = this.options; 
        tmp[col]=this.selectedColor;  
        this.options=tmp; 
        this.colorshow=-1;        
        this.sendToMasterOptions();
        this.draw();
    }

    handleChangeComplete(event,i){
       this.selectedColor=event.color.hex;             
    }

    changelegendType(topbot){
        this.options.legendType=topbot;
        this.sendToMasterOptions();
        this.draw();
    }

    changeintervalplus(){
        const canwidth=this.maindata.length*(parseInt(this.options.barwidth)+parseInt(this.options.interval)+1);
        if (canwidth<=500){
            this.options.interval=parseInt(this.options.interval)+1;
            this.intervalplus=-1;
            this.widthplus=-1;
            this.draw();
        }else
            this.intervalplus='max';

        this.sendToMasterOptions();
    }
    
    changeintervalmin(){
        if (parseInt(this.options.interval)-1>=0){
            this.options.interval=parseInt(this.options.interval)-1;
            this.intervalplus=-1;
            this.widthplus=-1;
            this.draw();
        }else
            this.intervalplus='min';

        this.sendToMasterOptions();
    }

    changewidthplus(){
        const canwidth=this.maindata.length*(parseInt(this.options.barwidth)+1+parseInt(this.options.interval));
        if (canwidth<=500){
            this.options.barwidth=parseInt(this.options.barwidth)+1;
            this.intervalplus=-1;
            this.widthplus=-1;
            this.draw();
        }else
            this.widthplus='max';

        this.sendToMasterOptions();

    }
    
    changewidthmin(){
        if (parseInt(this.options.barwidth)-1>=15){
            this.options.barwidth=parseInt(this.options.barwidth)-1;
            this.intervalplus=-1;
            this.widthplus=-1;
            this.draw();
        }else
            this.widthplus='min';

        this.sendToMasterOptions();
    }




    legendTopBottom(ctx,canvasheight,data,canvaswidth){
        var w=20;
        var hightrecttext=canvasheight-100;

        let fontsize;
        let addhigrectest;
        let we;
        let le;
        let se;
        if (canvaswidth<400){
            fontsize="13px";
            addhigrectest=20;
            we=120;
            le=15;
        }else{
            fontsize="13px";
            addhigrectest=26;
            we=140;
            le=30;
        }


        for (var i = 0; i < data.length; i++) {
            if ((w+100)>canvaswidth){
                w=20;  
                hightrecttext=hightrecttext+le;
            }
            ctx.fillStyle = data[i].color;
            ctx.fillRect(w, hightrecttext-10,10,10);    

            ctx.font = fontsize+" Arial "+this.options.fontcolor;
            ctx.strokeStyle = this.options.fontcolor;
            ctx.fillStyle = this.options.fontcolor;
            ctx.textAlign = "start";
            ctx.fillText(data[i].name,w+addhigrectest,hightrecttext);
            w=w+we;   
        }           
    }
    
    legendRightLeft(ctx,canvasheight,data,canvaswidth){  
       var w=canvaswidth;        
        var hightrecttext=canvasheight-70;

        let fontsize;
        let addhigrectest;
        if (parseInt(this.options.sizeheight)<20){
            fontsize="12px";
            addhigrectest=22;
        }else{
            fontsize="13px";
            addhigrectest=26;
        }

        for (var i = 0; i < data.length; i++) {
            ctx.fillStyle = data[i].color;
            ctx.fillRect(w, hightrecttext-9,10,10);    

            ctx.font = fontsize+" Arial "+this.options.fontcolor;
            ctx.strokeStyle = this.options.fontcolor;
            ctx.fillStyle = this.options.fontcolor;
            ctx.textAlign = "start";
            ctx.fillText(data[i].name,w+15,hightrecttext);
            hightrecttext=hightrecttext-addhigrectest;   
        }         
    }

    onSliderChangeSh(event){
        this.options.sizeheight=event.value;
        this.sendToMasterOptions();
        this.draw();
    }


    draw() {
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
      this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
      //this.ctx = this.canvas.nativeElement.getContext('2d');

      this.ctx.resetTransform();
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.translate(0, 0);



      
      
      this.heightbox=200-(40-parseInt(this.options.sizeheight));
      this.canheight=230-(40-parseInt(this.options.sizeheight));

      this.canwidth=this.maindata.length*(parseInt(this.options.barwidth)+parseInt(this.options.interval))-(10-parseInt(this.options.sizeheight));


        let canvasheight = this.canheight+160;
        let canvaswidth =this.canwidth+84;
        let starty;
        let startx;
        if (this.options.legendType=="bottom"){
              canvas.height = canvasheight;
              canvas.width =canvaswidth;
              starty=10;
              startx=40;
        }

        if (this.options.legendType=="top"){
              canvas.height = canvasheight;
              canvas.width =canvaswidth;
              starty=120;
              startx=40;
        }   

        if (this.options.legendType=="left"){
              canvas.height = canvasheight-50;
              canvas.width =canvaswidth+160;
              starty=65;
              startx=185;
        }        

        if (this.options.legendType=="right"){
              canvas.height = canvasheight-50;
              canvas.width =canvaswidth+160;
              starty=65;
              startx=40;
        } 

        this.canvas.nativeElement.height = canvas.height;
        this.canvas.nativeElement.width = canvas.width;
  
        this.ctx.fillStyle = this.options.backgroundcolor;
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        let interval=parseInt(this.options.interval);

        let x=startx;
        this.ctx.translate(0, 0);
        this.ctx.fillStyle = this.options.linecolor;
        this.ctx.fillRect(x, starty+40, 5,  this.canheight-20);
        this.ctx.textAlign = "center";
        let w=0;
        let c=100;
        if (this.options.yaxis=="yes"){
            while (w<=100){

                this.ctx.font = "13px Arial black";
                this.ctx.fillStyle = this.options.fontcolor;

                 
                this.ctx.fillText(c.toString() ,x-25, starty+71+((this.canheight-50)/100)*w);

                this.ctx.translate(0, 0);
                this.ctx.fillStyle = this.options.linecolor;            
                this.ctx.fillRect(x-10, starty+65+((this.canheight-50)/100)*w, 15,  5);

                c=c-25;

              w=w+25;
            }
        }

        this.triangle1(this.ctx,x+2, starty+23);

        this.ctx.fillStyle = this.options.linecolor;
        this.ctx.fillRect(x, starty+this.canheight+15, this.canwidth+35,  5);


        this.triangle2(this.ctx,x+this.canwidth+23,starty+this.canheight+8);

        x=x+parseInt(this.options.interval);
        let calcheight;
        for (let i=0;i<this.maindata.length;i++){
            calcheight=((this.canheight-50)/100)*this.maindata[i].value;
            this.ctx.fillStyle = this.maindata[i].color;
            this.ctx.fillRect(x, starty+this.canheight+15, parseInt(this.options.barwidth),  -calcheight);
            this.ctx.font = "13px Arial black";
            this.ctx.fillStyle = this.options.fontcolor;

            if (this.options.baraxis=="yes"){
                this.ctx.fillText(this.maindata[i].value ,x+parseInt(this.options.barwidth)/2, starty+this.canheight-calcheight+13);               
            }
            x=x+parseInt(this.options.barwidth)+parseInt(this.options.interval);
        }


        if (this.options.legendType=="bottom"){
            this.legendTopBottom(this.ctx,canvasheight,this.maindata,canvaswidth)
        }
        
        if (this.options.legendType=="top"){
            this.legendTopBottom(this.ctx,140,this.maindata,canvaswidth)
        }           
        
        if (this.options.legendType=="left"){
            this.legendRightLeft(this.ctx,canvasheight,this.maindata,10)
        }          
        
        if (this.options.legendType=="right"){
            this.legendRightLeft(this.ctx,canvasheight,this.maindata,canvaswidth+10)
        }

    }

    triangle1(ctx,x,y){
        let height = y * Math.cos(Math.PI / 6);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+9, y+17);
        ctx.lineTo(x-9, y+17);
       ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = this.options.linecolor;
        ctx.fill();
    }


    triangle2(ctx,x,y){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+17, y+9);
        ctx.lineTo(x, y+18);
        ctx.closePath();
        ctx.fillStyle = this.options.linecolor;
        ctx.fill();

    }


    sendToMasterOptions(){
        this.handleChangeOptions.emit(this.options);
    }

    sendToMasterText(){
        this.handleChangeElementsData.emit(this.maindata);
    }

}
