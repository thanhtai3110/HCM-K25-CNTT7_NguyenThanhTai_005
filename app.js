let employees = [
    {
        employeeCode : "EMP-001",fullname : "Ngô Thanh Tùng",
        department : "Phòng kỹ thuật", age: 28, experienceYears : 5
    },
    {
        employeeCode : "EMP-002",fullname : "Hồ Thị Thu",
        department : "Phòng nhân sự", age: 35, experienceYears : 10
    },
    {
         employeeCode : "EMP-003",fullname : "Mai Quốc Việt",
        department : "Phòng kỹ thuật", age: 24, experienceYears : 1
    }
]
function displayEmployess(employees){
    if(!employees || employees.length === 0){
        console.log("Danh sách trống");
        return
    }
    employees.forEach((element,index) => {
        console.log(`STT: ${index+1}
            - Mã nhân viên: ${element.employeeCode}
            - Họ tên: ${element.fullname}
            - Phòng ban: ${element.department}
            - Tuổi: ${element.age}
            - Số năm kinh nghiệm: ${element.experienceYears}
            `);
        
    });
    console.log(`Tổng số nhân viên: ${employees.length}`);
    
}
function normalizeText(rawText){
    if(!rawText){
        return ""
    }
    let words = rawText.trim().split(" ")
    let capitalizeWords = []
    words.forEach((w)=>{
        if(w !== ""){
            capitalizeWords.push(
                w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
            )
        }
    })
    return capitalizeWords.join(" ")
}
function findEmployeeindex(employeeCode){
    if(!employeeCode){
        return -1
    }
    let upperCode = employeeCode.trim().toUpperCase()
    for(let i = 0; i<employees.length; i++){
        if(employees[i].employeeCode === upperCode){
            return i
        }
    }
    return -1
}

function validateEmployeeCode(employeeCode){
    if(employeeCode === ""){
        return "Chưa nhập mã"
    }
    let upperCode = employeeCode.trim().toUpperCase()
    if(upperCode.length < 6){
        return "Tối thiểu 6 ký tự"
    }
    if(!upperCode.startsWith("EMP-")){
        return "Sai tiền tố EMP-"
    }
    if(upperCode.includes(" ")){
        return "Chứa khoảng trắng"
    }
    if(findEmployeeindex(upperCode) !== -1){
        return "Mã đã tồn tại"
    }
    return ""
}
function inputIntegerRange(message,min,max){
    while(true){
        let input = prompt(message)
        if(input===null){
            return null
        }
        let trimed = input.trim()
        if(trimed === ""){
            console.log("giá trị không được để trống vui lòng nhập lại");
            continue
        }
        let number = Number(input)
        if(isNaN(number) || !Number.isInteger(number) || number < min || number > max){
            console.log(`Gía trị không hợp lệ. Vui lòng nhập số nguyên từ ${min} đến ${max}`);
            continue
        }
        return number
    }
}
function inputName(message){
    while(true){
        let name = prompt(message)
        if(name === null){
            return null
        }
        name = normalizeText(name)
        if(name !== ""){
            return name
        }
        console.log("không được để trống");
        
    }
}
function addEmployess(){
    let employeeCode = prompt("Nhập mã nhân viên: ")
    if(employeeCode === null){
        console.log("Hủy thao tác thêm");
        return
    }
    employeeCode = employeeCode.trim().toUpperCase()
    let error = validateEmployeeCode(employeeCode)
    if(error !== ""){
        console.log("Lỗi: ",error);
        return
    }

    let fullname = inputName("Nhập họ tên: ")
    if(fullname === null){
        console.log("Hủy thao tác thêm");
        return
    }
    let department = inputName("Nhập phòng ban: ")
    if(department === null){
        console.log("Hủy thao tác thêm");
        return
    }

    let age = inputIntegerRange("Nhập tuổi (18-60): ",18,60)
    if(age === null){
        console.log("Hủy thao tác thêm");
        return
    }

    let experienceYears = inputIntegerRange("Nhập số năm kinh nghiệm (0-40): ",0,40)
    if(experienceYears === null){
        console.log("Hủy thao tác thêm");
        return
    }

    let newEmployee = {
        employeeCode : employeeCode,
        fullname : fullname,
        department : department,
        age : age,
        experienceYears : experienceYears
    }
    employees.push(newEmployee)
    console.log("Thêm thành công");
    console.log("Mã nhân viên: ",employeeCode);
    console.log("Họ tên: ",fullname);
    console.log("Phòng ban: ",department);
    console.log("Tuổi: ",age);
    console.log("Số năm kinh nghiệm làm việc: ",experienceYears);
    
}

function updateEmployess(){
    let employeeCode = prompt("nhập mã nhân viên cần tìm: ")
    if(employeeCode === null){
        console.log("Hủy thao tác cập nhật");
        return
    }
    employeeCode = employeeCode.trim().toUpperCase()
    let index = findEmployeeindex(employeeCode)
    if(index===-1){
        console.log("Không tìm thấy mã nhân viên: ",employeeCode);
        return
    }
    let age = inputIntegerRange("Nhập tuổi: ")
    if(age === null){
        console.log("hủy thao tác cập nhật");
        return
    }

    let experienceYears = inputIntegerRange("Nhập số năm kinh nghiệm: ")
    if(experienceYears === null){
        console.log("hủy thao tác");
        return
    }
    let emp = employees[index]
    let oldAge = emp.age
    let oldExperienceYears = emp.experienceYears

    emp.age = age
    emp.experienceYears = experienceYears
    console.log("Cập nhật thành công");
    console.log(`Tuổi trước : ${oldAge} - Số năm kinh nghiệm trước: ${oldExperienceYears}`);
    console.log(`Tuổi sau : ${emp.age} - Số năm kinh nghiệm sau: ${emp.experienceYears}`);
    
}
function deleteEmployess(){
    let employeeCode = prompt("nhập mã nhân viên cần tìm: ")
    if(employeeCode === null){
        console.log("Hủy thao tác cập nhật");
        return
    }
    employeeCode = employeeCode.trim().toUpperCase()
    let index = findEmployeeindex(employeeCode)
    if(index===-1){
        console.log("Không tìm thấy mã nhân viên: ",employeeCode);
        return
    }
    let confirmDelete = prompt("Bạn xác nhận xóa (y/n): ")
    if(confirmDelete !== ""){
        confirmDelete = confirmDelete.trim()
    }
    if(confirmDelete === "Y" || confirmDelete === "y"){
        employees.splice(index,1)
        console.log("Xóa thành cônng");
        console.log(`Số lượng còn lại: ${employees.length}`);
        
    }else{
        console.log("hủy thao tác");
        console.log(`Số lượng còn lại: ${employees.length}`);
        
    }
}
function searchEmployess(){
    let keyword =  prompt("Nhập từ khóa: ")
    if(keyword === null || keyword.trim() === ""){
        console.log("Chưa nhập từ khóa");
        return
    }
    keyword = keyword.trim().toLowerCase()
    let result = employees.filter((e)=>{
        return e.department.toLowerCase().includes(keyword)
    })
    if(result.length === 0){
        console.log("Không tìm thấy nhân viên phù hợp");
        return
    }
    displayEmployess(result)
}
function main(){
    while(true){
        let choice = prompt(`
            ==========================================
            HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY SKYTECH
            ==========================================
            1. Hiển thị danh sách nhân viên
            2. Thêm nhân viên mới
            3. Cập nhật thông tin nhân viên
            4. Xóa nhân viên
            5. Tìm kiếm nhân viên theo phòng ban
            0. Thoát chương trình
            ==========================================
            Vui lòng nhập lựa chọn của bạn(0-5): 
            `)
        switch (choice) {
            case "1":
                displayEmployess(employees)
                break;
            case "2":
                addEmployess()
                break;
            case "3":
                updateEmployess()
                break;
            case "4": 
                deleteEmployess()
                break;
            case "5":
                searchEmployess()
                break;
            case "0":
                console.log("Đã thoát chương trình");
                break
            default:
                console.log("Lựa chọn không hợp lệ");
                break;
            
        }
        if(choice === "0"){
            break
        }
    }
}
main()