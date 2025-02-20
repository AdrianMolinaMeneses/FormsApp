import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    {
      title: 'Básicos',
      route: 'reactive/basic',
    },
    {
      title: 'Dinámicos',
      route: 'reactive/dynamic',
    },
    {
      title: 'Switches',
      route: 'reactive/switches',
    },
  ];

  public authMenu: MenuItem[] = [
    {
      title: 'Registro',
      route: 'auth/register',
    },
  ];

  public selectorsMenu: MenuItem[] = [
    {
      title: 'Selectores',
      route: 'selectors/selector',
    },
  ];

  public productsMenu: MenuItem[] = [
    {
      title: 'Productos',
      route: 'products/product',
    },
  ];
}
