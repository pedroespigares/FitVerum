import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-diet',
  templateUrl: './show-diet.component.html',
  styleUrls: ['./show-diet.component.scss']
})
export class ShowDietComponent implements OnInit{
  /**
   * Dieta a mostrar
   */
  diet: any;

  /**
   * Variable para mostrar el spinner de carga
   */
  loading = true;
  constructor(private route: ActivatedRoute, private database: DatabaseService, private router: Router, public auth: AuthService) { }

  /**
   * Obtener la dieta a mostrar
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.database.getByID(id, "diets").then((diet) => {
      this.diet = diet;
      this.loading = false;
    });
  }
}
