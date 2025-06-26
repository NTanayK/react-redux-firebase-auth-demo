# firebase_config.py
import firebase_admin
from firebase_admin import credentials, auth
import os


cred = credentials.Certificate("secrets/empower-1211-firebase-adminsdk-fbsvc-eb7425faaf.json")
firebase_admin.initialize_app(cred)
