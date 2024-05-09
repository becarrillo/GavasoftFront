import { Injectable, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getDownloadURL,
  ref,
  Storage,
  StorageReference,
  uploadBytes
} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {
  app! : FirebaseApp;
  storageRef! : StorageReference;

  constructor(private storage : Storage) {}

  ngOnInit(): void {
    this.storageRef = ref(this.storage, "images");
  }

  async uploadEmpleadoImgAsBytes(
    fileName : string,
    arrayBuffer : ArrayBuffer
  ) : Promise<string> 
  {
    const myUint8Array = new Uint8Array(arrayBuffer);
    const empleadoImgStorageRef = ref(
      this.storage,
      `images/${fileName}`
    );

    await uploadBytes(
      empleadoImgStorageRef,
      myUint8Array
    );
    
    return await getDownloadURL(empleadoImgStorageRef);
  }

  uploadServicioImgAsBytes() {
    //uploadBytes()
  }
}
