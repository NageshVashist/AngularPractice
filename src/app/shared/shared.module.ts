import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        DropdownDirective,
        PlaceHolderDirective,
        AlertComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        PlaceHolderDirective,
        AlertComponent,
        LoadingSpinnerComponent,
        CommonModule
    ]
})
export class SharedModule {

}