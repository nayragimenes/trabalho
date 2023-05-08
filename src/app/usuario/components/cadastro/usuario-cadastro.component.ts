import { Component, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from '../../types/usuario.interface';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
})

export class UsuarioCadastroComponent implements OnInit {
  @Input()
  usuario = {} as UsuarioInterface;
  name!: string;
  usuarioForm!: FormGroup;
  subscriptions = new Subscription();
  
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertController: AlertController) {}


  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nome: [this.usuario?.nome ? this.usuario.nome : '', [Validators.required, Validators.maxLength(250)]],
      apelido: [this.usuario?.apelido ? this.usuario.apelido : '', [Validators.required, Validators.maxLength(250)]],
      email: [this.usuario?.email ? this.usuario.apelido : ' ',Validators.email],
      nascimento: [this.usuario?.nascimento ? this.usuario.nascimento : '2000-01-01', Validators.required],
      genero: this.usuario?.genero ? this.usuario.genero : '',
    })


    //this.inicializaFormulario();
    //this.loadUsuarioOnEditMode();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

/*   inicializaFormulario() {
    this.usuarioForm = this.formBuilder.group({
      nome: [this.usuario?.nome ? this.usuario.nome : '', [Validators.required, Validators.maxLength(250)]],
      apelido: [this.usuario?.apelido ? this.usuario.apelido : '', [Validators.required, Validators.maxLength(250)]],
      email: [this.usuario?.email ? this.usuario.apelido : ' ',Validators.email],
      nascimento: [this.usuario?.nascimento ? this.usuario.nascimento : ' ', this.validaIdade()],
      genero: this.usuario?.genero ? this.usuario.genero : '',
    })
  } */

/*   private async loadUsuarioOnEditMode(){
    const [url] = this.activateRoute.snapshot.url;
    this.editMode = url.path === 'edit';
    this.createMode = !this.editMode;

    if(this.editMode){
      const id = this.activateRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id):-1;

      if(this.id !== -1){
        const busyLoader = await this.loadingController.create({spinner:'circular'})
        busyLoader.present()
        this.usuarioService.readUsuario(this.id).subscribe((usuario) => {
          this.usuarioForm.patchValue({
            id: usuario.id,
            nome: usuario.nome,
            apelido: usuario.apelido,
            email: usuario.email,
            nascimento: usuario.nascimento,
            genero: usuario.genero,
          })
        })
        busyLoader.dismiss()
      }
    }
  } */


  validaIdade(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const year = day * 365;
      const value =  new Date(control.value)
      const now = new Date(Date.now())
      const diff = (now.getTime() / year - value.getTime() / year)
      if (diff < 16){
        return {invalidAge: value}
      }else if(diff > 150){
        return {invalidAge: value}
      }
      return null;
    };
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    if(this.usuario?.id) {
      this.updateUsuario(this.usuarioForm.value)
    } else {
      this.createUsuario(this.usuarioForm.value)
    }
  }

  createUsuario(usuario: UsuarioInterface): void {
    this.subscriptions.add(
      this.usuarioService.create(usuario).subscribe(
        () => {
          this.modalCtrl.dismiss(usuario, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível salvar os dados do cliente',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
  }

  updateUsuario(usuario: UsuarioInterface): void {
    this.subscriptions.add(
      this.usuarioService.update(usuario, this.usuario.id).subscribe(
        () => {
          this.modalCtrl.dismiss(usuario, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
  }

  deleteUsuario(usuarioId: string): void {
    this.subscriptions.add(
      this.usuarioService.delete(usuarioId).subscribe(
        () => {
          this.modalCtrl.dismiss(usuarioId, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível deletar os dados do cliente',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
  }




/*   cancel():void{
    this.router.navigate(['./usuario'])
  } */

/*   confirm(): void {
    if(this.usuario?.id) {
      this.updateUsuario(this.usuarioForm.value)
    } else {
      this.createUsuario(this.usuarioForm.value)
    }
  }
 */
  // SALVA USUARIO
/*   create(): void {
    if(this.createMode){
      this.subscriptions.add(
        this.usuarioService.create(this.usuarioForm.value).subscribe(
          () => {
            this.router.navigate(['./student'])
          },
          async () => {
            const alert = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do aluno',
              buttons:['OK']
            })
            alert.present()
          }
        )
      )
    }else{
      this.usuarioService.update({
        ...this.usuarioForm.value,
        id: this.id
      }).subscribe({
        next:() => {
          this.router.navigate(['./usuario'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível salvar os dados',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  } */



  

/*   updateUsuario(usuario: UsuarioInterface): void {
    this.subscriptions.add(
      this.usuarioService.update(usuario).subscribe(
        () => {
          this.modalCtrl.dismiss(usuario, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
  } */


  
  /* deleteUsuario(usuarioId: string): void {
    this.subscriptions.add(
      this.usuarioService.delete(usuarioId).subscribe(
        () => {
          this.modalCtrl.dismiss(usuarioId, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível deletar os dados do cliente',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
  }   */


  
}
