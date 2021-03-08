#import uuid
from flask import Flask
from flask import request
from flask import jsonify 
#from flask import redirect, url_for
from flask_cors import CORS 
from mongo import Job
import json

app = Flask(__name__)
CORS(app)

jobs = { 
   'job_list' : [{}]
}

def getJobsFromQuery():
   search_status = request.args.get('status')
   search_name = request.args.get('company')
   if search_status:
      jobs = Job().find_by_status(search_status)# just need this
   elif search_name:
      jobs = Job().find_by_company(search_name)
   return {"job_list": jobs}
 
 
def addJob(): 
   jobToAdd = request.get_json()
   jobs['job_list'].append(jobToAdd) 
   newJob = Job(jobToAdd)
   newJob.save()
   resp = jsonify(newJob), 201
   return resp


def deleteJob():
   jobToDelete = request.get_json()
   resp = jobToDelete.remove()            # DOUBLE CHECK THAT THIS WORKS                  
   #print(f'resp = {resp}')
   if resp['n'] == 1:                     # WHAT DOES THIS DO?????
      return {}, 204
   #if user.reload() :
   #   return user
   else :
      return jsonify({"error": "job not found"}), 404



@app.route('/spreadsheet', methods=['GET', 'POST','DELETE'])
# make this the home page
def spreadsheet():
   if request.method == 'POST':
      print("went to theee post")
      return addJob()

   elif request.method == 'GET':
      print("made it into GET 2")
      jobs = Job().find_all()
      return {"job_list": jobs} 
   elif request.method == 'DELETE':
      print(request.get_json())
      print("made it to delete bich")
      return deleteJob()
   return "sad"
      
@app.route('/spreadsheet/<id>', methods=['DELETE'])

def get_job(id):
   if request.method == 'DELETE':
      job = Job({"_id":id})
      resp = job.remove()
      print(f'resp = {resp}')
   if resp['n'] == 1:
      return {}, 204
   #if user.reload() :
   # return user
   else :
      return jsonify({"error": "User not found"}), 404 


@app.route('/', methods=['GET'])
# make this the home page
def homePage():
   if request.method == 'GET':
      print("made it into GET")
      jobs = Job().find_all()
      print(jobs)
      return {"job_list": jobs} 
      #return getJobsFromQuery()
       
   return "sad"
