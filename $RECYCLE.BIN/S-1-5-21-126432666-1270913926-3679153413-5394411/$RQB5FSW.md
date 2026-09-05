## commands to start and stop dc services on linux

Login to Corporate Server machine.

**Set the environment variable-**

`export JAVA_HOME=/siemens/openjdk/<JAVA_VERSION>/`

**To start DC as a process-**

sudo systemctl start dcserver

sudo systemctl start repotool

sudo systemctl start publisher

**To stop DC as a process-**

sudo systemctl stop dcserver

sudo systemctl stop repotool

sudo systemctl stop publisher
​​
​​
