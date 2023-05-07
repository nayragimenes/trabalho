import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DespesaService } from 'src/app/despesa/services/despesa.service';
import { DespesaInterface } from 'src/app/despesa/types/despesa.interface';
import { UsuarioInterface } from 'src/app/usuario/types/usuario.interface';

@Component({
  selector: 'app-despesa-cadastro',
  templateUrl: './despesa-cadastro.component.html',
  styleUrls: ['./despesa-cadastro.component.scss'],
})
export class DespesaCadastroComponent  implements OnInit {

  @Input()
  despesa = {} as DespesaInterface;

  @Input()
  usuario = [] as UsuarioInterface[];

  despesaForm!: FormGroup;
  subscriptions = new Subscription();
  data: Date | null = null;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private alertController: AlertController) {}

  ngOnInit(): void {
    this.inicializaFormulario();
  }

  inicializaFormulario() {
    this.despesaForm = this.formBuilder.group({
      descricao:  [this.despesa?.descricao ? this.despesa.descricao : '', [Validators.required, Validators.maxLength(250)]],
      categoria:  [this.despesa?.categoria ? this.despesa.categoria : '', [Validators.required, Validators.maxLength(250)]],
      data:       [this.despesa?.data ? this.despesa.data : '1970-01-01',Validators.required],
      valor:      [this.despesa?.valor ? this.despesa.valor : '', [Validators.required, Validators.maxLength(250)]],
      usuarioId:  this.despesa?.usuario ? this.despesa.usuario : '',
    })
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
  }


  deleteDespesa(despesa: string): void {
    this.subscriptions.add(
      this.despesaService.delete(despesa).subscribe(
        () => {
          this.modalCtrl.dismiss(despesa, 'confirm');
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
}
