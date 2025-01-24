import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ReactiveService {
  constructor() {}

  setDataBasicForm(data: FormGroup) {
    localStorage.setItem('dataBasicForm', JSON.stringify(data));
  }

  getDataBasicForm() {
    const data = localStorage.getItem('dataBasicForm');
    return data ? JSON.parse(data) : null;
  }

  removeDataBasicForm() {
    localStorage.removeItem('dataBasicForm');
  }
}
