from database import database

class ContatoPrestador(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    nome = database.Column(database.String(255))
    departmento = database.Column(database.String(255))
    email = database.Column(database.String(255))
    id_prestador = database.Column(database.Integer, database.ForeignKey('prestador.id'))

    def __init__(self, nome, departmento, email):
        self.nome = nome
        self.departmento = departmento
        self.email = email