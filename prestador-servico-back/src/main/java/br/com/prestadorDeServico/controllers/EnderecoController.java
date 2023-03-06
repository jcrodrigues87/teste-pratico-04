package br.com.prestadorDeServico.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.prestadorDeServico.entities.Endereco;
import br.com.prestadorDeServico.repositories.EnderecoRepository;

@RestController
@RequestMapping(value = "/enderecos")
public class EnderecoController {
	
	@Autowired
	private EnderecoRepository repository;	
	
	
	@GetMapping(value = "/buscartodos")
	public List<Endereco> findAll(){
		
		List<Endereco> result = repository.findAll();
		return result;
	}

}
