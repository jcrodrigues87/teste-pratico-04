from flask import Blueprint, render_template, request, url_for, redirect
from database import database
from models.Prestador import Prestador
from models.ContatoPrestador import ContatoPrestador

bp_prestadores = Blueprint(name='prestadores', import_name=__name__, template_folder='../views')

@bp_prestadores.route('')
def list():
    return render_template('prestadores.html', prestadores=Prestador.query.all())

@bp_prestadores.route('/criar', methods=['GET','POST'])
def create():
    match request.method:
        case 'GET':
            return render_template('prestador.html', prestador=None, erros=[])
        case 'POST':
            cnpj = request.form.get('cnpj')
            razao_social = request.form.get('razao_social')
            data_abertura = request.form.get('data_abertura')
            telefone = request.form.get('telefone')
            email = request.form.get('email')
            cep = request.form.get('cep')
            endereco = request.form.get('endereco')
            numero = request.form.get('numero')
            complemento = request.form.get('complemento')
            bairro = request.form.get('bairro')
            cidade = request.form.get('cidade')
            estado = request.form.get('estado')

            prestador = Prestador(cnpj, razao_social, data_abertura, telefone, email, cep, endereco, numero, complemento, bairro, cidade, estado)

            if Prestador.query.filter_by(email=email).count() > 0:
                return render_template('prestador.html', prestador=prestador, erros=['Este e-mail já está cadastrado'])

            database.session.add(prestador)
            database.session.commit()

            return redirect(url_for('prestadores.list'))

@bp_prestadores.route('/<int:id>', methods=['GET'])
def read(id):
    return render_template('prestador.html', prestador=Prestador.query.get(id), erros=[])

@bp_prestadores.route('/<int:id>', methods=['POST'])
def update(id):
    prestador = Prestador.query.get(id)

    prestador.cnpj = request.form.get('cnpj')
    prestador.razao_social = request.form.get('razao_social')
    prestador.data_abertura = request.form.get('data_abertura')
    prestador.telefone = request.form.get('telefone')
    prestador.email = request.form.get('email')
    prestador.cep = request.form.get('cep')
    prestador.endereco = request.form.get('endereco')
    prestador.numero = request.form.get('numero')
    prestador.complemento = request.form.get('complemento')
    prestador.bairro = request.form.get('bairro')
    prestador.cidade = request.form.get('cidade')
    prestador.estado = request.form.get('estado')

    database.session.add(prestador)
    database.session.commit()

    return redirect(url_for('prestadores.list'))

@bp_prestadores.route('/<int:id>/deletar', methods=['GET'])
def delete(id):
    prestador = Prestador.query.get(id)

    database.session.delete(prestador)
    database.session.commit()

    return redirect(url_for('prestadores.list'))