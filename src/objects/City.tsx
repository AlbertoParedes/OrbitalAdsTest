import {ICity} from '../interfaces'
class City {

  id: string;
  name: string;
  chineseName: string;
  checked: boolean = false 

    
  constructor(obj : ICity){
    this.id = obj.id;
    this.name = obj.name;
    this.chineseName = obj.chineseName
  }
}

export default City