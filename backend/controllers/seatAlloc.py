import sys
arguments=sys.argv[1:]

a=str(arguments)
a=a[2:len(a)-2].split(",")
# print(type(a))
nC=int(a[0])
nS=int(a[1])

# nC=4
# nS=18
nRS=0.1*nS
a=1
unres={}
res={}


mC=int((nC)/2)+1

if (nS/2)%2:
    mS=int(nS/2)
else:
    mS=int(nS/2)+1
    a=-1

# print("mS="+str(mS)+" mC="+str(mC))
i,j,k=0,0,0
s=mS
cArr=[]
sArr=[]
def makeArr(mid,inc,num):
    arr=[]
    i,k=0,0
    while i<=num/2:
        if k:
            n=(int(mid-i))
            k=0
        else:
            n=(int(mid+i))
            k=1
            i+=inc
        if n<=num and n>0:
            arr.append(n)
    return arr
cArr=makeArr(mC,1,nC)
sArr=makeArr(mS,2,nS)
rSArr=sArr[int(mS-nRS):nS]
sArr=sArr[0:int(mS-nRS)]
mS=mS+a
sArr=sArr+makeArr(mS,2,nS)



for seat in sArr:
    for coach in cArr:
        unres[("C"+str(coach)+"-S"+str(seat))]=0
for seat in rSArr:
    for coach in cArr:
        res[("C"+str(coach)+"-S"+str(seat))]=0

print(unres)
print(res)