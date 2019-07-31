$(document).ready(function(){
    $('.datepicker').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy' 
    });

    $(document).on('click','.view-employee',function(e){
        e.preventDefault();
        var employee_id=$(this).attr('data-employee-id');
        $.ajax({
            url:"/employee/view",
            type:'POST',
            dataType:'JSON',
            data:{employee_id:employee_id},
            success:function(response){
                if(response.status==1){
                    $modal=$('#employee_detail');  
                    $modal.find('.employee-name').text(response.data[0].name);
                    $modal.find('.employee-email').text(response.data[0].email);
                    $modal.find('.employee-company').text(response.data[0].company_name);
                    $modal.find('.employee-dob').text(response.data[0].joining_date);
                    $modal.find('.employee-doj').text(response.data[0].date_of_birth);
                    $modal.find('.employee-dol').text(response.data[0].leaving_date);
                    $modal.modal('show');
                }else{
                    alert(response.message);
                }
            }
        });
    });
    $(document).on('hide.bs.modal','#employee_detail',function(){
        $modal=$('#employee_detail');  
        $modal.find('.employee-name').text('');
        $modal.find('.employee-email').text('');
        $modal.find('.employee-company').text('');
        $modal.find('.employee-dob').text('');
        $modal.find('.employee-doj').text('');
        $modal.find('.employee-dol').text('');
    });
});


$(document).on('click','.view-compra',function(e){
    e.preventDefault();
    var compra_id=$(this).attr('data-compra-id');
    $.ajax({
        url:"/compra/view",
        type:'POST',
        dataType:'JSON',
        data:{compra_id:compra_id},
        success:function(response){
            if(response.status==1){
                
                $modal=$('#compra_detail');  
                $modal.find('.compra-estabelecimento').text(response.data[0].nmEstabelecimento);
                $modal.find('.compra-dtCompra').text(response.data[0].dtCompra);       
                     
                $modal.modal('show');
            }else{
                alert(response.message);
            }
        }
    });
});
$(document).on('hide.bs.modal','#compra_detail',function(){
    $modal=$('#compra_detail');  

    $modal.find('.compra-estabelecimento').text('');
    $modal.find('.compra-dtCompra').text('');
});
