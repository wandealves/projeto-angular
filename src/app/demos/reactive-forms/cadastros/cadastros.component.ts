import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';

import { Usuario } from './models/usuario';
import { DisplayMessage, GenericValidator, ValidationMessages } from './generic-form-validation';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.css']
})
export class CadastrosComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  cadastroForm!: FormGroup;
  usuario!: Usuario;
  formResult: string = '';

  validationMessage!: ValidationMessages;
  genericValidation!: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder) {
    this.validationMessage = {
      nome: {
        required: 'O nome é requirido',
        minlength: 'O nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O nome precisa ter no máximo 150 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'email inválido'
      }
    };
    this.genericValidation = new GenericValidator(this.validationMessage);
  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: [''],
      senhaConfirmacao: ['']
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidation.processarMensagens(this.cadastroForm);
    });
  }

  adicionarUsuario() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = { ...this.cadastroForm.value };
      this.formResult = JSON.stringify(this.cadastroForm.value);
    }
  }
}
