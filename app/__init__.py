import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .config import Config
from .models import db, Users
from .routes import user_routes, auth_routes, workspaces, boards, stacks, cards

from .seeds import seed_commands

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return Users.query.get(int(id))

# Tell flask about our seed commands
app.cli.add_command(seed_commands)
app.config.from_object(Config)

app.register_blueprint(user_routes.user_route)
app.register_blueprint(auth_routes.auth_route)
app.register_blueprint(workspaces.workspace)
app.register_blueprint(boards.board)
app.register_blueprint(stacks.stack)
app.register_blueprint(cards.card)

db.init_app(app)
migrate = Migrate(app, db)

# Application Security
CORS(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
