import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';


const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	//{ path: 'browse', component: UnderDevelopmentComponent},
	//{ path: 'project3', component: UnderDevelopmentComponent},
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'browse', component: BrowseComponent }
	//{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
