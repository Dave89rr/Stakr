from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

db = SQLAlchemy()

ws_relationships = db.Table(
    'ws_relationships',
    db.Column('userId', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE')),
    db.Column('workspaceId', db.Integer, db.ForeignKey('workspaces.id', ondelete='CASCADE'))
)

class Users(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashedPassword = db.Column(db.String(500))
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    workspaceOwnership = db.relationship('Workspaces', back_populates='owner', cascade="all, delete-orphan")
    workspaces = db.relationship('Workspaces', secondary=ws_relationships, back_populates='users')
    comments = db.relationship('Comments', back_populates='user', cascade="all, delete-orphan")
    checklists = db.relationship('Checklists', back_populates='user', cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def toDict(self):
        return dict(
            id=self.id,
            username=self.username,
            email=self.email,
            hashedPassword=self.hashedPassword,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt
        )


class Workspaces(db.Model):
    __tablename__ = "workspaces"

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    boards = db.relationship('Boards', back_populates='workspace', cascade="all, delete-orphan")
    owner = db.relationship('Users', back_populates='workspaceOwnership')
    users = db.relationship('Users', secondary=ws_relationships, back_populates='workspaces')

    def toDict(self):
        return dict(
            id=self.id,
            ownerId=self.ownerId,
            name=self.name,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt,
        )

# class BoardRelationships:
#     __tablename__ = 'board_relationships'

#     id = db.Column(db.Integer, primary_key=True)
#     userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     workspaceId = db.Column(db.Integer, db.ForeignKey("workspaces.id"), nullable=False)
#     createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
#     updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())

class Boards(db.Model):
    __tablename__ = "boards"

    id = db.Column(db.Integer, primary_key=True)
    workspaceId = db.Column(db.Integer, db.ForeignKey("workspaces.id", ondelete='CASCADE'), nullable=False)
    username = db.Column(db.String(20),nullable=False)
    name = db.Column(db.String(50),nullable=False)
    color = db.Column(db.String(100))
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    workspace = db.relationship('Workspaces', back_populates='boards')
    stacks = db.relationship('Stacks', back_populates='board', cascade="all, delete-orphan")

    def toDict(self):
        return dict(
            id=self.id,
            workspaceId=self.workspaceId,
            username=self.username,
            name=self.name,
            color=self.color,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt
        )

class Stacks(db.Model):
    __tablename__ = "stacks"

    id = db.Column(db.Integer, primary_key=True)
    boardId = db.Column(db.Integer, db.ForeignKey("boards.id", ondelete='CASCADE'), nullable=False)
    username = db.Column(db.String(20),nullable=False)
    name = db.Column(db.String(50),nullable=False)
    position = db.Column(db.Integer, nullable=False, default = 1)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    board = db.relationship('Boards', back_populates='stacks')
    cards = db.relationship('Cards', back_populates='stack', cascade="all, delete-orphan")

    def toDict(self):
        return dict(
            id=self.id,
            boardId=self.boardId,
            username=self.username,
            name=self.name,
            position=self.position,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt
        )

class Cards(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    stackId = db.Column(db.Integer, db.ForeignKey("stacks.id", ondelete='CASCADE'), nullable=False)
    username = db.Column(db.String(20),nullable=False)
    name = db.Column(db.String(50),nullable=False)
    color = db.Column(db.String(100))
    description = db.Column(db.String(2000),nullable=False)
    position = db.Column(db.Integer, nullable=False, default = 1)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    stack = db.relationship('Stacks', back_populates='cards')
    comments = db.relationship('Comments', back_populates='card', cascade="all, delete-orphan")
    checklists = db.relationship('Checklists', back_populates='card', cascade="all, delete-orphan")

    def toDict(self):
        return dict(
            id=self.id,
            stackId=self.stackId,
            username=self.username,
            name=self.name,
            color=self.color,
            description=self.description,
            position=self.position,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt
        )

class Comments(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    cardId = db.Column(db.Integer, db.ForeignKey("cards.id", ondelete='CASCADE'), nullable=False)
    comment = db.Column(db.String(1000),nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    card = db.relationship('Cards', back_populates='comments')
    user = db.relationship('Users', back_populates='comments')

    def toDict(self):
        return dict(
            id=self.id,
            userId=self.userId,
            cardId=self.cardId,
            comment=self.comment,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt
        )

class Checklists(db.Model):
    __tablename__ = "checklists"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    cardId = db.Column(db.Integer, db.ForeignKey("cards.id", ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(50),nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    card = db.relationship('Cards', back_populates='checklists')
    items = db.relationship('ChecklistItems', back_populates='checklist', cascade="all, delete-orphan")
    user = db.relationship('Users', back_populates='checklists')

    def toDict(self):
        return dict(
            id=self.id,
            userId=self.userId,
            cardId=self.cardId,
            name=self.name,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt
        )

class ChecklistItems(db.Model):
    __tablename__ = "checklist_items"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    checklistId = db.Column(db.Integer, db.ForeignKey("checklists.id", ondelete='CASCADE'), nullable=False)
    checked = db.Column(db.Boolean, nullable=False, default=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    checklist = db.relationship('Checklists', back_populates='items')

    def toDict(self):
        return dict(
            id=self.id,
            userId=self.userId,
            checklistId=self.checklistId,
            checked=self.checked,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt
        )
