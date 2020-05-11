window.onload = function() {


$("#show").hide();
$("#ok").hide();

    
$(document).ready(function() {
    $("#adduserbtn").click(function(e) {

        event.preventDefault();

        let carNumber = $('#adduser').serialize();

        if (carNumber.length < 23) {alert(`차량번호를 다시 입력하세요`)}

        else {
        
            $.ajax({
                type : "POST",
                url : "/carIn",
                data : carNumber,
                success:function(check) {
                    if(typeof check === 'object') {
                        for(let addcheck in check) {
                            
                        let userNumber = check[addcheck].carNumber;
                        let userTime = check[addcheck].entryTime;
                            
                        $("#show").show();
                        $("#userNumber").text(userNumber);
                        $("#userTime").text(userTime);
                            if (check[addcheck].memberId !== 1) {
                                $("#usertype").text(`정기회원 입니다.`)
                            } else {
                                $("#usertype").text(` `)
                            }
                        }
                        $("#title").text(`입차가 완료되었습니다`);
                        $("#form").hide();
                        $("#ok").show();
                        
                    }
                    else {
                        $("#ok").hide();
                        $("#title").text(`입차된 차량입니다. 
                        차량번호를 확인하세요`);
                    }
                },
                error: function(err) {
                    console.log("error!");
                }
            })
        }
    })
})

}