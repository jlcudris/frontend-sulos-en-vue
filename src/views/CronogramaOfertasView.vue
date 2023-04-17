<template>
    <div class="grid">
        <div class="row">
            <div class="col-6 mt-lg-4">
                <h3 class="mb-5">Crear Cronograma</h3>
                <div class="col-4 w-100">
                    <label for="fechaInicio">Fecha de Inicio:</label>
                    <input class="form-control" type="date" id="fechaInicio" v-model="fechaInicio" required>
                </div>

                <div class="col-4 w-100">
                    <label for="horaInicio">Hora de Inicio:</label>
                    <input type="time" class="form-control" id="horaInicio" v-model="horaInicio" required>
                </div>

                <div class="col-4 w-100">
                    <label for="fechaFin">Fecha de cierre:</label>
                    <input type="date" class="form-control" id="fechaFin" v-model="fechaFin" required>
                </div>

                <div class="col-4 w-100">
                    <label for="horaFin">Hora de cierre:</label>
                    <input type="time" class="form-control" id="horaFin" v-model="horaFin" required>
                </div>

                <div>
                    <button class="btn btn-primary m-1" @click="guardar">Guardar</button>
                </div>
            </div>
            <div class="col-6 m-auto">
                <div class="grid">
                    <div class="container my-5">
                        <h3 class="mb-3">Subir Archivo</h3>
                        <form>
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre:</label>
                                <input type="text" class="form-control" id="nombre" v-model="title" required>
                            </div>
                            <div class="mb-3">
                                <label for="descripcion" class="form-label">Descripción:</label>
                                <input type="text" class="form-control" id="descripcion" v-model="description">
                            </div>
                            <div class="mb-3">
                                <input type="file" class="form-control" ref="fileInput" @change="updateFormData" required />
                            </div>
                            <button type="button" class="btn btn-primary" @click="submitForm">Subir</button>
                        </form>

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
            title: '',
            description: '',
            fechaInicio: '',
            horaInicio: '',
            fechaFin: '',
            horaFin: '',
            id: null,
            formData: new FormData(),
        }
    },
    mounted() {
        // Captura el ID desde la URL
        this.id = this.$route.params.id
    },
    methods: {
        guardar() {
            // Aquí enviarías los datos a tu API o base de datos
            console.log('Datos enviados:')
            console.log('Fecha de Inicio:', this.fechaInicio)
            console.log('Hora de Inicio:', this.horaInicio)
            console.log('Fecha de Fin:', this.fechaFin)
            console.log('Hora de Fin:', this.horaFin)
            console.log('ID:', this.id)

            let data = {
                oferta: this.id,
                fecha_inicio: this.fechaInicio + ' ' + this.horaInicio + ':00',
                fecha_cierre: this.fechaFin + ' ' + this.horaFin + ':00'
            }
            axios.post('http://localhost/api/public/cronograma/', data).then(response => {
                // Limpia los valores de los inputs
                this.fechaInicio = ''
                this.horaInicio = ''
                this.fechaFin = ''
                this.horaFin = ''
                show_alert(response.data.message, 'success');
            })
                .catch(error => {
                    show_alert(error.response.data.message, 'error');
                    console.error(error);
                });
            console.log(data)
          

        },
        updateFormData(event) {
            const file = event.target.files[0];
            this.formData.set('archivo', file);
            this.formData.set('oferta', this.id)
        },
        clearForm() {
            this.formData.delete('archivo');
            this.title = ''
            this.description = ''
            this.$refs.fileInput.value = '';
        },

        submitForm() {
            this.formData.set('titulo', this.title);
            this.formData.set('descripcion', this.description);


            axios.post('http://localhost/api/public/ofertas/documentos/', this.formData).then(response => {
                this.clearForm()
                show_alert(response.data.message, 'success');
            })
                .catch(error => {
                    show_alert(error.response.data.message, 'error');
                    console.error(error);
                });
            // console.log(this.formData)
        }
    }
}
</script>   
  