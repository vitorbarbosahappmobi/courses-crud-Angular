import { pipe } from "rxjs";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { filter, map, tap } from "rxjs/operators";

export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type == HttpEventType.Response),
    map((res: any) => res.body)
  );
}

export function uploadProgress<T>(cb: (progress: number) => void){
  return tap((event: HttpEvent<T>) => {
    if(event.type === HttpEventType.UploadProgress) {
      cb(Math.round((event.loaded * 100) / event.total!))
    }
  });
}
