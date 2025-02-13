/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const insertDriver = async (driver) => {
    try {
        let sql = `INSERT INTO tbl_motorista (nome, email, rg, cpf, cnh, telefone, data_nascimento, inicio_carreira, senha, foto, avaliacao, descricao)
        values ('${driver.nome}', '${driver.email}', '${driver.rg}', '${driver.cpf}', '${driver.cnh}', '${driver.telefone}', '${driver.data_nascimento}', '${driver.inicio_carreira}', '${driver.senha}', '${driver.foto}', ${driver.avaliacao}, '${driver.descricao}');`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const updateDriver = async (driver) => {
    try {
        let sql = `UPDATE tbl_motorista SET 
            nome = '${driver.nome}',
            email = '${driver.email}',
            rg = '${driver.rg}',
            cpf = '${driver.cpf}',
            cnh = '${driver.cnh}',
            telefone = '${driver.telefone}',
            data_nascimento = '${driver.data_nascimento}',
            inicio_carreira = '${driver.inicio_carreira}',
            senha = '${driver.senha}',
            foto = '${driver.foto}',
            avaliacao = '${driver.avaliacao}',
            descricao = '${driver.descricao}'
        WHERE id = ${driver.id};`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const deleteDriver = async (id) => {
    try {
        let sql = `DELETE FROM tbl_motorista WHERE id = ${id}`
        
        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const selectAllDrivers = async () => {
    try {
        let sql = `SELECT * FROM tbl_motorista ORDER BY id DESC`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const selectDriverIdByCPF = async (cpf) => {
    try {
        let sql = `SELECT CAST(id AS DECIMAL) AS id FROM tbl_motorista WHERE cpf LIKE '${cpf}'`

        const id = await prisma.$queryRawUnsafe(sql)

        if (id.length > 0) {
            return id
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const selectDriverById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_motorista WHERE id = ${id};`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result != null) {
            return result
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

module.exports = {
    insertDriver,
    updateDriver,
    deleteDriver,
    selectAllDrivers,
    selectDriverIdByCPF,
    selectDriverById
}
