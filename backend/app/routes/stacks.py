from flask import Blueprint, request
from ..models import db, Stacks

stack = Blueprint("stack", __name__, url_prefix='/api/s')

@stack.route('/create', methods=['POST'])
def create():
    data = request.json
    new_stack = Stacks(
        username = data['username'],
        boardId = data['boardId'],
        name = data['name'],
        position = data['position'],
        workspaceId = data['workspaceId']
    )
    db.session.add(new_stack)
    db.session.commit()
    return 'Stack successfully created!'

@stack.route('/all/<boardId>')
def getAll(boardId):
    stacks = Stacks.query.filter_by(boardId=boardId).all()
    data = [i.toDict() for i in stacks]
    return {'stacks': data}

@stack.route('/<stackId>')
def getOne(stackId):
    stack = Stacks.query.get(stackId)
    return stack.toDict()

@stack.route('/update', methods=['PUT'])
def update():
    data = request.json
    stack = Stacks.query.get(data['id'])
    stack.username = data['username']
    stack.boardId = data['boardId']
    stack.name = data['name']
    stack.position = data['position']
    db.session.commit()
    return 'Stack successfully updated!'

@stack.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Stacks.query.filter_by(id=data['stackId']).delete()
    db.session.commit()
    return 'Stack successfully deleted!'
