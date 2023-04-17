<template>
  <nav class="navbar navbar-expand-lg bg-success">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Procesos/Eventos</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" href="#" to="/list">Consultar</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" href="#" to="/create">Crear</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="container-fluid mt-3">
  <router-view/>
</div>
</template>

