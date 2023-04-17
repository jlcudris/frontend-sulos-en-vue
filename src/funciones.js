import Swal from "sweetalert2";
import axios from "axios";

export function show_alert(mensaje,icono,foco=''){
    if(foco !==''){
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:mensaje,
        icon:icono,
        customClass:{confirmButton:'btn  btn-primary',popup:'animate zoomIn' },
        buttonsStyling:false
    });
}





