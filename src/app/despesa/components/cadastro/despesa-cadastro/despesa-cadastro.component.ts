import { Component, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesaService } from 'src/app/despesa/services/despesa.service';
import { DespesaInterface } from 'src/app/despesa/types/despesa.interface';
import { UsuarioInterface } from 'src/app/usuario/types/usuario.interface';

@Component({
  selector: 'app-despesa-cadastro',
  templateUrl: './despesa-cadastro.component.html',
})

export class DespesaCadastroComponent implements OnInit {
  @Input()
  usuario = [] as UsuarioInterface [];

  @Input()
  despesa = {} as DespesaInterface;

  despesaForm!: FormGroup;
  subscriptions = new Subscription();
  
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private alertController: AlertController) {}


  ngOnInit(): void {
    this.despesaForm = this.formBuilder.group({
      descricao: [this.despesa?.descricao ? this.despesa.descricao : '', [Validators.required, Validators.maxLength(250)]],
      categoria: this.despesa?.categoria ? this.despesa.categoria : '',
      data: [this.despesa?.data ? this.despesa.data : '2000-01-01', Validators.required],
      valor: this.despesa?.valor ? this.despesa.valor : ' ',
      usuario: this.despesa?.usuario ? this.despesa.usuario : '',
    })
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    if(this.despesa?.id) {
      this.updateDespesa(this.despesaForm.value)
    } else {
      this.createDespesa(this.despesaForm.value)
    }
  }

  createDespesa(despesa: DespesaInterface): void {
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
  }

  updateDespesa(despesa: DespesaInterface): void {
    this.subscriptions.add(
      this.despesaService.update(despesa, this.despesa.id).subscribe(
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
  }

  deleteDespesa(usuarioId: string): void {
    this.subscriptions.add(
      this.despesaService.delete(usuarioId).subscribe(
        () => {
          this.modalCtrl.dismiss(usuarioId, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível deletar os dados',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
  }
}
