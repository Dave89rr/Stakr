from flask import Blueprint, request
from ..models import db, Cards, Stacks

card = Blueprint("card", __name__, url_prefix='/api/c')

@card.route('/all/<stackId>')
def getAll(stackId):
    cards = Cards.query.filter_by(stackId=stackId).all()
    data = [i.toDict() for i in cards]
    return {'cards': data}

@card.route('/update', methods=['PUT'])
def update():
    data = request.json

    card = Cards.query.get(data['cardId'])
    card.position = data['newPos']
    card.stackId = data['stackId']

    if (len(data['otherCards'])) and data['otherCards'][0] not in data['cardOrder']:
        for i in data['otherCards']:
            cur = Cards.query.get(i)
            cur.position = data['otherCards'].index(i)
        for i in data['cardOrder']:
            cur = Cards.query.get(i)
            cur.position = data['cardOrder'].index(i)
    else:
        for i in data['cardOrder']:
            cur = Cards.query.get(i)
            cur.position = data['cardOrder'].index(i)

    db.session.commit()

    return {
        "card": card.toDict(),
        "otherCards": data['otherCards'],
        "cardOrder": data['cardOrder']
    }
