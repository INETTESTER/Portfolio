//=============================== import API =================================
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

//============================================================================

export default function () {    //เรียกใช้ API ใน export default function
  // response = Get_User_Info()                 // 1
  // response = Get_Home()                      // 2
  // response = List_Portfolio()                // 3
  // response = List_CPD_Activity()             // 4
  // response = List_Term()                     // 5
  // response = Get_Experience_Detail()         // 6
  // response = List_Course()                   // 7
  // response = Get_Education_Detail()          // 8
  // response = Get_Dropdown_List()             // 9

  // response = Add_Portfolio(cid)              // 10 
  // response = Add_CPD_Activity(cid)           // 11
  // response = Add_Experience(cid)             // 12
  // response = Update_Portfolio(cid,scenario)  // 13

  // response = Get_User_Info_Student()         // 14
  // response = Get_Home_Student()              // 15
  // response = List_Learner_Activity()        // 16


  error_check(response);
  sleep(1)
}