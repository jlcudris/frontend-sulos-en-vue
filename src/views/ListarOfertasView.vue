<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label for="objeto" class="form-label">Objeto:</label>
                        <input type="text" class="form-control" id="objeto" v-model="objeto">
                    </div>

                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción:</label>
                        <input class="form-control" id="descripcion" rows="3" v-model="descripcion">
                    </div>

                    <div class="mb-3">
                        <label for="estado" class="form-label">Estado:</label>
                        <select class="form-select" id="estado" v-model="estado">
                            <option v-for="estado, in estados" :key="estado.id" :value="estado.id">{{ estado.nombre }}
                            </option>
                        </select>
                    </div>

                    <div class="d-grid gap-2">
                        <button type="button" class="btn btn-primary" @click="filtrar">Buscar</button>
                        <button type="button" class="btn btn-secondary" @click="limpiarFormulario">Limpiar</button>
                        <button type="button" v-if="eventos.length > 0" class="btn btn-primary"
                            @click="generarExcel">Generar
                            Excel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="row">
        <div v-if="eventos.length > 0">


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
                        <tr v-for="evento,  in eventos" :key="evento.id">
                            <td>{{ evento.id }}</td>
                            <td>{{ evento.objeto }}</td>
                            <td>{{ evento.descripcion }}</td>
                            <td>{{ evento.moneda }}</td>
                            <td>${{ new Intl.NumberFormat('es-mx').format(evento.presupuesto) }}</td>
                            <td>{{ evento.nombre_producto }}</td>
                            <td>{{ evento.estado }}</td>
                            <td>{{ evento.created_at }}</td>
                            <td>
                                <router-link :to="{ path: 'eventos/cronograma/' + evento.id }" class="btn btn-success">
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
import exportXlsFile from 'export-from-json'
import exportFromJSON from 'export-from-json';
import { show_alert } from '@/funciones';
export default {
    data() {
        return {
            eventos: [],
            objeto: '',
            estados: [],
            descripcion: '',
            estado: 'pendiente'
        }
    },
    mounted() {
        this.getEstados()
    },
    methods: {
        filtrar() {
            // Aquí generarías el Excel con los datos del formulario
            console.log('Objeto:', this.objeto)
            console.log('Descripción:', this.descripcion)
            console.log('Estado:', this.estado)

            let data = {
                objeto: this.objeto,
                descripcion: this.descripcion,
                estado: this.estado
            }

            axios.post('http://localhost/api/public/ofertas/filtros/', data).then(
                response => (
                    this.eventos = response.data
                  
                )
            ) .catch(error => {
                    show_alert(error.response.data.message, 'error');
                    console.error(error);
                });
        },
        generarExcel() {

            const data = this.eventos
            for(let item of data){
                delete item.id_actividad
                delete item.id_estado
                delete item.id_moneda  
            }
            const fileName = 'report'
            const exportType = exportFromJSON.types.xls
            exportXlsFile({data,fileName,exportType})

            // Crear un libro de Excel y agregar una hoja
            // const libro = XLSX.utils.book_new()
            // const hoja = XLSX.utils.json_to_sheet(datosTabla)

            // // Agregar la hoja al libro
            // XLSX.utils.book_append_sheet(libro, hoja, 'Resultados')

            // // Descargar el archivo
            // XLSX.writeFile(libro, 'resultados.xlsx')
        },
        getEstados() {
            console.log("te llame")
            axios.get(' http://localhost/api/public/ofertas/estado/').then(
                response => (
                    this.estados = response.data
                )
            );
        },
        limpiarFormulario() {
            // Limpia los valores de los inputs
            this.objeto = ''
            this.descripcion = ''
            this.estado = 'pendiente'
        }
    }
}
</script>
  |