from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class WorkspaceForm(FlaskForm):
    name = StringField(
        'Name', validators=[DataRequired()])
    ownerId = IntegerField('ownerId', validators=[DataRequired()])
