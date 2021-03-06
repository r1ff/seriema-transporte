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
        if ($this->session->userdata('is_logged_in') == 1) {
            $this->load->library('Mercadoria');
            $this->load->library('Destino');
            $this->load->library('Usuario');
            $this->load->library('Botoes');
            $this->load->view('vw_deposito');
        }else{
            $this->load->view('login');
        }
    }

    public function enviados(){
        if ($this->session->userdata('is_logged_in') == 1) {
            $this->load->library('Destino');
            $this->load->library('Usuario');
            $this->load->library('Botoes');
            $this->load->library('Mercadoria');
            $this->load->view('vw_despachado');
        }else{
            $this->load->view('login');
        }
    }

    public function recebidos(){
        if ($this->session->userdata('is_logged_in') == 1) {
            $this->load->library('Destino');
            $this->load->library('Usuario');
            $this->load->library('Botoes');
            $this->load->library('Mercadoria');
            $this->load->view('vw_recebidos');
        }else{
            $this->load->view('login');
        }
    }

    public function entregues(){
        if ($this->session->userdata('is_logged_in') == 1) {
            $this->load->library('Destino');
            $this->load->library('Usuario');
            $this->load->library('Botoes');
            $this->load->library('Mercadoria');
            $this->load->view('vw_entregue');
        }else{
            $this->load->view('login');
        }
    }

    public function cadastrarVolume(){
        $this->load->model('md_volume');
        $this->md_volume->salvarVolume();
    }

    public function editarVolume(){
        $this->load->model('md_volume');
        $this->md_volume->editarVolume();
    }

    public function cadastrarEnvio(){
        $this->load->model('md_volume');
        $this->md_volume->salvarEnvio();
    }

    public function cadastrarRecebido(){
        $this->load->model('md_volume');
        $this->md_volume->salvarRecebido();
    }

    public function cadastrarEntregue(){
        $this->load->model('md_volume');
        $this->md_volume->salvarEntregue();
    }

    public function cancelarVolume(){
        $this->load->model('md_volume');
        $this->md_volume->cancelarVolume();
    }

    public function cancelarEnvio(){
        $this->load->model('md_volume');
        $this->md_volume->cancelarEnvio();
    }

    public function cancelarRecebido(){
        $this->load->model('md_volume');
        $this->md_volume->cancelarRecebido();
    }

    public function cancelarEntregue(){
        $this->load->model('md_volume');
        $this->md_volume->cancelarEntregue();
    }

    public function buscaEditarVolume(){
        $this->load->model('md_volume');
        $this->md_volume->buscaEditarVolume();
    }
}