import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: "root" })
export class ApiService {
	API: string = "http://localhost:3000/";

	constructor(private _http: HttpClient) {}

	getData() {
        return this._http.get<any>(this.API + `libros`);
      }
    
      postData(nombre: string, autor: string, editorial: string) {
        const url = this.API + `libros`; 
        const data = { nombre, autor, editorial }; 
    
        this._http.post(url, data).subscribe((response) => {
          console.log('POST request successful:', response);
          this.getData();
          
        });
      }
    
      deleteData(id: string) {
        const url = this.API + `libros/${id}`; 
        this._http.delete(url).subscribe((response) => {
          console.log('DELETE request successful:', response);
          
        });
      }

}
