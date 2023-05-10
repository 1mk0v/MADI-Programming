#!/usr/bin/env python3
import os
import string
import secrets
import time
from simple_term_menu import TerminalMenu
from tabulate import tabulate



all_names = []
CS_container = []
CA_container = {}
CS_name_founded = []
CS_time_statistic = []
CS_one_time = []
CA_name_founded = []
CA_time_statistic = []
CA_one_time = []

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
    table = {"CA_time": CA_time_statistic,
            "CA_found": CA_name_founded,
            "CA_one_time": CA_one_time,
            "CS_time": CS_time_statistic,
            "CS_found": CS_name_founded,
            "CS_one_time": CS_one_time}
    print(tabulate(table, headers=['CA_time','CA_found', 'CA_one_time', 'CS_time', 'CS_found', 'CS_one_time'], tablefmt="grid"))
    input('Press any ENTER')


def find_all():
    CS_found = 0
    CS_time_one_find = 0
    CS_start_time = time.time() 
    for name in all_names:
        result = find_CS_name(name)
        CS_found += result['num']
        CS_time_one_find += result['time'] 
    CS_end_time = time.time() 
    CS_time_statistic.append(str((CS_end_time-CS_start_time)))
    CS_name_founded.append(str(CS_found))
    CS_one_time.append(CS_time_one_find/CS_found)

    CA_found = 0
    CA_time_one_find = 0
    CA_start_time = time.time() 
    for name in all_names:
        result = find_CA_name(name)
        CA_found += result['num']
        CA_time_one_find += result['time']
    CA_end_time = time.time() 
    CA_time_statistic.append(str((CA_end_time-CA_start_time))) 
    CA_name_founded.append(str(CA_found))
    CA_one_time.append(CA_time_one_find/CA_found)

def find_CS_name(name):
    result = {}
    start_time = time.time()
    if name in CS_container:
        result['num'] = 1
    end_time = time.time()
    result['time'] = end_time - start_time
    return result 


def find_CA_name(name):
    result = {}
    start_time = time.time()
    if name in CA_container.keys():
        result['num'] = 1
    end_time = time.time()
    result['time'] = end_time - start_time
    return result


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
