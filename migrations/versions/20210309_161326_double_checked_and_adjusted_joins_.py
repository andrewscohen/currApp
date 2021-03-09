"""double checked and adjusted joins relationship between Users and Courses

Revision ID: 47ed5aa752b6
Revises: 81c760d1b471
Create Date: 2021-03-09 16:13:26.734543

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '47ed5aa752b6'
down_revision = '81c760d1b471'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user_courses', 'course_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('user_courses', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user_courses', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('user_courses', 'course_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
