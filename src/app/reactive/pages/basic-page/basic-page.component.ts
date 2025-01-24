import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveService } from '../../services/reactive.service';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.scss',
})
export class BasicPageComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reactiveService: ReactiveService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [Validators.required, Validators.min(0)]],
    });

    this.myForm.valueChanges.subscribe((data) => {
      this.reactiveService.setDataBasicForm(data);
    });

    if (this.reactiveService.getDataBasicForm()) {
      this.myForm.reset(this.reactiveService.getDataBasicForm());
    }
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); // Al hacer click en el boton muestra los mensajes de error si el form es invalido
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 0, inStorage: 0 });
    this.reactiveService.removeDataBasicForm();
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].invalid &&
      (this.myForm.controls[field].touched || this.myForm.controls[field].dirty)
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};
    //console.log(errors);
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `El valor deber ser ${errors['min'].min} o mayor`;
      }
    }

    return null;
  }
}
