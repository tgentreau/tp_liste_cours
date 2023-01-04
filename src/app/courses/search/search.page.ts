import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {CoursService} from "../../services/cours.service";
import {Router} from "@angular/router";
import {CoursesPage} from "../courses.page";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  form = {
    searchValue: ''
  }
  constructor(
    private coursService: CoursService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let allCours = this.coursService.getAllCours()
    this.coursService.cours = allCours.filter((cours) => {
      return cours.nomCours === form.value.searchValue || cours.nomProf === form.value.searchValue || cours.nb_etud === form.value.searchValue
    })
    this.router.navigate(["cours"])
  }
}
