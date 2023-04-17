<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">Crear Evento</div>
        <div class="card-body">
          <div class="grid d-flex">
            <div class="col-7">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-object-group"></i></span>
                <input type="text" v-model="objeto" id="objeto" class="form-control" maxlength="150" placeholder="Objeto"
                  required>&nbsp;
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-comment"></i></span>
                <input type="text" v-model="descripcion" id="descripcion" class="form-control" maxlength="300"
                  placeholder="Descripcion" required>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fa-solid fa-coins"></i></span>
                <select v-model="moneda" class="form-select" aria-label="Default select example" id="moneda">
                  <option v-for="coin, in coins" :key="coin.id" value="1">{{ coin.siglas }}</option>

                </select> &nbsp;
                <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
                <input type="number" v-model="presupuesto" id="presupuesto" class="form-control" placeholder="Presupuesto"
                  step="0.01" required>
              </div>

            </div>

            <div class="col-5">
              <div class="input-group mb-3">

                <input class="form-control me-2" type="text" v-model="searchQuery" @input="search" placeholder="Actividad"
                  aria-label="Search">
                <ul style="list-style: none; cursor: pointer;" v-if="searchResults.length > 0">
                  <li @click="fillInput(result.nombre), selectResult(result)" v-for="result in searchResults"
                    :key="result.id">
                    {{ result.nombre }}
                  </li>
                </ul>


              </div>
            </div>

          </div>

          <div class="d-grid col-6 mx-auto">
            <button @click="enviarDatos" class="btn btn-success"><i class="fa-solid fa-floppy-disk"> Guardar</i></button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { show_alert } from '@/funciones';
export default {
  data() {

    return {
      coins: null,
      searchResults: [],
      selectedId: null,
      objeto: "",
      selectedId: "",
      descripcion: "",
      moneda: "",
      presupuesto: "",
    }

  },
  mounted() {

    this.getCoins()
      
  },
  methods: {
    selectResult(result) {
      this.selectedId = result.id;
    },
    search() {
      if (this.searchQuery) {
        let post = {
          actividad: this.searchQuery
        };
        axios.post('http://localhost/api/public/ofertas/activity/', post).then(response => {
          this.searchResults = response.data
        })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.searchResults = []
      }
    },
    fillInput(value) {
      this.searchResults = []
      this.searchQuery = value;
    },

    getCoins() {
      axios.get('http://localhost/api/public/ofertas/coins/').then(
        response => (
          this.coins = response.data
        )
      );
    },

    enviarDatos() {
      let params = {
        objeto: this.objeto,
        actividad: this.selectedId,
        descripcion: this.descripcion,
        moneda: this.moneda,
        presupuesto: this.presupuesto
      };

      axios.post('http://localhost/api/public/ofertas/', params)
        .then(response => {
          this.objeto = ""
          this.selectedId = ""
          this.descripcion = ""
          this.moneda = ""
          this.presupuesto = ""
          this.searchQuery = ""
          show_alert(response.data.message, 'success');
        })
        .catch(error => {
         console.error(error)
          show_alert(error.response.data.message, 'warning')
        });
    }
  }
}
</script>