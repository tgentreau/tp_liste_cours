import {Component, OnInit} from '@angular/core';
import {CoursService} from "../services/cours.service";
import {Cours} from "../interface/cours";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit{

  boolEtudiant: boolean = false
  boolProf: boolean = false
  boolCours: boolean = false
  cours: Cours[] = []
  constructor(
    public coursService: CoursService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.cours = this.getAllCours()
    console.log(this.coursService.originLength)
    console.log(this.cours.length)
  }

  async ionViewWillEnter() {
    await this.ngOnInit()
  }

  getAllCours(): Cours[] {
    return this.coursService.getAllCours()
  }

  async deleteCours(cours: Cours): Promise<void> {
    await this.coursService.deleteCours(cours)
    await this.coursService.getInit()
    await this.ngOnInit()
  }

  //open alert window to confirm delete
  async consentForDelete(cours: Cours): Promise<void> {
    const message = `Etes-vous sur(e) de vouloir supprimer le cours: ${cours.nomCours} ?`
    const alert = await this.alertController.create({
      header: "Confirmation",
      message: message,
      buttons: [
        {
          text: "Non"
        },
        {
          text: "Oui",
          handler: () => {
            this.deleteCours(cours)
          }
        }
      ]
    })
    await alert.present()
    await alert.onDidDismiss()
  }

  // reset search filter method
  async resetFilter() {
    this.cours = await this.coursService.getOrigin()
  }

  sortAlphabeticalCoursAsc() {
    this.coursService.getAllCours().sort((a, b) => a.nomCours.localeCompare(b.nomCours))
    this.boolCours = !this.boolCours
  }

  sortAlphabeticalProfAsc() {
    this.coursService.getAllCours().sort((a, b) => a.nomProf.localeCompare(b.nomProf))
    this.boolProf = !this.boolProf
  }

  sortAlphabeticalCoursDesc() {
    this.coursService.getAllCours().sort((a, b) => b.nomCours.localeCompare(a.nomCours))
    this.boolCours = !this.boolCours
  }

  sortAlphabeticalProfDesc() {
    this.coursService.getAllCours().sort((a, b) => b.nomProf.localeCompare(a.nomProf))
    this.boolProf = !this.boolProf
  }

  sortNumberAsc() {
    this.cours.sort((a, b) => a.nb_etud - b.nb_etud)
    this.boolEtudiant = !this.boolEtudiant
  }
  sortNumberDesc() {
    this.cours.sort((a, b) => b.nb_etud - a.nb_etud)
    this.boolEtudiant = !this.boolEtudiant
  }
}
