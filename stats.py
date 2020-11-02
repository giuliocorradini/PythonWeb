#!$(python3)
'''
Web System Status
stats.py

Routines for system statistics generation

2020-10-27
'''

__author__ = 'Giulio Corradini'


import psutil


def cpu():
    return {"count": psutil.cpu_count(), "load": psutil.getloadavg()}

def ram():
    return psutil.virtual_memory()

def disk():
    return psutil.disk_usage("/")

def net():
    return psutil.net_io_counters()

def boot():
    return psutil.boot_time()


def system_wide():
    '''
    Gets current system status and return a JSON string.
    :return: str
    '''
    statistics = {
        "cpu": cpu(),
        "ram": ram(),
        "disk": disk(),
        "net": net(),
        "boot": boot()
    }

    return statistics