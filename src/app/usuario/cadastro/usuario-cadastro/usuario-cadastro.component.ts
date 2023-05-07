import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
})

export class UsuarioCadastroComponent implements  
OnInit, 
OnDestroy, 
ViewWillEnter, 
ViewDidEnter, 
ViewWillLeave, 
ViewDidLeave {

  usuarioForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number | string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private loadingService: LoadingService) { 
  } 
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter')
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter')
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave')
  }
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave')
  }
  ngOnInit(): void {
    this.loadingService;
    this.initializaFormulario();
    this.loadUsuarioOnEditMode();
  }
  initializaFormulario() {
    this.usuarioForm = this.formBuilder.group({
      nome: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.validaTeste(),
        ]
      ],
      apelido: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.validaTeste(),
        ]
      ],
      email: ['E-mail', Validators.required],
      nascimento: '1970-01-01',
      genero: 'F',
    })
  }
  private loadUsuarioOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on()
        this.usuarioService.getUsuario(this.id).subscribe((usuario) => {
          this.usuarioForm.patchValue({
            nome: usuario.nome,
            apelido: usuario.apelido,
            email:usuario.email,
            nascimento: usuario.nascimento,
            genero: usuario.genero            
          })
          this.loadingService.off()
        })
      }
    }
  }
  validaTeste(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      if (value === 'teste') {
        return { invalidName: 'teste' }
      }
      if (value.includes('xyz')) {
        return { invalidName: 'xyz' }
      }
      return null;
    };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  } 
  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.usuarioService.save(this.usuarioForm.value).subscribe(
          () => {
            this.router.navigate(['./usuarios'])
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
    } else {
      this.usuarioService.update({
        ...this.usuarioForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./usuarios'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }
  cancel(): void {
    this.router.navigate(['./usuarios'])
  }
}
