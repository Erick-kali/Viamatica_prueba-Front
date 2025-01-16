import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario = '';  // Email del usuario
  pass = '';     // Contraseña

  constructor(private authService: AuthService) {}

  onSubmit() {
    // Llamar al servicio de autenticación para hacer el login
    this.authService.login(this.usuario, this.pass).subscribe(
      (response: any) => {
        // Si el login es exitoso, guardamos el token en localStorage
        if (response.message === "Inicio de sesión exitoso") {
          localStorage.setItem('usuario', 'true');
          localStorage.setItem('nombre', response.usuario.email);

          // Redirigir al dashboard
          location.href = 'dashboard';
        } else {
          // Si no es exitoso, mostrar un mensaje de error
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "El usuario no existe o las credenciales son incorrectas.",
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      (error) => {
        // Manejo de errores de la API
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Hubo un error al intentar iniciar sesión.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
}
