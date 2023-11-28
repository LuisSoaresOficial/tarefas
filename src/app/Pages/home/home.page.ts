import { ChangeDetectorRef, Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //criar uma variável que irá receber valores o listarTarefa() logo abaixo.
  tarefaCollection: any[]=[];

 constructor(
              private alertCtrl : AlertController,
              private tarefaService : TarefaService,
              private actionSheetCtrl :ActionSheetController,
              private changeDetector: ChangeDetectorRef) {}

    // evento criado para listar as informações./ chama o método criado para listar.
  ionViewDidEnter(){
   this.listarTarefa();
  }
  //vamos driar um método para listas as tarefas.
  listarTarefa(){
    //vamos então popular a nossa tarefa.
    this.tarefaCollection = this.tarefaService.listar();
  }
 async showAdd(){

    const alert = await this.alertCtrl.create({
      header: 'Informe a Tarefa',
      inputs: [
        {
          name: 'Tarefa',
          type: 'text',
          placeholder: 'Descreva sua tarefa'
        },
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secundary',
          handler: () => {
          }
        },
        {
          text:'Salvar',
          handler: (tarefa) => {
             this.tarefaService.salvar(tarefa, ()=>{  // essa função foi atualizada para receber o listar tarefa.
              this.listarTarefa();
             });
          }
        },
      ]
    });

  await alert.present();
}
//Deletando os dados.
delete(item: any) {
  this.tarefaService.delete(item, () => {
    this.listarTarefa();  // Atualize a lista após a exclusão
  });
}
//Atuzalizando os daddos.
async openActions(item: any): Promise<void> {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'O que Deseja Fazer',
    buttons: [
      {
        text: 'Feito',
        icon: 'checkmark-done-outline', // inserindo ícones.
        handler: () => {
          this.tarefaService.atualizarStatus(item.nome.Tarefa, 'Feito', () => {
            this.listarTarefa(); // Atualiza a lista após a alteração do status
            this.changeDetector.detectChanges(); // Informa ao Angular para detectar as mudanças
          });
        }
      },
      {
        text: 'A Realizar',
        icon: 'list-outline', // iserindo ícones
        handler: () => {
          this.tarefaService.atualizarStatus(item.nome.Tarefa, 'A Realizar', () => {
            this.listarTarefa(); // Atualiza a lista após a alteração do status
            this.changeDetector.detectChanges // Informa ao Angular para detectar as mudanças
          });
        }
      },
      // Outros botões...
    ]
  });
  await actionSheet.present();
}
}


