function add(char) {
    console.log(char);
    let display = document.getElementById('search');
    display.value = display.value+char;
}

window.onload = function() {


    $("#index").hide();
    
    $(document).ready(function() {
        $("#ok").click(function(e) {
    
            event.preventDefault();
    
            let data = $("#search").serialize();
            $("#index").show();
            
            $.ajax({
                type: "post",
                url: "/carOut",
                data: data,
                success: function(list) {
                    $('#title').text(`차량조회가 완료되었습니다`);
                    document.getElementById('tableList1').remove();
                    document.getElementById('search').remove();
                    
                    if(typeof list === "object") {
                        let html = "";
                        let entryTime = "";                
                        for(let info in list) {
                            entryTime = new Date(list[info].entryTime);
                            entryTime = entryTime.toLocaleString();
                            html+=`<li class="tableList2_items"><a href="/carOut/pay?id=${list[info].userId}">차량번호 : ${list[info].carNumber} <br/> 입차시간 : ${entryTime}</a></li>`;
                        }
                        $("#subtitle").text(`정산할 차량번호를 선택하세요`)
                        $("#tableList2").html(html);
                    
                    } else {$('#subtitle').html(list);}
                },
                error: function(err) {
                    console.log("error!");
                }
            });
        });
    });
    
}