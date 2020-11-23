import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-config-slider',
  templateUrl: './config-slider.component.html',
  styleUrls: ['./config-slider.component.css']
})
export class ConfigSliderComponent implements OnInit {
  @Input() label: string;
  @Input() id: string;
  @Input() value: string;
  @Input() min: string;
  @Input() max: string;

  constructor() { }

  ngOnInit(): void {
  }

}
