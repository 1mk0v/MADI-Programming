class Interviewer():

    def __init__(
            self,
            name:str) -> None:
        self.name = name

    def ask_question(self):
        print(f'{self.name} Ask about anythink')


class DeveloperInterviewer(Interviewer):

    def __init__(self, name: str) -> None:
        super().__init__(name)

    def ask_question(self):
        print(f'{self.name} Ask about tech stack')


class ManagerInterviewer(Interviewer):

    def __init__(self, name: str) -> None:
        super().__init__(name)

    def ask_question(self):
        print(f'{self.name} Ask about company')