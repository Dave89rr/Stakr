from flask import Blueprint, request
from ..models import db, Cards, Stacks

card = Blueprint("card", __name__, url_prefix='/api/c')

@card.route('/all/<stackId>')
def getAll(stackId):
    cards = Cards.query.filter_by(stackId=stackId).all()
    data = [i.toDict() for i in cards]
    return {'cards': data}
