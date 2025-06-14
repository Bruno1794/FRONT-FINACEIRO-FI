export const API_URL = "https://node-finacer.zapto.org";

export function POST_LOGIN() {
    return {
        url: API_URL + '/login',

    };

}

export function GET_USER() {
    return {
        url: API_URL + '/usuario-logado'

    };

}

export function GET_CATEGORIA(value) {
    return {
        url: API_URL + `/categorias?p=${value}`,

    };

}

export function POST_CATEGORIA() {
    return {
        url: API_URL + '/categorias'

    };

}

export function DELETE_CATEGORIA(value) {
    return {
        url: API_URL + `/categorias/${value}`

    };

}

export function SHOW_CATEGORIA(value) {
    return {
        url: API_URL + `/categorias/${value}`

    };

}

export function PUT_CATEGORIA(value) {
    return {
        url: API_URL + `/categorias/${value}`

    };

}

export function GET_BANCOS(value) {
    return {
        url: API_URL + `/bancos?p=${value}`

    };

}

export function POST_BANCOS() {
    return {
        url: API_URL + '/bancos'

    };

}

export function DELETE_BANCOS(value) {
    return {
        url: API_URL + `/bancos/${value}`

    };

}

export function SHOW_BANCOS(value) {
    return {
        url: API_URL + `/bancos/${value}`

    };

}

export function PUT_BANCOS(value) {
    return {
        url: API_URL + `/bancos/${value}`

    };

}