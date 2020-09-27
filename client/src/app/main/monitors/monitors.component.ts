import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.css']
})
export class MonitorsComponent {


  hover(action: string, hiddenMonitors: string, typeMonitors: string){
    setTimeout( () =>{
      let elements = document.querySelectorAll('.hiddenAll');
      let minicircles = document.querySelectorAll(`.${typeMonitors} .minicircle`)
  
      if (action == 'enter'){
        for (let i = 0; i < elements.length; i++)
          this.hidden(elements[i]);
        setTimeout(() => {
          for (let i = 0; i < minicircles.length; i++)
            setTimeout(() => {
              this.show(minicircles[i])
            }, 150*i);
        }, 300)
        document.getElementById('body').style.background = "black";
        document.getElementById('monitors').style.background = "none";
        this.hidden(document.querySelector(`.${hiddenMonitors}`));
      }
      else{
        document.getElementById('body').style.background = "white";
        document.getElementById('monitors').style.background = "#fff";
        this.show(document.querySelector(`.${hiddenMonitors}`));
        for (let i = 0; i < elements.length; i++)
          this.show(elements[i]);          
        setTimeout(() => {
          for (let i = 0; i < minicircles.length; i++)
            setTimeout(() => {
              this.hidden(minicircles[i])
            }, 150*i);
        }, 300)
      }

    }, 50)
  }

  hidden(ell){
    ell.classList.add('hidden')
  }

  show(ell){
    ell.classList.remove('hidden')
  }



  // circle(cx,cy,radius,radiusY,startDegrees,endDegrees, ell){
  //   if (radiusY===undefined)      radiusY      = radius;
  //   if (startDegrees===undefined) startDegrees = 0;
  //   if (endDegrees===undefined)   endDegrees   = 180;
  //   var startRadians = startDegrees*Math.PI/180,
  //       endRadians   = endDegrees*Math.PI/180,
  //       stepRadians  = (endRadians-startRadians)/(ell.length-1);
  //   for (let i=0; i < ell.length; i++){
  //     var a = i*stepRadians+startRadians,
  //         x = Math.cos(a)*radius  + cx,
  //         y = Math.sin(a)*radiusY + cy;
  //     ell[i].css({position:'absolute', left:x+'px', top:y+'px'});
  //   }
  // }

}
