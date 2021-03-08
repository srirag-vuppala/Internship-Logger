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
            print("made it to mongo bich")
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp

class Job(Model):
    db_client = pymongo.MongoClient('localhost', 27017)
    collection = db_client["jobs"]["job_list"]


    def find_all(self):
        jobs = list(self.collection.find())
        for job in jobs:
            job["_id"] = str(job["_id"])
        return jobs
    
    def find_by_name_and_job(self, name, job):
        users = list(self.collection.find({"name": name, "job": job}))
        for user in users:
            user["_id"] = str(user["_id"])
        return user


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
