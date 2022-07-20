from flask import Flask
from flask_migrate import Migrate

from .config import Config
from .models import db
from .routes import workspaces

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint

db.init_app(app)
migrate = Migrate(app, db)
