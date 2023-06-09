import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { UsuarioInterface } from 'src/app/usuario/types/usuario.interface';
import { UsuarioCadastroComponent } from '../../cadastro/usuario-cadastro.component';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
})

export class UsuarioListaComponent implements OnInit {

  usuario: UsuarioInterface[] = [];
  subscriptions = new Subscription();
  
  constructor(
    private usuarioService: UsuarioService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,) {}
     
  ngOnInit(): void {
    this.readUsuarios();
  }

  async readUsuarios() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    //CONSULTA NO JSON E MENSAGEM 
    const subscription = this.usuarioService.readUsuarios().subscribe(async (usuario) => {
      window.localStorage.setItem('usuario', JSON.stringify(usuario));
      this.usuario = usuario;
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
  async openModal(usuario: null|UsuarioInterface) {
    const modal = await this.modalCtrl.create({
      component: UsuarioCadastroComponent,
      componentProps: {
        usuario
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.readUsuarios();
    }
  }
}
