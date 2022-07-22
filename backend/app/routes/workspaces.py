from flask import Blueprint, request, jsonify
from ..models import db, Workspaces, Boards

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

@workspace.route('/all/<ownerId>')
def getAll(ownerId):
    workspaces = Workspaces.query.filter_by(ownerId=ownerId).all()
    data = [i.toDict() for i in workspaces]
    return {'workspaces': data}

@workspace.route('/<workspaceId>')
def getOne(workspaceId):
    workspace = Workspaces.query.get(workspaceId)
    return workspace.toDict()

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
    Workspaces.query.filter_by(id=data['workspaceId']).delete()
    db.session.commit()
    return 'Workspace successfully deleted!'
