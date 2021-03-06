/**
 * Created by marciso on 10/02/2017.
 */

$('#nota').click(function(){
    console.log('funcionou');
    if($('#nota').is(":checked")){
        $("#notaFiscal").prop('disabled',false);
        $("#notaFiscal").val('');
    }else{
        $("#notaFiscal").prop('disabled',true);
        $("#notaFiscal").val("S/N");
    }
});

$('#course').change(function(){

    $.ajax({
        url: '../../index.php/Cliente/buscaCliente',
        type: 'POST',
        data:{
            nome: $('#course').val()
        },
        beforeSend : function() {
            $.blockUI({
                message: 'Procurando informações do cliente',
                baseZ: 2000 });
        },
        complete: function () {
            $.unblockUI();
        },
        success : function (data) {
            var array = JSON.parse("[" + data + "]");

            $('#cliente').val(array[0][0]['id_clients']);
            $('#telefone').val(array[0][0]['telefone']);
        },
        error: function(data){
            $.unblockUI();
        }
    });
});


$("#salvarVolume").click(function(){//cadastrar deposito
    var controller;
    if($("#tipoVolume").val()==1) {
        controller='cadastrarVolume';
    }else{//Editando
        controller='editarVolume';
    }

    var dados = {
        id_mercadoria : $('#id_mercadoria_editar').val(),
        cliente: $('#cliente').val(),
        telefone: $('#telefone').val(),
        notafiscal: $('#notaFiscal').val(),
        desc: $('#desc').val(),
        dt_deposito: $('#dt_deposito').val(),
        tipoVolume: $('input:radio[name=tipoVolume]:checked').val(),
        tamanhoVolume: $('input:radio[name=tamanhoVolume]:checked').val()
    };

    $.ajax({
        url: controller,
        type: 'POST',
        data: dados,
        beforeSend : function() {
            $.blockUI({
                message: 'Salvando...',
                baseZ: 2000 });
        },
        complete: function () {
            $.unblockUI();
        },
        success: function (data) {
            limpaVolumeModel();
            $("#volumeSucesso").show();

            setTimeout(function () {
                $('#inserirModal-modal').modal('toggle');
                $("#volumeSucesso").hide();
            }, 800);
            window.location.reload();
        },
        error: function (data) {
            $("#volumeErro").show();
            $.unblockUI();
        }
    });
});

$('#salvarEnvio').click(function(){
    if($("#tipoVolume").val()==1) {
        var dados ={
            id_mercadoria : $('#id_mercadoria').val(),
            veiculo       : $('#onibus_envio').val(),
            dt_envio      : $('#dt_envio').val(),
            destino       : $("[name=destino]").val(),
            origem        : $("[name=origem]").val()
        };

        $.ajax({
            url: 'cadastrarEnvio',
            type: 'POST',
            data: dados,
            beforeSend : function() {
                $.blockUI({
                    message: 'Enviando...',
                    baseZ: 2000
                });
            },
            complete: function () {
                $.unblockUI();
            },
            success : function(data){
                limparEnvioModel();
                $('#envioSucesso').show();

                setTimeout(function(){
                    $('#despacharModal-modal').modal('toggle');
                    $("#envioSucesso").hide();
                },800);
                window.location.reload();
            },
            error: function(data){
                $('#envioErro').show();
                $.unblockUI();
            }
        });

    }else{//Editando

    }
});

$("#salvarRecebido").click(function(){
    if($("#tipoRecebido").val()==1) {
        var dados = {
            id_mercadoria   : $("#id_mercadoria_recebido").val(),
            dt_recebido     : $("#dt_recebido").val()
        };

        $.ajax({
            url: "cadastrarRecebido",
            type:"POST",
            data:dados,
            beforeSend : function() {
                $.blockUI({
                    message: 'Recebendo...',
                    baseZ: 2000
                });
            },
            complete: function () {
                $.unblockUI();
            },
            success: function(data){
                limparRecebidoModel();
                $('#recebidoSucesso').show();

                setTimeout(function(){
                    $('#receberModal-modal').modal('toggle');
                    $("#recebidoSucesso").hide();
                },800);
                // window.location.reload();
            },
            error: function(data){
                $('#recebidoErro').show();
                $.unblockUI();
            }
        });
    }else{//editando

    }
});

$("#salvarEntregue").click(function(){
    if($("#tipoEntregue").val()==1){
        var dados = {
            id_mercadoria : $("#id_mercadoria_entregue").val(),
            dt_entregue : $("#dt_entregue").val()
        };

        $.ajax({
            url :"cadastrarEntregue",
            type: "POST",
            data: dados,
            beforeSend : function() {
                $.blockUI({
                    message: 'Entregando...',
                    baseZ: 2000
                });
            },
            complete: function () {
                $.unblockUI();
            },
            success: function(data){
                limparEntregueModel();
                $('#entregueSucesso').show();

                setTimeout(function(){
                    $('#entregarModal-modal').modal('toggle');
                    $("#entregueSucesso").hide();
                },800);
                window.location.reload();
            },
            error: function(data){
                $("#entregueErro").show();
                $.unblockUI();
            }
        });
    }else{//editando

    }
});

$("#cancelarVolume").click(function(){
    limpaVolumeModel();
});

$("#cancelarEnvio").click(function(){
    limparEnvioModel();
});

$("#cancelarRecebido").click(function(){
    limparRecebidoModel();
});

$("#cancelarEntregue").click(function(){
    limparEntregueModel();
});

$("#excluir").click(function(){
    var controller;

    if($("#tipoExclusao").val()==1){//Deposito
        controller = 'cancelarVolume';
    }else if($("#tipoExclusao").val()==2){//Envio
        controller = 'cancelarEnvio';
    }else if($("#tipoExclusao").val()==3){//Recebido
        controller = 'cancelarRecebido';
    }else if($("#tipoExclusao").val()==4){//Entregue
        controller = 'cancelarEntregue';
    }

    var dados = {
        id_mercadoria : $('#id_mercadoria_excluir').val()
    };

    $.ajax({
        url: controller,
        type: 'POST',
        data: dados,
        beforeSend:function (){
            $.blockUI({
                message: 'Excluindo...',
                baseZ: 2000
            });
        },
        complete: function () {
            $.unblockUI();
        },
        success: function(data){
            limparExcluirModel();
            $('#excluidoSucesso').show();

            setTimeout(function(){
                $('#excluirModal-modal').modal('toggle');
                $("#excluidoSucesso").hide();
            },800);
            window.location.reload();
        },
        error: function(data){
            $("#excluidoErro").show();
            $.unblockUI();
        }
    });
});

function editarVolume(id){
    var dados = {
        id_mercadoria : id
    };
    console.log(dados);
    limpaVolumeModel();
    $.ajax({
        url:'buscaEditarVolume',
        type: 'POST',
        data: dados,
        beforeSend: function(){
            $.blockUI({
                message: "Carregando...",
                baseZ: 2000
            });
        },
        complete:function(data){

            var array = JSON.parse(data.responseText);

            if(array[0].nr_nota_fiscal != "S/N") {
                $('#nota').prop('checked', true);
                $("#notaFiscal").prop('disabled',false);
            }else{
                $('#nota').prop('checked', false);
                $("#notaFiscal").prop('disabled',true);
            }
            $('#cliente').val(array[0].id_cliente);
            $('#course').val(array[0].nome);
            $('#telefone').val(array[0].telefone);
            $('#notaFiscal').val(array[0].nr_nota_fiscal);
            $('#desc').val(array[0].descricao);
            $('#dt_deposito').val(array[0].dt_deposito);
            $('#tipoVolume'+array[0].tp_volume).prop('checked',true);
            $('#tamanhoVolume'+array[0].tm_volume).prop('checked',true);
            $.unblockUI();
        }
    });
}

function limpaVolumeModel(){
    $('#cliente').val('');
    $('#course').val('');
    $('#telefone').val('');
    $('#notaFiscal').val('S/N');
    $('#desc').val('');
    $('#dt_deposito').val('');
    $('#id_mercadoria_editar').val('');
    $('#tipoVolume1').prop('checked',true);
    $('#tamanhoVolume1').prop('checked',true);
    $("#volumeSucesso").hide();
    $("#volumeErro").hide();
}

function limparBuscaModel(){
    $('#cliente_busca').val('');
    $('#data_busca').val('');
    $('#onibus_busca').val('');
    $('#origem_busca').val('');
    $('#destino_busca').val('');
    $('#tp_volume1_busca').prop('checked',false);
    $('#tp_volume2_busca').prop('checked',false);
    $('#tp_volume3_busca').prop('checked',false);
    $('#tp_volume4_busca').prop('checked',false);
    $('#tm_volume1_busca').prop('checked',false);
    $('#tm_volume2_busca').prop('checked',false);
    $('#tm_volume3_busca').prop('checked',false);
}

function limparEnvioModel(){
    $('#onibus_envio').val('');
    $('#dt_envio').val('');
    $('#cliente_despacho').val('');
    $('#nota_fiscal_despacho').val('');
    $('#dt_entrada_despacho').val('');
    $('#descricao_despacho').val('');
    $('#tp_volume_despacho').val('');
    $('#tm_volume_despacho').val('');
    $("#envioSucesso").hide();
    $("#envioErro").hide();
}

function limparRecebidoModel(){
    $('#dt_recebido').val('');
}

function limparEntregueModel(){
    $("#dt_entregue").val('');
}

function limparExcluirModel(){
    $('#id_mercadoria_excluir').val('');
}
