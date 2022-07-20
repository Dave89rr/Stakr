"""initial db migration

Revision ID: 78044e5dc843
Revises: 
Create Date: 2022-07-20 11:28:39.046725

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78044e5dc843'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('hashedPassword', sa.String(length=100), nullable=True),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('workspaces',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('boards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workspaceId', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('color', sa.String(length=100), nullable=True),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['workspaceId'], ['workspaces.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ws_relationships',
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('workspaceId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['workspaceId'], ['workspaces.id'], )
    )
    op.create_table('stacks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('boardId', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('position', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['boardId'], ['boards.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stakcId', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('color', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=2000), nullable=False),
    sa.Column('position', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['stakcId'], ['stacks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('checklists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('cardId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['cardId'], ['cards.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('cardId', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=1000), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['cardId'], ['cards.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('checklist_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('checklistId', sa.Integer(), nullable=False),
    sa.Column('checked', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['checklistId'], ['checklists.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('checklist_items')
    op.drop_table('comments')
    op.drop_table('checklists')
    op.drop_table('cards')
    op.drop_table('stacks')
    op.drop_table('ws_relationships')
    op.drop_table('boards')
    op.drop_table('workspaces')
    op.drop_table('users')
    # ### end Alembic commands ###