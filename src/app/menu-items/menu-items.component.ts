// src/app/components/menu-items/menu-items.component.ts
import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../services/menu-items.service';
import { MenuItem } from '../model/MenuItem';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private menuItemsService: MenuItemsService) {}

  ngOnInit(): void {
    this.menuItemsService.getFoods().subscribe(
      (data) => {
        this.menuItems = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching menu items', error);
      }
    );
  }
}
