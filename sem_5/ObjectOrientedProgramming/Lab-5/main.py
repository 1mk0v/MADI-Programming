from MVC import controller, model, view

def main():
    database = model.Database()
    user_view = view.User
    user_manager = controller.UserManager(database, user_view)
    user_manager.add('LYALYA', 18)
    user_manager.add('ANYA', 20)
    user_manager.add('DANYA', 22)
    for i in user_manager.get_all():
        print(i.__dict__)
    user_manager.delete(0)
    for i in user_manager.get_all():
        print(i.__dict__)

if __name__ == '__main__':
    main()