<template>
<div class="row">
  <div class="col-lg-8 offset-lg-2">
    <div class="table-responsive">
       <table class="table table-bordered table-hover">
           <thead>
                  <tr>
                    <th>#</th>
                    <th>Obejto/Evento</th>
                    <th>Descripcion</th>
                    <th>Moneda</th>
                    <th>Presupuesto</th>
                    <th>Actividad</th>
                    <th>Estado</th>
                    <th>Fecha Creacion</th>
                    <th>Cronograma</th>
                  </tr>
              </thead>
                  <tbody class="table-group-divider" id="contenido">
                    <tr v-for="evento, i in eventos" :key="evento.id">
                        <td>{{ i+1 }}</td>
                        <td>{{ evento.objeto }}</td>
                        <td>{{  evento.descripcion }}</td>
                        <td>{{  evento.moneda }}</td>
                        <td>${{new Intl.NumberFormat('es-mx').format( evento.presupuesto)}}</td>
                        <td>{{  evento.nombre_producto }}</td>
                        <td>{{  evento.estado }}</td>
                        <td>{{  evento.created_at }}</td>
                        <td>
                          <router-link  :to="{path:'eventos/cronograma/'+evento.id}" class="btn btn-success">
                              <i class="fa-solid fa-book"></i>
                          </router-link>
                        </td>

                    </tr>
                    
                  </tbody>
        </table>
    </div>
  </div>
</div>
</template>
<script>

  import axios from 'axios';
 
  export default{
  
      data(){
          return{eventos:null}
      },
      mounted(){
        this.getEventos();
      },
      methods:{
        getEventos(){
          axios.post('http://localhost/api/public/ofertas/filtros/').then(
              response =>(
                this.eventos = response.data
              )
          );
        }
      }
  }
</script>
