import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Cours} from "../../interface/cours";
import {CoursService} from "../../services/cours.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  form = {
    nomCours: '',
    nomProf: '',
    nbEtud : ''
  }

  constructor(
    private coursService: CoursService,
    private router: Router
    ) {

  }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newCours : Cours = {
        nomCours: form.value.nomCours,
        nomProf: form.value.nomProf,
        nb_etud: form.value.nbEtud
      }
      this.coursService.addCours(newCours)
      this.router.navigate(['cours'])
    }
  }
}
