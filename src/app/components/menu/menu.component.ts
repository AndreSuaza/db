import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public ms: MenuService,
              public gameService: GameService ) { }

  ngOnInit() {
  }

}
