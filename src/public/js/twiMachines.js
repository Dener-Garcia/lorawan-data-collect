import { getData } from "./api/getData.mjs";
import navBarMenu from "./ui/navBar.mjs";
import {configurations} from './constants/configurations.mjs';

const cardsContainer = document.querySelector(".cards-container");
const loaderContainer = document.querySelector(".loader");
const historyContainer = document.querySelector(".history-container")

//configurations.ipRasp = "localhost"; // para teste local

navBarMenu(configurations.ipRasp)


const readTwiMachines = async () => {
  try {
    const response = await getData(`http://${configurations.ipRasp}:3050/machines/twi_machine`);

    cardsContainer.innerHTML = "";

    const machines = {};

    response.forEach((input) => {
      const { val_workcenter, dev_address, input_generic, input_name, input_value, record_timestamp } = input;
      const key = `${dev_address}-${val_workcenter}`;
      const dateRecord = `${record_timestamp.slice(11, -8)} ${record_timestamp.slice(2, -14)}`;

      if (!machines[key]) {
        machines[key] = {
          workcenter: val_workcenter,
          dev_address,
          dateRecord,
          DI0: "Desconhecido",
          DI1: "Desconhecido",
        };
      }

      // Atualizar DI0 e DI1 corretamente
      if (input_generic === "DI0") {
        machines[key].DI0 = input_value === "1" ? "Ligado" : "Desligado";
      }
      if (input_generic === "DI1") {
        machines[key].DI1 = input_value === "1" ? "Ligado" : "Desligado";
      }
    });

    Object.values(machines).forEach(({ workcenter, dev_address, DI0, DI1, dateRecord }) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
                <div class="content">
                    <div class="title">
                        <h3>Modulo <span>${workcenter}</span></h3>
                        <img src="../assets/grinder.svg" alt="icone twi machine" />
                    </div>      
                    <div class="infos">
                        <div class="status">
                            <p>Remote I/O</p>
                            <span>${dev_address}</span>
                        </div>
                        <div class="status">
                            <p>Última atualização</p>
                            <span>${dateRecord}</span>
                        </div>
                        <div class="status">
                            <p>DI0 - Máquina Rodando</p>
                            <span>${DI0}</span>
                        </div>
                        <div class="status">
                            <p>DI1 - Máquina Standby</p>
                            <span>${DI1}</span>
                        </div>
                    </div>
                    <div class="cta">
                      <button class="btn-primary btn-show-history">Ver Histórico</button>
                    </div>
                </div>
            `;

card.querySelector(".btn-show-history").addEventListener("click", () =>{
  historyContainer.classList.add('d-block')
  showHistoric(workcenter, limit, offset)
    });

      cardsContainer.appendChild(card);
    });
  } catch (error) {
    loaderContainer.classList.remove("d-none");
    console.error("Erro na request", error);
  }
};

let offset = 0
const limit = 3600

const showHistoric = async (workcenter, limit, offset) => {
    console.log("Chamei historico", workcenter, limit, offset)
    try {
        const result = await getData(`http://${configurations.ipRasp}:3050/machine/?workcenter=${workcenter}&limit=${limit}&offset=${offset}` 
        )
    
        if (result.length > 0){
            renderHistory(result, workcenter)
        }
    } catch (error) {
        console.log("erro ao carregar historico", error)
    }
   
}

const renderHistory = (dataFiltered, workcenter) => {
  const historyContent = document.createElement('div')
  historyContent.classList.add('history-content')

  const headerActions = document.createElement('div')
  headerActions.classList.add('header-actions')

  headerActions.innerHTML = `
  <h2>Últimos registros de ${workcenter}</h2>
  <button class='btn-closed'>x</button>
  `
    const headerTable = document.createElement('div')
    headerTable.classList.add('history-header')

    headerTable.innerHTML = `
        <h3>Nome input</h3>
        <h3>Valor Registrado</h3>
        <h3>Data registro</h3>
    `

historyContainer.appendChild(headerActions)
historyContainer.appendChild(headerTable)
historyContainer.appendChild(historyContent)

const btnClosedHistory = document.querySelector('.header-actions .btn-closed').addEventListener('click', ()=> {
  historyContainer.innerHTML = ""
  historyContainer.classList.remove('d-block')})


  dataFiltered.forEach((item) => {

        const row = document.createElement("div")
        row.classList.add("history-item")

        row.innerHTML = `
          <p>${item.input_name}</p>
          <span>${item.input_value}</span>
          <p>${new Date(item.record_timestamp).toLocaleString()}</p>

      `;

      historyContent.appendChild(row);
    })
}

readTwiMachines();
