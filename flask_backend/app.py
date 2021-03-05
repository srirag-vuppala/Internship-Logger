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
         '_id': '12345678910ac43185927543',
      },
      {
         'position' : '',
         'company' : '',
         'status': '',
         'additional_info': '',
         '_id': '000000000000000000000000',
      }
 ]
}

def getJobsFromQuery():
   search_status = request.args.get('status')
   search_name = request.args.get('company')
   if search_status:
      jobs = Job().find_by_status(search_status)# just need this
   elif search_name:
      jobs = Job().find_by_company(search_name)
   return {"job_list": jobs}                    # make sure this is returning correctly


# def editJob(): # can either do a delete and then an add or write a new mongo function that edits the job

#    # we need the old name of the job in order to do a delete, maybe new delete that takes in a name??


#    # we then want the new date in order to do a job add


#    return
 
 
def addJob(): 
   jobToAdd = request.get_json()
   jobs['job_list'].append(jobToAdd) 
   # userToAdd['id'] = gen_random_id()     # check for duplicate before appending.. todo
   # make DB request to add user
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
      
def main():
   #deleteJob = ({"position":"macs anus plug","company":"google","status":"Waiting to Hear Back","additional_info":"i am so excited"})
   #job = Job("_id":"12345678910ac43185927543")
   #jobs = find_by_company("google")
   #for job in jobs:
   #   job.remove()


# GET TESTING
   # search_status = ""
   # search_name = "apple"
   # if search_status:
   #    jobs = Job().find_by_status(search_status)# just need this
   # elif search_name:
   #    jobs = Job().find_by_company(search_name)
   # print({"job_list": jobs})                    # make sure this is returning correctly


# DELETE TESTING
   # thisID = "12345678910ac43185927543"
   # # job = Job({"_id": thisID})           # for some reason this isnt getting the job correctly
   # print("job: " + str(job))
   # resp = job.remove() 
   # print("resp: " + str(resp))
   # return 


if __name__ == "__main__":
   main()
"""
DONE 1. Get delete method from Harumi 

DONE 2. Decide on what we are doing with the front page button

DONE 3. Decide how we are going to do EDIT since it probably doesnt exist
         DELETE and then POST and eventually add an ID 

DONE 4. Talk about how the elements actually get displayed on the front end, for example on our homepage

DONE 5. Is it easy to change User in mongo.py to Job or is that not possible?

LOOK INTO 6. What does reload do in mongo.py? Could this be used for EDIT??
"""