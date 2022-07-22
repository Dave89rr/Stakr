from flask import Blueprint, request, jsonify
from ..models import db, Boards

board = Blueprint("board", __name__, url_prefix='/api/b')

@board.route('/create', methods=['POST'])
def create():
    data = request.json
    new_board = Boards(
        username = data['username'],
        workspaceId = data['workspaceId'],
        name = data['name'],
        color = data['color']
    )
    db.session.add(new_board)
    db.session.commit()
    return 'Board successfully created!'

@board.route('/all/<username>')
def getAll(username):
    boards = Boards.query.filter_by(username=username).all()
    data = [i.toDict() for i in boards]
    return {'boards': data}

@board.route('/<boardId>')
def getOne(boardId):
    board = Boards.query.get(boardId)
    return board.toDict()

@board.route('/update', methods=['PUT'])
def update():
    data = request.json
    board = Boards.query.get(data['id'])
    board.username = data['username']
    board.workspaceId = data['workspaceId']
    board.name = data['name']
    board.color = data['color']
    db.session.commit()
    return 'Board successfully updated!'
