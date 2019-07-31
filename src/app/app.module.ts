import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { RestaurantesComponent } from './restaurante/restaurantes.component';
import { RestauranteService } from './restaurante/restaurante.service';
import { MenuService } from './menu/menu.service';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormComponent } from './restaurante/form.component';
import { FormComponente } from './menu/form.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'',redirectTo: '/restaurante', pathMatch: 'full'},
  {path: 'menu', component: MenuComponent},
  {path: 'restaurante', component: RestaurantesComponent},
  {path: 'menu/form', component: FormComponente},
  {path: 'restaurante/form', component: FormComponent},
  {path: 'menu/form/:id', component: FormComponente},
  {path: 'restaurante/form/:id', component: FormComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    RestaurantesComponent,
    NavbarComponent,
    FormComponent,
    FormComponente
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RestauranteService,
    MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
