from flask import Blueprint, request
from ..models import db, Stacks, Boards

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
    return new_stack.toDict()

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

@stack.route('/updateOrder', methods=['PUT'])
def updateOrder():
    data = request.json
    newStacks = []

    for i in data['stacks']:
        stack = Stacks.query.get(i)
        if not (stack.position == data['stacks'].index(str(stack.toDict()['id']))):
            stack.position = data['stacks'].index(str(stack.toDict()['id']))
            newStacks.append(stack.toDict())

    db.session.commit()
    return {'stacks': newStacks, 'boardId': data['boardId']}

@stack.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    print('******************************************')
    print(data)
    print('******************************************')
    Stacks.query.filter_by(id=data).delete()
    db.session.commit()
    return 'Stack successfully deleted!'
