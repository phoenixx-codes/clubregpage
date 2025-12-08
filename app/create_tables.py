from flask import current_app as app
from .database import db
from .models import User


def create_tables():
    with app.app_context():
        db.create_all()
