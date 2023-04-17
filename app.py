from flask import Flask, render_template
from flask_migrate import Migrate
from database import database
from blueprints.prestador import bp_prestadores

app = Flask(__name__)
app.config['SECRET_KEY'] = 'cnx#23'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///canex_prestadores.sqlite'
app.config['SQLALCHEMY_TRACKMODIFICATIONS'] = False

database.init_app(app)

migrate = Migrate(app, database)

@app.route('/')
def index():
    return render_template('index.html')

app.register_blueprint(bp_prestadores, url_prefix='/prestadores')

if __name__ == '__main__':
    app.run()
