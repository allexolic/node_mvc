$(document).ready(function(){
    $('.datepicker').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy' 
    });

    $(document).on('click','.view-pessoa',function(e){
        e.preventDefault();
        var pessoaId=$(this).attr('data-pessoa-id');
        $.ajax({
            url:"/pessoa/view",
            type:'POST',
            dataType:'JSON',
            data:{pessoaId:pessoaId},
            success:function(response){
                if(response.status==1){
                    $modal=$('#pessoa_detail');  
                    $modal.find('.pessoa-name').text(response.data[0].nmPessoa);
                    $modal.find('.pessoa-usuario').text(response.data[0].usuario);
                    $modal.find('.pessoa-adm').text(response.data[0].dtAdmissao);
                    $modal.find('.pessoa-nas').text(response.data[0].dtNascimento);
                    $modal.find('.pessoa-bai').text(response.data[0].dtBaixa);
                    $modal.modal('show');
                }else{
                    alert(response.message);
                }
            }
        });
    });
    $(document).on('hide.bs.modal','#pessoa_detail',function(){
        $modal=$('#pessoa_detail');  
        $modal.find('.pessoa-name').text('');
        $modal.find('.pessoa-usuario').text('');
        $modal.find('.pessoa-adm').text('');
        $modal.find('.pessoa-nas').text('');
        $modal.find('.pessoa-bai').text('');
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
