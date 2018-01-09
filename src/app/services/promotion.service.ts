import { Injectable } from '@angular/core';

import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions'

@Injectable()
export class PromotionService {

  constructor() { }
  getPromotionins(): Promise< Promotion[]>{
    return new Promise(resolve=>{
      //simulate server latency with 2 second delay
      setTimeout(()=>PROMOTIONS)
    });
  }
  getPromotion(id:number):Promise<Promotion>{
   return new Promise(resolve=>{
    //simulate server latency with 2 second delay
    setTimeout(()=>PROMOTIONS.filter((promo)=>(promo.id===id))[0],2000)
   });
  }
  getFeaturedPromotion():Promise<Promotion>{
    return new Promise(resolve=>{
      //simulate server latency with 2 second delay
      setTimeout(()=>PROMOTIONS.filter((promo)=>(promo.featured))[0],2000)
    });
  }
}
