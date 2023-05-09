import { Component, OnInit } from '@angular/core';
import { DespesaInterface } from '../../types/despesa.interface';
import { Subscription } from 'rxjs';
import { DespesaService } from '../../services/despesa.service';
import { LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { DespesaCadastroComponent } from '../cadastro/despesa-cadastro/despesa-cadastro.component';

@Component({
  selector: 'app-despesa-lista',
  templateUrl: './despesa-lista.component.html',
  styleUrls: ['./despesa-lista.component.scss'],
})

export class DespesaListaComponent  implements OnInit {

  despesa: DespesaInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private despesaService: DespesaService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,) {}

    ngOnInit(): void {
      this.readDespesas();
    }

    async readDespesas() {
      const busyLoader = await this.loadingController.create({ spinner: 'circular' })
      busyLoader.present()
  
      //CONSULTA NO JSON E MENSAGEM 
      const subscription = this.despesaService.readDespesas().subscribe(async (despesa) => {
        window.localStorage.setItem('despesa', JSON.stringify(despesa));
        this.despesa = despesa;
        const toast = await this.toastController.create({
          color: 'success',
          position: 'top',
          message: 'Lista de despesas carregada com sucesso!',
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
    async openModal(usuario: null|DespesaInterface) {
      const modal = await this.modalCtrl.create({
        component: DespesaCadastroComponent,
        componentProps: {
         usuario
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.readDespesas();
    }
  }
}
