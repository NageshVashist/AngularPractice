import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{
  userSubscription:Subscription;
  isAuthenticated=false;
  constructor(private ss: StorageService,private authService:AuthService) {

  }

  ngOnInit(){
    this.userSubscription= this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user;
    });
  }
  onSaveData() {
    this.ss.storeRecipes();

  }
  onFetchData() {
    this.ss.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}
