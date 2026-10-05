// รันบน Windows
// //=============================== import API =================================
// import { sleep, scenario, error_check, options } from '../config/common.js';
// export { options }; const cid = __ENV.cid || '1'; let response;
// import { Get_User_Info } from '../api/Get_User_Info.js';
// import { Get_Home } from '../api/Get_Home.js';
// import { List_Portfolio } from '../api/List_Portfolio.js';
// import { List_CPD_Activity } from '../api/List_CPD_Activity.js';
// import { List_Term } from '../api/List_Term.js';
// import { Get_Experience_Detail } from '../api/Get_Experience_Detail.js';
// import { List_Course } from '../api/List_Course.js';
// import { Get_Education_Detail } from '../api/Get_Education_Detail.js';
// import { Get_Dropdown_List } from '../api/Get_Dropdown_List.js';
// import { Get_User_Info_Student } from '../api/Get_User_Info_Student.js';
// import { Add_Portfolio } from '../api/Add_Portfolio.js';
// import { Add_CPD_Activity } from '../api/Add_CPD_Activity.js';
// import { Add_Experience } from '../api/Add_Experience.js';
// import { Update_Portfolio } from '../api/Update_Portfolio.js';
// import { Get_Home_Student } from '../api/Get_Home_Student.js';
// import { List_Learner_Activity } from '../api/List_Learner_Activity.js';
//
// //============================================================================
//
// export default function () {    //เรียกใช้ API ใน export default function
//   // response = Get_User_Info()                 // 1
//   // response = Get_Home()                      // 2
//   // response = List_Portfolio()                // 3
//   // response = List_CPD_Activity()             // 4
//   // response = List_Term()                     // 5
//   // response = Get_Experience_Detail()         // 6
//   // response = List_Course()                   // 7
//   // response = Get_Education_Detail()          // 8
//   // response = Get_Dropdown_List()             // 9
//
//   // response = Add_Portfolio(cid)              // 10
//   // response = Add_CPD_Activity(cid)           // 11
//   // response = Add_Experience(cid)             // 12
//   // response = Update_Portfolio(cid,scenario)  // 13
//
//   // response = Get_User_Info_Student()         // 14
//   // response = Get_Home_Student()              // 15
//   // response = List_Learner_Activity()        // 16
//
//
//   error_check(response);
//   sleep(1)
// }



// IMPORT API
// รันบน Ubuntu
import { sleep, scenario, error_check, options } from '../config/common.js';
export { options }; const cid = __ENV.cid || '1'; let response;
import { Get_User_Info } from '../api/Get_User_Info.js';
import { Get_Home } from '../api/Get_Home.js';
import { List_Portfolio } from '../api/List_Portfolio.js';
import { List_CPD_Activity } from '../api/List_CPD_Activity.js';
import { List_Term } from '../api/List_Term.js';
import { Get_Experience_Detail } from '../api/Get_Experience_Detail.js';
import { List_Course } from '../api/List_Course.js';
import { Get_Education_Detail } from '../api/Get_Education_Detail.js';
import { Get_Dropdown_List } from '../api/Get_Dropdown_List.js';
import { Get_User_Info_Student } from '../api/Get_User_Info_Student.js';
import { Add_Portfolio } from '../api/Add_Portfolio.js';
import { Add_CPD_Activity } from '../api/Add_CPD_Activity.js';
import { Add_Experience } from '../api/Add_Experience.js';
import { Update_Portfolio } from '../api/Update_Portfolio.js';
import { Get_Home_Student } from '../api/Get_Home_Student.js';
import { List_Learner_Activity } from '../api/List_Learner_Activity.js';

// API LIST — ชื่อ (ใช้ใน ./open.sh <api>) : วิธีเรียก (argument เหมือนเดิมทุกเส้น)
// มี API ใหม่ ให้ import ด้านบน แล้วเพิ่มบรรทัดในนี้
const API_LIST = {
  Get_User_Info:         () => Get_User_Info(),               // 1
  Get_Home:              () => Get_Home(),                    // 2
  List_Portfolio:        () => List_Portfolio(),              // 3
  List_CPD_Activity:     () => List_CPD_Activity(),           // 4
  List_Term:             () => List_Term(),                   // 5
  Get_Experience_Detail: () => Get_Experience_Detail(),       // 6
  List_Course:           () => List_Course(),                 // 7
  Get_Education_Detail:  () => Get_Education_Detail(),        // 8
  Get_Dropdown_List:     () => Get_Dropdown_List(),           // 9

  Add_Portfolio:         () => Add_Portfolio(cid),            // 10
  Add_CPD_Activity:      () => Add_CPD_Activity(cid),         // 11
  Add_Experience:        () => Add_Experience(cid),           // 12
  Update_Portfolio:      () => Update_Portfolio(cid, scenario), // 13

  Get_User_Info_Student: () => Get_User_Info_Student(),       // 14
  Get_Home_Student:      () => Get_Home_Student(),            // 15
  List_Learner_Activity: () => List_Learner_Activity(),       // 16
};

// SELECT API — รับชื่อจาก --env api=<ชื่อ> (ส่งมาจาก open.sh) ถ้าไม่มีหรือพิมพ์ผิดจะหยุดก่อนยิง
const apiName = __ENV.api;
if (!apiName || !API_LIST[apiName]) {
  throw new Error(`ไม่พบ API '${apiName}' — ที่มี: ${Object.keys(API_LIST).join(', ')}`);
}
const callApi = API_LIST[apiName];

// SCENARIO
export default function () {    //เรียกใช้ API ที่เลือกจาก open.sh
  response = callApi();
  error_check(response);
  sleep(1)
}