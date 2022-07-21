from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Users

user_route = Blueprint('users', __name__, url_prefix='/api/users')

@user_route.route('/')
@login_required
def users():
    users = Users.query.all()
    return {'users': [user.toDict() for user in users]}


@user_route.route('/<int:id>')
@login_required
def user(id):
    user = Users.query.get(id)
    return user.toDict()
