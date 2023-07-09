import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Usuario } from './models/usuario';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.css']
})
export class CadastrosComponent implements OnInit {
  cadastroForm!:FormGroup;
  usuario!:Usuario;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: [''],
      cpf: [''],
      email: [''],
      senha: [''],
      senhaConfirmacao: ['']
    });
  }

  adicionarUsuario(){
    this.usuario = {...this.cadastroForm.value};
  }
}
