import pymongo
from bson import ObjectId

class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self.company:
            self.collection.insert(self)
        else:
            self.collection.update(
                { "company": ObjectId(self.company) }, self)
        self.company = str(self.company)

    def reload(self):
        if self.company:
            result = self.collection.find_one({"company": ObjectId(self.company)})
            if result :
                self.update(result)
                self.company = str(self.company)
                return True
        return False

    def remove(self):
        if self.company:
            resp = self.collection.remove({"company": ObjectId(self.company)})
            self.clear()
            return resp

class Job(Model):
    db_client = pymongo.MongoClient('localhost', 27017)  #change if your db is in another host and port
    collection = db_client["jobs"]["job_list"]  #db name is 'users' and collection name is 'users_list'

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["company"] = str(user["company"])
        return users
    
    def find_by_name_and_job(self, name, job):
        users = list(self.collection.find({"name": name, "job": job}))
        for user in users:
            user["company"] = str(user["company"])
        return users


    def find_by_name(self, company):
        jobs = list(self.collection.find({"company": company}))
#        for job in jobs:
#           job["company"] = str(job["company"])
        return jobs
   

   def find_by_status(self, status):
        jobs = list(self.collection.find({"status": status}))
#        for job in jobs:
#           job["company"] = str(job["company"])
        return jobs
       


"""
WE MAY WANT TO ADD ID AS WELL SO THAT WE CAN SEARCH FOR JOBS MORE EASILY
"""