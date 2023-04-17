import string
import datetime
from database import database

class Prestador(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    cnpj = database.Column(database.String(14))
    razao_social = database.Column(database.String(255))
    data_abertura = database.Column(database.Date)
    telefone = database.Column(database.String(13))
    email = database.Column(database.String(255))
    cep = database.Column(database.String(8))
    endereco = database.Column(database.String(255))
    numero = database.Column(database.String(8))
    complemento = database.Column(database.String(255))
    bairro = database.Column(database.String(80))
    cidade = database.Column(database.String(80))
    estado = database.Column(database.String(80))
    contatos = database.relationship('ContatoPrestador')

    def __init__(self, cnpj, razao_social, data_abertura, telefone, email, cep, endereco, numero, complemento, bairro, cidade, estado):

        data_abertura = data_abertura.split('-')

        ano = int(data_abertura[0])
        mes = int(data_abertura[1])
        dia = int(data_abertura[2])

        self.cnpj = cnpj
        self.razao_social = razao_social
        self.data_abertura = datetime.date(ano, mes, dia)
        self.telefone = telefone
        self.email = email
        self.cep = cep
        self.endereco = endereco
        self.numero = numero
        self.complemento = complemento
        self.bairro = bairro
        self.cidade = cidade
        self.estado = estado