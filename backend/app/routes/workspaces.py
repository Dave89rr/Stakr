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
    return 'success!'
