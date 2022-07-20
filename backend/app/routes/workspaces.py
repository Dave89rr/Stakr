from flask import Blueprint, request
from ..models import db, Workspaces

workspace = Blueprint("workspace", __name__, url_prefix='/api/w')

@workspace.route('/create', methods=['POST'])
def create():
    data = request.json
    new_workspace = Workspaces(
        ownerId = data['ownerId'],
        name = data['name'],
    )
    db.session.add(new_workspace)
    db.session.commit()
    return 'Workspace successfully created!'

@workspace.route('/update', methods=['PUT'])
def update():
    data = request.json
    workspace = Workspaces.query.get(data['id'])
    workspace.ownerId = data['ownerId']
    workspace.name = data['name']
    db.session.commit()
    return 'Workspace successfully updated!'

@workspace.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Workspaces.query.filter_by(id=data['id']).delete()
    db.session.commit()
    return 'Workspace successfully deleted!'
