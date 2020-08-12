import Materialize from 'materialize-css';

export default {
    notifyError(error) {
        console.error(error);
        Materialize.toast({ 
                html: error 
        });
    }
}