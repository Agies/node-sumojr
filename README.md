# node-sumojr

## Scripts currently be used
*These scripts are for auto running on boot and updating from git*

**/launch.sh**

    rm -f ~/output.txt
    cd ~/robot/robot_server
    nohup sudo grunt serve --force > ~/output.txt &

**/etc/rc.local**

    su pi -c '/launch.sh'

**Hacky update and tail**

`cd ~/robot && git pull && cd ~ && tail -f output.txt`

##Notes

    exec('sudo sh -c "echo ' + (on ? 1 : 0) + ' >/sys/class/leds/led0/brightness"'

This is a cheap and easy way for me to know when the system is up and ready for use. 
It causes the SD light on the Raspberry PI to blink, which I set after the Arduino has reported
'ready' for communication. At the time all the pins on the Arduino were occupied with the 
motorshield and I had not installed the breadboard and Rasperry Breakout.
 