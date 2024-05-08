import { Injectable, OnInit } from '@angular/core';
import firebaseConfig from '../../configs/firebase.config';
import { initializeApp } from 'firebase/app';
import { FirebaseApp } from 'firebase/app';
import { FirebaseStorage, StorageReference, getStorage, ref, uploadBytes } from 'firebase/storage';
import { FirebaseConfig } from '../models/FirebaseConfig';
import { getDownloadURL } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {
  firebaseConfig! : FirebaseConfig;
  app! : FirebaseApp;
  storage! : FirebaseStorage;
  empleadoImgStorageRef! : StorageReference;
  
  constructor() {
    this.firebaseConfig = firebaseConfig
  }

  ngOnInit(): void {
    this.app = initializeApp(this.firebaseConfig);
    this.storage = getStorage(this.app);
  }

  async getDownloadEmpleadoImgUrl() {
    return await getDownloadURL(this.empleadoImgStorageRef);
  }

  async uploadEmpleadoImgAsBytes(file : File) {
    this.empleadoImgStorageRef = ref(
      this.storage,
      encodeURI(__dirname.replace('%', '/') + file.name.replace('%', '/'))
    );
    return await uploadBytes(
      this.empleadoImgStorageRef,
      file
    );
  }

  uploadServicioImgAsBytes() {
    //uploadBytes()
  }
}
