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
        if not self._id:
            self.collection.insert(self)
        else:
            self.collection.update(
                { "_id": ObjectId(self._id) }, self)
        self._id = str(self._id)


    # def save(self):
    #     if not self._id:
    #         self.collection.insert(self)
    #     else:
    #         self.collection.update(
    #             { "_id": ObjectId(self._id) }, self)
    #     self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result :
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def remove(self):
        if self._id:
            print("curr id: " + str(self._id))
            print("curr company: " + str(self.company))
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp
#asdf
class Job(Model):
    db_client = pymongo.MongoClient('localhost', 27017)  #change if your db is in another host and port
    collection = db_client["jobs"]["job_list"]  #db name is 'users' and collection name is 'users_list'

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
        return users
    
    def find_by_name_and_job(self, name, job):
        users = list(self.collection.find({"name": name, "job": job}))
        for user in users:
            user["_id"] = str(user["_id"])
        return users


    def find_by_company(self, company):
        jobs = list(self.collection.find({"company": company}))
#        for job in jobs:
#           job["_id"] = str(job["_id"])
        return jobs
   

    def find_by_status(self, status):
        jobs = list(self.collection.find({"status": status}))
#        for job in jobs:
#           job["_id"] = str(job["_id"])
        return jobs
       


"""
WE MAY WANT TO ADD ID AS WELL SO THAT WE CAN SEARCH FOR JOBS MORE EASILY
"""