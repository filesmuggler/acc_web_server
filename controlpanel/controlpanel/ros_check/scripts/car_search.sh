#!/bin/bash
<< --MULTIword-COMMENT--
AutonomousCarsCoop(ACC) 
Car search v.0.1

File: car_search.sh

Program purpose: Bash script for car search.

Requirements: 
//TODO

Program execution steps:
//TODO

MIT License

Copyright (c) 2019 Krzysztof Stężała, Zaid Bouslikhin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

--MULTIword-COMMENT--

result=$(nmap -sP 192.168.1.0-200 | grep "c.r[1-9]")
IP_ARRAY=()
COUNTER=1
for i in $(echo $result | grep --extended-regexp --ignore-case --only-matching '\(([^()]*)\)' )
do
    #echo "[$COUNTER] $i"
    IP_ARRAY=("${IP_ARRAY[@]}" "$i")
    ((COUNTER=COUNTER+1))
done

echo "${IP_ARRAY[@]}"
