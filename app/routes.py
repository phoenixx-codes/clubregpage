from flask import Blueprint, request, jsonify
from .models import User
from .database import db
from flask import render_template

routes = Blueprint("routes", __name__)

@routes.route("/")
def home():
    return render_template("index.html")


@routes.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()

    full_name = data.get("full_name")
    phone = data.get("phone")
    college_mail = data.get("college_mail")
    registration_number = data.get("registration_number")

    # Backend Validation
    if not all([full_name, phone, college_mail, registration_number]):
        return jsonify({"error": "All fields are required"}), 400

    # Check duplicates
    if User.query.filter_by(college_mail=college_mail).first():
        return jsonify({"error": "College mail already registered"}), 409

    if User.query.filter_by(phone=phone).first():
        return jsonify({"error": "Phone already registered"}), 409

    if User.query.filter_by(registration_number=registration_number).first():
        return jsonify({"error": "Registration number already registered"}), 409

    new_user = User(
        full_name=full_name,
        phone=phone,
        college_mail=college_mail,
        registration_number=registration_number,
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registration successful"}), 201


@routes.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    result = [
        {
            "full_name": u.full_name,
            "phone": u.phone,
            "college_mail": u.college_mail,
            "registration_number": u.registration_number,
        }
        for u in users
    ]
    return jsonify(result), 200

@routes.route("/init_db")
def init_db():
    from .database import db
    db.create_all()
    return "Neon DB initialized!"
