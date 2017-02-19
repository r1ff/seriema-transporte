<?php

/**
 * Created by PhpStorm.
 * User: marciso
 * Date: 12/02/2017
 * Time: 17:53
 */

defined('BASEPATH') OR exit('No direct script access allowed');

class Volume extends CI_Controller
{
    public function deposito(){
//        $this->output->enable_profiler(TRUE);
//        $this->load->model('md_volume');
//
//        $volume=$this->md_volume->listaVolume();
//
//        $dados = array("volume" => $volume);
//        $this->load->view('vw_volume',$dados);
        $this->load->library('Mercadoria');
        $this->load->view('vw_deposito');
    }

    public function cadastrarVolume(){
        $this->load->model('md_volume');
        $this->md_volume->salvarVolume();
    }

    public function cadastrarEnvio(){
        $this->load->model('md_volume');
        $this->md_volume->salvarEnvio();
    }

    public function cadastrarRecebido(){
        $this->load->model('md_volume');
        $this->md_volume->salvarRecebido();
    }

    public function enviados(){
        $this->load->library('Mercadoria');
        $this->load->view('vw_despachado');
    }

    public function recebidos(){
        $this->load->library('Mercadoria');
        $this->load->view('vw_recebidos');
    }
}