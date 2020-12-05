import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-counter',
  templateUrl: './game-counter.component.html',
  styleUrls: ['./game-counter.component.css']
})
export class GameCounterComponent implements OnInit {
  @Input() label: string;
  @Input() count: number;

  constructor() { }

  ngOnInit(): void {
  }

}
