//Imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



//Importar componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';

import { IdentityGuard } from './services/identity.guard';
import { PostsAdminComponent } from './components/posts-admin/posts-admin.component';

//Definir Rutas
const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'inicio', component: HomeComponent},
	{path: 'admin-posts', component: PostsAdminComponent, canActivate: [IdentityGuard]},
	{path: 'hola-admin-tqm', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},
	//{path: 'registro', component: RegisterComponent},
	{path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard]},
	{path: 'crear-categoria', component: CategoryNewComponent, canActivate: [IdentityGuard]},
	{path: 'administrar-categorias', component: ManageCategoriesComponent, canActivate: [IdentityGuard]},
	{path: 'crear-entrada', component: PostNewComponent, canActivate: [IdentityGuard]},
	{path: 'entrada/:id', component: PostDetailComponent},
	{path: 'editar-entrada/:id', component: PostEditComponent, canActivate: [IdentityGuard]},
	
	{path: 'categoria/:id', component: CategoryDetailComponent},
	{path: 'perfil/:id', component: ProfileComponent},
	{path: '**', component: ErrorComponent}
];

//Exportar configuración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
