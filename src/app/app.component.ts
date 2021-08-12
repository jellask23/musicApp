import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task2-eCommerce';

  changeTheme(){
    if(document.body.classList.contains("dark-theme")){
      document.body.classList.remove("dark-theme")
      document.body.classList.add("default-theme")
    }
    else{
      document.body.classList.remove("default-theme")
      document.body.classList.add("dark-theme")
    }
  }
}
