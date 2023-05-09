#!/usr/bin/env python3
import os
import string
import secrets
import time
from simple_term_menu import TerminalMenu


all_names = []
CS_container = []
CA_container = {}
CS_name_founded = []
CA_name_founded = []
CS_time_statistic = []
CA_time_statistic = []


def main():
    add_name()
    while True:
        os.system('clear')
        print_main_menu()
        
    
def add_name():
    count = len(all_names)
    if count == 0:
        count = 1
    for _ in range(count):
        new_name = create_random_name()
        all_names.append(new_name)
        CS_container.append(new_name)
        CA_container[new_name] = new_name
    find_all()


def create_random_name():
    name = ''.join(secrets.choice(string.ascii_letters + string.digits)
                   for _ in range(250))
    return name


def print_main_menu():
    print(f'Number of names: {len(all_names)}')
    options = ['[a] add name', '[p] print statistic','[e] exit']
    terminal_menu = TerminalMenu(options)
    menu_entry_index = terminal_menu.show()
    get_action(menu_entry_index)


def print_statistic():
    os.system('clear')
    print('Count' ,'CA', 'CA_FOUND', 'CS', 'CS_FOUND')
    count = 1
    for i in range(len(CA_time_statistic)):
        if i != 0:
            count *= 2
        print(count ,CA_time_statistic[i].ljust(15), CA_name_founded[i], CS_time_statistic[i].ljust(15), CS_name_founded[i])
    input('Press any key')


def find_all():
    CS_found = 0
    CS_start_time = time.time() 
    for name in all_names: 
        CS_found +=find_CS_name(name) 
    CS_end_time = time.time() 
    CS_time_statistic.append(str((CS_end_time-CS_start_time)))
    CS_name_founded.append(str(CS_found))

    CA_found = 0
    CA_start_time = time.time() 
    for name in all_names: 
        CA_found += find_CA_name(name) 
    CA_end_time = time.time() 
    CA_time_statistic.append(str((CA_end_time-CA_start_time))) 
    CA_name_founded.append(str(CA_found))

def find_CS_name(name):
    num = 0
    if name in CS_container:
        num = 1  
    return num 


def find_CA_name(name):
    num = 0
    if name in CA_container.keys():
        num = 1  
    return num


def get_action(num_of_action):
    match num_of_action:
        case 0:
            add_name()
        case 1:
            print_statistic()
        case 2:
            exit("\nExit programm")
            


if __name__ == '__main__':
    main()
