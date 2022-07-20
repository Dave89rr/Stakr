from flask import Blueprint
from ..models import Workspaces

workspace = Blueprint("workspace", __name__, url_prefix='/api/w')

@workspace.route('/create', methods=['POST'])
def create():
    # data = request.json
    # new_workspace = Workspaces(

    # )
    pass
