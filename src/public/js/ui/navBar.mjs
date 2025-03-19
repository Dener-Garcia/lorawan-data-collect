const navBar = document.querySelector(".navBarDsa")
const btnShowNavBar = document.querySelector('.btn-show-nav-bar')

const navBarMenu = (ipServer) => {
navBar.innerHTML = `
<nav>
  <ul>
<li>
  <a href="http://${ipServer}:3050/">Real Time LoRaWan</a>
</li>
<li>
  <a href="http://${ipServer}:3050/pages/twi-machines.html">TWI Machines</a>
</li>
</ul>
</nav>
`

btnShowNavBar.addEventListener("click", ()=>{
  navBar.classList.toggle("show-nav-bar")
})
}

export default navBarMenu
