import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleProductComponent } from './single-product/single-product.component'

const routers: Routes = [
    {
        path: 'singleProduct/:id',
        component: SingleProductComponent
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routers)],
    exports: [RouterModule]
})
export class AppRoutingModule {}