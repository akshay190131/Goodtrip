import { Injectable } from '@angular/core';
// import { start } from 'repl';
// import { totalmem } from 'os';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }

  getpager(totalitems: number,currpage: number = 1,pagesize: number = 1){
    let totalpages = Math.ceil( totalitems / pagesize);

    if(currpage < 1)
    {
      currpage = 1;
    }
    else if(currpage > totalpages)
    {
    currpage = totalpages;
    }
    let startpage:number, endpage:number;

    if(totalpages <=10)
    {
      startpage = 1;
      endpage = totalpages;
    }
    else
    {
      if(currpage <=6)
        {
          startpage = 1;
          endpage = 10;
        }
        else if(currpage + 4>= totalpages)
        {
            startpage = totalpages - 9;
            endpage = totalpages;
        }
        else
        {
          startpage = currpage-5;
          endpage = currpage + 4;
        }
    }

    let startindex = (currpage - 1 ) * pagesize;
    let endindex = Math.min( (startindex + pagesize - 1),( totalitems - 1 ));

    let pages = Array.from(Array((endpage + 1) - startpage).keys()).map(i => {
      return startpage + i;
    });
    return {
      totalitems : totalitems,
      currpage : currpage,
      totalpages : totalpages,
      startpage : startpage,
      endindex : endindex,
      endpage : endpage,
      startindex : startindex,
      pages : pages,
      pagesize : pagesize
    }



  }





}
