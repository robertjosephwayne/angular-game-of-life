import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-config-checkbox',
  templateUrl: './config-checkbox.component.html',
  styleUrls: ['./config-checkbox.component.css']
})
export class ConfigCheckboxComponent implements OnInit {
  @Input() label: string;
  @Input() id: string;
  @Input() isChecked: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
