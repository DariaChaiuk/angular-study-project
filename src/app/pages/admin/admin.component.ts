import { Component, OnInit } from '@angular/core';
import { Good } from 'src/app/models/good';
import { GoodService } from '../../services/good.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  goods!: Good[];
  isNewGoodProcess = false;

  constructor(private goodService: GoodService) { }

  ngOnInit(): void {
    this.goodService.getAll().subscribe(goods => this.goods = goods);
  }

  newGoodProcessStatusChange(){
    this.isNewGoodProcess = !this.isNewGoodProcess;
  }

  removeGood(id: string){
    this.goods = this.goods.filter(x => x.id != id);
  }

  addGood(good: Good){
    this.goods.push(good);
    this.newGoodProcessStatusChange();
  }

  cancelGoodAdding(isNewGoodForm: boolean){
    if(isNewGoodForm){
      this.newGoodProcessStatusChange();
    }
  }
}
