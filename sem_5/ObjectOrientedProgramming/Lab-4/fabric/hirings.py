from . import interviewers

class HiringManager():
    
    def __init__(
            self,
            name:str
    ) -> None:
        self.name = name
    
    def make_interviewer(self, name:str) -> interviewers.Interviewer:
        return interviewers.Interviewer(name)

    def take_interview(self, name):
        interviewer = self.make_interviewer(name)
        interviewer.ask_question()


class DevelopmentManager(HiringManager):

    def make_interviewer(self, name:str) -> interviewers.Interviewer:
        return interviewers.DeveloperInterviewer(name)
    
class MarketingManager(HiringManager):

    def make_interviewer(self, name:str) -> interviewers.Interviewer:
        return interviewers.ManagerInterviewer(name)
    

