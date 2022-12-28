import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Good } from '../../models/good';
import { CollectionService } from '../../services/collection.service';
import { AgesService } from 'src/app/services/ages.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkPositiveNumberInput } from 'src/app/utils/number.validator';
import { GoodService } from '../../services/good.service';

@Component({
  selector: 'app-admin-good-item',
  templateUrl: './admin-good-item.component.html',
  styleUrls: ['./admin-good-item.component.css']
})
export class AdminGoodItemComponent implements OnInit {
  collectionAges!: string[];
  collections: string[] = [];
  ages!: string[];
  @Input() good: Good = {
    name: '',
    images: [],
    price: 0,
    description: '',
    colors: [],
    isNewCollection: true,
    dateOfAdding: new Date(Date.now()),
    age: '',
    collection: ''
  };
  @Input() isFormForNewGood = false;
  goodData!: FormGroup;
  showAddingNewImgInput = false;
  formHasChanges: boolean = false;
  @Output() onItemDeleted = new EventEmitter<string>();
  @Output() onItemAdded = new EventEmitter<Good>();
  @Output() onCancelChanges = new EventEmitter<boolean>();
 
  imageUrlsControlArray: FormControl[] = [];
  colorsControlArray: FormControl[] = [];
  constructor(
    private collectionService: CollectionService,
    private agesService: AgesService,
    private goodService: GoodService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.imageUrlsControlArray = this.good?.images?.map(img => new FormControl(img)) || [];
    this.colorsControlArray = this.good?.colors?.map(color => new FormControl(color)) || [];

    this.goodData = this.fb.group({
      name: this.fb.control(this.good.name ? this.good.name : '', [Validators.required]),
      price: this.fb.control(this.good.price ? this.good.price : '', [Validators.required, checkPositiveNumberInput()]),
      description: this.fb.control(this.good.description || ''),
      ages: this.fb.control(this.good.age || null),
      isNewCollection: this.fb.control(this.good.isNewCollection || false),
      collections: this.fb.control(this.good.collection || null),
      images: this.fb.array(this.imageUrlsControlArray ? this.imageUrlsControlArray : []),
      colors: this.fb.array(this.colorsControlArray),
      newImgUrl: this.fb.control('')
    })

    this.agesService.getAll().subscribe(ages => {
      this.ages = ages.filter(item => item != 'all');
      if (!this.good.age) {
        this.goodData.controls['ages'].patchValue(this.ages[0]);
      }
    });
    this.collectionService.getAll().subscribe(collections => {
      this.collections = collections.filter(item => item != 'all');
      if (!this.good.collection) {
        this.goodData.patchValue({collections: this.collections[0]});
      }
    });

    this.onFormValueChange();
  }

  get images() {
    return this.goodData.controls['images'] as FormArray;
  }
  get colors() {
    return this.goodData.controls['colors'] as FormArray;
  }

  onFormValueChange() {
    const initialValue = this.goodData.value
    this.goodData.valueChanges.subscribe(() => {
      this.formHasChanges = Object.keys(initialValue).some(key => this.goodData.value[key] != initialValue[key]);
    });
  }

  deleteImg(imgIndex: number) {
    this.images.removeAt(imgIndex);
  }

  applyChanges(id: any) {
    if (this.goodData.valid) {
      const newGood = {
        age: this.goodData.value['ages'],
        collection: this.goodData.value['collections'],
        description: this.goodData.value['description'],
        images: this.goodData.value['images'],
        isNewCollection: this.goodData.value['isNewCollection'],
        name: this.goodData.value['name'],
        price: this.goodData.value['price'],
        colors: this.goodData.value['colors'],
        dateOfAdding: this.good.dateOfAdding,
        dateOfUpdating: new Date(Date.now())
      }
      if (!this.isFormForNewGood) {
        this.goodService.update(newGood, id).subscribe(newGood => this.good = newGood);
      }
      else {
        this.goodService.add(newGood).subscribe(newGood => this.onItemAdded.emit(newGood))
      } 
      this.formHasChanges = false;
    }
  }

  deleteGood(id: any) {
    this.goodService.delete(id).subscribe();
    this.onItemDeleted.emit(id);
  }

  clearNewImgInput() {
    this.goodData.value['newImgUrl'] = '';
  }

  changeAddingNewImgUrlStatus() {
    this.showAddingNewImgInput = !this.showAddingNewImgInput;
  }

  addImg() {
    this.showAddingNewImgInput = !this.showAddingNewImgInput;
    this.formHasChanges = true;
    this.images.push(this.fb.control(this.goodData.value['newImgUrl']));
    this.clearNewImgInput();
  }

  checkItemIsOld(array: string[], item: string) {
    return array ? array.includes(item) : false;
  }

  cancelOperation(){
    this.goodData.setValue({
      name: this.good.name ? this.good.name : '',
      price: this.good.price ? this.good.price : '',
      description: this.good.description || '',
      ages: this.good.age || null,
      isNewCollection: this.good.isNewCollection || false,
      collections: this.good.collection || null,
      images: this.good.images || [],
      colors: this.good.colors || [],
      newImgUrl: ''
    })
    this.formHasChanges = false;
    this.onCancelChanges.emit(this.isFormForNewGood);
  }

}
