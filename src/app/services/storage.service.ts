import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setItem(name:string, data:string) {
    await Storage.set({
      key: name,
      value: data
    })
    let user = await Storage.get({key: 'user'})
    if(!JSON.parse(user.value)) {
      await Storage.set({
        key: 'user',
        value: JSON.stringify({name: 'Пользователь', goal: 'Дом'})
      })
    }
  }

  async getItems(items:string) {
    const result = await Storage.get({key: items})
    return result
  }

  async getKeys() {
    const keys = await Storage.keys()
    return keys
  }
  
  async removeItem(item:string) {
    await Storage.remove({key: item})
  }

  async clearStorage() {
    await Storage.clear()
  }
}
