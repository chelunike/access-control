import os
import random
from datetime import timedelta

import base64

import faker, random
from faker.providers import internet, misc, person, address, date_time


jake = faker.Faker()

# Add Providers
jake.add_provider(internet)
jake.add_provider(misc)
jake.add_provider(person)
jake.add_provider(address)
jake.add_provider(date_time)

# Num of objects
num_user = 50

# Some Random data
IDENTIFICATOR = 31415923565
GROUPS = ['FILL_UP']

# CSV CONFIG
SEPARATOR = ';'
LINE_BREAK = '\n'

# ------------------------------------- DONT TOUCH ----------------------------------------------------
# -----------------------------------------------------------------------------------------------------

def populator_register(file_path, callback, num=5, *args, **kwargs):
    global IDENTIFICATOR
    count_objs = 0
    if os.path.exists(file_path):
    	fin = open(file_path, 'a+')
    else:
    	fin = open(file_path, 'w+')
    	count_objs = len(fin.readlines())
    
    if count_objs >= num:
        print("Enough items in csv ({0})".format(count_objs))
    else:
        total = num - count_objs
        print("Not enough items in csv file generating ({0}/{1})".format( total, num))
        #print('Not enough '+obj.__name__+' in database generating (' + total + '/' + num + ')')
        for i in range(total):
            row = callback(*args, **kwargs)
            fin.write(SEPARATOR.join(row) + LINE_BREAK)
    fin.close()
            

# ------------------------------------- DONT TOUCH ----------------------------------------------------
# -----------------------------------------------------------------------------------------------------

# Generations Functions
def generate_user():
    try:
        global IDENTIFICATOR
        IDENTIFICATOR += 1
        user = [
            str(IDENTIFICATOR),     # ID
            random.choice(GRUPS),  # Grupo
            jake.first_name(),      # Nombre
            jake.last_name(),       # Apellidos
            jake.mail()   # Email
        ]
        return user
    except Exception as e:
        print('Error al generar usuario', e)
        return ''


# Register the models to populate
populator_register('users.csv', generate_user, num_user)




