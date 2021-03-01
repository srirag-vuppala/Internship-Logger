#import uuid
from flask import Flask
from flask import request
from flask import jsonify 
#from flask import redirect, url_for
from flask_cors import CORS 
from mongo import Job                     # DOUBLE CHECK THAT THIS WORKS (changed User to Job)
import json


app = Flask(__name__)
CORS(app)

jobs = { # users before
   'job_list' : # users_list before
   [
      { 
         'position' : 'janitor',
         'company' : 'google',
         'status': 'Waiting to Hear Back',
         'additional_info': 'i am so excited',
      },
      {
         'position' : '',
         'company' : '',
         'status': '',
         'additional_info': '',
      }
 ]
}

"""
from model_mongodb import User


app = Flask(__name__)
#CORS stands for Cross Origin Requests.
#Here we'll allow requests coming from any domain. Not recommended for production environment.
CORS(app) 

users = { 
   'users_list' : []
}


@app.route('/')

def hello_world():
    return 'Hello, World!'
    
# def gen_random_id():
#   random_id = ''.join([random.choice(string.ascii_letters 
#            + string.digits) for n in range(6)]) 
#   print (random_id)
#   return random_id


@app.route('/users', methods=['GET', 'POST'])
def get_users():
   if request.method == 'GET':
      search_username = request.args.get('name')
      search_job = request.args.get('job')
      if search_username and search_job :
         #return find_users_by_name_job(search_username, search_job) 
         users = User().find_by_name_job(search_username, search_job)
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
   #elif request.method == 'DELETE':
   #   userToDelete = request.get_json()
   #   users['users_list'].remove(userToDelete)
   #   resp = jsonify(success=True)
   #   resp.status_code = 200
      # 200 is the default code for a normal response
   #   return resp
      
@app.route('/users/<id>', methods=['GET', 'DELETE'])

def get_user(id):
   if request.method == 'GET':
      user = User({"_id":id})
      if user.reload() :
         return user
      else :
         return jsonify({"error": "User not found"}), 404

   elif request.method == 'DELETE':
      user = User({"_id":id})
      resp = user.remove()
      print(f'resp = {resp}')
      if resp['n'] == 1:
         return {}, 204
      #if user.reload() :
      #   return user
      else :
         return jsonify({"error": "User not found"}), 404
      
#def find_users_by_name_job(name, job):
#   subdict = {'users_list' : []}
#   for user in users['users_list']:
#      if user['name'] == name and user['job'] == job:
#         subdict['users_list'].append(user)
#   return subdict 

def find_users_by_job(job):
   subdict = {'users_list' : []}
   for user in users['users_list']:
      if user['job'] == job:
         subdict['users_list'].append(user)
   return subdict 
"""

def getJobsFromQuery():
   search_status = request.args.get('status')
   search_name = request.args.get('company')
   if search_status:
      jobs = Job().find_by_status(search_status)# just need this
   elif search_name:
      jobs = Job().find_by_name(search_name)
   return {"job_list": jobs}                    # make sure this is returning correctly


# def editJob(): # can either do a delete and then an add or write a new mongo function that edits the job

#    # we need the old name of the job in order to do a delete, maybe new delete that takes in a name??


#    # we then want the new date in order to do a job add


#    return
 
def addJob(): # consider making an ID field for each job
   jobToAdd = request.get_json()
   # userToAdd['id'] = gen_random_id()     # check for duplicate before appending.. todo
   # users['users_list'].append(userToAdd)

   # make DB request to add user
   newJob = Job(jobToAdd)
   newJob.save()
   resp = jsonify(newJob), 201
   return resp



   jobToAdd = request.get_json() # double check that we actually have this object
   jobs['job_list'].append(jobToAdd) # MAKE SURE jobs AND job_list ARE THE CORRECT VARIABLES
   resp = jsonify(jobToAdd)

def deleteJob():
   job = Job({"company":company})                  # make sure this is correct, before it was: User({"_id":id})
   resp = job.remove()                    # make sure that this line works correctly
   print(f'resp = {resp}')
   if resp['n'] == 1:                     # WHAT DOES THIS DO?????
      return {}, 204
   #if user.reload() :
   #   return user
   else :
      return jsonify({"error": "job not found"}), 404

@app.route('/spreadsheet', methods=['POST','DELETE'])  #ADDED EDIT HERE (removed POST)
# make this the home page
def spreadsheet():
   if request.method == 'POST':
      return jobToAdd()

   elif request.method == 'DELETE':
      return deleteJob()
                                  
   # elif request.method == 'EDIT': # IS THERE AN AXIOS EDIT????
   #    return editJob()
      


@app.route('/', methods=['GET','DELETE', 'POST'])  #ADDED EDIT HERE
# make this the home page
def homePage():
   if request.method == 'GET':
      return getJobsFromQuery()
       
   elif request.method == 'POST':   # WE ONLY NEED THIS IF WE CAN ADD FROM FRONT PAGE EDIT BUTTON
     return jobToAdd()

   elif request.method == 'DELETE': # WE ONLY NEED THIS IF WE CAN DELETE FROM FRONT PAGE EDIT BUTTON
      return deleteJob()
                                    # IS THERE AN AXIOS EDIT????
   # elif request.method == 'EDIT':   # WE ONLY NEED THIS IF WE CAN EDIT FROM FRONT PAGE EDIT BUTTON
   #    return editJob()
      

"""
DONE 1. Get delete method from Harumi 

DONE 2. Decide on what we are doing with the front page button

DONE 3. Decide how we are going to do EDIT since it probably doesnt exist
         DELETE and then POST and eventually add an ID 

DONE 4. Talk about how the elements actually get displayed on the front end, for example on our homepage

DONE 5. Is it easy to change User in mongo.py to Job or is that not possible?

LOOK INTO 6. What does reload do in mongo.py? Could this be used for EDIT??
"""