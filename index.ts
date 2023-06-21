const fs = require('fs');

function lerArquivos(): unknown {
    const text = fs.readFileSync('./bd.json')
    return JSON.parse(text);
}

function escreverArquivo(dados:any): void {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null 
}

function cadastrarUsuario(dados: Usuario) {
    const bd = lerArquivos() as Usuario[];
    bd.push(dados);
    escreverArquivo(bd);
    return dados;
}

function listarUsuarios(filtro?: string): Usuario[] {
    const bd = lerArquivos() as Usuario[];

    const usuarios = bd.filter(usuario => {
        if (filtro) {
            return usuario.profissao === filtro;
        }

        return usuario;
    })

    return usuarios;
}

const leo = cadastrarUsuario({
    nome: 'Leonardo',
    email: 'leo@email.com',
    cpf: '12345678911',
    endereco: {
        cep: '11111-111',
        rua: 'Alameda da Tecnologia',
        bairro: 'Vale do Silício',
        cidade: 'Uberlandia'
    }
})

const bd = lerArquivos();
console.log(leo, bd);

function detalharUsuario(cpf: string): Usuario {
    const bd = lerArquivos() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    })

    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }

    return usuario;
}  

const leonardo = detalharUsuario('12345678911');

function atualizarUsuario(cpf: string, dados: Usuario) {
    const bd = lerArquivos() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    })

    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }

    Object.assign(usuario, dados);

    escreverArquivo(bd);

    return dados;
}

function excluirUsuario(cpf: string) {
    const bd = lerArquivos() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    })

    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }

    const exclusao = bd.filter(usuario => {
        return usuario.cpf !== cpf;
    })

    escreverArquivo(exclusao);

    return usuario;
}

function filtrarUsuarios(profissao: string) {
    
}