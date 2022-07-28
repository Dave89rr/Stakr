from flask import Blueprint, request
from ..models import db, Cards, Stacks

card = Blueprint("card", __name__, url_prefix='/api/c')

@card.route('/create', methods=['POST'])
def create():
    data = request.json
    new_card = Cards(
        stackId= data['stackId'],
        username= data['username'],
        name = data['name'],
        color = data['color'],
        description = data['description'],
        position = data['position']
    )
    db.session.add(new_card)
    db.session.commit()
    return new_card.toDict()

@card.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Cards.query.filter_by(id=data).delete()
    db.session.commit()
    return 'Brandon is a very cute boy who fixed dnd'

@card.route('/all/<boardId>')
def getAll(boardId):
    stacks = Stacks.query.filter_by(boardId=boardId).all()
    cards = []
    for i in stacks:
        for j in i.cards:
            cards.append(j.toDict())
    return {'cards': cards}

@card.route('/updatedata', methods=['PUT'])
def update_data():
    data=request.json

    card = Cards.query.get(data['id'])
    card.stackId = data['stackId']
    card.username = data['username']
    card.name = data['name']
    card.color=data['color']
    card.description = data['description']
    card.position = data['position']

    db.session.commit()

    return card.toDict()



@card.route('/update', methods=['PUT'])
def update():
    data = request.json

    card = Cards.query.get(data['cardId'])
    card.position = data['newPos']
    card.stackId = data['stackId']

    if (len(data['otherCards'])) and data['otherCards'][0] not in data['orderList']:
        for i in data['otherCards']:
            cur = Cards.query.get(i)
            cur.position = data['otherCards'].index(i)
        for i in data['orderList']:
            cur = Cards.query.get(i)
            cur.position = data['orderList'].index(i)
    else:
        for i in data['orderList']:
            cur = Cards.query.get(i)
            cur.position = data['orderList'].index(i)

    db.session.commit()





    return {
        "card": card.toDict(),
        "otherCards": data['otherCards'],
        "orderList": data['orderList']
    }
