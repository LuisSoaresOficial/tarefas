import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  tarefaCollection: any[] = [];

  key = 'tarefaCollection';

  constructor() {}

  salvar(nome: string, callback: (tarefas: any[]) => void = () => {}) {

    let tarefaobj = { nome: nome, status: "Pendente" };

    // Obter do localStorage
    let value = localStorage.getItem(this.key);
    if (value) {
      this.tarefaCollection = JSON.parse(value);
    }

    this.tarefaCollection.push(tarefaobj);
    localStorage.setItem(this.key, JSON.stringify(this.tarefaCollection));

    if (callback) {
      callback(this.tarefaCollection);
    }
  }

//Criar o método para Litas as nossas Tarefas.

  listar(){

    //obter do local storage
let value = localStorage.getItem(this.key);
    if (value==null || value==undefined){
      return[];
    }
    let collection: any[] = JSON.parse(value);
    return collection;
  }

  delete(item: any, callback: () => void = () => {}) {
    let collection: any[] = this.listar();

    // Use a função filter para criar uma nova coleção sem o item a ser excluído
    let resultcollection = collection.filter(tarefa => tarefa.nome.Tarefa !== item.nome.Tarefa);

    localStorage.setItem(this.key, JSON.stringify(resultcollection));

    if (callback) {
      callback();
    }
  }

//atualizando o Status.

atualizarStatus(nomeTarefa: string, novoStatus: string, callback: (tarefas: any[]) => void = () => {}) {
  let value = localStorage.getItem(this.key);
  if (value) {
    let collection: any[] = JSON.parse(value);
    let updated = false;

    // Mapear a coleção para atualizar o status da tarefa correspondente
    collection = collection.map(tarefa => {
      if (tarefa.nome.Tarefa === nomeTarefa) {
        updated = true;
        return { ...tarefa, status: novoStatus }; // Atualiza o status corretamente
      }
      return tarefa;
    });

    // Se uma tarefa foi atualizada, faça o seguinte
    if (updated) {
      // Salve a coleção atualizada no localStorage
      localStorage.setItem(this.key, JSON.stringify(collection));

      // Execute o callback com a coleção atualizada
      callback(collection);

      // Forçar a detecção de mudanças

    }
  }
}
}
