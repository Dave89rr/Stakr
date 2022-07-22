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
    )
    db.session.add(new_stack)
    db.session.commit()
    return 'Workspace successfully created!'

@stack.route('/all/<boardId>')
def getAll(boardId):
    stacks = Stacks.query.filter_by(boardId=boardId).all()
    data = [i.toDict() for i in stacks]
    return {'stacks': data}
