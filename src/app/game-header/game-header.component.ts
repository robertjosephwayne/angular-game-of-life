import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css']
})
export class GameHeaderComponent implements OnInit {
  @Input() label: string;

  constructor() { }

  ngOnInit(): void { }
}
