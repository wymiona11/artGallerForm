import { ImageService } from './../image.service';
import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  imgSrc = "../../../assets/default-image.jpg";
  imgSelected: any = null;
  imgTitle = '';
  percentage: Observable<number>;
  imgForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private imgSer: ImageService
    ) { }

  ngOnInit(): void {
    this.imgForm = this.fb.group({
      title: ['',Validators.required],
      category: ['',Validators.required],
      author: ['',Validators.required],
      dimensions: ['',Validators.required],
      mainColor: ['',Validators.required],
      tehniques: ['',Validators.required],
      supportOrSurface: ['',Validators.required],
      year: ['',Validators.required],
      imgUrl: ['',Validators.required],
      rating: [0,Validators.required]
    })

  }

  uploadImage(event){
    if(event.target.files && event.target.files[0]){
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => this.imgSrc = e.target.result;
      fileReader.readAsDataURL(event.target.files[0]);
      this.imgSelected = event.target.files[0];
      this.imgTitle = event.target.files[0].name;
    }
    else{
      this.imgSelected = null;
      this.imgSrc = "../../../assets/default-image.jpg";
    }
  }

  submit(){
    if(this.imgForm.valid){
      const file = this.imgSelected;
      const filePath = `${this.imgSelected.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.percentage = task.percentageChanges().pipe(map(data => {
        if(data != 100){
          return Math.round(data);
        }else{
          return null
        }
        }));
      task.snapshotChanges()
      .pipe(
        finalize(() => fileRef.getDownloadURL().subscribe((url) => {
          this.imgForm.value.imgUrl = url;
          this.imgSer.add(this.imgForm.value).subscribe();
          this.reset();
        }))
      )
      .subscribe()
    }
  }

  reset(){
    this.imgForm.reset();
    this.imgSelected = null;
    this.imgSrc = "../../../assets/default-image.jpg";
  }



}
