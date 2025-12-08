from .database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(15), nullable=False, unique=True)
    college_mail = db.Column(db.String(120), nullable=False, unique=True)
    registration_number = db.Column(db.String(50), nullable=False, unique=True)

    def __repr__(self):
        return f'<User {self.full_name} - {self.college_mail}>'
