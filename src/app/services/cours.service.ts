import { Injectable } from '@angular/core';
import {Cours} from "../interface/cours";
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  cours: Cours[] = []
  originLength: any
  constructor() {
    this.getInit();
  }
  //local storage set-up
  public async loadSaved() {
    const cours = await Preferences.get({
      key: "Cours"
    })
    this.cours = JSON.parse(cours.value!) || []
  }

  //get update data from local storage
  public async getInit() {
    const storage = await Preferences.get({key: "Cours"})
    this.cours = JSON.parse(storage.value!)
    this.originLength = this.cours.length
  }

  //get original data from local storage
  public async getOrigin() {
    const storage = await Preferences.get({key: "Cours"})
    this.originLength = JSON.parse(storage.value!).length
    return JSON.parse(storage.value!)
  }

  //get all courses
  public getAllCours(): Cours[] {
    return this.cours
  }

  //add new courses
  public async addCours(cours: Cours): Promise<void> {
    const allCours: Cours[] = this.getAllCours()
    allCours.push(cours)
    this.originLength = allCours.length
    await Preferences.set({
      key: "Cours",
      value: JSON.stringify(allCours)
    })
  }

  //delete a course
  public async deleteCours(cours: Cours): Promise<void> {
    const allCours: Cours[] = await this.getOrigin()
    allCours.forEach((el, index) => {
      if(el.nomCours === cours.nomCours && el.nomProf === cours.nomProf && el.nb_etud === cours.nb_etud) {
        allCours.splice(index, 1)
        return
      }
    })
    this.originLength = allCours.length
    await Preferences.set({
      key: "Cours",
      value: JSON.stringify(allCours)
    })
  }
}
