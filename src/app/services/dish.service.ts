import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes():Promise <Dish[]>{
    return new Promise(resolve=>{
      //simulate server latency with 2 second delay
      setTimeout(()=>resolve(DISHES),2)
    });
  }
  getDish(id:number):Promise<Dish>{
    return new Promise(resolve=>{
      //simulate server latency with 2 second delay
      setTimeout(()=> DISHES.filter((dish)=>(dish.id===id))[0],2)
  });
}
  getFeaturedDish():Promise<Dish>{
    return new Promise(resolve=>{
     setTimeout( ()=> (DISHES.filter((dish)=>(dish.featured))[0],2))
  });
  }
}
