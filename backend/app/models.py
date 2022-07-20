from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashedPassword = db.Column(db.String(100))
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())


class Workspaces(db.Model):
    __tablename__ = "workspaces"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())

class BoardRelationships:
    __tablename__ = 'board_relationships'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    workspaceId = db.Column(db.Integer, db.ForeignKey("workspaces.id"), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())

class Boards(db.Model):
    __tablename__ = "boards"

    id = db.Column(db.Integer, primary_key=True)
    workspaceId = db.Column(db.Integer, db.ForeignKey("workspaces.id"), nullable=False)
    username = db.Column(db.String(20),nullable=False)
    name = db.Column(db.String(50),nullable=False)
    color = db.Column(db.String(100))
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())

class Stacks(db.Model):
    __tablename__ = "stacks"

    id = db.Column(db.Integer, primary_key=True)
    boardId = db.Column(db.Integer, db.ForeignKey("boards.id"), nullable=False)
    username = db.Column(db.String(20),nullable=False)
    name = db.Column(db.String(50),nullable=False)
    position = db.Column(db.Integer, nullable=False, default = 1)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())


class Cards(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    stakcId = db.Column(db.Integer, db.ForeignKey("stacks.id"), nullable=False)
    username = db.Column(db.String(20),nullable=False)
    name = db.Column(db.String(50),nullable=False)
    color = db.Column(db.String(100))
    description = db.Column(db.String(2000),nullable=False)
    position = db.Column(db.Integer, nullable=False, default = 1)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())

class Comments(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    cardId = db.Column(db.Integer, db.ForeignKey("cards.id"), nullable=False)
    comment = db.Column(db.String(1000),nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())

class Checklists(db.Model):
    __tablename__ = "checklists"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    cardId = db.Column(db.Integer, db.ForeignKey("cards.id"), nullable=False)
    name = db.Column(db.String(50),nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())

class ChecklistItems(db.Model):
    __tablename__ = "checklist_items"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    checklistId = db.Column(db.Integer, db.ForeignKey("checklists.id"), nullable=False)
    checked = db.Column(db.Boolean, nullable=False, default=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, onupdate=func.now())
