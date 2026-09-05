## Known issues and workarounds

### Appending hostname in  etc hosts file

step1 : get hostname of Linux machine by using command : hostname
![Image](./image_377.png)

step2 : copy the value   and make it all capital letters eg: TC162607TCS1PRD ( from tc162607tcs1prd)

step3: go to /etc/hosts file ( using command : vi /etc/hosts )
 
it will look like this 

![Image](./image_378.png)


append   hostname in the first line before localhost 

​​
example of how end file looks like 
​​
127.0.0.1   TC162607TCS1PRD localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
