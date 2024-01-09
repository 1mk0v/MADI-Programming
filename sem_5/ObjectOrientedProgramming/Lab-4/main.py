
from fabric import hirings

def main():
    developmentHR = hirings.DevelopmentManager('Надюха')
    developmentHR.take_interview('Алешка')

    marketingHR = hirings.MarketingManager('Оксанка')
    marketingHR.take_interview('Санька')

if __name__ == '__main__':
    main()