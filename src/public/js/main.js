import {loaderApex} from "../assets/apex-loader.mjs";
import {splash} from "../assets/apex-splash.mjs"
import { convertStatusText } from "./helpers/convertStatusText.mjs";
import navBarMenu from "./ui/navBar.mjs";
import {configurations} from './constants/configurations.mjs'

const cardsContainer = document.querySelector(".cards-container")
const loaderContainer = document.querySelector(".loader")


//configurations.ipRasp = "localhost"; // para teste local

 

navBarMenu(configurations.ipRasp)


window.onload = (event) => {
    loaderContainer.innerHTML = splash()
  };


const getDevice = async () => {

    console.log("chamando gateway")
    
    //cardsContainer.innerHTML = ""

    try { 
       loadScreen("Buscando dados", "status-info", "")
       loaderContainer.classList.remove("d-none")       

        const response = await fetch(`http://${configurations.ipRasp}:3050/readAllRemoteIo`)

        //console.log(data)

        if (!response.ok) {
            console.log(response)
            throw new Error("falha ao obter dados do gateway")
        }

        const data = await response.json()

        loaderContainer.classList.add("d-none")

       cardsContainer.innerHTML = ""

        const createCard = data.map((remoteIo) => {

            const {machine, status, workcenter, remoteName} = remoteIo
            const {DI0, DI1, DI2, DI3} = remoteIo.data.data
            const {datetime} = remoteIo.data.info

            const dateDevice = datetime.slice(11, -1)

            const statusDI0 = convertStatusText(DI0.status.SignalLogic);
            const statusDI1 = convertStatusText(DI1.status.SignalLogic);

            const card = document.createElement("div")

            card.innerHTML = 
            `
             <div class="card">
                <div class="content">
                <div class="title">
                    <h3>Modulo <span>${workcenter}</span></h3>
                      <img src="../assets/grinder.svg" alt="icone twi machine" />
                </div>      
                    <div class="infos">
                        <div class="status">
                            <p>Remote I/O OK</p>
                            <span>${status} ${remoteName}</span>
                        </div>
                        <div class="status">
                            <p>Última atualização</p>
                            <span>${dateDevice}</span>
                        </div>
                        <div class="status">
                            <p>DI0 - Máquina rodando</p>
                            <span class=${statusDI0.className}>${statusDI0.text}</span>
                        </div>
                        <div class="status">
                            <p>DI1 - Máquina standby </p>
                            <span class=${statusDI1.className}>${statusDI1.text}</span>
                        </div>
                    </div>
                </div>
            </div>    
            `

            cardsContainer.appendChild(card)

        })
    } catch (error) {
        loaderContainer.classList.remove("d-none")  
        loadScreen("Falha ao obter dados do Gateway : ", "status-error", error.message)       
        console.log("Erro na request", error)
    }
}

function loadScreen(message, statusClass, error){

    loaderContainer.innerHTML = ""

    const loader = loaderApex()

    loaderContainer.innerHTML = ""
    loaderContainer.innerHTML = `
        ${loader}
        <div class="message-output ${statusClass}">
            <p> ${message} </p>
            <span> ${error} </span>
        </div>
    `
}

setInterval(() => {
    getDevice()
}, 10000);