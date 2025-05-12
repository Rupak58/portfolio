import random
import string

r1 = ''.join(random.choices(string.ascii_letters + string.digits, k=3))

st= input("enter: ")
words = st.split()
coding = int(input("enter '0' for coding and '1' for decoding: "))
if coding == 0 :
    nwords=[]
    for word in words:
        if len(word)>=3:
            stnew = r1 + word[1:] + word[0]+ r1
            nwords.append(stnew)
        else:
            nwords.append(word[::-1])#reverse    
    print(" ".join(nwords)) #join
else:
     nwords=[]
     for word in words:
        if len(word)>=3:
            stnew = word[3:-3]
            stnew = stnew[-1] + stnew[:-1]
            nwords.append(stnew)
        else:
            nwords.append(word[::-1])    
     print(" ".join(nwords)) 

