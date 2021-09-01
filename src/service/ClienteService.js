import api from './api';

export default class ClienteService {
    getTodosCliente() {
        return api.get('/cliente/listar-todos').then(res => res.data);
    }

    getCienteId(id) {
        return api.get('/cliente/' + id).then(res => res.data);
    }

    getMyInfos() {
        return api.get('/cliente/myinfo').then(res => res.data);
    }

    deleteMyAccount(id) {
        return api.delete('/cliente/deletar-minha-conta').then(res => res.data)
    }

    createCliente(newCliente) {
        return api.post('/cliente/cadastro', newCliente).then(res => res.data);
    }

    loginCliente(clienteLogado) {
        return api.post('/login', clienteLogado).then(res => res.data);
    }

    esqueciSenhaCliente(emailCliente) {
        return api.post('/cliente/esqueci-senha', emailCliente).then(res => res.data);
    }

    // updateCliente(newCliente,id){
    //     return api.put('/cliente/'+id, newCliente).then(res => res.data);
    // }
}