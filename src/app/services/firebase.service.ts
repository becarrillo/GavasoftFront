import { Injectable, OnInit, inject} from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getDownloadURL,
  ref,
  Storage,
  StorageReference,
  uploadBytes
} from '@angular/fire/storage';
import {
  Auth,
  User,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {
  app! : FirebaseApp;
  auth : Auth = getAuth(this.app);
  cookiesService : CookieService = inject(CookieService);
  router = inject(Router);
  protected loggedUser : User | null = null;
  storageRef! : StorageReference;
  private token! : string;

  constructor(private storage : Storage) {}

  ngOnInit(): void {
    this.storageRef = ref(this.storage, "images");
  }

  getAuth() : Auth {
    return this.auth;
  }

  async uploadEmpleadoImgAsBytes(
    fileName : string,
    arrayBuffer : ArrayBuffer
  ) : Promise<string> 
  {
    const myUint8Array = new Uint8Array(arrayBuffer);
    const empleadoImgStorageRef = ref(
      this.storage,
      `images/employees/${fileName}`
    );

    await uploadBytes(
      empleadoImgStorageRef,
      myUint8Array
    );
    
    return await getDownloadURL(empleadoImgStorageRef);
  }

  async uploadServicioImgAsBytes(
    fileName : string,
    arrayBuffer : ArrayBuffer
  ) : Promise<string> 
  {
    const myUint8Array = new Uint8Array(arrayBuffer);
    const empleadoImgStorageRef = ref(
      this.storage,
      `images/services/${fileName}`
    );

    await uploadBytes(
      empleadoImgStorageRef,
      myUint8Array
    );
    
    return await getDownloadURL(empleadoImgStorageRef);
  }

  async createUserAccount(email : string, password : string) : Promise<void> {
    let username : string | null = null;
    let uid : string | null = null;

    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    if (userCredential.user) {
      this.token = (await userCredential.user.getIdToken()) as string;
      uid = (await userCredential.user.uid) as string;
      username = (await userCredential.user.displayName) as string;
      this.cookiesService.set("token", this.token);
      this.cookiesService.set("username", username);
      this.cookiesService.set("uid", uid);
    } else {
      window.location.reload();
    }
  }

  async login(email : string, password : string) : Promise<void> {
    if (email === this.auth.currentUser?.email) {
      window.alert("Usted ya está autenticado");
      window.location.pathname = '/';
    }

    try {
      this.loggedUser = (await signInWithEmailAndPassword(this.auth, email, password)).user;

      const username = await (this.loggedUser as User).displayName as string;
      const uid = await (this.loggedUser as User).uid;

      this.token =  await (this.loggedUser as User).getIdToken();
      this.cookiesService.set("email", (await this.loggedUser?.email) as string);
      this.cookiesService.set("token", this.token);
      this.cookiesService.set("uid", uid);
      this.cookiesService.set("username", username);
    } catch (error) {
      window.alert("Error: "+error)
      window.location.reload();
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      window.alert("Error!");
      throw error;
    }
    window.alert("Signout exitoso!");
    this.router.navigate(['/login']);
  }

  async sendToken() {
    const tk = await this.auth.currentUser?.getIdToken();
    return tk;
  }

  async validateToken(toEvaluate : string) {
    const loggedToken = await this.auth.currentUser?.getIdToken();
    window.alert(loggedToken);
    return toEvaluate===loggedToken;
  }
}
