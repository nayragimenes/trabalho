import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TarefaService } from 'src/app/tarefa/services/tarefa.service';
import { TarefaInterface } from 'src/app/tarefa/types/tarefa.interface';
import { TarefaCadastroComponent } from '../../cadastro/tarefa-cadastro/tarefa-cadastro.component';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.scss'],
})
export class TarefaListaComponent  implements OnInit {

  tarefa: TarefaInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private tarefaService: TarefaService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,) {}

    ngOnInit(): void {
      this.readTarefas();
    }

    async readTarefas() {
      const busyLoader = await this.loadingController.create({ spinner: 'circular' })
      busyLoader.present()
  
      //CONSULTA NO JSON E MENSAGEM 
      const subscription = this.tarefaService.readTarefas().subscribe(async (tarefa) => {
        window.localStorage.setItem('usuario', JSON.stringify(tarefa));
        this.tarefa = tarefa;
        const toast = await this.toastController.create({
          color: 'success',
          position: 'top',
          message: 'Lista de usuarios carregada com sucesso!',
          duration: 1500,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, 
      
      //MENSAGEM DA TELA
      async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de usuarios',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
      this.subscriptions.add(subscription);
    }
  
    //BOTÃO DE INSERIR
    async openModal(tarefa: null|TarefaInterface) {
      const modal = await this.modalCtrl.create({
        component: TarefaCadastroComponent,
        componentProps: {
          tarefa
        }
      });
      modal.present();
  
      const { data, role } = await modal.onWillDismiss();
  
      if (role === 'confirm') {
        this.readTarefas();
      }
    }

}
