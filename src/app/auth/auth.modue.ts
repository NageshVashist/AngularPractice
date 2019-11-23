import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../core.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CoreModule,
        FormsModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild([{
            path: 'auth',
            component: AuthComponent
        }])
    ]
})
export class AuthModule {

}