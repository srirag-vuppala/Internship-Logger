import pytest
import mongo
import requests
import json


def test_add():
    dict = {'position':'a position', 'company': 'a company', 'additional_info': 'more info about the job', 'status': 'coding'}
    r = requests.post('http://localhost:5000/spreadsheet', json = dict)
    actual = requests.get('http://localhost:5000/spreadsheet')

    variable = False
    for i in range(len(actual.json()['job_list'])):
        if dict['position'] == actual.json()['job_list'][i]['position'] and \
    dict['company'] == actual.json()['job_list'][i]['company'] and \
    dict['additional_info'] == actual.json()['job_list'][i]['additional_info'] and \
    dict['status'] == actual.json()['job_list'][i]['status']:
            variable = dict['position'] == actual.json()['job_list'][i]['position'] and \
    dict['company'] == actual.json()['job_list'][i]['company'] and \
    dict['additional_info'] == actual.json()['job_list'][i]['additional_info'] and \
    dict['status'] == actual.json()['job_list'][i]['status']

    jobber = mongo.Job().find_by_company(dict['company'])[0]
    d = requests.delete('http://localhost:5000/spreadsheet/'+str(jobber['_id']))

    assert variable



def test_get():
    # this test only works to check if the data base is empty
    dict = {'position':'a position', 'company': 'a company', 'additional_info': 'more info about the job', 'status': 'coding'}
    r = requests.post('http://localhost:5000/spreadsheet', json = dict)
    actual = requests.get('http://localhost:5000/spreadsheet')

    variable = False
    variable = dict['position'] == actual.json()['job_list'][0]['position'] and \
    dict['company'] == actual.json()['job_list'][0]['company'] and \
    dict['additional_info'] == actual.json()['job_list'][0]['additional_info'] and \
    dict['status'] == actual.json()['job_list'][0]['status'] 

    jobber = mongo.Job().find_by_company(dict['company'])[0]
    d = requests.delete('http://localhost:5000/spreadsheet/'+str(jobber['_id']))

    assert variable

def test_delete():
    dicter = {'position':'a position', 'company': 'a company', 'additional_info': 'more info about the job', 'status': 'coding'}
    print("hello")
    r = requests.post('http://localhost:5000/spreadsheet', json = dicter)
    jobber = mongo.Job().find_by_company(dicter['company'])[0]
    jobber = mongo.Job().find_by_status(dicter['status'])[0]
    print(jobber)

    d = requests.delete('http://localhost:5000/spreadsheet/'+str(jobber['_id']))
    print(d.text)
    
    assert d.status_code == 204

def test_misc():
    dict = {'position':'a position', 'company': 'a company', 'additional_info': 'more info about the job', 'status': 'coding'}
    # r = requests.post('http://localhost:5000/spreadsheet', json = dict)
    newJob = mongo.Job(dict)
    newJob.save()
    newJob.remove()


    dict = {'_id': '1'*24, 'position':'a position', 'company': 'a company', 'additional_info': 'more info about the job', 'status': 'coding'}
    newJob = mongo.Job(dict)
    newJob.save()
    newJob.remove()

    assert newJob.find_all() == [] 