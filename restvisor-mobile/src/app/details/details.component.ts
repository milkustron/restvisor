import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReservationService } from '../services/reservation.service';
import { SQLiteService } from '../services/sqlite.service';
import { NavbarMainComponent } from '../shared/navbar-main/navbar-main.component';


@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [CommonModule, IonicModule, NavbarMainComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  route = inject(ActivatedRoute);
  reservationService = inject(ReservationService);
  sqliteService = inject(SQLiteService);

  reservation: any;
  isFavorite = false;

async ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  if (!id) {
    const id = this.route.snapshot.paramMap.get('Q8Tm3uNlegF4gScaJ4bh');
    // console.error('no ID in paramMap');
    return;
  }

  this.reservation = await this.reservationService.getReservationById(id);
  this.isFavorite = await this.sqliteService.isFavorite(id);
}

  async toggleFavorite() {
    if (this.isFavorite) {
      await this.sqliteService.removeFromFavorites(this.reservation.id);
    } else {
      await this.sqliteService.addToFavorites(this.reservation);
    }
    this.isFavorite = !this.isFavorite;
  }
}
