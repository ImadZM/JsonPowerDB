var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
var connToken = "90931772|-31949307928812423|90962971";

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.record);
    localStorage.setItem("recno", lvData.roll_no);
}

function getStudentIdAsJsonObj() {
    var rollNo = $('#rollno').val();
    var jsonStr = {
        roll_no: rollNo
    }
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#fullname').val(record.full_name);
    $('#class').val(record.class);
    $('#birthdate').val(record.birthDate);
    $('#address').val(record.address);
    $('#enrollmentdate').val(record.enrollmentDate);
}

function validateData() {
    var rollNo = $('#rollno').val();
    var fullName = $('#fullname').val();
    var className = $('#class').val();
    var birthDate = $('#birthdate').val();
    var address = $('#address').val();
    var enrollmentDate = $('#enrollmentdate').val();

    if (rollNo === '' || fullName === '' || className === '' || birthDate === '' || address === '' || enrollmentDate === '') {
        return '';
    }

    var jsonStrobj = {
        "roll_no": rollNo,
        "full_name": fullName,
        "class": className,
        "birth_date": birthDate,
        "address": address,
        "enrollment_date": enrollmentDate
    }
    return JSON.stringify(jsonStrobj);
}

function resetForm() {
    $('#rollno').val("");
    $('#fullname').val("");
    $('#class').val("");
    $('#birthDate').val("");
    $('#address').val("");
    $('#enrollmentDate').val("");
    /*$('#rollno').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#change').prop("disabled", true);
    $('#reset').prop("disabled", true);*/
    $('#rollno').focus();
}

function saveData() {
    var jsonStrobj = validateData();
    if (jsonStrobj === '') {
        return '';
    }
    var putRequest = createPUTRequest(connToken, jsonStrobj, dbName, relName)
    jQuery.ajaxsetup({ async: false });
    var resJsonObj = execteCommandAGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxsetup({ async: true });
    resetForm();
    $('#rollno').focus();
}

function getStudent() {
    var rollNoJsonObj = getStudentIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, dbName, relName, rollNoJsonObj)
    jQuery.ajaxsetup({ async: false });
    var resJsonObj = execteCommandAGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxsetup({ async: true });
    if (resJsonObj.status === 200) {
        fillData(resJsonObj);
    }
}

function changeData() {
    var jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, dbName, relName, localStorage.getItem("recno"))
    jQuery.ajaxsetup({ async: false });
    var resJsonObj = execteCommandAGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxsetup({ async: true });
    console.log(resJsonObj)
    resetForm();
    $('#rollno').focus();
}