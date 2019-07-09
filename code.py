#__________Rules__________
import random
mh = 10
eh = 10
def MyHp():
    mhp = ('|'*mh)
    if len(mhp)<10:
        while (len(mhp)!=10):
            mhp+=" "
    print ('   My Hp ['+mhp+']')

def EnemyHp():
    ehp = ('|'*eh)
    if len(ehp)<10:
        while (len(ehp)!=10):
            ehp+=" "
    print ('Enemy Hp ['+ehp+']')

def disp():
    MyHp()
    EnemyHp()

#__________Start__________
q = int(input('hello, choose enemy:\n1)bow\n'))
if q == 1:
    while (mh > 0):
        en = random.randint(1,3)
        my = int(input('выбери  1 - 3\n'))
        if (my!=en):
            en = random.randint(1,2)
            my = int(input('промах, выбери  1 - 2\n'))
            if (my!=en):
                print('снова минус\n')
                mh-=1
            else:
                print ('попадание')
                eh-=1
        else:
            eh-=1
            print ('есть пробитие\n')
        disp()
        if (eh == 0):
            break 