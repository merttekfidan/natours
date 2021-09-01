/* eslint-disable no-alert, no-console */

import '@babel/polyfill';
import { login,logout } from './login';
import { displayMap } from './mapbox';
import { showAlert } from './alerts';

//DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logOutBtn= document.querySelector('.nav__el--logout');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if(logOutBtn) logOutBtn.addEventListener('click',logout)
/* eslint-disable no-alert, no-console */