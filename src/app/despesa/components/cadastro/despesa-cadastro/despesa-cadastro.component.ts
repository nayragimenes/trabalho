import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DespesaService } from 'src/app/despesa/services/despesa.service';
import { DespesaInterface } from 'src/app/despesa/types/despesa.interface';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { UsuarioInterface } from 'src/app/usuario/types/usuario.interface';

@Component({
  selector: 'app-despesa-cadastro',
  templateUrl: './despesa-cadastro.component.html',
})
export class DespesaCadastroComponent  implements OnInit {
  
  despesaForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number
  usuario: UsuarioInterface[]=[];
  initialDate!: string;

  // data: Date | null = null;
  minute = 1000 * 60;
  hour = this.minute * 60;
  day = this.hour * 24;
  year = this.day * 365;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {
    this.inicializaFormulario();
    this.loadUsuarios();
    this.loadDespesaOnEditMode();
  }

  inicializaFormulario() {
  /*this.despesaForm = this.formBuilder.group({
      descricao:  [this.despesa?.descricao ? this.despesa.descricao : '', [Validators.required, Validators.maxLength(250)]],
      categoria:  [this.despesa?.categoria ? this.despesa.categoria : '', [Validators.required, Validators.maxLength(250)]],
      data:       [this.despesa?.data ? this.despesa.data : '1970-01-01',Validators.required],
      valor:      [this.despesa?.valor ? this.despesa.valor : '', [Validators.required, Validators.maxLength(250)]],
      usuarioId:  this.despesa?.usuario ? this.despesa.usuario : '',
    }) 
  */

    this.despesaForm = this.formBuilder.group({
      descricao:['', Validators.maxLength(300),],
      categoria: 'O',
      data: this.validaData(),
      valor: '0',
      usuario: '100000001',      
    })
  }

  validaData(): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      
      const inital = new Date(control.value)
      const now = new Date(Date.now())

      if(inital.getTime() < (now.getTime() - 1*this.day)){
        return { invalidIntialDate : 'data invalida'}
      }
      return null;
    }
  }

  private async loadUsuarios(){
    const busyLoader = await this.loadingController.create({spinner:'circular'})
    busyLoader.present()

    this.subscription.add(
      this.usuarioService.readUsuarios().subscribe((usuario) => {
        this.usuario = usuario;
        busyLoader.dismiss();
      })
    );
  }

  private async loadDespesaOnEditMode(){
    const busyLoader = await this.loadingController.create({spinner:'circular'})
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edit';
    this.createMode = !this.editMode;

    if(this.editMode){
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if(this.id !== -1){
        busyLoader.present()
        this.despesaService.readDespesa(this.id).subscribe((despesa) => {
          this.despesaForm.patchValue({
            descricao: despesa.descricao,
            categoria: despesa.categoria,
            data: despesa.data,
            valor: despesa.valor,
            usuario: despesa.usuario,            
          })
          busyLoader.dismiss();
        })
      }
    }
  }

  create(): void {
    if(this.createMode){
      this.subscription.add(
        this.despesaService.create(this.despesaForm.value).subscribe(
          () => {
            this.router.navigate(['./despesa'])
          },
          async () => {
            const alert = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados da locação',
              buttons:['OK']
            })
            alert.present()
          }
        )
      )
    }else{
      this.despesaService.update({
        ...this.despesaForm.value,
        id: this.id
      }).subscribe({
        next:() => {
          this.router.navigate(['./despesa'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível salvar os dados da locação',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel():void{
    this.router.navigate(['./despesa'])
  }

/*   cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  } */

/*   confirm(): void {
    if(this.despesa?.id) {
      this.updateDespesa(this.despesaForm.value)
    } else {
      this.createDespesa(this.despesaForm.value)
    }
  } */

/*   createDespesa(despesa: DespesaInterface): void {
    this.subscriptions.add(
      this.despesaService.create(despesa).subscribe(
        () => {
        this.modalCtrl.dismiss(despesa, 'confirm');
      },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível salvar os dados',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
  } */

/*   updateDespesa(despesa: DespesaInterface): void {
    this.subscriptions.add(
      this.despesaService.update(despesa).subscribe(
        () => {
          this.modalCtrl.dismiss(despesa, 'confirm');
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


/*   deleteDespesa(despesaId: string): void {
    this.subscriptions.add(
      this.despesaService.delete(despesaId).subscribe(
        () => {
          this.modalCtrl.dismiss(despesaId, 'confirm');
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
  }  */

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
