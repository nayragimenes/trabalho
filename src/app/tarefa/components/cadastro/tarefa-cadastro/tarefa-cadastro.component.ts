import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { TarefaService } from 'src/app/tarefa/services/tarefa.service';
import { TarefaInterface } from 'src/app/tarefa/types/tarefa.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tarefa-cadastro',
  templateUrl: './tarefa-cadastro.component.html',
})

export class TarefaCadastroComponent  implements OnInit {
  
  @Input()
  tarefa = {} as TarefaInterface;
  name!: string;
  tarefaForm!: FormGroup;
  subscriptions = new Subscription();

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private tarefaService: TarefaService,
    private alertController: AlertController) {}

    ngOnInit(): void {
      this.tarefaForm = this.formBuilder.group({
        descricao: [this.tarefa?.descricao ? this.tarefa.descricao : '', [Validators.required, Validators.maxLength(250)]],
        prioridade: this.tarefa?.prioridade ? this.tarefa.prioridade : '',
        dataInicial: [this.tarefa?.dataInicial ? this.tarefa.dataInicial : '2000-01-01', Validators.required],
        dataFinal: [this.tarefa?.dataFinal ? this.tarefa.dataFinal : '2000-01-01', Validators.required],
      })
    }

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe()
    }

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
      if(this.tarefa?.id) {
        /* this.updateTarefa(this.tarefaForm.value) */
      } else {
        this.createTarefa(this.tarefaForm.value)
      }
    }

    createTarefa(tarefa: TarefaInterface): void {
      this.subscriptions.add(
        this.tarefaService.create(this.tarefaForm.value).subscribe(
          () => {
            this.modalCtrl.dismiss(tarefa, 'confirm');
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    }

    /* updateTarefa(tarefa: TarefaInterface): void {
      this.subscriptions.add(
        this.tarefaService.update(tarefa, this.tarefa.id).subscribe(
          () => {
            this.modalCtrl.dismiss(tarefa, 'confirm');
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

    deleteTarefa(TarefaId: string): void {
      this.subscriptions.add(
        this.tarefaService.delete(TarefaId).subscribe(
          () => {
            this.modalCtrl.dismiss(TarefaId, 'confirm');
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
