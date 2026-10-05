#!/bin/bash
# Ubuntu Version
# วิธีใช้: ./open.sh <api> <id> <user> [-c cid] [-s scenario] [-d duration]
#
# ตัวอย่าง:
#   ./open.sh Get_Home 1 5000                    spike test ปกติ (scenario 1, duration 1)
#   ./open.sh Add_Portfolio 2 5000 -c 9999       เส้นที่ต้อง random cid
#   ./open.sh List_Term 3 300 -s 3 -d 60         กำหนด request แบบยิงยาว 60 วินาที
##########################################################################
                     google_sheet="https://docs.google.com/spreadsheets/d/1yP8sNKxqFwcJBC1Y_BH37-vhpPu9T2XrIGIMXpSmCN4/edit?gid=303761516#gid=303761516"
                     status="normal"        #พิมพ์คำว่า "normal" เพื่อยิงโหลดเเละ upload report ไปที่ sheet
                                            #พิมพ์คำว่า "report" upload report ล่าสุดไปที่ sheet

                     # ค่าตั้งต้นของ option (ไม่ใส่ flag = ใช้ค่านี้)
                     scenario="1"           #-s  1 = ยิงเเบบกำหนด request (duration ได้แค่ 1 วินาที)
                                            #    2 = ยิงเเบบกำหนด VUs (user x คน ใช้ระบบ x วินาที)
                                            #    3 = ยิงเเบบกำหนด request แต่ไม่แม่นยำ (duration กี่วินาทีก็ได้)
                     duration="1"           #-d  วินาที
                     cid="1"                #-c  9999 = random cid
##########################################################################

usage() {
  echo "   วิธีใช้: ./open.sh <api> <id> <user> [-c cid] [-s scenario] [-d duration]"
  echo "   ตัวอย่าง: ./open.sh Get_Home 1 5000"
  echo "            ./open.sh Add_Portfolio 2 5000 -c 9999"
  echo "            ./open.sh List_Term 3 300 -s 3 -d 60"
}

# ค่าบังคับ 3 ตัวแรก
if [ "$#" -lt 3 ]; then
  echo "❌ ต้องใส่ api, id, user (ใส่มา $# ค่า)"
  usage
  exit 1
fi
API="$1"
id="$2"
user="$3"
shift 3

# option เสริม
duration_set="0"
while getopts ":c:s:d:" opt; do
  case "$opt" in
    c) cid="$OPTARG" ;;
    s) scenario="$OPTARG" ;;
    d) duration="$OPTARG"; duration_set="1" ;;
    :) echo "❌ -$OPTARG ต้องมีค่าตามหลัง"; usage; exit 1 ;;
    *) echo "❌ ไม่รู้จัก option -$OPTARG"; usage; exit 1 ;;
  esac
done
shift $((OPTIND - 1))
if [ "$#" -gt 0 ]; then
  echo "❌ มีค่าเกินมา: $* (option ต้องมี -c / -s / -d นำหน้า)"
  usage
  exit 1
fi

# ตรวจค่า
if [ ! -f "api/$API.js" ]; then
  echo "❌ ไม่พบไฟล์ api/$API.js — API ที่มี:"
  ls api | grep -v -e '^env.js$' -e '^example.js$' | sed 's/\.js$//; s/^/   /'
  exit 1
fi
for pair in "id=$id" "user=$user" "cid=$cid" "scenario=$scenario" "duration=$duration"; do
  if ! [[ "${pair#*=}" =~ ^[0-9]+$ ]]; then
    echo "❌ ${pair%%=*} ต้องเป็นตัวเลข (ได้ '${pair#*=}')"
    usage
    exit 1
  fi
done
if ! [[ "$scenario" =~ ^[123]$ ]]; then
  echo "❌ scenario ต้องเป็น 1, 2 หรือ 3 (ได้ $scenario)"
  exit 1
fi
if [ "$scenario" = "1" ] && [ "$duration" != "1" ]; then
  echo "❌ scenario 1 ใช้ duration ได้แค่ 1 วินาที — ถ้าจะยิงยาวให้ใส่ -s 3 ด้วย"
  exit 1
fi
if [ "$scenario" != "1" ] && [ "$duration_set" = "0" ]; then
  echo "❌ scenario $scenario ต้องระบุ -d <วินาที> ด้วย"
  exit 1
fi

folder_report=$(date +"%d-%m-%y") #ห้ามเปลี่ยน
mkdir -p "report/$folder_report"

filenamex="$API-$user-$id"

# กันลืมเปลี่ยน id — ถ้า report ชื่อนี้มีอยู่แล้วจะไม่ยิงทับ
if [ "$status" = "normal" ] && [ -f "report/$folder_report/$filenamex.json" ]; then
  echo "❌ มี report $filenamex.json ของวันนี้อยู่แล้ว — เปลี่ยน id ก่อนยิง"
  exit 1
fi

echo "▶ API=$API id=$id user=$user | scenario=$scenario duration=$duration cid=$cid | status=$status"

if [ "$status" = "normal" ]; then
    # รัน main/main.js และรอจนกว่าจะเสร็จ
    k6 run --env api="$API" --env id="$id" --env cid="$cid" --env projectname="$API" --env scenariox="$scenario" --env user="$user" --env durationx="$duration" --summary-export=report/"$folder_report"/"$filenamex".json main/main.js

    # รัน config/insertdata.js
    if [ -f "report/$folder_report/$filenamex.json" ]; then
        echo "✨ Uploading report...."
        k6 run --env filename="$filenamex" --env projectname="$API" --env date="$folder_report" --env id="$id" --env user="$user" --env durationx="$duration" --env google_link="$google_sheet" config/insertdata.js --no-summary
    fi
elif [ "$status" = "report" ]; then
    # รันแค่ config/insertdata.js
    if [ -f "report/$folder_report/$filenamex.json" ]; then
        echo "✨ Uploading report...."
        k6 run --env filename="$filenamex" --env projectname="$API" --env date="$folder_report" --env id="$id" --env user="$user" --env durationx="$duration" --env google_link="$google_sheet" config/insertdata.js --no-summary
    else
        echo "❌ Report not found"
    fi
else
    echo "❌ Invalid report value: $status"
fi

exit 0

# Windows Version (เดิม) — เก็บไว้อ้างอิง ไม่ถูกรัน
##########################################################################
#                     API="template"
#                     google_sheet="https://docs.google.com/spreadsheets/d/1yP8sNKxqFwcJBC1Y_BH37-vhpPu9T2XrIGIMXpSmCN4/edit?gid=303761516#gid=303761516"
#                     id="1"                 #เปลี่ยน id ทุกครั้งที่ยิง
#                     user="1";              #จำนวนผู้ใช้งาน
#                     duration="1";          #วินาที
#                     scenario="1"           #scenario="1" ยิงเเบบกำหนด request (duration ได้แค่ 1 วินาที)
#                     cid="1"                #scenario="2" ยิงเเบบกำหนด VUs  (กำหนดว่า user x คน ใช้ระบบ x วินาที)
#                                            #scenario="3" ยิงเเบบกำหนด request แต่ไม่แม่นยำ (duration กี่วินาทีก็ได้)
#                     status="normal"        #พิมพ์คำว่า "normal" เพื่อยิงโหลดเเละ upload report ไปที่ sheet
#                                            #พิมพ์คำว่า "report" upload report ล่าสุดไปที่ sheet
##########################################################################
#
#folder_report=$(date +"%d-%m-%y") #ห้ามเปลี่ยน
#if [ ! -d "report/$folder_report" ]; then
#  # ถ้าไม่มีให้สร้างโฟลเดอร์ folder
#  mkdir "report/$folder_report"
#fi
#
#filenamex="$API-$user-$id"
#if [ "$status" = "normal" ]; then
#    # รัน main/main.js และรอจนกว่าจะเสร็จ
#    k6 run --env id="$id" --env cid="$cid" --env projectname="$API" --env scenariox="$scenario" --env user="$user" --env durationx="$duration" --summary-export=report/"$folder_report"/"$filenamex".json main/main.js
#
#    # รอจนกว่าการรันเสร็จสิ้น
#    wait
#
#    # รัน main/insertdata.js
#    if [ -f "report/$folder_report/$filenamex.json" ]; then
#        echo "✨ Uploading report...."
#        k6 run --env filename="$filenamex" --env projectname="$API" --env date="$folder_report" --env id="$id" --env user="$user" --env durationx="$duration" --env google_link="$google_sheet" config/insertdata.js --no-summary
#    fi
#elif [ "$status" = "report" ]; then
#    # รันแค่ main/insertdata.js
#    if [ -f "report/$folder_report/$filenamex.json" ]; then
#        echo "✨ Uploading report...."
#        k6 run --env filename="$filenamex" --env projectname="$API" --env date="$folder_report" --env id="$id" --env user="$user" --env durationx="$duration" --env google_link="$google_sheet" config/insertdata.js --no-summary
#    else
#        echo "❌ Report not found"
#    fi
#else
#    echo "❌ Invalid report value: $status"
#fi