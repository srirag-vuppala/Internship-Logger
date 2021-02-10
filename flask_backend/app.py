#import uuid
from flask import Flask
from flask import request
from flask import jsonify 
from flask_cors import CORS 
from mongo import User
import json


app = Flask(__name__)
CORS(app)

users = { 
   'users_list' : []
}

# def random_id_generator():
#     return uuid.uuid4().hex[:6]
    
@app.route('/users', methods=['GET', 'POST','DELETE'])
def get_users():
   if request.method == 'GET':
      search_username = request.args.get('name')
      search_job = request.args.get('job')
      if search_username and search_job :
         #return find_users_by_name_job(search_username, search_job) 
         users = User().find_by_name_and_job(search_username, search_job)
      elif search_username  :
         users = User().find_by_name(search_username)
      elif search_job  :
         return find_users_by_job(search_job) 
      else:
         users = User().find_all()
      return {"users_list": users}
   elif request.method == 'POST':
      userToAdd = request.get_json()
      # userToAdd['id'] = gen_random_id() # check for duplicate before appending.. todo
      # users['users_list'].append(userToAdd)

      # make DB request to add user
      newUser = User(userToAdd)
      newUser.save()
      resp = jsonify(newUser), 201
      return resp
   elif request.method == 'DELETE':
      userToDelete_id = request.get_json()['_id']
      userToDelete = User(self.collection.find({"_id" : userToDelete_id}))
      resp = userToDelete.remove()
      users['users_list'].remove(userToDelete)
      resp = jsonify(success=True)
      resp.status_code = 200
      return resp
      
@app.route('/users/<id>', methods=['GET'])

def get_user(id):
   if request.method == 'GET':
      user = User({"_id":id})
   if user.reload() :
      return user
   else :
      return jsonify({"error": "User not found"}), 404
   
# def find_users_by_name_job(name,job):
#    subdict = {'users_list' : []}
#    for user in users['users_list']:
#       if user['name'] == name and user['job'] == job:
#          subdict['users_list'].append(user)
#    return subdict 
#    #return User().find_by_name_and_job(name, job)
   

def find_users_by_job(job):
   subdict = {'users_list' : []}
   for user in users['users_list']:
      if user['job'] == job:
         subdict['users_list'].append(user)
   return subdict

@app.route('/')
def hello_world():
    return 'Hello, World'