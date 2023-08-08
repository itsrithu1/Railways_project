import sys
arguments=sys.argv[1:]


a=str(arguments)
a=a[2:len(a)-2].split(",")
# print(type(a))

noOfCoaches=int(a[0])

noOfSeats=int(a[1])

# noOfCoaches=3
# noOfSeats=10
noOfSeats+=1

num=1
if noOfCoaches%2:
     num=0
     noOfCoaches-=1

unres={}
res={}
noOfReservedSeats=int(0.1*noOfSeats)
mid_Coach=int(noOfCoaches/2)+1


if(noOfSeats%2):

    mid_Seat=int(noOfSeats/2)+1

else:

    mid_Seat=int(noOfSeats/2)

   

if not(mid_Seat%2):

    mid_Seat=mid_Seat-1

   

# print("middle coach="+str(mid_Coach)+" middle seat="+str(mid_Seat))

 

i,j,k,l=0,0,0,0

 

coach=0

seat=mid_Seat

 

while seat<noOfSeats and seat>0:
    if coach<=num or coach>noOfCoaches:
        i=0
        coach=mid_Coach
        if l:
            seat=mid_Seat-j
            l=0
        else:
            seat=mid_Seat+j
            l=1
            j=j+2
    else:
        if k and (i !=0):
            coach=mid_Coach-i
            k=0
        else:
            coach=mid_Coach+i
            k=1
            i=i+1
        # print("C"+str(coach)+"S"+str(seat))
        if(seat<noOfReservedSeats or seat>=(noOfSeats-noOfReservedSeats-1)):
            # print("reserved")
            res[("C"+str(coach)+"-S"+str(seat))]=0
        else:
            unres[("C"+str(coach)+"-S"+str(seat))]=0
mid_Seat=mid_Seat+1
i,j,k,l=0,0,0,0
coach=0
seat=mid_Seat
while seat<noOfSeats and seat>0:
    if coach<=num or coach>noOfCoaches:
        i=0
        coach=mid_Coach
        if l:
            seat=mid_Seat-j
            l=0
        else:
            seat=mid_Seat+j
            l=1
            j=j+2
    else:
        if k and (i!=0):
            coach=mid_Coach-i
            k=0
        else:
            coach=mid_Coach+i
            k=1
            i=i+1

        # print("C"+str(coach)+"S"+str(seat))
        unres[("C"+str(coach)+"-S"+str(seat))]=0


# print("unreserved:")

print(unres)

# print("reserved:")

print(res)
