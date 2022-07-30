from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class WorkspaceForm(FlaskForm):
    name = StringField(
        'Name', validators=[DataRequired(), Length(
            min=1, max=50, message='Name must be between 1 and 50 characters long.')])
    ownerId = IntegerField('ownerId', validators=[DataRequired(), ])
