#import uuid
from flask import Flask
from flask import request
from flask import jsonify 
from flask_cors import CORS 
from mongo import Job
import json

app = Flask(__name__)
CORS(app)

jobs = { 
   'job_list' : [{}]
}

 
def addJob(): 
   jobToAdd = request.get_json()
   jobs['job_list'].append(jobToAdd) 
   newJob = Job(jobToAdd)
   newJob.save()
   resp = jsonify(newJob), 201
   return resp


def deleteJob():
   jobToDelete = request.get_json()
   resp = jobToDelete.remove()                              
   if resp['n'] == 1:                     
      return {}, 204
   else :
      return jsonify({"error": "job not found"}), 404



@app.route('/spreadsheet', methods=['GET', 'POST','DELETE'])
# make this the home page
def spreadsheet():
   if request.method == 'POST':
      return addJob()

   elif request.method == 'GET':
      jobs = Job().find_all()
      return {"job_list": jobs} 
   elif request.method == 'DELETE':
      print(request.get_json())
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
   else :
      return jsonify({"error": "User not found"}), 404 


@app.route('/', methods=['GET'])
# make this the home page
def homePage():
   if request.method == 'GET':
      jobs = Job().find_all()
      print(jobs)
      return {"job_list": jobs} 
       
   return "sad"
