"""fixed ondelete cascade associations

Revision ID: 8e4acaccc6e5
Revises: 78044e5dc843
Create Date: 2022-07-20 11:48:50.096212

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8e4acaccc6e5'
down_revision = '78044e5dc843'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('boards_workspaceId_fkey', 'boards', type_='foreignkey')
    op.create_foreign_key(None, 'boards', 'workspaces', ['workspaceId'], ['id'], ondelete='CASCADE')
    op.drop_constraint('cards_stakcId_fkey', 'cards', type_='foreignkey')
    op.create_foreign_key(None, 'cards', 'stacks', ['stackId'], ['id'], ondelete='CASCADE')
    op.drop_constraint('checklist_items_userId_fkey', 'checklist_items', type_='foreignkey')
    op.drop_constraint('checklist_items_checklistId_fkey', 'checklist_items', type_='foreignkey')
    op.create_foreign_key(None, 'checklist_items', 'checklists', ['checklistId'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'checklist_items', 'users', ['userId'], ['id'], ondelete='CASCADE')
    op.drop_constraint('checklists_cardId_fkey', 'checklists', type_='foreignkey')
    op.drop_constraint('checklists_userId_fkey', 'checklists', type_='foreignkey')
    op.create_foreign_key(None, 'checklists', 'users', ['userId'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'checklists', 'cards', ['cardId'], ['id'], ondelete='CASCADE')
    op.drop_constraint('comments_userId_fkey', 'comments', type_='foreignkey')
    op.drop_constraint('comments_cardId_fkey', 'comments', type_='foreignkey')
    op.create_foreign_key(None, 'comments', 'users', ['userId'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'comments', 'cards', ['cardId'], ['id'], ondelete='CASCADE')
    op.drop_constraint('stacks_boardId_fkey', 'stacks', type_='foreignkey')
    op.create_foreign_key(None, 'stacks', 'boards', ['boardId'], ['id'], ondelete='CASCADE')
    op.drop_constraint('workspaces_ownerId_fkey', 'workspaces', type_='foreignkey')
    op.create_foreign_key(None, 'workspaces', 'users', ['ownerId'], ['id'], ondelete='CASCADE')
    op.drop_constraint('ws_relationships_workspaceId_fkey', 'ws_relationships', type_='foreignkey')
    op.drop_constraint('ws_relationships_userId_fkey', 'ws_relationships', type_='foreignkey')
    op.create_foreign_key(None, 'ws_relationships', 'workspaces', ['workspaceId'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'ws_relationships', 'users', ['userId'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'ws_relationships', type_='foreignkey')
    op.drop_constraint(None, 'ws_relationships', type_='foreignkey')
    op.create_foreign_key('ws_relationships_userId_fkey', 'ws_relationships', 'users', ['userId'], ['id'])
    op.create_foreign_key('ws_relationships_workspaceId_fkey', 'ws_relationships', 'workspaces', ['workspaceId'], ['id'])
    op.drop_constraint(None, 'workspaces', type_='foreignkey')
    op.create_foreign_key('workspaces_ownerId_fkey', 'workspaces', 'users', ['ownerId'], ['id'])
    op.drop_constraint(None, 'stacks', type_='foreignkey')
    op.create_foreign_key('stacks_boardId_fkey', 'stacks', 'boards', ['boardId'], ['id'])
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.create_foreign_key('comments_cardId_fkey', 'comments', 'cards', ['cardId'], ['id'])
    op.create_foreign_key('comments_userId_fkey', 'comments', 'users', ['userId'], ['id'])
    op.drop_constraint(None, 'checklists', type_='foreignkey')
    op.drop_constraint(None, 'checklists', type_='foreignkey')
    op.create_foreign_key('checklists_userId_fkey', 'checklists', 'users', ['userId'], ['id'])
    op.create_foreign_key('checklists_cardId_fkey', 'checklists', 'cards', ['cardId'], ['id'])
    op.drop_constraint(None, 'checklist_items', type_='foreignkey')
    op.drop_constraint(None, 'checklist_items', type_='foreignkey')
    op.create_foreign_key('checklist_items_checklistId_fkey', 'checklist_items', 'checklists', ['checklistId'], ['id'])
    op.create_foreign_key('checklist_items_userId_fkey', 'checklist_items', 'users', ['userId'], ['id'])
    op.drop_constraint(None, 'cards', type_='foreignkey')
    op.create_foreign_key('cards_stakcId_fkey', 'cards', 'stacks', ['stackId'], ['id'])
    op.drop_constraint(None, 'boards', type_='foreignkey')
    op.create_foreign_key('boards_workspaceId_fkey', 'boards', 'workspaces', ['workspaceId'], ['id'])
    # ### end Alembic commands ###